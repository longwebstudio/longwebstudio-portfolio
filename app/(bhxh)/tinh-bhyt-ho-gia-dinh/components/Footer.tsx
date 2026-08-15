import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  PhoneCall,
  Calculator,
  TrendingUp,
  BookOpen,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Cột 1: Thông tin thương hiệu & Giới thiệu (5 cột) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base">
                Cổng Nghiệp Vụ BHYT Hộ Gia Đình
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Tiện ích hỗ trợ Tổ chức dịch vụ thu, Điểm thu Bưu điện, UBND xã/phường và Nhân viên thu BHXH tính nhanh mức đóng giảm trừ, tạo mã VietQR và trích xuất báo giá Zalo cho người dân.
            </p>
            <div className="pt-1 text-[11px] text-slate-500">
              *Tự động áp dụng mức tham chiếu mới &amp; quy tắc giảm trừ bậc thang (100% - 70% - 60% - 50% - 40%).
            </div>
          </div>

          {/* Cột 2: Hệ Sinh Thái Công Cụ Long Web Studio (4 cột) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Hệ Sinh Thái Tiện Ích BHXH
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Tính Mức Đóng BHXH Tự Nguyện</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.longwebstudio.io.vn/lo-trinh-luong-huu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Tra Cứu Lộ Trình Tuổi Nghỉ Hưu &amp; Lương Hưu</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://sothu.longwebstudio.io.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Sổ Thu BHXH - BHYT Điện Tử (Điểm Thu)</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ kỹ thuật bởi Freelancer Long Web Studio (3 cột) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
              Hỗ Trợ Kỹ Thuật
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
              <div>
                <span className="text-[11px] text-slate-500 block">Phát triển &amp; Tối ưu bởi:</span>
                <span className="font-bold text-slate-200 text-xs block">Freelancer Long Web Studio</span>
              </div>

              {/* Nút Chat Zalo trực tiếp */}
              <a
                href="https://zalo.me/0966570913"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Zalo: 0966.570.913</span>
              </a>

              <div className="pt-1 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Hỗ trợ tùy biến cho Điểm thu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chân trang bản quyền */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Cổng Tính Phí BHYT Hộ Gia Đình. Phát triển bởi{' '}
            <a
              href="https://zalo.me/0966570913"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 font-semibold hover:text-blue-400 underline transition-colors"
            >
              Freelancer Long Web Studio (Zalo 0966570913)
            </a>.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/tinh-bhyt-ho-gia-dinh" className="hover:text-slate-400 transition-colors">
              BHYT 2026
            </Link>
            <span>•</span>
            <span className="text-slate-400 font-mono">Long Web Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};