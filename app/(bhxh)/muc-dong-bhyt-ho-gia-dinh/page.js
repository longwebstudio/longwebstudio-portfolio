import React, { Suspense } from 'react';
import BHYTCalculator from './BHYTCalculator';


// 1. Tối ưu Metadata cho SEO Google
export const metadata = {
  metadataBase: new URL('https://www.longwebstudio.io.vn'),
  title: 'Mức Đóng BHYT Tháng 7/2026 - Tra Cứu BHYT Hộ Gia Đình Mới Nhất',
  description:
    'Công cụ tra cứu chính xác mức đóng BHYT tháng 7/2026 theo hộ gia đình dựa trên mức lương cơ sở mới. Tự động tính tỷ lệ giảm trừ cho từng thành viên nhanh chóng.',
  keywords: [
    'mức đóng bhyt tháng 7/2026',
    'mức đóng bảo hiểm y tế hộ gia đình năm 2026',
    'tra cứu mức đóng bhyt',
    'bhyt hộ gia đình 2026',
    'tính tiền bhyt hộ gia đình',
    'mức giảm trừ bhyt hộ gia đình',
    'long web studio',
  ],
  authors: [{ name: 'LO VAN LONG' }],
  openGraph: {
    title: 'Mức Đóng BHYT Tháng 7/2026 - Tra Cứu BHYT Hộ Gia Đình Mới Nhất',
    description:
      'Công cụ tra cứu chính xác mức đóng BHYT tháng 7/2026 theo hộ gia đình. Tự động tính tỷ lệ giảm trừ theo quy định BHYT.',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MucDongBhytHoGiaDinhPage() {
  // 2. Cấu trúc Schema.org (JSON-LD) cho Google Bot
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Công cụ tính mức đóng BHYT Hộ gia đình 2026',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description:
      'Công cụ tự động tính toán mức đóng Bảo hiểm Y tế hộ gia đình từ tháng 7/2026 chính xác theo quy định pháp luật BHYT.',
  };
  return (
    <>
    {/* Nhúng Schema JSON-LD cho Google Bot */}
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Đang tải dữ liệu tính toán...</div>}>
        <BHYTCalculator />
      </Suspense>
    </div>
    </>
    
  );
}
