"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 lg:pt-24">
      {/* Khối nền hiệu ứng mờ (Ambient Glow) tạo cảm giác công nghệ cao */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Tag định danh vị trí */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6"
        >
          Freelancer Web Designer & Developer
        </motion.span>

        {/* Tiêu đề chính lớn (H1) */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 90, damping: 15 }}
          className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-6xl max-w-4xl mx-auto leading-tight"
        >
          Thiết Kế Website Chuẩn SEO <br />
          <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tối Ưu Tỷ Lệ Chuyển Đổi
          </span>
        </motion.h1>

        {/* Đoạn mô tả giới thiệu bản thân */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Chào bạn, mình là Long. Long Web Studio chuyên kiến tạo các hệ thống web tĩnh siêu tốc độ, landing page thực chiến giúp doanh nghiệp SME đột phá doanh thu số.
        </motion.p>

        {/* Khối nút bấm kêu gọi hành động (CTA Buttons) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="rounded-xl bg-gray-950 px-6 py-4 text-sm font-bold text-white shadow-sm hover:bg-gray-800 active:scale-[0.98] transition-all text-center"
          >
            Xem sản phẩm thực tế
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all text-center"
          >
            Tư vấn miễn phí
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
