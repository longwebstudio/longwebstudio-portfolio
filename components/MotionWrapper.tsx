"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
}

export default function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      // Trạng thái ban đầu trước khi cuộn màn hình tới: Mờ và dịch xuống dưới 40px
      initial={{ opacity: 0, y: 40 }}
      // Trạng thái kích hoạt khi nằm trong tầm nhìn của người dùng
      whileInView={{ opacity: 1, y: 0 }}
      // Cấu hình chỉ chạy hiệu ứng 1 lần duy nhất và kích hoạt sớm trước khi phần tử chạm mép màn hình 50px
      viewport={{ once: true, margin: "-50px" }}
      // Tạo chuyển động đàn hồi nhẹ nhàng (Spring Physics) cao cấp chuẩn UX
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}
