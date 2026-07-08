// ==========================================
// 1. ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU CHUẨN (TYPES)
// ==========================================

export interface LwsSeoData {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonical?: string;
  noindex: boolean;
  nofollow: boolean;
  schema?: string;
}

export interface ProjectNode {
  title: string;
  slug: string;
  content?: string; // Dùng cho trang chi tiết dự án
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  projectDetails: {
    clientName: string;
    projectUrl: string;
    techStack: string;
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  lwsSeo?: LwsSeoData; // Trường dữ liệu SEO mở nâng cao
}

export interface PlanNode {
  title: string;
  excerpt: string; // Dùng trích dẫn làm mô tả ngắn cho gói
  planDetails: {
    price: string;
    priceYearly: string;
    ctaText: string;
    features: string;
    featured: boolean;
  };
}

export interface SitemapProjectNode {
  slug: string;
  modified: string; // Ngày cập nhật cuối cùng phục vụ SEO Sitemap
}


// ==========================================
// 2. HÀM CORE FETCH GRAPHQL (TÍCH HỢP CACHE TAG)
// ==========================================

async function fetchGraphQL(query: string, variables = {}) {
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN;
  
  if (!wordpressUrl) {
    throw new Error('Chưa cấu hình biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL');
  }
  if (!privateToken) {
    throw new Error('Chưa cấu hình biến môi trường LWS_GRAPHQL_PRIVATE_TOKEN');
  }

  const res = await fetch(wordpressUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'lws-secret-token': privateToken, 
    },
    // LƯU CACHE TĨNH: Giữ file static tối đa 7 ngày và gán thẻ định danh để Webhook xóa cache khi cần
    next: { 
      revalidate: 604800, 
      tags: ['wordpress-data'] 
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error('Lỗi truy vấn dữ liệu từ hệ thống GraphQL API');
  }

  return json.data;
}


// ==========================================
// 3. CÁC HÀM TRUY VẤN DỮ LIỆU (QUERIES)
// ==========================================

/**
 * Lấy toàn bộ danh sách dự án kèm danh mục và SEO dữ liệu hiển thị lên lưới Portfolio
 */
export async function getAllProjectsForPortfolio(): Promise<ProjectNode[]> {
  const query = `
    query GetLwsProjects {
      projects(first: 100) {
        nodes {
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          projectDetails {
            clientName
            projectUrl
            techStack
          }
          categories {
            nodes {
              name
              slug
            }
          }
          lwsSeo {
            canonical
            focusKeyword
            metaDescription
            metaTitle
            nofollow
            noindex
            schema
          }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.projects?.nodes || [];
}

/**
 * Lấy chi tiết thông tin và SEO Metadata của một dự án dựa theo đường dẫn Slug
 */
export async function getProjectBySlug(slug: string): Promise<ProjectNode | null> {
  const query = `
    query GetProjectBySlug($id: ID!) {
      project(id: $id, idType: SLUG) {
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        projectDetails {
          clientName
          projectUrl
          techStack
        }
        categories {
          nodes {
            name
            slug
          }
        }
        lwsSeo {
          canonical
          focusKeyword
          metaDescription
          metaTitle
          nofollow
          noindex
          schema
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { id: slug });
  return data?.project || null;
}

/**
 * Lấy toàn bộ danh sách gói dịch vụ bảng giá (Plans) kèm giá năm chiết khấu từ WordPress
 */
export async function getAllPlansFromGraphQL(): Promise<PlanNode[]> {
  const query = `
    query GetLwsPricingPlans {
      posts(where: {categoryName: "plans"}, first: 20) {
        nodes {
          title
          excerpt
          planDetails {
            price
            priceYearly
            ctaText
            features
            featured
          }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.posts?.nodes || [];
}

/**
 * Lấy danh sách toàn bộ Slug dự án (Phục vụ cho generateStaticParams)
 */
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  const query = `
    query GetProjectSlugs {
      projects(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.projects?.nodes || [];
}

/**
 * Lấy danh sách dự án kèm ngày cập nhật (Phục vụ cho sitemap.ts động)
 */
export async function getProjectsForSitemap(): Promise<SitemapProjectNode[]> {
  const query = `
    query GetProjectsForSitemap {
      projects(first: 100) {
        nodes {
          slug
          modified
        }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.projects?.nodes || [];
}


// ==========================================
// 4. HÀM GỬI DỮ LIỆU FORM (MUTATIONS)
// ==========================================

interface ContactVariables {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Gửi dữ liệu form liên hệ tư vấn lên WordPress qua GraphQL Mutation
 */
export async function submitContactMutation(variables: ContactVariables) {
  const query = `
    mutation SubmitForm($name: String!, $phone: String!, $email: String!, $message: String!) {
      submitContactForm(input: {name: $name, phone: $phone, email: $email, message: $message}) {
        success
        message
      }
    }
  `;

  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!wordpressUrl) throw new Error('Chưa cấu hình biến môi trường API');

  // Phương thức POST gửi mutation thay đổi trạng thái, luôn chạy trực tiếp (không cache)
  const res = await fetch(wordpressUrl, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  
  if (json.errors) {
    console.error('Mutation Errors:', json.errors);
    throw new Error('Lỗi thực thi GraphQL Mutation');
  }

  return json.data?.submitContactForm;
}
