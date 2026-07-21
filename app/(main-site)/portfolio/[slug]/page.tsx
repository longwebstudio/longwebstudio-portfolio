import { getAllProjectSlugs, getProjectBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

// =========================================================================
// 1. KỸ THUẬT SEO NÂNG CAO: TỰ ĐỘNG KHAI BÁO DYNAMIC METADATA CHO TỪNG DỰ ÁN
// =========================================================================
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  const seo = project.lwsSeo;
  const fallbackTitle = `${project.title} - Case Study | Long Web Studio`;
  const fallbackDesc = `Chi tiết quy trình thiết kế và giải pháp tối ưu chuyển đổi website cho khách hàng ${project.projectDetails.clientName || 'đối tác'} bởi Long Web Studio.`;

  return {
    // Ưu tiên tiêu đề tối ưu SEO nhập từ WordPress, nếu để trống sẽ tự lấy tiêu đề dự án mẫu
    title: seo?.metaTitle && seo.metaTitle.trim() !== "" ? seo.metaTitle : fallbackTitle,
    description: seo?.metaDescription && seo.metaDescription.trim() !== "" ? seo.metaDescription : fallbackDesc,
    
    // Cấu hình thẻ chuẩn hóa đường dẫn để tránh lỗi trùng lặp nội dung
    alternates: {
      canonical: seo?.canonical && seo.canonical.trim() !== "" 
        ? seo.canonical 
        : `https://www.longwebstudio.io.vn{project.slug}`,
    },
    
    // Cấu hình luật điều hướng cho Google Bot (noindex / nofollow) dựa theo ô tích chọn trong CMS
    robots: {
      index: !seo?.noindex,
      follow: !seo?.nofollow,
    },
    
    // Gắn từ khóa chính vào hệ thống thẻ meta keywords
    keywords: seo?.focusKeyword ? [seo.focusKeyword] : [],
  };
}

// =========================================================================
// 2. KỸ THUẬT SSG: QUÉT TOÀN BỘ SLUG ĐỂ BUILD SẴN FILE HTML TĨNH KHI DEPLOY
// =========================================================================
export async function generateStaticParams() {
  const projects = await getAllProjectSlugs();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Giữ bộ nhớ đệm tĩnh, tự làm mới sau 1 tiếng (ISR) hoặc đợi Webhook WordPress xóa cache tức thì
export const revalidate = 3600; 

// =========================================================================
// 3. GIAO DIỆN HIỂN THỊ CHI TIẾT (SERVER COMPONENT RENDER)
// =========================================================================
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Điều hướng về trang 404 chuẩn của Next.js nếu slug nhập vào không tồn tại trong Database
  if (!project) {
    notFound();
  }

  const thumbnail = project.featuredImage?.node?.sourceUrl || '/placeholder.jpg';
  const { clientName, projectUrl, techStack } = project.projectDetails;

  return (
    <>
      {/* NHÚNG MÃ CẤU TRÚC DỮ LIỆU JSON-LD SCHEMA ĐƯỢC TỰ CODE TỪ WORDPRESS CMS */}
      {project.lwsSeo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: project.lwsSeo.schema }}
        />
      )}

      <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Nút quay lại trang danh sách Portfolio */}
        <div className="mb-8">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Quay lại danh sách dự án
          </Link>
        </div>

        {/* Khối tiêu đề và bảng thuộc tính Case Study */}
        <header className="mb-12">
          <h1 className="text-3xl font-black text-gray-950 sm:text-4xl tracking-tight mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Khách hàng</h4>
              <p className="mt-1.5 text-sm font-semibold text-gray-900">{clientName || 'Đối tác chiến lược'}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Công nghệ áp dụng</h4>
              <p className="mt-1.5 text-sm font-semibold text-gray-900">{techStack || 'Đang cập nhật'}</p>
            </div>
            {projectUrl && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Trạng thái vận hành</h4>
                <a 
                  href={projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-1.5 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group/link"
                >
                  Xem trực tuyến
                  <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Khối hình ảnh Mockup dự án kích thước chuẩn */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 mb-12">
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            priority // Tối ưu hóa LCP, ép trình duyệt tải trước ảnh này
            className="object-cover object-top"
            sizes="(max-w-4xl) 100vw"
          />
        </div>

        {/* Khu vực kết xuất mã HTML thô từ WordPress Content API */}
        {project.content && (
          <div className="prose prose-blue max-w-none">
            <h2 className="text-2xl font-bold text-gray-950 mb-4">Câu chuyện dự án & Giải pháp thực hiện</h2>
            {/* Thuộc tính đổ dữ liệu HTML an toàn đã được định dạng lớp nền qua file globals.css */}
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        )}
        
      </section>
    </>
  );
}
