import React from 'react';
import { Metadata } from 'next';
import LwsPricingTable from '@/components/LwsPricingTable';

export const metadata: Metadata = {
  title: "Phần mềm nhắc tái tục BHXH tự nguyện, BHYT hộ gia đình - Ứng dụng LWS",
  description: "Giải pháp tối ưu của Long Web Studio dành riêng cho nhân viên thu BHXH, BHYT. Tự động quét lịch đóng, soạn sẵn tin nhắn nhắc gia hạn qua Zalo/SMS chuẩn xác.",
  alternates: {
    canonical: "https://longwebstudio.io.vn",
  },
  openGraph: {
    title: "Phần mềm nhắc tái tục BHXH tự nguyện, BHYT hộ gia đình - Ứng dụng LWS",
    description: "Giải pháp tối ưu của Long Web Studio dành riêng cho nhân viên thu BHXH, BHYT. Tự động quét lịch đóng, soạn sẵn tin nhắn nhắc gia hạn qua Zalo/SMS chuẩn xác.",
    url: "https://longwebstudio.io.vn",
    images: [{ url: "https://longwebstudio.io.vn" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default async function LwsLandingPage() {
  // Thay thế số 1115 bằng số ID chính xác của sản phẩm cha (Variable Product) trên web của bạn
  const productParentId = 1082;

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-green-100 selection:text-green-800">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <header className="mb-12 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 p-8 text-center sm:p-12">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-green-900 sm:text-4xl">
            Phần Mềm Nhắc Tái Tục BHXH Tự Nguyện & BHYT Hộ Gia Đình LWS
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-green-800 sm:text-lg">
            Ứng dụng chuyên biệt từ Long Web Studio dành riêng cho các Nhân viên thu, Đại lý thu BHXH, BHYT. Tự động kiểm soát danh sách, quét lịch đến hạn và soạn sẵn tin nhắn nhắc đóng tiền chuyên nghiệp.
          </p>
        </header>

        {/* PAIN POINTS */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 text-center sm:text-2xl">
            Khó khăn lớn nhất của Nhân viên thu BHXH, BHYT hiện nay
          </h2>
          <div className="mt-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-5">
            <ul className="space-y-3 text-sm text-red-900 sm:text-base">
              <li className="flex items-start">
                <span className="mr-2">❌</span>
                <span><strong>Sót lịch thẻ hết hạn:</strong> Người dân bị gián đoạn thẻ BHYT, ảnh hưởng quyền lợi khám chữa bệnh và mốc 5 năm liên tục.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">❌</span>
                <span><strong>Quản lý Excel quá tải:</strong> Hàng trăm người đóng theo chu kỳ 3 tháng, 6 tháng, 12 tháng dễ gây nhầm lẫn lịch đóng BHXH tự nguyện.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* PRICING TABLE SECTION */}
        <section id="pricing" className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 text-center sm:text-2xl">
            Gói dịch vụ phần mềm quản lý thu BHXH, BHYT LWS
          </h2>
          
          {/* GỌI COMPONENT BẢNG GIÁ WOOCOMMERCE ĐỘNG */}
          <LwsPricingTable productDatabaseId={productParentId} />
          
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 pt-8 text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
          <p className="mb-2 text-slate-700">🛡️ <strong>Chính sách bảo mật dữ liệu:</strong> Long Web Studio cam kết mã hóa và bảo vệ an toàn thông tin danh sách đóng bảo hiểm của người dân.</p>
          <p className="font-medium text-slate-600">Thiết kế và phát triển bởi <strong>Freelancer Long Web Studio</strong></p>
        </footer>

      </div>
    </div>
  );
}
