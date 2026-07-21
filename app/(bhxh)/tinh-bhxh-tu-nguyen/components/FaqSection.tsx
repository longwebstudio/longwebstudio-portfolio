import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <HelpCircle className="h-8 w-8 text-emerald-700" /> Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-slate-700 mt-2">
            Giải đáp nhanh các thắc mắc phổ biến của người tham gia Bảo hiểm xã hội tự nguyện.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full flex items-center justify-between p-5 text-left font-extrabold text-slate-900 hover:bg-slate-50 transition"
            >
              <span>1. Chế độ tử tuất và trợ cấp mai táng phí của BHXH tự nguyện như thế nào?</span>
              {openFaq === 0 ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
            </button>
            {openFaq === 0 && (
              <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-750 space-y-3 leading-relaxed">
                <p>
                  ✔️ <strong>Trợ cấp mai táng (Mai táng phí):</strong> Người lo mai táng nhận hỗ trợ một lần bằng 10 lần lương cơ sở khi người tham gia đóng đủ từ <strong>5 năm (60 tháng) BHXH tự nguyện</strong> HOẶC đóng đủ từ <strong>12 tháng BHXH bắt buộc trở lên</strong> (hoặc đang hưởng lương hưu) qua đời. Kể từ 07/2026, mức lương cơ sở là 2.530.000đ, tương đương khoản trợ cấp là <strong>25.300.000đ</strong>.
                </p>
                <p>
                  ✔️ <strong>Trợ cấp tuất một lần:</strong> Thân nhân được nhận trợ cấp một lần dựa trên số năm đóng góp (mỗi năm đóng từ 2014 tính bằng <strong>2 tháng</strong> thu nhập đóng BHXH) hoặc dựa theo thời gian đã hưởng lương hưu còn lại (lên tới 48 tháng lương hưu nếu qua đời trong 2 tháng đầu nhận lương hưu) [1.2.5, 1.2.9].
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full flex items-center justify-between p-5 text-left font-extrabold text-slate-900 hover:bg-slate-50 transition"
            >
              <span>2. Người tham gia có thể thay đổi mức đóng và phương thức đóng khi nào?</span>
              {openFaq === 1 ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
            </button>
            {openFaq === 1 && (
              <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-750 leading-relaxed">
                <p>
                  Người tham gia Bảo hiểm xã hội tự nguyện hoàn toàn <strong>có thể chủ động thay đổi</strong> mức thu nhập làm căn cứ đóng (từ 1,5 triệu đến 50,6 triệu) hoặc phương thức đóng (hàng tháng, 3 tháng, 6 tháng, đóng một lần cho nhiều năm...) sau khi <strong>kết thúc chu kỳ đóng cũ đã đăng ký trước đó</strong>.
                </p>
                <p className="mt-2.5">
                  Để thực hiện điều chỉnh, bạn chỉ cần thông báo cho Nhân viên thu (Đại lý thu) tại thời điểm chuẩn bị đóng tiền cho chu kỳ tiếp theo mà không ảnh hưởng tới quá trình tích lũy số năm tham gia bảo hiểm trước đó.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}