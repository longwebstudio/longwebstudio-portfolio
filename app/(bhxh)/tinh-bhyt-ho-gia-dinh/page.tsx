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
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Công Cụ Tính Mức Đóng BHYT Hộ Gia Đình (Dành Cho Nhân Viên Thu BHXH)',
  description:
    'Phần mềm tính mức đóng BHYT hộ gia đình tự động, chuẩn nghiệp vụ giảm trừ cùng năm tài chính. 1 click trích xuất báo giá Zalo và tạo mã VietQR thu hộ chính xác.',
  keywords: [
    'tinh bhyt ho gia dinh',
    'tính mức đóng bhyt hộ gia đình',
    'công cụ tính bhyt nhân viên thu',
    'tiện ích đại lý thu bhxh',
    'mẫu báo giá bhyt zalo',
    'mức giảm trừ bhyt hộ gia đình 2026',
    'tính bhyt có người có thẻ sẵn',
  ],
  alternates: {
    canonical: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
  },
  openGraph: {
    title: 'Tiện Ích Tính Nhanh BHYT Hộ Gia Đình - Chuẩn Nghiệp Vụ Nhân Viên Thu',
    description:
      'Hỗ trợ tính trừ các thành viên đã có thẻ, tự sinh cú pháp gửi Zalo báo giá khách hàng và tạo mã VietQR thanh toán trong 3 giây.',
    url: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
    siteName: 'Trợ Lý Nghiệp Vụ Thu BHXH - BHYT',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function TinhBhytHoGiaDinhPage() {
  // Schema Structured Data (SEO Rich Results)
  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Công cụ tính mức đóng BHYT Hộ gia đình cho Nhân viên thu',
    url: 'https://www.longwebstudio.io.vn/tinh-bhyt-ho-gia-dinh',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    description:
      'Tiện ích tính nhanh mức đóng BHYT hộ gia đình cho đại lý thu BHXH. Tự động áp dụng giảm trừ 100%, 70%, 60%, 50%, 40% và sinh mã VietQR thu tiền.',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Cách tính giảm trừ BHYT HGĐ khi trong hộ đã có người có thẻ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Người đã có thẻ BHYT (HSSV, công nhân, hưu trí...) trong cùng năm tài chính vẫn được tính là các thành viên thứ 1, 2... để người tham gia đóng mới được hưởng mức giảm trừ bậc tiếp theo (70%, 60%, 50%, 40%).',
        },
      },
      {
        '@type': 'Question',
        name: 'Mức lương cơ sở / tham chiếu mới áp dụng là bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mức lương cơ sở / mức tham chiếu làm căn cứ tính BHYT HGĐ là 2.530.000 đồng/tháng. Mức đóng gốc (người thứ 1) là 4,5% tương đương 113.850 đồng/tháng.',
        },
      },
    ],
  };

  return (
    <>
      {/* Script SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-8 pb-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Công cụ tính BHYT Hộ gia đình</span>
          </nav>

          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Tiện Ích Nghiệp Vụ Dành Cho Điểm Thu / Nhân Viên Thu BHXH</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 mb-3 leading-snug">
              Tính Mức Đóng BHYT Hộ Gia Đình <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                Tự Động, Chuẩn Xác &amp; Báo Giá Zalo Trong 3 Giây
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Không cần bấm máy tính tay hay tra bảng Excel. Tự động trừ thành viên đã có thẻ, sinh mẫu báo giá Zalo và tạo mã VietQR thu hộ chuẩn xác từng đồng.
            </p>

            {/* Feature Cards cho nhân viên thu */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-left">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Xử lý ca khó chính xác</strong>
                  <span className="text-slate-500">Trừ đúng thứ tự thành viên đã có thẻ sẵn trong năm.</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <Send className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">1 Chạm gửi báo giá Zalo</strong>
                  <span className="text-slate-500">Mẫu tin nhắn rõ ràng, nêu bật số tiền tiết kiệm để chốt nhanh.</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Tự sinh mã VietQR</strong>
                  <span className="text-slate-500">Người dân quét là điền sẵn đúng số tiền &amp; nội dung nộp.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Component Máy Tính BHYT (Client Component) */}
          <BhytCalculator />

          {/* Hướng dẫn lưu trang web (Bookmark Banner) */}
          <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 bg-white/10 rounded-xl shrink-0 hidden sm:block">
                <BookmarkPlus className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Lưu lại công cụ để sử dụng hàng ngày khi tư vấn</h4>
                <p className="text-xs text-blue-200 mt-0.5">
                  Nhấn <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-white font-mono font-semibold">Ctrl + D</kbd> (hoặc Thêm vào Màn hình chính trên điện thoại) để mở nhanh khi tiếp nhận hồ sơ.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-blue-900 px-3.5 py-2 rounded-xl shrink-0 shadow">
              Tiện ích hoàn toàn miễn phí
            </span>
          </div>

          {/* Bảng tra cứu đối chiếu nhanh (SEO Static HTML Table) */}
          <section className="mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                  Bảng Đối Chiếu Mức Đóng BHYT Hộ Gia Đình
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Căn cứ mức lương cơ sở / tham chiếu <strong>2.530.000 đồng/tháng</strong> (Tỷ lệ 4,5%)
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                Áp dụng toàn quốc
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-3 font-bold">Thứ tự thành viên</th>
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
          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                Lưu Ý Nghiệp Vụ Cho Đại Lý Thu
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Người đã có thẻ trước:</strong> Kể cả thẻ HSSV, thẻ do doanh nghiệp đóng hay bảo trợ xã hội vẫn được tính thứ tự để giảm mức đóng cho người tiếp theo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Quyền lợi 5 năm liên tục:</strong> Đóng ngắt quãng không quá 3 tháng trong năm tài chính vẫn giữ nguyên quyền lợi 5 năm liên tục.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Thời hạn nộp gia hạn:</strong> Nên nhắc người dân nộp trước 5 - 10 ngày trước khi thẻ cũ hết hạn để đảm bảo thẻ liên tục trên hệ thống VssID.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Mẹo Tư Vấn Chốt Đơn Nhanh
              </h3>
              <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <p>
                  💡 <strong>Nhấn mạnh số tiền tiết kiệm:</strong> Khi copy báo giá Zalo từ công cụ, hãy nhắc khách hàng số tiền giảm trừ lên đến hàng trăm nghìn đồng để khuyến khích họ đóng cả hộ cùng lúc.
                </p>
                <p>
                  💡 <strong>Khuyến khích đóng 12 tháng:</strong> Đóng cả năm giúp người dân không phải nhớ lịch gia hạn nhiều lần và được hỗ trợ quyền lợi trọn vẹn nhất.
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