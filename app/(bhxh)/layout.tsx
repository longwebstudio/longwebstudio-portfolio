import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Tối ưu font chữ tiếng Việt
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

// Sửa lỗi: Bỏ type ": Viewport", Next.js sẽ tự nhận diện
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1d4ed8',
};

// Cấu hình Metadata SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://www.longwebstudio.io.vn'),
  title: {
    default: 'Tính Mức Đóng BHYT Hộ Gia Đình Tự Động | Long Web Studio',
    template: '%s | Long Web Studio',
  },
  description:
    'Tiện ích tính nhanh mức đóng BHYT Hộ gia đình tự động, chuẩn nghiệp vụ giảm trừ cùng năm tài chính. Hỗ trợ tạo mã VietQR thu tiền và sao chép mẫu báo giá Zalo cho khách hàng.',
  keywords: [
    'tinh bhyt ho gia dinh',
    'tính mức đóng bhyt hộ gia đình',
    'công cụ tính bhyt',
    'tiện ích tính bhyt long web studio',
    'báo giá bhyt zalo',
    'giảm trừ bhyt hộ gia đình',
    'mức tham chiếu bhyt',
    'long web studio',
  ],
  authors: [{ name: 'Freelancer Long Web Studio', url: 'https://zalo.me/0966570913' }],
  creator: 'Long Web Studio',
  publisher: 'Long Web Studio',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Tính Mức Đóng BHYT Hộ Gia Đình Tự Động | Long Web Studio',
    description:
      'Công cụ tính nhanh số tiền BHYT hộ gia đình sau giảm trừ, tạo mã VietQR và trích xuất báo giá Zalo trong 3 giây.',
    url: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
    siteName: 'Long Web Studio - Tiện Ích BHXH',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`scroll-smooth ${beVietnamPro.variable}`}>
      <head>
        {/* Preconnect tới server ảnh mã VietQR */}
        <link rel="preconnect" href="https://img.vietqr.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.vietqr.io" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KX2H4QTFST"
          strategy="afterInteractive"
        />
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
      </body>
    </html>
  );
}