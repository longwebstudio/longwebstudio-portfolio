import { getAllPlansFromGraphQL } from '@/lib/api';
import PricingContent from '@/components/PricingContent';

// Cấu hình SEO Metadata tĩnh tối ưu hóa từ khóa bảng giá thiết kế web của Studio
export const metadata = {
  title: 'Bảng Giá Dịch Vụ Thiết Kế Website - Long Web Studio',
  description: 'Báo giá chi tiết các gói thiết kế Landing Page, Website Doanh Nghiệp và E-commerce cao cấp áp dụng công nghệ Headless CMS tối ưu bởi Long Web Studio.',
};

// Kích hoạt cơ chế tĩnh tự làm mới ngầm (ISR) sau mỗi 1 tiếng (3600 giây)
export const revalidate = 3600; 

export default async function PricingPage() {
  // 1. Tải toàn bộ danh sách gói dịch vụ động từ WordPress GraphQL tại Server
  const plans = await getAllPlansFromGraphQL();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Khối tiêu đề trang bảng giá */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight sm:text-5xl">
          Gói Dịch Vụ & <span className="text-blue-600">Bảng Giá</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
          Minh bạch chi phí, tối ưu tính năng. Lựa chọn giải pháp công nghệ phù hợp nhất để bứt phá doanh số số cho thương hiệu của bạn.
        </p>
      </div>

      {/* Kiểm tra nếu trống dữ liệu từ hệ thống CMS Backend */}
      {plans.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl max-w-xl mx-auto">
          Chưa có dữ liệu bảng giá nào được tìm thấy. Hệ thống dữ liệu mẫu đang khởi tạo ngầm từ Plugin WordPress...
        </div>
      ) : (
        /* 2. Gọi Component tương tác và truyền dữ liệu bảng giá từ Server xuống */
        <PricingContent plans={plans} />
      )}

      {/* Khối cam kết dịch vụ gia tăng giá trị (Ưu thế cạnh tranh của Long Web Studio) */}
      <div className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-3 border-t border-gray-100 pt-16 text-center">
        {[
          { title: 'Bảo hành hệ thống 12 tháng', desc: 'Cam kết hỗ trợ kỹ thuật liên tục, vá các lỗi bảo mật phát sinh và duy trì vận hành ổn định hoàn toàn miễn phí.' },
          { title: 'Bàn giao 100% Mã Nguồn', desc: 'Bạn toàn quyền sở hữu source code Next.js sạch và hệ thống quản trị, không bị ràng buộc hay phụ thuộc vào studio.' },
          { title: 'Tối ưu SEO Technical', desc: 'Cấu hình sẵn tệp Sitemap tự động, cấu trúc thẻ Meta dữ liệu có cấu trúc Schema Rich Snippets chuẩn Google.' },
        ].map((item, index) => (
          <div key={index} className="px-4 space-y-2">
            <h3 className="text-lg font-bold text-gray-950">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
