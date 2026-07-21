import { getAllProjectsForPortfolio } from '@/lib/api';
import ProjectGrid from '@/components/ProjectGrid';

// Cấu hình SEO Metadata tĩnh cho trang danh mục sản phẩm của Studio
export const metadata = {
  title: 'Portfolio Dự Án Thực Chiến - Long Web Studio',
  description: 'Tổng hợp các sản phẩm website doanh nghiệp, landing page chuẩn SEO, tối ưu tỷ lệ chuyển đổi do Freelancer Long Web Studio thực hiện.',
};

// Kích hoạt cơ chế tĩnh tự làm mới ngầm (ISR) sau mỗi 1 tiếng (3600 giây)
export const revalidate = 3600; 

export default async function PortfolioPage() {
  // 1. Tải toàn bộ danh sách sản phẩm từ WordPress GraphQL tại Server (Tối ưu SEO Technical)
  const projects = await getAllProjectsForPortfolio();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
        /* 2. Gọi component lưới chuyển động và truyền mảng data sạch thu thập được từ Server xuống */
        <ProjectGrid projects={projects} />
      )}
    </section>
  );
}
