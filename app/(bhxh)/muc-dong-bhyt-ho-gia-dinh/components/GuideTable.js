import { HelpCircle } from 'lucide-react';

export default function GuideTable({ luongCoSo, months }) {
  // Mức đóng BHYT của 1 người trong 1 tháng (4.5% lương cơ sở)
  const mucDongMotThangChuan = luongCoSo * 0.045;
  
  // Tính số tiền gốc của người thứ 1 theo số tháng đã chọn (3, 6 hoặc 12 tháng)
  const mucGocTheoThangChon = mucDongMotThangChuan * months;

  return (
    <section className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2 text-sm md:text-base">
          <HelpCircle size={18} className="text-blue-600" />
          Bảng giảm trừ mức đóng hộ gia đình (Tính cho {months} tháng)
        </h3>
        <span className="text-[11px] bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded-md border border-blue-100">
          Lương cơ sở: {luongCoSo.toLocaleString('vi-VN')} đ
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <th className="p-2.5 font-semibold">Thứ tự người đóng</th>
              <th className="p-2.5 font-semibold">Tỷ lệ giảm trừ</th>
              <th className="p-2.5 font-semibold text-right">Số tiền đóng ({months} tháng)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="p-2.5 font-medium text-slate-800">Người thứ 1</td>
              <td className="p-2.5">100% mức đóng chuẩn</td>
              <td className="p-2.5 text-right font-mono font-semibold text-slate-900">
                {Math.round(mucGocTheoThangChon * 1.0).toLocaleString('vi-VN')} đ
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-800">Người thứ 2</td>
              <td className="p-2.5">70% mức người thứ 1</td>
              <td className="p-2.5 text-right font-mono font-semibold text-slate-900">
                {Math.round(mucGocTheoThangChon * 0.7).toLocaleString('vi-VN')} đ
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-800">Người thứ 3</td>
              <td className="p-2.5">60% mức người thứ 1</td>
              <td className="p-2.5 text-right font-mono font-semibold text-slate-900">
                {Math.round(mucGocTheoThangChon * 0.6).toLocaleString('vi-VN')} đ
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-800">Người thứ 4</td>
              <td className="p-2.5">50% mức người thứ 1</td>
              <td className="p-2.5 text-right font-mono font-semibold text-slate-900">
                {Math.round(mucGocTheoThangChon * 0.5).toLocaleString('vi-VN')} đ
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-800">Từ người thứ 5 trở đi</td>
              <td className="p-2.5">40% mức người thứ 1</td>
              <td className="p-2.5 text-right font-mono font-semibold text-slate-900">
                {Math.round(mucGocTheoThangChon * 0.4).toLocaleString('vi-VN')} đ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-400 italic mt-3.5 leading-normal">
        * Lưu ý: Thứ tự người đóng chỉ áp dụng dựa trên số lượng thành viên thực tế tham gia đóng tiền trong đợt này (không tính những người tích chọn "Đã có BHYT").
      </p>
    </section>
  );
}
