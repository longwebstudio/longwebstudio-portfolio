import { getAllProjectsForPortfolio } from '@/lib/api';
import ProjectGrid from '@/components/ProjectGrid';

// 1. CẤU HÌNH SEO METADATA ĐẦY ĐỦ VỚI CANONICAL & OPENGRAPH
export const metadata = {
  title: 'Portfolio Dự Án Thực Chiến | Long Web Studio',
  description: 'Tổng hợp các sản phẩm website doanh nghiệp, landing page chuẩn SEO, tối ưu tỷ lệ chuyển đổi do Freelancer Long Web Studio thực hiện.',
  alternates: {
    canonical: 'https://www.longwebstudio.io.vn/portfolio',
  },
  openGraph: {
    title: 'Portfolio Dự Án Thực Chiến | Long Web Studio',
    description: 'Tổng hợp các sản phẩm website doanh nghiệp, landing page chuẩn SEO, tối ưu tỷ lệ chuyển đổi do Freelancer Long Web Studio thực hiện.',
    url: 'https://www.longwebstudio.io.vn/portfolio',
    siteName: 'Long Web Studio',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Dự Án Thực Chiến | Long Web Studio',
    description: 'Tổng hợp các sản phẩm website doanh nghiệp, landing page chuẩn SEO, tối ưu tỷ lệ chuyển đổi.',
  },
};

// Kích hoạt cơ chế tự làm mới ngầm (ISR) sau mỗi 1 tiếng (3600 giây)
export const revalidate = 3600; 

export default async function PortfolioPage() {
  // Tải danh sách dự án từ WordPress GraphQL tại Server
  const projects = await getAllProjectsForPortfolio();

  // 2. CẤU TRÚC DỮ LIỆU SCHEMA JSON-LD (COLLECTIONPAGE & ITEMLIST) CHO GOOGLE BOT
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Portfolio Dự Án Thực Chiến | Long Web Studio',
    'description': 'Tổng hợp các sản phẩm website doanh nghiệp, landing page chuẩn SEO, tối ưu tỷ lệ chuyển đổi.',
    'url': 'https://www.longwebstudio.io.vn/portfolio',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': projects.map((project, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `https://www.longwebstudio.io.vn/portfolio/${project.slug}`,
        'name': project.title,
      })),
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Nhúng đoạn mã Schema JSON-LD vào đầu trang */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Khối tiêu đề trang chính */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight sm:text-5xl">
          Sản Phẩm <span className="text-blue-600">Thực Chiến</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
          Tổng hợp các dự án thiết kế website tối ưu hóa chuyển đổi và trải nghiệm người dùng cao cấp do Long Web Studio phát triển.
        </p>
      </div>

      {/* Kiểm tra nếu trống dữ liệu từ hệ thống API Backend */}
      {projects.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl max-w-xl mx-auto">
          Chưa có dữ liệu dự án nào được tìm thấy. Hệ thống dữ liệu mẫu đang khởi tạo ngầm từ Plugin WordPress...
        </div>
      ) : (
        /* Gọi component lưới chuyển động và truyền data sạch xuống */
        <ProjectGrid projects={projects} />
      )}
    </section>
  );
}