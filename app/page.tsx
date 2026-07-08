import { getAllProjectsForPortfolio } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import HomeHero from '@/components/HomeHero';
import MotionWrapper from '@/components/MotionWrapper';

// Cấu hình SEO Metadata chuyên sâu cho trang chủ tên miền chính chủ
export const metadata = {
  title: 'Long Web Studio - Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi',
  description: 'Chuyên cung cấp giải pháp thiết kế website doanh nghiệp, landing page thực chiến và hệ thống Headless CMS cao cấp bởi Freelancer Long Web Studio.',
};

// Kích hoạt cơ chế tĩnh tự làm mới ngầm (ISR) sau mỗi 1 tiếng (3600 giây)
export const revalidate = 3600; 

export default async function HomePage() {
  // 1. Tải toàn bộ danh sách sản phẩm từ WordPress GraphQL tại Server
  const allProjects = await getAllProjectsForPortfolio();
  
  // 2. Cắt lấy tối đa 3 dự án tiêu biểu mới nhất để làm nổi bật ra trang chủ
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* ==========================================
          1. KHỐI ANH HÙNG (HERO SECTION VỚI CLIENT EFFECT)
         ========================================== */}
      <HomeHero />

      {/* ==========================================
          2. KHỐI THÔNG SỐ ẤN TƯỢNG (STATS SECTION)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center">
          {[
            { value: '50+', label: 'Dự án hoàn thành' },
            { value: '99%', label: 'Khách hàng hài lòng' },
            { value: '< 1.5s', label: 'Tốc độ tải trang' },
            { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl font-extrabold text-blue-600 md:text-4xl tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          3. KHỐI DỰ ÁN TIÊU BIỂU (FEATURED PORTFOLIO)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề khối */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dự Án <span className="text-blue-600">Tiêu Biểu</span>
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-xl">
              Các sản phẩm website thực chiến giúp đối tác bứt phá doanh số số trên nền tảng internet.
            </p>
          </div>
          <Link 
            href="/portfolio" 
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group"
          >
            Xem tất cả dự án
            <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Lưới hiển thị 3 dự án mockup lấy từ GraphQL */}
        {featuredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl">
            Chưa có dự án nào được đăng tải. Hệ thống dữ liệu mẫu đang nạp...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => {
              const thumbnail = project.featuredImage?.node?.sourceUrl || '/placeholder.jpg';
              return (
                <MotionWrapper key={project.slug}>
                  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md h-full group">
                    {/* Khu vực ảnh thumbnail dự án */}
                    <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                      <Image
                        src={thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-w-7xl) 33vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-102"
                      />
                    </div>
                    {/* Khối thông tin văn bản */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {project.projectDetails.clientName || 'Đối tác chiến lược'}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                        {project.title}
                      </h3>
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <Link 
                          href={`/portfolio/${project.slug}`} 
                          className="text-sm font-semibold text-gray-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                        >
                          Xem Case Study
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </MotionWrapper>
              );
            })}
          </div>
        )}
      </section>

      {/* ==========================================
          4. KHỐI KÊU GỌI HÀNH ĐỘNG CHUYỂN ĐỔI (CTA)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-950 px-6 py-16 text-center shadow-xl rounded-3xl sm:px-16 border border-gray-900">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sẵn sàng bùng nổ doanh số số cùng website mới?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400">
            Liên hệ ngay với Long Web Studio để nhận phác thảo ý tưởng và giải pháp công nghệ tối ưu hoàn toàn miễn phí.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98] transition-all"
            >
              Bắt đầu dự án ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
