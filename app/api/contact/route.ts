import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Nhận dữ liệu Form từ Giao diện gửi lên API Route
    const variables = await request.json();
    const { name, phone } = variables;

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Vui lòng điền đầy đủ Họ tên và Số điện thoại!' }, { status: 400 });
    }

    // 2. Định nghĩa chuỗi truy vấn GraphQL Mutation gửi sang WordPress
    const query = `
      mutation SubmitForm($name: String!, $phone: String!, $email: String!, $message: String!) {
        submitContactForm(input: {name: $name, phone: $phone, email: $email, message: $message}) {
          success
          message
        }
      }
    `;

    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const privateToken = process.env.LWS_GRAPHQL_PRIVATE_TOKEN; // Token được bảo vệ an toàn trên Server

    if (!wordpressUrl || !privateToken) {
      return NextResponse.json({ success: false, message: 'Lỗi cấu hình hệ thống máy chủ API!' }, { status: 500 });
    }

    // 3. Gửi Request từ Next.js Server sang WordPress Backend kèm Header bảo mật
    const res = await fetch(wordpressUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'lws-secret-token': privateToken, 
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error('WordPress GraphQL Errors:', json.errors);
      return NextResponse.json({ success: false, message: 'WordPress từ chối xử lý dữ liệu biểu mẫu!' }, { status: 400 });
    }

    // 4. Trả về kết quả thành công cho Giao diện Next.js Client
    return NextResponse.json(json.data?.submitContactForm);

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ success: false, message: 'Không thể kết nối đến máy chủ trung gian Next.js API!' }, { status: 500 });
  }
}
