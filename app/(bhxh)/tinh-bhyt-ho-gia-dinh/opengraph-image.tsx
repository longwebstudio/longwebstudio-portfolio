import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Tính Mức Đóng BHYT Hộ Gia Đình Tự Động | Long Web Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Sửa lỗi: Truyền trực tiếp URL dạng chuỗi vào fetch (không dùng import.meta.url)
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/bevietnampro/v11/QFdG35SGlArnKx60hm3PPrro8Hw.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#020617',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.25) 0%, transparent 40%), radial-gradient(circle at 85% 85%, rgba(99, 102, 241, 0.2) 0%, transparent 40%)',
          padding: '60px 70px',
          fontFamily: '"Be Vietnam Pro"',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Đường viền trang trí */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* 1. Header OG Card */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                BHYT <span style={{ color: '#60a5fa' }}>HỘ GIA ĐÌNH</span>
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                LONG WEB STUDIO • WEB TOOL
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              padding: '8px 18px',
              borderRadius: '999px',
              color: '#93c5fd',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            <span>⚡ TIỆN ÍCH MIỄN PHÍ</span>
          </div>
        </div>

        {/* 2. Nội dung chính */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #e2e8f0, #93c5fd)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Tính Mức Đóng BHYT Hộ Gia Đình Tự Động
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#cbd5e1',
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '950px',
            }}
          >
            Áp dụng mức tham chiếu <strong style={{ color: '#fbbf24' }}>2.530.000đ</strong> &amp; quy tắc giảm trừ bậc thang diện HGĐ chuẩn nghiệp vụ cùng năm tài chính.
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 18px',
                borderRadius: '14px',
                fontSize: '15px',
                color: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#34d399' }}>✓</span> 1 Chạm Báo Giá Zalo
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 18px',
                borderRadius: '14px',
                fontSize: '15px',
                color: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#60a5fa' }}>✓</span> Tạo Mã VietQR Thu Hộ
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 18px',
                borderRadius: '14px',
                fontSize: '15px',
                color: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#fbbf24' }}>✓</span> Chu kỳ 3T - 6T - 12T
            </div>
          </div>
        </div>

        {/* 3. Footer Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>Phát triển bởi:</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>
              Freelancer Long Web Studio
            </span>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ fontSize: '15px', color: '#38bdf8', fontWeight: 700 }}>
              Zalo: 0966.570.913
            </span>
          </div>

          <div
            style={{
              fontSize: '15px',
              fontFamily: 'monospace',
              color: '#94a3b8',
              fontWeight: 700,
            }}
          >
            longwebstudio.io.vn
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Be Vietnam Pro',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}