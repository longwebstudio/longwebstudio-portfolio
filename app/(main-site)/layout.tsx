import { Inter } from 'next/font/google';
import Script from 'next/script'; // Import component Script chuyên dụng của Next.js
import '@/app/globals.css';
import Header from '@/components/Header'; // Thanh điều hướng di động tối ưu
import Footer from '@/components/MainFooter'; 

const inter = Inter({ 
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

// Cấu hình Metadata gốc đầy đủ cho ứng dụng
export const metadata = {
  metadataBase: new URL('https://www.longwebstudio.io.vn'),
  title: {
    default: 'Long Web Studio - Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi',
    template: '%s | Long Web Studio',
  },
  description: 'Chuyên cung cấp dịch vụ thiết kế website doanh nghiệp, landing page thực chiến và hệ thống Headless CMS cao cấp bởi Freelancer Long Web Studio.',
  
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

  // 4. OPENGRAPH MẶC ĐỊNH CHO MẠNG XÃ HỘI (ZALO, FACEBOOK, TWITTER)
  openGraph: {
    title: 'Long Web Studio - Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi',
    description: 'Chuyên cung cấp dịch vụ thiết kế website doanh nghiệp, landing page thực chiến và hệ thống Headless CMS cao cấp.',
    url: 'https://www.longwebstudio.io.vn',
    siteName: 'Long Web Studio',
    images: [
      {
        url: 'https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Long Web Studio Banner',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Long Web Studio - Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi',
    description: 'Chuyên cung cấp dịch vụ thiết kế website doanh nghiệp và hệ thống Headless CMS cao cấp.',
    images: ['https://i0.wp.com/longwebstudio.io.vn/wordpress/wp-content/uploads/2026/07/logo-og.jpg'],
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
            NHÚNG MÃ GOOGLE ANALYTICS (GTAG.JS) TỐI ƯU HIỆU NĂNG TẢI TRANG
           ========================================================================= */}
        {/* Thẻ 1: Tải thư viện script từ máy chủ Google dạng chạy ngầm (afterInteractive) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KX2H4QTFST"
          strategy="afterInteractive"
        />
        {/* Thẻ 2: Khởi tạo cấu hình đo lường dữ liệu truy cập */}
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

        {/* Thanh điều hướng Header */}
        <Header />
        
        {/* Nội dung hiển thị chi tiết của các trang con */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Chân trang Footer */}
        <Footer />

      </body>
    </html>
  );
}