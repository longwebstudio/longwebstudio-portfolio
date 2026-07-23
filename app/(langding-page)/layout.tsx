import { ReactNode } from 'react';
import Header from '@/components/Header'; // Thanh điều hướng di động tối ưu
import Footer from '@/components/Footer'; // Chân trang của studio
import { GoogleAnalytics } from '@next/third-parties/google'; // Analytics riêng cho Landing Page
import '../globals.css'; // Nạp trực tiếp tệp CSS toàn cục từ thư mục app/

// 1. Khai báo Metadata SEO độc lập dành riêng cho nhóm Landing Page
export const metadata = {
  metadataBase: new URL('https://www.longwebstudio.io'),
  title: 'Blog Long Web Studio | Kiến Thức Lập Trình & Sách Đầu Tư',
  description: 'Trang chia sẻ kiến thức thiết kế website WordPress chuẩn SEO và giới thiệu tủ sách đầu tư tài chính.',
};

interface LandingPageLayoutProps {
  children: ReactNode;
}

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between">
        
        {/* Thanh điều hướng công cộng */}
        <Header />
        
        {/* Nội dung hiển thị chi tiết của các trang con */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Chân trang công cộng */}
        <Footer />

        {/* Mã theo dõi Google Analytics chỉ kích hoạt khi người dùng duyệt nhóm Landing Page này */}
        <GoogleAnalytics gaId="G-LNXEP5KDWL" />
        
      </body>
    </html>
  );
}