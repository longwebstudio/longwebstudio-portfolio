'use client'; // Chạy ở môi trường Client để sử dụng các React Hooks và hoạt họa Motion

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react'; // Sử dụng thư viện Motion mới nhất

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo thương hiệu */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-1">
            <span className="text-red-600 font-black">LONG</span><span className="text-slate-400 font-light text-xs">WEB STUDIO</span>
          </Link>
        </div>

        {/* 1. Giao diện Desktop: Menu điều hướng & Nút liên hệ mới của bạn */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <Link href="/portfolio" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
              Dự án
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
              Bảng giá
            </Link>
            <a 
              href="https://blog.longwebstudio.io.vn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
            >
              Blog
              <svg className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </nav>
          
          {/* Nút liên hệ tư vấn nổi bật trên Desktop */}
          <div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500 active:scale-[0.98] transition-all">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>

        {/* 2. Giao diện Mobile: Nút nhắn nhanh Zalo và Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Nút liên hệ nhanh để tối ưu hóa chuyển đổi */}
          <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
            Nhắn Zalo
          </a>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-50 focus:outline-none"
            aria-label="Mở menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Ngăn kéo Menu cho Mobile (Drawer) sử dụng hoạt họa trượt mượt mà */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm md:hidden"
          >
            {/* Thẻ Panel trượt mở từ bên phải */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // Chống đóng khi click bên trong vùng nội dung
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header ngăn kéo */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Danh mục</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-50 focus:outline-none"
                    aria-label="Đóng menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Danh sách các liên kết di động đồng bộ */}
                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2 block"
                  >
                    Trang chủ
                  </Link>
                  <Link 
                    href="/portfolio" 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2 block"
                  >
                    Dự án
                  </Link>
                  <Link 
                    href="/pricing" 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2 block"
                  >
                    Bảng giá
                  </Link>
                  <a 
                    href="https://blog.longwebstudio.io.vn" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2 flex items-center gap-1 group"
                  >
                    Blog
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </nav>
              </div>

              {/* Hộp hành động nhanh dưới chân ngăn kéo (Đồng bộ nút Liên hệ tư vấn dạng đầy đủ trên Mobile) */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-xs text-center block shadow-sm transition-colors"
                >
                  Liên hệ tư vấn
                </Link>
                <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs text-center block shadow-sm flex items-center justify-center gap-1 transition-colors">
                  Trò chuyện Zalo: 0966.570.913
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}