'use client'; // Đảm bảo các tương tác icon và cuộn mượt hoạt động chính xác

import React from 'react';
import '@/app/globals.css';
import { ShieldCheck } from 'lucide-react';
import Script from 'next/script';

export default function LandingPageRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {/* =========================================================================
            BỔ SUNG: NHÚNG MÃ GOOGLE ANALYTICS (GTAG.JS) TỐI ƯU HIỆU NĂNG TẢI TRANG (ISR)
           ========================================================================= */}
        {/* Thẻ 1: Tải thư viện script từ máy chủ Google dưới dạng chạy ngầm (afterInteractive) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KX2H4QTFST"
          strategy="afterInteractive"
        />
        {/* Thẻ 2: Khởi tạo cấu hình đo lường dữ liệu truy cập cho tên miền */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KX2H4QTFST', {
              page_path: window.location.pathname,
            });
          `}
        </Script>


        {/* Phần thân của Landing Page */}
        <main>{children}</main>

        
      </body>
    </html>
  );
}