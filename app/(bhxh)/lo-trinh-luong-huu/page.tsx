// app/(bhxh)/lo-trinh-luong-huu/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import LandingPageClient from './LandingPageClient';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined };
}

// 1. GENERATE METADATA ĐỘNG ĐỂ TỐI ƯU SEO & HIỂN THỊ ẢNH OG
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Giải mã searchParams (tương thích cả Next.js 14 & 15+)
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  
  const hoten = resolvedSearchParams['hoten'];
  const khachHang = hoten ? ` cho ${hoten}` : '';
  const tieuDeSEO = `Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất${khachHang}`;
  
  // Xử lý URL Canonical & Query string cho OG Image
  const baseUrl = 'https://www.longwebstudio.io.vn/lo-trinh-luong-huu';
  const urlParams = new URLSearchParams();
  if (resolvedSearchParams['hoten']) urlParams.set('hoten', resolvedSearchParams['hoten']);
  if (resolvedSearchParams['thangsinh']) urlParams.set('thangsinh', resolvedSearchParams['thangsinh']);
  if (resolvedSearchParams['namsinh']) urlParams.set('namsinh', resolvedSearchParams['namsinh']);
  if (resolvedSearchParams['gioitinh']) urlParams.set('gioitinh', resolvedSearchParams['gioitinh']);
  if (resolvedSearchParams['namdadong']) urlParams.set('namdadong', resolvedSearchParams['namdadong']);
  
  const queryString = urlParams.toString();
  const canonicalUrl = baseUrl;

  // Xây dựng URL động cho ảnh OpenGraph chứa searchParams (như hoten)
  const ogImageUrl = `/lo-trinh-luong-huu/opengraph-image${queryString ? `?${queryString}` : ''}`;

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
      // THÊM KHỐI IMAGES NÀY ĐỂ NEXT.JS TẠO THẺ METATAG THỰC SỰ
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tieuDeSEO,
        },
      ],
    },
    // THÊM THẺ TWITTER CARD
    twitter: {
      card: 'summary_large_image',
      title: tieuDeSEO,
      description: `Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất`,
      images: [ogImageUrl],
    },
  };
}

export default function Page() {
  // 2. NHÚNG CẤU TRÚC SCHEMA MARKUP (JSON-LD)
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