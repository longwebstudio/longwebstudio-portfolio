// app/(bhxh)/lo-trinh-luong-huu/opengraph-image.tsx
import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt = 'Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Hàm helper lấy font tiếng Việt sắc nét từ Google Fonts
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700;900&text=${encodeURIComponent(text)}`;
  const css = await fetch(url).then((res) => res.text());
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.ok) {
      return await response.arrayBuffer();
    }
  }

  // Fallback lấy toàn bộ font Roboto nếu không fetch được subset
  const fallbackUrl = 'https://github.com/google/fonts/raw/main/ofl/roboto/Roboto-Bold.ttf';
  return await fetch(fallbackUrl).then((res) => res.arrayBuffer());
}

interface ImageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | undefined };
}

export default async function Image({ searchParams }: ImageProps) {
  // Đảm bảo tương thích cả Next.js 14 và Next.js 15+ (async searchParams)
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  
  const rawKhachHang = resolvedSearchParams?.['hoten'];
  const khachHang = typeof rawKhachHang === 'string' ? rawKhachHang : 'Người lao động';

  // Tải font Roboto hỗ trợ tiếng Việt
  const fontData = await loadGoogleFont('Roboto', 'Hệ Thống Phân Tích Lộ Trình Hưu Trí Tính Tuổi Nghỉ Hưu & Lộ Trình Đóng Tiếp BHXH Tự Nguyện Chuẩn Xác Nhất Hồ sơ giả định thiết lập riêng cho LONG WEB STUDIO Duy trì phục vụ đồng nghiệp tư vấn an sinh' + khachHang);

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
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        {/* Khối Header Card */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              marginBottom: '24px',
              alignSelf: 'flex-start',
              display: 'flex',
            }}
          >
            Hệ Thống Phân Tích Lộ Trình Hưu Trí
          </div>
          
          <div
            style={{
              fontSize: '54px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: '1.2',
              maxWidth: '960px',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            Tính Tuổi Nghỉ Hưu & Lộ Trình Đóng Tiếp BHXH Tự Nguyện Chuẩn Xác Nhất
          </div>
          
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Hồ sơ giả định thiết lập riêng cho:&nbsp;
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{khachHang}</span>
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
              alignItems: 'center',
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
          name: 'Roboto',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}