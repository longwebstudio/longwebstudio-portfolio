import type { Metadata } from 'next';
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BhytCalculator } from '@/components/BhytCalculator';
import {
  Zap,
  CheckCircle2,
  Send,
  ShieldAlert,
  HelpCircle,
  BookmarkPlus,
  FileSpreadsheet,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Công Cụ Tính Mức Đóng BHYT Hộ Gia Đình (Dành Cho Nhân Viên Thu BHXH)',
  description:
    'Phần mềm tính mức đóng BHYT hộ gia đình tự động, chuẩn nghiệp vụ giảm trừ cùng năm tài chính. Hỗ trợ tạo mã VietQR thu tiền và sao chép mẫu báo giá Zalo cho khách hàng.',
  keywords: [
    'tinh bhyt ho gia dinh',
    'tính mức đóng bhyt hộ gia đình',
    'công cụ tính bhyt nhân viên thu',
    'tiện ích đại lý thu bhxh',
    'mẫu báo giá bhyt zalo',
    'mức giảm trừ bhyt hộ gia đình 2026',
    'cách tính bhyt diện hộ gia đình',
  ],
  alternates: {
    canonical: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
  },
  openGraph: {
    title: 'Tiện Ích Tính Nhanh BHYT Hộ Gia Đình - Long Web Studio',
    description:
      'Tính chuẩn mức giảm trừ theo người, 1 chạm copy báo giá Zalo và tạo mã VietQR thu tiền cho đại lý.',
    url: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
    siteName: 'Hệ Sinh Thái Long Web Studio',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function TinhBhytHoGiaDinhPage() {
  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Công cụ tính mức đóng BHYT Hộ gia đình - Long Web Studio',
    url: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    description:
      'Tiện ích tính nhanh mức đóng BHYT hộ gia đình cho nhân viên thu và đại lý thu BHXH. Tự động áp dụng giảm trừ 100%, 70%, 60%, 50%, 40% diện HGĐ trong năm tài chính.',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Thành viên đã có thẻ BHYT học sinh hoặc công ty có được tính để giảm trừ cho người sau không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KHÔNG. Theo quy định tại Nghị định 146/2018/NĐ-CP, việc giảm trừ mức đóng chỉ áp dụng cho các thành viên cùng tham gia BHYT THEO DIỆN HỘ GIA ĐÌNH trong năm tài chính. Các đối tượng tham gia theo nhóm ưu tiên cao hơn (HSSV, người lao động do DN đóng, hưu trí, hộ nghèo...) không được tính làm căn cứ giảm trừ cho các thành viên còn lại.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mức tham chiếu tính BHYT hiện hành là bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mức tham chiếu / mức lương cơ sở là 2.530.000 đồng/tháng. Mức đóng gốc 100% (người thứ nhất) là 4,5% tương đương 113.850 đồng/tháng (1.366.200 đồng/năm).',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header />

        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-6 pb-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Tính BHYT Hộ gia đình</span>
          </nav>

          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Công Cụ Hỗ Trợ Tính Nhanh Cho Điểm Thu &amp; Người Dân • Long Web Studio</span>
            </div>

            {/* Tiêu đề chính */}
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 mb-3 leading-snug">
              Tính Mức Đóng BHYT Hộ Gia Đình <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                Tự Động, Chuẩn Xác &amp; Báo Giá Zalo Trong 3 Giây
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Áp dụng chính xác quy định giảm trừ bậc thang diện HGĐ trong năm tài chính. Tự động sinh cú pháp báo giá Zalo chuyên nghiệp và tạo mã VietQR thu hộ chuẩn xác từng đồng.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-left">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Chuẩn 100% Nghiệp Vụ</strong>
                  <span className="text-slate-500">Áp dụng đúng quy định giảm trừ diện HGĐ cùng năm tài chính.</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-2.5">
                <Send className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">1 Chạm Báo Giá Zalo</strong>
                  <span className="text-slate-500">Mẫu tin rõ ràng, hỗ trợ tự sửa tên điểm thu và số điện thoại.</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">VietQR Tự Động</strong>
                  <span className="text-slate-500">Người dân quét là điền sẵn đúng số tiền &amp; nội dung nộp.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Component Máy Tính BHYT (Client Component) */}
          <BhytCalculator />

          {/* Banner Lưu Trang / Phím Tắt */}
          <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 bg-white/10 rounded-2xl shrink-0 hidden sm:block">
                <BookmarkPlus className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Lưu lại công cụ để sử dụng hàng ngày khi tư vấn hồ sơ</h4>
                <p className="text-xs text-blue-200 mt-0.5">
                  Nhấn <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-white font-mono font-semibold">Ctrl + D</kbd> (hoặc Thêm vào Màn hình chính điện thoại) để mở nhanh khi làm việc.
                </p>
              </div>
            </div>
            <a
              href="https://zalo.me/0966570913"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold bg-white text-blue-900 px-4 py-2 rounded-xl shrink-0 shadow-sm hover:bg-blue-50 transition-colors"
            >
              Hỗ trợ bởi Long Web Studio
            </a>
          </div>

          {/* Bảng đối chiếu mức đóng chuẩn (SEO HTML Table) */}
          <section id="bang-doi-chieu" className="mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                  Bảng Mức Đóng BHYT Hộ Gia Đình Trong Cùng Năm Tài Chính
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mức tham chiếu: <strong>2.530.000 đồng/tháng</strong> (Tỷ lệ đóng gốc: 4,5% = 113.850 đ/tháng)
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                Nghị định 146/2018/NĐ-CP
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-3 font-bold">Thứ tự tham gia (Diện HGĐ)</th>
                    <th className="p-3 font-bold text-center">Tỷ lệ đóng</th>
                    <th className="p-3 font-bold text-right">3 Tháng</th>
                    <th className="p-3 font-bold text-right">6 Tháng</th>
                    <th className="p-3 font-bold text-right text-blue-700">12 Tháng (1 Năm)</th>
                    <th className="p-3 font-bold text-right text-emerald-700">Tiết kiệm/Năm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Người thứ 1</td>
                    <td className="p-3 text-center"><span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold text-xs">100%</span></td>
                    <td className="p-3 text-right">341.550 đ</td>
                    <td className="p-3 text-right">683.100 đ</td>
                    <td className="p-3 text-right font-bold text-blue-700">1.366.200 đ</td>
                    <td className="p-3 text-right text-slate-400">0 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Người thứ 2</td>
                    <td className="p-3 text-center"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-xs">70%</span></td>
                    <td className="p-3 text-right">239.085 đ</td>
                    <td className="p-3 text-right">478.170 đ</td>
                    <td className="p-3 text-right font-bold text-blue-700">956.340 đ</td>
                    <td className="p-3 text-right text-emerald-600 font-semibold">-409.860 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Người thứ 3</td>
                    <td className="p-3 text-center"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-xs">60%</span></td>
                    <td className="p-3 text-right">204.930 đ</td>
                    <td className="p-3 text-right">409.860 đ</td>
                    <td className="p-3 text-right font-bold text-blue-700">819.720 đ</td>
                    <td className="p-3 text-right text-emerald-600 font-semibold">-546.480 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Người thứ 4</td>
                    <td className="p-3 text-center"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-xs">50%</span></td>
                    <td className="p-3 text-right">170.775 đ</td>
                    <td className="p-3 text-right">341.550 đ</td>
                    <td className="p-3 text-right font-bold text-blue-700">683.100 đ</td>
                    <td className="p-3 text-right text-emerald-600 font-semibold">-683.100 đ</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Người thứ 5 trở đi</td>
                    <td className="p-3 text-center"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-xs">40%</span></td>
                    <td className="p-3 text-right">136.620 đ</td>
                    <td className="p-3 text-right">273.240 đ</td>
                    <td className="p-3 text-right font-bold text-blue-700">546.480 đ</td>
                    <td className="p-3 text-right text-emerald-600 font-semibold">-819.720 đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Lưu ý nghiệp vụ & FAQ */}
          <section id="luu-y-nghiep-vu" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-20">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Quy Định Bắt Buộc Về Giảm Trừ BHYT HGĐ
              </h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>1. Chỉ áp dụng cho người cùng tham gia diện HGĐ:</strong> Các mức 70%, 60%, 50%, 40% chỉ áp dụng khi các thành viên trong hộ cùng đăng ký tham gia BHYT theo diện hộ gia đình trong <strong>cùng một năm tài chính</strong> (thẻ cũ đóng diện HGĐ vẫn còn hạn).
                </p>
                <p>
                  <strong>2. Không áp dụng cho thẻ nhóm ưu tiên:</strong> Các thành viên trong nhà đã có thẻ do Doanh nghiệp đóng, HSSV do trường thu, thẻ Hưu trí, Hộ nghèo, Trẻ em &lt; 6 tuổi... <strong>KHÔNG</strong> được tính để làm căn cứ giảm mức đóng cho người tham gia diện HGĐ.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Mẹo Tư Vấn Gia Hạn 5 Năm Liên Tục
              </h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  💡 <strong>Quyền lợi KCB 100%:</strong> Khách hàng tham gia đủ 5 năm liên tục sẽ được thanh toán 100% chi phí KCB khi số tiền cùng chi trả trong năm lớn hơn 6 tháng lương cơ sở.
                </p>
                <p>
                  💡 <strong>Nhắc lịch gia hạn trước 10 ngày:</strong> Đóng ngắt quãng không quá 03 tháng trong năm tài chính vẫn giữ nguyên quyền lợi 5 năm liên tục, nhưng nên gia hạn sớm để dữ liệu VssID không bị gián đoạn.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}