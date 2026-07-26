// app/(bhxh)/lo-trinh-luong-huu/opengraph-image.tsx
import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt = 'Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Tải font Inter Bold hỗ trợ 100% tiếng Việt
async function getInterFont() {
  const res = await fetch(
    'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-Bold.ttf'
  );
  return await res.arrayBuffer();
}

export default async function Image() {
  const fontData = await getInterFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'Inter',
        }}
      >
        {/* Khối Header Card */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '28px',
              alignSelf: 'flex-start',
              display: 'flex',
            }}
          >
            Hệ Thống Phân Tích Lộ Trình Hưu Trí
          </div>
          
          <div
            style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: '#ffffff',
              lineHeight: '1.3',
              maxWidth: '1040px',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Tính Tuổi Nghỉ Hưu & Lộ Trình Đóng Tiếp BHXH Tự Nguyện Chuẩn Xác Nhất
          </div>
          
          <div
            style={{
              fontSize: '26px',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Hỗ trợ cán bộ thu & tư vấn an sinh xã hội hoạch định tài chính
          </div>
        </div>

        {/* Khối Footer Card */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '40px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>LONG WEB STUDIO</span>
            <span style={{ color: '#64748b', fontSize: '18px', marginTop: '4px' }}>Duy trì phục vụ đồng nghiệp tư vấn an sinh</span>
          </div>
          <div
            style={{
              color: '#34d399',
              fontSize: '22px',
              fontWeight: 'bold',
              display: 'flex',
            }}
          >
            www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}