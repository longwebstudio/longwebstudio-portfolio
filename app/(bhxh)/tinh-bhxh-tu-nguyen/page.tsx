import { Metadata } from 'next';
import CalculatorLandingPage from './CalculatorLandingPage';

// Tự động nhận diện URL môi trường để giải quyết cảnh báo metadataBase:
// - Khi chạy thực tế trên Vercel: sử dụng VERCEL_URL hệ thống cấp sẵn.
// - Khi chạy thử ở máy cá nhân (Local dev): sử dụng localhost:3000.
// (Bạn có thể thay thế 'http://localhost:3000' bằng tên miền chính thức của bạn khi đưa lên chạy thực tế)
// const siteUrl = process.env.VERCEL_URL 
//   ? `https://${process.env.VERCEL_URL}` 
//   : 'http://localhost:3000';

export const metadata: Metadata = {
  // metadataBase là bắt buộc để Next.js tạo liên kết tuyệt đối cho ảnh chia sẻ opengraph-image
  metadataBase: new URL('https://www.longwebstudio.io.vn'), 
  title: 'Công cụ tính mức đóng BHXH tự nguyện mới từ T7/2026',
  description: 'Tính toán nhanh số tiền đóng Bảo hiểm xã hội tự nguyện trực tuyến theo các chu kỳ hàng tháng, 3 tháng, 6 tháng, 12 tháng, 2 năm, 3 năm, 4 năm, 5 năm. Hỗ trợ tự động giảm trừ ngân sách nhà nước & địa phương.',
  keywords: [
    'bhxh tu nguyen',
    'tinh muc dong bhxh',
    'bao hiem xa hoi tu nguyen',
    'cong cu tinh bhxh',
    'tra cuu muc dong bhxh'
  ],
  openGraph: {
    title: 'Công cụ tính mức đóng BHXH tự nguyện mới từ T7/2026',
    description: 'Bảng tính tự động mức đóng BHXH tự nguyện và chiết khấu đóng trước từ 1 - 5 năm.',
    type: 'website',
  },
};

export default function Page() {
  return <CalculatorLandingPage />;
}