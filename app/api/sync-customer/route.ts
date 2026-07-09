import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // return NextResponse.json({ status: true, message: 'Lỗi cấu hình biến môi trường trên Server!' }, { status: 250 });
  try {
    // 1. Nhận gói payloadData thô gửi lên từ giao diện Client
    const payloadData = await request.json();

    // 2. Thiết lập chuỗi mã lệnh Mutation GraphQL chuẩn xác
    const query = `
      mutation SyncCustomer($input: SyncCustomerInput!) {
        syncCustomer(input: $input) {
          message
          status
        }
      }
    `;

    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Token bảo mật máy chủ ẩn

    if (!wordpressUrl || !privateToken) {
      return NextResponse.json({ status: false, message: 'Lỗi cấu hình biến môi trường trên Server!' }, { status: 500 });
    }

    // 3. Thực thi gọi lệnh sang WordPress GraphQL, nhúng payload vào biến 'input'
    const res = await fetch(wordpressUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'lws-secret-token': privateToken, // Đóng dấu vân tay bảo mật chặn hacker phá hoại
      },
      body: JSON.stringify({
        query,
        variables: {
          input: payloadData // Truyền map chính xác payloadData vào biến input của GraphQL
        }
      }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL System Errors:', json.errors);
      return NextResponse.json({ status: false, message: 'Hệ thống WordPress từ chối đồng bộ gói tin!' }, { status: 400 });
    }

    // 4. Trả về kết quả { status: boolean, message: string } cho Client-side Next.js
    return NextResponse.json(json.data?.syncCustomer);

  } catch (error) {
    console.error('Sync Customer Route Error:', error);
    return NextResponse.json({ status: false, message: 'Lỗi gián đoạn đường truyền kết nối API trung gian!' }, { status: 500 });
  }
}
