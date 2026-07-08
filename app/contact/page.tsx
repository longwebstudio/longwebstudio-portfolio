"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { submitContactMutation } from "@/lib/api";

export default function ContactPage() {
  // Quản lý trạng thái dữ liệu form nhập liệu
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  // Quản lý trạng thái thông báo phản hồi hệ thống (Thành công / Thất bại)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  // Trạng thái chờ xử lý gửi request
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      // Gọi lệnh thực thi GraphQL Mutation truyền mảng dữ liệu sạch sang WordPress
      const result = await submitContactMutation(formData);

      if (result && result.success) {
        setStatus({ type: "success", msg: result.message });
        setFormData({ name: "", email: "", phone: "", message: "" }); // Xóa sạch form khi thành công
      } else {
        setStatus({ type: "error", msg: result?.message || "Đã xảy ra lỗi hệ thống khi lưu trữ dữ liệu!" });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Không thể kết nối đến máy chủ GraphQL API!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hiệu ứng trượt mở tiêu đề trang */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-950 sm:text-5xl tracking-tight">
          Khởi Động <span className="text-blue-600">Dự Án</span> Của Bạn
        </h1>
        <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Để lại thông tin, Long Web Studio sẽ liên hệ tư vấn giải pháp tối ưu chuyển đổi và phác thảo ý tưởng hoàn toàn miễn phí trong 15 phút.
        </p>
      </motion.div>

      {/* Hiệu ứng Form lướt hiện từ dưới lên */}
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Họ và tên *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/30 p-3.5 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Ví dụ: Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/30 p-3.5 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Ví dụ: 0901234567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Địa chỉ Email (Không bắt buộc)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/30 p-3.5 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="khachhang@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Chi tiết yêu cầu thiết kế / Ý tưởng dự án</label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/30 p-3.5 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Ví dụ: Mình cần thiết kế một website bán hàng thời trang tích hợp thanh toán tự động và tốc độ tải trang nhanh..."
          />
        </div>

        {/* Khối hiển thị thông báo trạng thái phản hồi */}
        {status.type && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl text-sm font-semibold border ${
              status.type === "success" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {status.msg}
          </motion.div>
        )}

        {/* Nút gửi form tương tác hiệu ứng nhấn chu kỳ bấm chuột */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Đang gửi thông tin yêu cầu..." : "Gửi yêu cầu tư vấn ngay"}
        </motion.button>
      </motion.form>
    </section>
  );
}
