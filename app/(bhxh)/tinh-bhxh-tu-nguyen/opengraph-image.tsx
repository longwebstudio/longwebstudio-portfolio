import { ImageResponse } from 'next/server';

export const runtime = 'edge'; // Sử dụng Edge Runtime để tối ưu hóa tốc độ tải ảnh

export const alt = 'Công cụ tính mức đóng BHXH tự nguyện - Long Web Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#022c22', // Nền xanh lục bảo đậm sang trọng và tương phản tốt
          padding: '80px',
          boxSizing: 'border-box',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header của Ảnh Chia Sẻ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Biểu tượng Khiên Bảo Vệ SVG vẽ tay trực tiếp */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981" // Xanh lá cây sáng nổi bật trên nền tối
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 11 2 2 4-4" />
          </svg>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#10b981',
              letterSpacing: '2px',
            }}
          >
            BẢO HIỂM XÃ HỘI TỰ NGUYỆN
          </span>
        </div>

        {/* Nội dung tiêu đề chính ở giữa */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Bảng Tính Mức Đóng BHXH
          </h1>
          <p
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#fbbf24', // Màu vàng gold nổi bật và dễ đọc
              margin: 0,
            }}
          >
            Cập nhật từ T7/2026 • Tự động tính chiết khấu trả trước 1 - 5 năm
          </p>
          <p
            style={{
              fontSize: '22px',
              color: '#a1a1aa',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.5,
            }}
          >
            Hỗ trợ nhân viên thu BHXH, BHYT tư vấn khách hàng lựa chọn mức thu nhập và phương thức đóng tối ưu nhất.
          </p>
        </div>

        {/* Chân trang ghi rõ thương hiệu duy trì */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #064e3b',
            paddingTop: '30px',
          }}
        >
          <span style={{ fontSize: '20px', color: '#34d399', fontWeight: 'bold' }}>
            Dành Cho Nhân Viên Thu & Khách Hàng Toàn Quốc
          </span>
          <span style={{ fontSize: '20px', color: '#94a3b8' }}>
            Duy trì bởi{' '}
            <strong style={{ color: '#ffffff', fontWeight: 'bold' }}>
              Freelancer Long Web studio
            </strong>
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}