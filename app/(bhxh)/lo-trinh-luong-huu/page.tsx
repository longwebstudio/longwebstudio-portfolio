import { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

// 1. TỐI ƯU METADATA CHUẨN SEO CHO SLUG ĐƯỜNG DẪN SÂU
export const metadata: Metadata = {
  title: 'Tra Cứu Lộ Trình Nhận Lương Hưu BHXH Tự Nguyện Nhanh Nhất',
  description: 'Công cụ tính toán lộ trình đóng tiếp BHXH tự nguyện hưởng lương hưu chỉ từ 15 năm theo Luật mới. Hướng dẫn đóng 1 lần cho những năm còn thiếu.',
  keywords: [
    'lo trinh nhan luong huu',
    'tinh bhxh tu nguyen',
    'dong tiep bhxh tu nguyen',
    'bhxh tu nguyen luong huu',
    'luat bhxh moi nhat'
  ],
  openGraph: {
    title: 'Tra Cứu Lộ Trình Nhận Lương Hưu BHXH Tự Nguyện Nhanh Nhất',
    description: 'Lên kế hoạch tích lũy đóng tiếp BHXH tự nguyện để nhận lương hưu sớm và thẻ BHYT miễn phí.',
    url: 'https://ten-mien-cua-ban.com',
    siteName: 'Hệ thống Tư vấn An sinh Xã hội',
    images: [
      {
        url: 'https://ten-mien-cua-ban.com', // Thay bằng ảnh đại diện của bạn
        width: 1200,
        height: 630,
        alt: 'Công cụ tính lộ trình nhận lương hưu BHXH tự nguyện',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    // Luôn khai báo URL chuẩn để Google không phạt nếu có tracking params bám đuôi URL
    canonical: 'https://ten-mien-cua-ban.com', 
  },
};

export default function Page() {
  // 2. SCHEMA STRUCTURED DATA (JSON-LD) GIÚP GOOGLE HIỂU ĐÚNG TÍNH NĂNG
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Công cụ tính lộ trình nhận lương hưu BHXH tự nguyện',
    'description': 'Hệ thống tự động thiết lập kế hoạch đóng tiếp BHXH tự nguyện định kỳ hoặc đóng gộp 1 lần để nhận lương hưu sớm nhất.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires HTML5',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient />
    </>
  );
}
