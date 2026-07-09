import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin') || '*';
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  
  export async function POST(request: NextRequest) {
    try {
      // 1. Nhận gói payload dữ liệu biên lai bảo hiểm từ trang VNPost gửi sang
      const payloadData = await request.json();
  
      // 2. Thiết lập chuỗi mã lệnh Mutation GraphQL chính xác theo cấu trúc của bạn
      const query = `
        mutation CapNhatDanhSachBienLaiBH($input: CapNhatDanhSachBienLaiBHInput!) {
          capNhatDanhSachBienLaiBH(input: $input) {
            success
            message
            results {
              maSoBhxh
              status
              message
            }
          }
        }
      `;
  
      const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
      const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Mã token giấu kín tuyệt đối trên Server
  
      if (!wordpressUrl || !privateToken) {
        return NextResponse.json({ success: false, message: 'Lỗi cấu hình biến môi trường trên Next.js Server!' }, { status: 500 });
      }
  
      // 3. Thực thi gọi lệnh từ Next.js Server sang WordPress GraphQL (Bypass 100% CORS ở luồng này)
      const res = await fetch(wordpressUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Gửi kèm mã token bảo mật để vượt qua lớp chốt chặn xác thực của WordPress
          'lws-secret-token': privateToken, 
        },
        body: JSON.stringify({
          query,
          variables: {
            input: payloadData // Truyền map chính xác payload nhận được vào biến input của GraphQL
          }
        }),
      });
  
      const json = await res.json();
      
      if (json.errors) {
        console.error('WordPress GraphQL Receipt Errors:', json.errors);
        return NextResponse.json({ success: false, message: 'WordPress từ chối xử lý hoặc lỗi cấu trúc dữ liệu biên lai!' }, { status: 400 });
      }
  
      // 4. Trả kết quả { success, message, results } về cho trình duyệt đang chạy trên trang VNPost
      // return NextResponse.json(json.data?.capNhatDanhSachBienLaiBH);

      // 4. Trả về kết quả { status: boolean, message: string } cho Client-side Next.js
      const origin = request.headers.get('origin') || '*';

      return NextResponse.json(json.data?.capNhatDanhSachBienLaiBH, {
      headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
      });
  
    } catch (error) {
      console.error('Sync Receipt API Route Error:', error);
      return NextResponse.json({ success: false, message: 'Lỗi gián đoạn đường truyền kết nối API Server Next.js!' }, { status: 500 });
    }
  }
