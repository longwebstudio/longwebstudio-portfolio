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

// async function fetchGraphQL(query: string, variables = {}) {
//   const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
//   const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Khóa xác thực Backend độc quyền
  
//   if (!wordpressUrl) {
//     throw new Error('Chưa cấu hình biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL');
//   }
//   if (!privateToken) {
//     throw new Error('Chưa cấu hình biến môi trường LWS_GRAPHQL_PRIVATE_TOKEN');
//   }

//   const res = await fetch(wordpressUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // BẮT BUỘC: Nhúng khóa bảo mật private token vào header để bypass bộ lọc WordPress
//       'lws-secret-token': privateToken, 
//     },
//     // KỸ THUẬT CACHE TĨNH: Lưu file static 7 ngày, cho phép xóa cache lập tức bằng thẻ tag định danh
//     next: { 
//       revalidate: 604800, 
//       tags: ['wordpress-data'] 
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const json = await res.json();
  
//   if (json.errors) {
//     console.error('GraphQL Query Errors:', json.errors);
//     return null;
//     // throw new Error('Hệ thống máy chủ WordPress từ chối lệnh thực thi GraphQL API');
//   }

//   return json.data;
// }

async function fetchGraphQL(query: string, variables = {}) {
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN;

  if (!wordpressUrl) {
    console.error('[Cấu hình] Thiếu biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL');
    throw new Error('Chưa cấu hình biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL');
  }
  if (!privateToken) {
    console.error('[Cấu hình] Thiếu biến môi trường LWS_GRAPHQL_PRIVATE_TOKEN');
    throw new Error('Chưa cấu hình biến môi trường LWS_GRAPHQL_PRIVATE_TOKEN');
  }

  try {
    const res = await fetch(wordpressUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'lws-secret-token': privateToken,
      },
      next: {
        revalidate: 604800, // 7 ngày
        tags: ['wordpress-data'],
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // 1. XỬ LÝ LỖI TRẠNG THÁI HTTP (Ví dụ: 500, 502, 403, 404)
    if (!res.ok) {
      // Đọc nội dung phản hồi dưới dạng text để hỗ trợ debug
      const errorText = await res.text().catch(() => 'Không thể đọc phản hồi');
      console.error(`[HTTP Error] Status: ${res.status} ${res.statusText}. Response:`, errorText);
      
      // Bạn có thể trả về null để trang web hiển thị dữ liệu trống (mềm dẻo hơn)
      // Hoặc ném lỗi nếu muốn Next.js kích hoạt Error Boundary (tùy nhu cầu dự án)
      return null;
    }

    // 2. XỬ LÝ LỖI PHÂN TÍCH JSON (Đề phòng trường hợp phản hồi không phải JSON)
    let json;
    try {
      json = await res.json();
    } catch (parseError) {
      console.error('[JSON Parse Error] Không thể chuyển đổi phản hồi sang JSON:', parseError);
      return null;
    }

    // 3. XỬ LÝ LỖI TRUY VẤN GRAPHQL (WPGraphQL trả về mã lỗi bên trong trường errors)
    if (json.errors) {
      console.error('[GraphQL Error] Lỗi thực thi truy vấn:', JSON.stringify(json.errors, null, 2));
      return null;
    }

    return json.data;

  } catch (networkError) {
    // 4. XỬ LÝ LỖI KẾT NỐI MẠNG (Server sập, timeout, không có mạng)
    console.error('[Network Error] Không thể kết nối tới server WordPress:', networkError);
    return null;
  }
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
    plans(first: 3, where: {orderby: {field: MODIFIED, order: DESC}}) {
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
  return data?.plans?.nodes || [];
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
 * Gửi dữ liệu form liên hệ thông qua Next.js API Route trung gian để bảo mật Token
 */
export async function submitContactMutation(variables: ContactVariables) {
  // Gọi trực tiếp vào Route Handler nội bộ của Next.js
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variables),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Lỗi kết nối API Route');
  }

  return await res.json(); // Trả về object chứa { success: boolean, message: string }
}

// =========================================================================
// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU WOOCOMMERCE VARIATION (TYPES)
// =========================================================================

export interface LwsProductVariation {
  databaseId: number; // ID thực tế để chạy link mua nhanh (1118, 1119, 1120)
  name: string;       // Tên biến thể (1 Tháng, 1 Năm, 3 Năm)
  price: string;      // Giá tiền đã xử lý định dạng (đ)
  description: string | null; // Mô tả ngắn riêng cho từng gói
}

export interface LwsWooCommerceProduct {
  databaseId: number;
  name: string;
  description: string;
  variations: {
    nodes: LwsProductVariation[];
  };
}

// =========================================================================
// 2. HÀM CORE FETCH SẢN PHẨM & BIẾN THỂ TỪ WOOCOMMERCE GRAPHQL
// =========================================================================

/**
 * Lấy chi tiết sản phẩm Ứng dụng LWS kèm toàn bộ các gói biến thể của nó
 * @param productDbId ID của sản phẩm gốc (Sản phẩm có biến thể)
 */
export async function getLwsProductFromWooGraphQL(productDbId: number): Promise<LwsWooCommerceProduct | null> {
  const query = `
    query GetLwsWooProduct($id: ID!) {
      product(id: $id, idType: DATABASE_ID) {
        ... on VariableProduct {
          databaseId
          name
          description
          variations(first: 10) {
            nodes {
              databaseId
              name
              price
              description
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { id: productDbId.toString() });
  return data?.product || null;
}
