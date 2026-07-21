import React from 'react';

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900">Những Quyền Lợi Hàng Đầu Khi Tham Gia</h2>
        <p className="text-slate-700 mt-2 text-base">
          Bảo hiểm xã hội tự nguyện là điểm tựa an sinh nhân văn, mang lại sự bảo vệ trọn đời cho bản thân và gia đình.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
            01
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Nhận Lương Hưu Trực Tiếp</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Nhận tiền hưu trí định kỳ hằng tháng khi đóng đủ từ 15 năm trở lên. Số tiền lương hưu được điều chỉnh tăng định kỳ theo chỉ số giá tiêu dùng CPI nhằm chống trượt giá đồng tiền.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
            02
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Cấp Thẻ BHYT Trọn Đời</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Ngay khi hưởng lương hưu, bạn được cấp thẻ Bảo hiểm y tế miễn phí trọn đời (quỹ BHXH tự nguyện đóng). Thẻ có mức hưởng lên tới <strong>95% chi phí khám chữa bệnh đúng tuyến</strong>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
            03
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Linh Hoạt Lựa Chọn Đóng</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Được tự quyết định mức thu nhập làm căn cứ đóng phù hợp với tài chính cá nhân (từ 1.500.000 VNĐ đến tối đa 50.600.000 VNĐ/tháng) quy định tại <strong>Điều 87 Luật BHXH số 58/2014/QH13</strong>. Linh hoạt chọn phương thức đóng hàng tháng, đóng trước 3, 6, 12 tháng hoặc đóng gộp từ 2 đến 5 năm để nhận chiết khấu tốt nhất.
          </p>
        </div>
      </div>
    </section>
  );
}