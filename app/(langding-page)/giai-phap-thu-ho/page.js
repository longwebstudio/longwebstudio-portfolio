// app/giai-phap-thu-ho/page.js

import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import BHYTCalculatorWidget from '@/components/BHYTCalculatorWidget'; // Nhúng Widget Client

export const metadata = {
  title: 'Thiết Kế Web Trợ Lý Số Đại Lý Thu BHXH, BHYT | Long Web Studio',
  description: 'Giải pháp website trợ lý số tối ưu cho nhân viên thu bảo hiểm xã hội, bảo hiểm y tế tự nguyện. Tự động tính phí đóng, quản lý thời hạn và gửi tin nhắc Zalo 1-click.',
};

export default function InsuranceLandingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex-grow space-y-16">
      
      {/* 1. Header & Hero Title */}
      <FadeIn delay={0.1}>
        <header className="text-center space-y-4">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
            Giải pháp chuyên biệt
          </span>
          <h1 className="text-3xl font-black text-slate-950 sm:text-5xl tracking-tight leading-tight">
            Vì Sao Nhân Viên Thu BHXH, BHYT <br /> Nên Có Website Riêng?
          </h1>
        </header>
      </FadeIn>

      {/* 2. Thực trạng & Nỗi đau khách hàng */}
      <FadeIn delay={0.2}>
        <div className="bg-slate-900 text-slate-100 p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-6">
          <blockquote className="border-l-4 border-red-500 pl-4 italic text-slate-300">
            &ldquo;Tôi đã có Facebook và Zalo, cần gì thêm website?&rdquo;
          </blockquote>
          <p className="text-sm text-slate-400 leading-relaxed">
            Đó là câu hỏi rất nhiều người đặt ra. Nhưng hãy thử nhìn vào một ngày làm việc thực tế của bạn:
          </p>
          <ul className="space-y-3 text-sm text-slate-300 pl-4 list-disc marker:text-red-500">
            <li>Mỗi ngày có nhiều người nhắn tin hỏi lại các câu hỏi chính sách giống nhau.</li>
            <li>Mỗi tháng bạn phải tự rà soát sổ sách và gọi điện nhắc hàng chục khách hàng đến hạn đóng.</li>
            <li>Muốn chia sẻ thông tin chính sách hữu ích nhưng bài viết nhanh chóng bị trôi đi mất trên Facebook.</li>
            <li>Khi có người quen giới thiệu, bạn lại phải lặp lại quy trình gửi ảnh chụp bảng giá, giải thích thủ tục dài dòng qua tin nhắn.</li>
          </ul>
          <p className="text-sm font-semibold text-slate-200 pt-2">
            Website sẽ không thay bạn tư vấn hoàn toàn, nhưng nó sẽ chuẩn bị chu đáo nhất mọi thông tin để cuộc tư vấn của bạn thành công tốt đẹp.
          </p>
        </div>
      </FadeIn>

      {/* 3. Giá trị website mang lại */}
      <section className="space-y-8">
        <h2 className="text-xl font-black text-slate-950 text-center sm:text-left">
          Một Website Có Thể Làm Gì Cho Bạn?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl">⏰</span>
            <h3 className="font-bold text-slate-900 text-sm">1. Làm việc liên tục 24/7</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Ngay cả khi bạn đang nghỉ ngơi, người dân vẫn có thể truy cập để tự tra cứu phí đóng BHXH tự nguyện, BHYT hộ gia đình và gửi yêu cầu đăng ký tư vấn trực tuyến.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl">🤝</span>
            <h3 className="font-bold text-slate-900 text-sm">2. Xây dựng niềm tin vững chắc</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Trang đích hiển thị thông tin rõ ràng về bạn, giấy tờ đại lý ủy quyền và ý kiến đánh giá từ những người dân bạn đã hỗ trợ trước đó.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-slate-900 text-sm">3. Tiết kiệm thời gian trả lời</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Thay vì giải thích một chính sách hàng chục lần, bạn chỉ cần gửi một liên kết hướng dẫn trực quan trên web để người dân chủ động tìm hiểu trước.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl">📱</span>
            <h3 className="font-bold text-slate-900 text-sm">4. Chăm sóc khách hàng tự động</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Hệ thống quản lý thông minh sẽ nhắc nhở các lịch gia hạn, chuẩn bị sẵn tin nhắn Zalo/SMS nộp phí gia hạn để bạn gửi nhanh chỉ trong 1-Click.</p>
          </div>
        </div>
      </section>

      {/* 4. CHÈN TRỰC TIẾP MÁY TÍNH THỬ NGHIỆM ĐỂ TĂNG TỶ LỆ CHUYỂN ĐỔI */}
      <section className="py-6 border-y border-slate-100">
        <div className="text-center mb-6">
          <h2 className="text-lg font-black text-slate-950">Trải Nghiệm Tính Năng Sẽ Tích Hợp Trên Web Của Bạn</h2>
          <p className="text-xs text-slate-500 mt-1">Dưới đây là máy tính tự động tính phí BHYT hộ gia đình lũy tiến chuẩn mực năm 2026:</p>
        </div>
        <BHYTCalculatorWidget />
      </section>

      {/* 5. Quy trình đồng hành của Long Web Studio */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-slate-950">Quy Trình Thiết Kế Tại Long Web Studio</h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p><strong>Bước 1: Tìm hiểu quy trình thực tế</strong><br />Lắng nghe cách bạn đang tìm kiếm người dân tham gia, cách bạn theo dõi thời hạn đóng và chăm sóc khách hàng hàng ngày để tối ưu tính năng tương ứng.</p>
          <p><strong>Bước 2: Thiết kế giải pháp cá nhân hóa</strong><br />Không sử dụng các giao diện đại trà. Website của bạn sẽ được thiết kế chuẩn chỉ dựa trên đặc thù địa bàn và thói quen làm việc thực tế của bạn.</p>
          <p><strong>Bước 3: Triển khai và Tối ưu di động</strong><br />Trang web được lập trình bằng Next.js siêu nhẹ, tải trang tức thì, giao diện hiển thị xuất sắc trên điện thoại giúp bạn mang đi tư vấn trực tiếp tại nhà dân dễ dàng.</p>
          <p><strong>Bước 4: Đồng hành sau bàn giao</strong><br />Hướng dẫn bạn cách cập nhật các chính sách mới, sử dụng bảng quản lý người đóng và khai thác hiệu quả website để tối đa hóa số tiền hoa hồng thu hộ.</p>
        </div>
      </section>

      {/* 6. Hộp kêu gọi hành động lớn (CTA) */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8 sm:p-10 rounded-2xl text-center space-y-6 shadow-md">
        <h3 className="text-xl sm:text-2xl font-black">Biến Website Thành Trợ Lý Số Của Bạn Ngay Hôm Nay</h3>
        <p className="text-xs text-red-100 max-w-md mx-auto leading-relaxed">
          Để bạn có thêm thời gian phát triển mạng lưới, xây dựng uy tín lâu dài và gia tăng thu nhập thụ động bền vững.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow" className="bg-white text-red-600 hover:bg-slate-50 font-bold py-3 px-8 rounded-lg text-xs shadow-sm transition-all">
            💬 Trao đổi trực tiếp qua Zalo (0966.570.913)
          </a>
          <a href="mailto:contact@longwebstudio.io.vn" className="bg-red-950/20 hover:bg-red-950/30 text-white font-bold py-3 px-8 rounded-lg text-xs transition-all border border-white/20">
            Gửi Email yêu cầu tư vấn
          </a>
        </div>
      </section>

    </div>
  );
}