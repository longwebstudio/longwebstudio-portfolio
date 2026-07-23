import { ImageResponse } from 'next/server'; // Tải thư viện sinh ảnh gốc của Next.js

// Chỉ định chạy tệp này tại máy chủ Edge gần người dùng nhất để tối ưu tốc độ phản hồi
export const runtime = 'edge';

// Khai báo mô tả thay thế cho ảnh (Alt text)
export const alt = 'Vì Sao Nhân Viên Thu BHXH, BHYT Nên Có Website Riêng? - Long Web Studio';

// Cấu hình kích thước tiêu chuẩn của ảnh Open Graph chia sẻ mạng xã hội
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
          backgroundColor: '#090d16',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Tạo luồng sáng xanh dương công nghệ mờ phía sau (Glow Background) để đồng bộ chủ đề bảo hiểm */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Phần Đầu (Header): Thương hiệu Long Web Studio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444' }}>LONG</span>
          <span style={{ fontSize: '14px', fontWeight: 300, color: '#94a3b8', marginTop: '6px', letterSpacing: '1px' }}>
            WEB STUDIO
          </span>
        </div>

        {/* Phần Giữa (Body): Tiêu đề câu hỏi của Landing Page & Mô tả */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px', zIndex: 10 }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#2563eb', // Màu xanh dương đồng bộ tông màu của dịch vụ bảo hiểm
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Giải pháp công nghệ chuyển đổi số
          </span>
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Vì Sao Nhân Viên Thu BHXH, BHYT Nên Có Website Riêng?
          </h1>
          <p style={{ fontSize: '21px', color: '#94a3b8', margin: 0, lineHeight: 1.45 }}>
            Giải pháp website trợ lý số giúp tự động hóa quy trình tính phí đóng lũy tiến, quản lý thời hạn gia hạn thẻ và gửi tin nhắn nhắc nộp tiền qua Zalo chỉ trong 1-Click.
          </p>
        </div>

        {/* Phần Cuối (Footer): Địa chỉ Web chuẩn hóa & Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '18px', color: '#475569', fontFamily: 'monospace' }}>
            https://longwebstudio.io.vn
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '10px 20px',
              borderRadius: '12px',
            }}
          >
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '0.5px' }}>
              DIGITAL ASSISTANT
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size, // Xuất bản ảnh theo đúng kích thước tiêu chuẩn 1200x630
    }
  );
}