'use client'; // Khai báo chạy ở môi trường Client để tương thích với Motion

import { motion } from 'motion/react';

/**
 * Cấu phần tạo hiệu ứng xuất hiện (Fade In + Slide Up) mượt mà khi tải trang
 * 
 * @param {ReactNode} children - Nội dung bên trong phần cần tạo hiệu ứng
 * @param {number} delay - Thời gian trễ trước khi bắt đầu chạy hiệu ứng (giây)
 */
export default function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] // Hệ số cubic-bezier giúp hiệu ứng mượt mà và tự nhiên hơn
      }}
    >
      {children}
    </motion.div>
  );
}