import { ImageResponse } from 'next/server';

// Cấu hình runtime Edge để tạo ảnh cực nhanh
export const runtime = 'edge';

// Thông tin hình ảnh
export const alt = 'Mức Đóng Bảo Hiểm Y Tế Hộ Gia Đình Tháng 7/2026';
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a', // Slate 900 background
          padding: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Khung thẻ chính */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', // Gradient Blue to Slate
            borderRadius: '24px',
            border: '2px solid #3b82f6',
            padding: '48px 56px',
            justifyContent: 'space-between',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Hàng trên: Badge nhãn & tiêu đề phụ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f59e0b', // Amber 500
                color: '#78350f',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              ⚡ Quy Định Mới Tháng 7/2026
            </div>
            <div
              style={{
                fontSize: '20px',
                color: '#93c5fd',
                fontWeight: '600',
              }}
            >
              Công Cụ Tra Cứu BHXH / BHYT
            </div>
          </div>

          {/* Tiêu đề chính thu hút click */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1
              style={{
                fontSize: '52px',
                fontWeight: '800',
                color: '#ffffff',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Mức Đóng Bảo Hiểm Y Tế Hộ Gia Đình
            </h1>
            <p
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#fde047', // Yellow 300
                margin: 0,
              }}
            >
              Áp Dụng Từ Tháng 7/2026 • Lương Cơ Sở 2.530.000đ
            </p>
          </div>

          {/* Khối tính năng nổi bật (Đã sửa justify -> justifyContent) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '16px',
              padding: '20px 28px',
              border: '1px solid rgba(147, 197, 253, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', color: '#e0f2fe', fontSize: '20px', fontWeight: '600' }}>
              ✓ Giảm trừ từ người thứ 2
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#e0f2fe', fontSize: '20px', fontWeight: '600' }}>
              ✓ Tạo mã VietQR tự động
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#e0f2fe', fontSize: '20px', fontWeight: '600' }}>
              ✓ Sao chép báo phí Zalo
            </div>
          </div>

          {/* Chân ảnh Branding */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(147, 197, 253, 0.2)',
              paddingTop: '20px',
            }}
          >
            <span style={{ color: '#93c5fd', fontSize: '18px', fontWeight: '500' }}>
              Hỗ trợ Nhân viên thu & Người dân tra cứu chính xác
            </span>
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>
              Long Web Studio
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}