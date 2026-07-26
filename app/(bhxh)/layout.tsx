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
        {/* Header với độ tương phản sắc nét */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-emerald-700" />
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">BHXH Tự Nguyện</span>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-700">
              <a href="#calculator" className="hover:text-emerald-800 transition">Công cụ tính</a>
              <a href="#table-lookup" className="hover:text-emerald-800 transition">Tra cứu bảng giá</a>
              <a href="#benefits" className="hover:text-emerald-800 transition">Quyền lợi</a>
            </nav>
            <a 
              href="#calculator" 
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Tính toán ngay
            </a>
          </div>
        </header>

        {/* Phần thân của Landing Page */}
        <main>{children}</main>

        {/* Footer đã cập nhật thông tin hỗ trợ và tối ưu màu tương phản */}
        <footer className="bg-slate-900 text-slate-100 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-emerald-450" />
              <span className="text-lg font-bold text-white tracking-tight">BHXH Tự Nguyện</span>
            </div>
            <div className="text-xs text-center md:text-right space-y-2 text-slate-300">
              <p className="font-bold text-white">© 2026 Hệ thống tính toán BHXH trực tuyến.</p>
              <p className="text-slate-400 max-w-xl leading-relaxed md:ml-auto">
                Công cụ được Freelancer Long Web studio duy trì và hỗ trợ nhân viên thu BHXH, BHYT tư vấn khách hàng lựa chọn mức thu nhập và phương thức đóng phù hợp khi tham gia BHXH tự nguyện.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}