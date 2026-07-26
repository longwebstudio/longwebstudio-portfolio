export default function SeoIntro() {
  return (
    <section className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-blue-800 mb-3 leading-snug">
        Quy Định Mức Đóng Bảo Hiểm Y Tế (BHYT) Hộ Gia Đình Từ Tháng 7/2026
      </h2>

      <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
        <p>
          Căn cứ quy định của pháp luật về Bảo hiểm y tế hiện hành, <strong>mức đóng BHYT tháng 7/2026</strong> đối với đối tượng tham gia theo hộ gia đình được xác định dựa trên mức lương cơ sở (áp dụng 2.530.000 đồng/tháng).
        </p>

        <p>
          Hệ thống hỗ trợ tự động tính toán <strong>mức đóng bảo hiểm y tế hộ gia đình</strong> theo nguyên tắc giảm trừ tỷ lệ đóng cho các thành viên cùng tham gia. Công cụ ghi nhận chính xác danh sách các thành viên đóng BHYT hộ gia đình trong năm tài chính để xác định đúng thứ tự tính giảm trừ (từ người thứ hai trở đi) mà không tính trùng chi phí cho người đã đóng trước đó.
        </p>

        <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200/80 leading-normal">
          <p className="font-semibold mb-1 text-amber-950">⚠️ Quy định về xét giảm trừ mức đóng:</p>
          <p>
            Các thành viên trong hộ gia đình đã được cấp thẻ BHYT theo các nhóm đối tượng khác (như người lao động, học sinh - sinh viên, đối tượng do Ngân sách Nhà nước đóng hoặc hỗ trợ đóng...) <strong>không được tính vào số thành viên để xác định mức giảm trừ</strong> khi tham gia BHYT hộ gia đình.
          </p>
        </div>
      </div>
    </section>
  );
}