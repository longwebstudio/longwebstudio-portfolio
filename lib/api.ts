// =========================================================================
// 1. ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU ĐỒNG BỘ THEO SCHEMA WORDPRESS GRAPHQL (TYPES)
// =========================================================================

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
  content?: string; // Dùng riêng cho trang chi tiết dự án
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
  lwsSeo?: LwsSeoData; // Trường Technical SEO tùy biến
}

export interface PlanNode {
  title: string;
  excerpt: string; // Dùng trích dẫn bài viết làm mô tả gói dịch vụ
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
  modified: string; // Ngày cập nhật cuối cùng từ WordPress để Google Bot cào sitemap
}


// =========================================================================
// 2. HÀM CORE FETCH GRAPHQL LÕI (BẢO MẬT PRIVATE TOKEN & ĐỊNH DANH CACHE TAG)
// =========================================================================

async function fetchGraphQL(query: string, variables = {}) {
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Khóa xác thực Backend độc quyền
  
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
      // BẮT BUỘC: Nhúng khóa bảo mật private token vào header để bypass bộ lọc WordPress
      'lws-secret-token': privateToken, 
    },
    // KỸ THUẬT CACHE TĨNH: Lưu file static 7 ngày, cho phép xóa cache lập tức bằng thẻ tag định danh
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
    console.error('GraphQL Query Errors:', json.errors);
    throw new Error('Hệ thống máy chủ WordPress từ chối lệnh thực thi GraphQL API');
  }

  return json.data;
}


// =========================================================================
// 3. CÁC HÀM TRUY VẤN DỮ LIỆU TĨNH & ĐỘNG (QUERIES)
// =========================================================================

/**
 * Lấy danh sách toàn bộ dự án kèm danh mục và SEO Metadata ra trang Portfolio
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
 * Lấy nội dung chi tiết bài viết và SEO Metadata của dự án dựa theo đường dẫn Slug
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
 * Lấy toàn bộ danh sách gói dịch vụ bảng giá (Plans) động từ WordPress
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
 * Lấy danh sách toàn bộ Slug dự án (Phục vụ xây dựng SSG cho generateStaticParams)
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
 * Lấy danh sách dự án kèm ngày chỉnh sửa (Phục vụ xây dựng sitemap.ts động tự cập nhật)
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


// =========================================================================
// 4. HÀM GỬI LIÊN HỆ TƯ VẤN (MUTATIONS BẢO MẬT PRIVATE TOKEN)
// =========================================================================

interface ContactVariables {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Đẩy dữ liệu form liên hệ của khách hàng sang WordPress xử lý Resend Mail qua cổng GraphQL Mutation
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
  const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Khóa bảo mật biểu mẫu chống spam bẩn
  
  if (!wordpressUrl) throw new Error('Chưa cấu hình biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL');
  if (!privateToken) throw new Error('Chưa cấu hình biến môi trường LWS_GRAPHQL_PRIVATE_TOKEN');

  // Phương thức POST gửi lệnh mutation thay đổi cơ sở dữ liệu, luôn bỏ qua cache chạy trực tiếp
  const res = await fetch(wordpressUrl, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      // BẮT BUỘC: Đóng dấu mã khóa xác thực ẩn vào Header khi gửi form
      'lws-secret-token': privateToken, 
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  
  if (json.errors) {
    console.error('GraphQL Mutation Errors:', json.errors);
    throw new Error('Lỗi thực thi dữ liệu GraphQL Mutation phễu liên hệ');
  }

  return json.data?.submitContactForm;
}
