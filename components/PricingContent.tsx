"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { PlanNode } from "@/lib/api";

interface PricingContentProps {
  plans: PlanNode[];
}

export default function PricingContent({ plans }: PricingContentProps) {
  // State quản lý chu kỳ thanh toán: 'monthly' (Tháng) hoặc 'yearly' (Năm)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-10">
      {/* 1. NÚT GẠT CHỌN CHU KỲ THANH TOÁN (TOGGLE SWITCH EFFECT) */}
      <div className="flex justify-center items-center gap-4">
        <span className={`text-sm font-semibold transition-colors duration-200 ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
          Thanh toán theo tháng
        </span>
        
        <button
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          className="w-14 h-8 bg-gray-200 rounded-full p-1 flex items-center relative cursor-pointer focus:outline-none transition-colors duration-300"
          style={{ backgroundColor: billingCycle === "yearly" ? "#2563eb" : "#e5e7eb" }}
          aria-label="Chuyển đổi chu kỳ thanh toán"
        >
          {/* Nút tròn di chuyển bằng Spring Physics độc quyền của motion */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-6 h-6 bg-white rounded-full shadow-md pointer-events-none"
            style={{ marginLeft: billingCycle === "yearly" ? "24px" : "0px" }}
          />
        </button>

        <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors duration-200 ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-400"}`}>
          Thanh toán theo năm
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 animate-pulse">
            Tiết kiệm ~20%
          </span>
        </span>
      </div>

      {/* 2. LƯỚI HIỂN THỊ CÁC GÓI DỊCH VỤ DỰA TRÊN DỮ LIỆU ĐỘNG */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
        {plans.map((plan, idx) => {
          const { price, priceYearly, ctaText, features, featured } = plan.planDetails;
          
          // Bóc tách chuỗi text xuống hàng từ WordPress thành mảng Array để render danh sách con
          const featureList = features ? features.split("\n").filter(f => f.trim() !== "") : [];
          
          // Khử mã HTML thô từ trường Excerpt của WordPress Content
          const description = plan.excerpt ? plan.excerpt.replace(/<[^>]*>/g, '') : '';

          // Xử lý nảy số tính toán giá hiển thị dựa trên bộ lọc chu kỳ được chọn
          let displayPrice = price || "0";
          let subText = "/tháng";

          if (billingCycle === "yearly") {
            subText = "/tháng (trả theo năm)";
            if (priceYearly && priceYearly.trim() !== "") {
              displayPrice = priceYearly;
            } else {
              // Tự động tính toán chiết khấu giảm 20% và làm tròn nếu trường giá năm bị bỏ trống
              const calculated = parseFloat(displayPrice) * 0.8;
              displayPrice = calculated.toFixed(1).replace(".0", "");
            }
          }

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`flex flex-col justify-between rounded-3xl p-8 border shadow-sm relative ${
                featured 
                  ? "border-blue-600 ring-2 ring-blue-600 bg-white z-10" 
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              {/* Tag gắn định vị cho gói khuyên dùng */}
              {featured && (
                <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  Khuyên Dùng
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                <p className="mt-2 text-sm text-gray-500 min-h-[40px] leading-relaxed">{description}</p>
                
                {/* Khối số tiền lướt nhảy mượt mà (AnimatePresence chế độ wait) */}
                <div className="mt-6 flex items-baseline text-gray-900 min-h-[48px]">
                  <span className="text-sm font-semibold tracking-wide text-gray-500">Chỉ từ</span>
                  <div className="overflow-hidden inline-block px-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={displayPrice}
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-4xl font-extrabold tracking-tight text-blue-600 inline-block"
                      >
                        {displayPrice}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-lg font-bold text-gray-500 ml-1">Triệu VNĐ</span>
                  <span className="text-xs font-medium text-gray-400 ml-2 self-end mb-1 tracking-wide">{subText}</span>
                </div>

                {/* Khối hiển thị danh sách tính năng con */}
                <ul className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                  {featureList.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm text-gray-600">
                      <svg className="h-5 w-5 text-blue-500 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="leading-relaxed">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nút hành động chuyển đổi phễu về trang liên hệ */}
              <div className="mt-8 pt-4 border-t border-gray-50">
                <Link
                  href="/contact"
                  className={`w-full block text-center py-3.5 px-4 rounded-xl text-sm font-bold active:scale-[0.98] transition-all ${
                    featured
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/10"
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  {ctaText || "Liên hệ nhận tư vấn"}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
