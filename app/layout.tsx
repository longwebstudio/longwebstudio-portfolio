import { Inter } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script'; // BẮT BUỘC: Import component Script chuyên dụng của Next.js
import '@/app/globals.css';

const inter = Inter({ 
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

// Cập nhật khối này trong file src/app/layout.tsx của bạn
export const metadata = {
  title: 'Long Web Studio - Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi',
  description: 'Chuyên cung cấp dịch vụ thiết kế website doanh nghiệp, landing page thực chiến và hệ thống Headless CMS cao cấp bởi Freelancer Long Web Studio.',
  metadataBase: new URL('https://longwebstudio.io.vn'),
  
  // 1. TỰ ĐỘNG BIÊN DỊCH CÁC THẺ LINK FAVICON & APPLE-TOUCH-ICON
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // 2. ĐƯỜNG DẪN ĐẾN FILE CẤU HÌNH ỨNG DỤNG WEB (MANIFEST)
  manifest: '/site.webmanifest',

  // 3. TIÊU ĐỀ ĐỊNH DANH CHO THIẾT BỊ APPLE (APPLE-MOBILE-WEB-APP-TITLE)
  appleWebApp: {
    title: 'LongWebStudio',
    statusBarStyle: 'default',
    capable: true,
  },
};


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased min-h-screen flex flex-col`}>
        
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

        {/* 1. THANH ĐIỀU HƯỚNG CỐ ĐỊNH (NAVBAR) */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-black tracking-tight text-gray-950 transition-transform hover:scale-[1.02]">
              LONG<span className="text-blue-600">WEB</span>STUDIO
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <Link href="/portfolio" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Dự án
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Bảng giá
              </Link>
              <a 
                href="https://longwebstudio.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
              >
                Blog
                <svg className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </nav>

            <div>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500 active:scale-[0.98] transition-all">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </header>

        {/* 2. KHU VỰC HIỂN THỊ NỘI DUNG ĐỘNG CỦA CÁC TRANG */}
        <main className="flex-1">
          {children}
        </main>

        {/* 3. THANH CHÂN TRANG (FOOTER) */}
        <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Long Web Studio. Tất cả quyền được bảo lưu.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Powered by Next.js & Headless WordPress Technology.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 order-1 md:order-2">
              <span className="text-sm font-bold text-gray-400 tracking-wide border-r border-gray-200 pr-6 hidden sm:inline">
                www.longwebstudio.io.vn
              </span>
              <Link href="/portfolio" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                Portfolio
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                Bảng giá dịch vụ
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                Tư vấn miễn phí
              </Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
