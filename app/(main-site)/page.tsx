import { getAllProjectsForPortfolio } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import HomeHero from '@/components/HomeHero';
import MotionWrapper from '@/components/MotionWrapper';
import InsuranceSolution from '@/components/InsuranceSolution'; // Import module vừa tách

export const metadata = {
  title: 'Long Web Studio - Thiết kế website bảo hiểm & số hóa dịch vụ thu',
  description: 'Giải pháp xây dựng văn phòng số chuyên nghiệp cho nhân viên thu BHXH, BHYT. Tự động hóa bảng tính lương hưu, nhắc hạn tái tục và nâng tầm uy tín cá nhân.',
};


export const revalidate = 3600; 

export default async function HomePage() {
  const allProjects = await getAllProjectsForPortfolio();
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Khối anh hùng (Hero Section) */}
      <HomeHero />

      {/* 2. Khối thông số ấn tượng (Stats Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center">
          {[
            { value: '50+', label: 'Dự án hoàn thành' },
            { value: '99%', label: 'Đại lý hài lòng' },
            { value: '< 0.5s', label: 'Tốc độ tải trang' },
            { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl font-extrabold text-blue-600 md:text-4xl tracking-tight">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Khối giải pháp đại lý thu BHXH & BHYT (Đã nén vào Component con) */}
      <InsuranceSolution />

      {/* 4. Khối dự án tiêu biểu (Featured Portfolio) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dự án <span className="text-blue-600">tiêu biểu</span>
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-xl">
              Các sản phẩm website thực chiến giúp đối tác số hóa dịch vụ tư vấn thành công trên nền tảng internet.
            </p>
          </div>
          <Link href="/portfolio" className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group">
            Xem tất cả dự án
            <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl">
            Chưa có dự án nào được đăng tải. Hệ thống dữ liệu mẫu đang nạp...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {featuredProjects.map((project) => {
    const thumbnail = project.featuredImage?.node?.sourceUrl;
    return (
      <MotionWrapper key={project.slug}>
        <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md h-full group">
          {/* Sửa: Thêm flex items-center justify-center để căn giữa Placeholder */}
          <div className="relative aspect-video w-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={project.title || "Project image"}
                fill
                sizes="(max-w-7xl) 33vw"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
            ) : (
              /* Giao diện hiển thị khi không có hình ảnh */
              <div className="flex flex-col items-center justify-center text-gray-400 gap-2 select-none">
                <svg
                  className="w-10 h-10 transition duration-500 group-hover:scale-110 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="text-xs font-medium text-gray-400">Không có hình ảnh</span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {project.projectDetails?.clientName || 'Đối tác chiến lược'}
            </p>
            <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 flex-1">
              {project.title}
            </h3>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <Link
                href={`/portfolio/${project.slug}`}
                className="text-sm font-semibold text-gray-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
              >
                Xem case study
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

      {/* 5. Khối kêu gọi hành động chuyển đổi (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-950 px-6 py-16 text-center shadow-xl rounded-3xl sm:px-16 border border-gray-900">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Sẵn sàng nâng tầm thương hiệu với văn phòng số?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400">Liên hệ ngay với Long Web Studio để nhận phác thảo giải pháp tự động hóa quy trình tư vấn hoàn toàn miễn phí.</p>
          <div className="mt-10 flex items-center justify-center">
            <Link href="/contact" className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500 transition-all">Bắt đầu dự án ngay</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
