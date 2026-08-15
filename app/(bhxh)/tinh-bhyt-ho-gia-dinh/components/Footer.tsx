import React from 'react';
import {
  Sparkles,
  ExternalLink,
  Calculator,
  TrendingUp,
  BookOpen,
  MessageCircle,
  Code2,
} from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Cột 1: Giới thiệu Tiện ích & Freelancer Long Web Studio (5 cột) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  BHYT Calculator <span className="text-blue-400 font-normal text-xs">by Long Web Studio</span>
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Tiện ích tính nhanh mức đóng BHYT Hộ gia đình tự động, chuẩn xác và miễn phí. Giúp anh/chị nhân viên thu, điểm thu và người dân tính giảm trừ bậc thang, lấy cú pháp Zalo và mã VietQR chỉ trong vài giây.
            </p>
            <div className="pt-1 text-[11px] text-slate-500">
              *Tự động áp dụng mức tham chiếu 2.530.000đ &amp; quy tắc giảm trừ diện HGĐ cùng năm tài chính.
            </div>
          </div>

          {/* Cột 2: Hệ Sinh Thái Tiện Ích BHXH (Long Web Studio) (4 cột) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Công Cụ Cùng Hệ Sinh Thái
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
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
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Tra Cứu Lộ Trình Nghỉ Hưu &amp; Lương Hưu</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://sothu.longwebstudio.io.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Sổ Thu BHXH - BHYT Điện Tử</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Kết nối Freelancer (3 cột) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
              Tác Giả &amp; Hỗ Trợ
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
              <div>
                <span className="text-[11px] text-slate-500 block">Xây dựng &amp; Duy trì bởi:</span>
                <span className="font-bold text-slate-100 text-xs block mt-0.5">Freelancer Long Web Studio</span>
              </div>

              {/* Nút Chat Zalo */}
              <a
                href="https://zalo.me/0966570913"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-sm shadow-blue-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo: 0966.570.913</span>
              </a>

              <p className="text-[10px] text-slate-500 leading-tight text-center">
                Nhận thiết kế web tool, landing page &amp; phần mềm quản lý theo yêu cầu.
              </p>
            </div>
          </div>
        </div>

        {/* Chân trang bản quyền */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Công cụ phát triển bởi{' '}
            <a
              href="https://www.longwebstudio.io.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 font-semibold hover:text-blue-400 transition-colors"
            >
              Freelancer Long Web Studio
            </a>. Miễn phí cho cộng đồng &amp; Điểm thu.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/tinh-bhyt-ho-gia-dinh" className="hover:text-slate-300 transition-colors">
              BHYT HGĐ 2026
            </Link>
            <span>•</span>
            <span className="text-slate-400 font-mono">v2026.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};