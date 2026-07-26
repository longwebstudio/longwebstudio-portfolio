// app/(bhxh)/lo-trinh-luong-huu/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import LandingPageClient from './LandingPageClient';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

// 1. GENERATE METADATA ĐỘNG ĐỂ TỐI ƯU SEO THEO TỪNG LINK KHÁCH HÀNG GỬI ĐI
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const khachHang = searchParams['hoten'] ? ` cho ${searchParams['hoten']}` : '';
  const tieuDeSEO = `Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất${khachHang}`;
  
  // Xử lý tạo URL Canonical sạch sẽ
  const baseUrl = 'https://www.longwebstudio.io.vn/lo-trinh-luong-huu';
  const urlParams = new URLSearchParams();
  if (searchParams['hoten']) urlParams.set('hoten', searchParams['hoten']);
  if (searchParams['thangsinh']) urlParams.set('thangsinh', searchParams['thangsinh']);
  if (searchParams['namsinh']) urlParams.set('namsinh', searchParams['namsinh']);
  if (searchParams['gioitinh']) urlParams.set('gioitinh', searchParams['gioitinh']);
  if (searchParams['namdadong']) urlParams.set('namdadong', searchParams['namdadong']);
  
  const canonicalUrl = urlParams.toString() ? `${baseUrl}?${urlParams.toString()}` : baseUrl;

  return {
    metadataBase: new URL('https://www.longwebstudio.io.vn'), 
    title: tieuDeSEO,
    description: `Công cụ tính tuổi nghỉ hưu tịnh tiến theo tháng sinh chính xác. Thiết lập kế hoạch phương thức đóng tiếp BHXH tự nguyện tối ưu phối hợp nhân viên thu hỗ trợ người dân hưu trí an nhàn.`,
    keywords: [
      'tinh tuoi nghi huu',
      'tinh tuoi nghi huu theo thang sinh',
      'lo trinh dong tiep bhxh tu nguyen',
      'bang tinh bhxh tu nguyen chi tiet',
      'long web studio'
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: tieuDeSEO,
      description: `Hệ thống tự động tra cứu dữ liệu tháng tuổi nghỉ hưu luật định và kết xuất dòng tiền đóng bảo hiểm tự nguyện tối ưu.`,
      url: canonicalUrl,
      siteName: 'Hệ thống Phân tích An sinh Xã hội | Long Web Studio',
      locale: 'vi_VN',
      type: 'website',
    },
  };
}

export default function Page() {
  // 2. NHÚNG CẤU TRÚC SCHEMA MARKUP (JSON-LD) CHUẨN ĐỊNH DẠNG WEB APPLICATION
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Công cụ tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện',
    'description': 'Hệ thống phần mềm hỗ trợ nhân viên thu và chuyên viên phân tích nhập liệu tính tuổi nghỉ hưu theo tháng sinh, cấu hình kế hoạch đóng bảo hiểm tự nguyện.',
    'url': 'https://www.longwebstudio.io.vn/lo-trinh-luong-huu',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires HTML5',
    'author': {
      '@type': 'Organization',
      'name': 'Freelancer Long Web Studio',
      'url': 'https://www.longwebstudio.io.vn'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Bao bọc Client Component bằng Suspense để Next.js tối ưu Hydration khi render tĩnh (Static Generation) */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Loading hưu trí engine...
        </div>
      }>
        <LandingPageClient />
      </Suspense>
    </>
  );
}
