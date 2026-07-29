/**
 * Component hiển thị Giải pháp số hóa cho Nhân viên thu BHXH & BHYT
 * Developed by: Long Web Studio
 */
export default function InsuranceSolution() {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-emerald-950 px-6 py-16 shadow-xl rounded-3xl sm:px-16 border border-emerald-900 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 text-center lg:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
              Giải pháp ngách độc quyền
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Văn phòng số cho nhân viên thu bảo hiểm
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Giải pháp số hóa giúp xóa bỏ quy trình tư vấn thủ công. Hỗ trợ đại lý khẳng định uy tín cá nhân, tự động hóa bảng tính mức đóng và thu hút người dân tham gia tại địa phương.
            </p>
            <div className="mt-6">
              <a 
                href="tel:0374638603" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-sm hover:bg-emerald-400 transition-all active:scale-[0.98]"
              >
                Liên hệ Zalo: 0374 638 603
              </a>
            </div>
          </div>
  
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-2">🌟</span>
              <h4 className="text-base font-bold text-emerald-400 mb-1">Minh bạch danh tính cá nhân</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Hiển thị rõ ràng họ tên, chức danh và địa điểm làm việc thực tế tại cơ sở, tạo dựng niềm tin tuyệt đối với người dân.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-2">🧮</span>
              <h4 className="text-base font-bold text-emerald-400 mb-1">Bảng tính lương hưu tự động</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Bà con tự nhập tuổi để tính số tiền đóng hằng tháng (đã trừ nhà nước hỗ trợ) và mức lương hưu nhận được sau này.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-2">📅</span>
              <h4 className="text-base font-bold text-emerald-400 mb-1">Nhắc hạn tái tục bảo hiểm</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Hệ thống theo dõi và tự động nhắc lịch gia hạn sổ BHXH, thẻ BHYT khi gần đến hạn, giúp đại lý thu duy trì và không bỏ sót khách hàng cũ.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-2">🚀</span>
              <h4 className="text-base font-bold text-emerald-400 mb-1">Đã kiểm chứng thực tế</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Hệ thống vận hành mượt mà trên nền tảng di động cũ qua case study thực tế tại trang hotham.vn.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  