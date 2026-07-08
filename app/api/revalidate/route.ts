import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // 1. Lấy mã Token bảo mật được truyền sang từ Header của WordPress Webhook
    const secretToken = request.headers.get('x-lws-revalidate-token');
    const expectedToken = process.env.LWS_REVALIDATE_SECRET;

    // 2. Kiểm tra tính hợp lệ của mã Token (Chống kẻ xấu spam URL phá bộ nhớ đệm)
    if (!secretToken || secretToken !== expectedToken) {
      return NextResponse.json(
        { success: false, message: 'Xác thực bảo mật thất bại! Mã Token không hợp lệ.' },
        { status: 401 } // Mã lỗi Unauthorized
      );
    }

    // 3. Thực thi lệnh xóa bỏ toàn bộ cache của các hàm Fetch có gắn tag định danh 'wordpress-data'
    revalidateTag('wordpress-data');

    // 4. Trả về phản hồi thành công cho máy chủ WordPress Backend
    return NextResponse.json({
      success: true,
      message: 'Hệ thống Next.js đã xóa toàn bộ cache dữ liệu cũ thành công!',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Lỗi Revalidate API:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra sự cố trong quá trình dọn dẹp bộ nhớ đệm!' },
      { status: 500 }
    );
  }
}
