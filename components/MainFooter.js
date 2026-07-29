import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      
      {/* 1. Phần nội dung chính của chân trang */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Cột 1: Giới thiệu thương hiệu ngách */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1">
            <span className="text-red-600 font-black">LONG</span>
            <span className="text-slate-400 font-light text-xs">WEB STUDIO</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Chuyên gia xây dựng hệ thống văn phòng số và số hóa dịch vụ thu hộ chuyên nghiệp cho nhân viên thu bảo hiểm xã hội (BHXH) tự nguyện, bảo hiểm y tế (BHYT) hộ gia đình.
          </p>
        </div>

        {/* Cột 2: Danh mục liên kết nhanh (Đã đồng bộ với Header) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">Danh mục giải pháp</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Dự án</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-400 transition-colors">Bảng giá</Link>
            </li>
            <li>
              <a 
                href="https://blog.longwebstudio.io.vn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
              >
                Blog
                <svg className="h-3 w-3 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">Liên hệ tư vấn</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên lạc chính thức (Đã cập nhật Zalo & SĐT mới) */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">Thông tin liên hệ</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-base">📧</span>
              <a href="mailto:contact@longwebstudio.io.vn" className="hover:text-blue-400 transition-colors">
                contact@longwebstudio.io.vn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">💬</span>
              <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="hover:text-blue-400 transition-colors">
                Zalo: 0966.570.913 (Hỗ trợ dự án)
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-base">📍</span>
              <span>TP. Hà Nội, Việt Nam (Nhận số hóa dịch vụ thu hộ trên toàn quốc)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 2. Phần chân đế bản quyền */}
      <div className="border-t border-slate-900/60 py-8 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-600 space-y-1">
          <p>© {currentYear} Long Web Studio. Tất cả quyền được bảo lưu.</p>
          <p>Hệ thống vận hành tối ưu trên nền tảng tích hợp Headless WordPress &amp; Next.js App Router.</p>
        </div>
      </div>
    </footer>
  );
}