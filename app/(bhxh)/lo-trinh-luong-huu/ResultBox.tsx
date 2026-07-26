import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Calendar, Award, ShieldCheck, HelpCircle, ExternalLink, AlertTriangle } from 'lucide-react';

interface ResultProps {
  name: string;
  data: {
    currentAge: number;
    lawRetirementAge: number;
    lawRetirementYear: number;
    eligibleRetirementAge: number;
    eligibleRetirementYear: number;
    yearsToLawRetire: number;
    periodicYears: number;
    lumpSumYears: number;
    totalAtRetire: number;
  };
}

// Hàm helper chuyển đổi số thập phân sang định dạng "X tuổi Y tháng"
function formatAge(ageDecimal: number): string {
  const years = Math.floor(ageDecimal);
  const remainder = ageDecimal - years;
  const months = Math.round(remainder * 12);
  
  if (months === 0) return `${years} tuổi`;
  return `${years} tuổi ${months} tháng`;
}

export default function ResultBox({ name, data }: ResultProps) {
  const [copied, setCopied] = useState(false);

  // Kiểm tra xem khách có phải kéo dài thời gian đóng qua tuổi hưu quy định không
  const isDelayed = data.eligibleRetirementYear > data.lawRetirementYear;

  const handleCopyZalo = async () => {
    const textTarget = 
`🔴 BÁO CÁO TƯ VẤN LỘ TRÌNH LƯƠNG HƯU CHUẨN LUẬT 🔴

Chào anh/chị ${name}, em gửi lộ trình tích lũy BHXH tự nguyện áp dụng lộ trình tăng tuổi nghỉ hưu mới nhất:

⏱️ 1. THÔNG TIN ĐIỀU KIỆN NGHỈ HƯU
- Tuổi nghỉ hưu theo quy định pháp luật: ${formatAge(data.lawRetirementAge)} (Vào năm ${data.lawRetirementYear})
- Tuổi ĐỦ ĐIỀU KIỆN ĐÓNG GỘP thực tế: ${formatAge(data.eligibleRetirementAge)} (Vào năm ${data.eligibleRetirementYear})
${isDelayed ? `⚠️ Lưu ý: Do chưa đủ 10 năm đóng tại năm nghỉ hưu quy định, anh/chị cần đóng định kỳ kéo dài đến năm ${data.eligibleRetirementYear} để đạt mốc đóng gộp.` : `✓ Chúc mừng: Anh/chị đủ điều kiện nền để đóng gộp ngay khi chạm mốc tuổi hưu quy định.`}

🗺️ 2. LỘ TRÌNH ĐÓNG BẢO HIỂM ĐỂ ĐỦ 15 NĂM HƯỞNG HƯU
- Giai đoạn 1 (Đóng định kỳ): Đóng liên tục ${data.periodicYears} năm từ nay cho đến năm ${data.eligibleRetirementYear} để đạt đủ mốc nền tảng 10 năm đóng bảo hiểm.
${data.lumpSumYears > 0 ? `- Giai đoạn 2 (Đóng gộp 1 lần): Tại năm ${data.eligibleRetirementYear}, tiến hành nộp gộp một lần cho ${data.lumpSumYears} năm còn thiếu để chốt sổ lĩnh lương hưu ngay.` : `- Giai đoạn 2: Đạt chuẩn mốc đóng nhận lương hưu trực tiếp.`}

🎁 3. QUYỀN LỢI NHẬN LẠI TRỌN ĐỜI
- Lương hưu nhận đều đặn hàng tháng (Nhà nước tăng theo trượt giá).
- Thẻ BHYT hưu trí MIỄN PHÍ 100%, đài thọ 95% chi phí khám chữa bệnh đúng tuyến.

💰 4. MỨC ĐÓNG TIẾT KIỆM THAM KHẢO
- Thực đóng chỉ từ 198.000 đ/tháng (Đã trừ 132.000đ ngân sách hỗ trợ).

👉 Truy cập công cụ tính toán chi tiết: https://longwebstudio.io.vn`;

    try {
      await navigator.clipboard.writeText(textTarget);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Lỗi khi sao chép: ', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-5"
    >
      {/* Tiêu đề kết quả */}
      <div className="border-b border-slate-100 pb-4 flex justify-between items-start gap-4">
        <div>
          <p className="text-xs text-blue-600 font-bold tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Kết quả phân tích chuẩn luật
          </p>
          <h3 className="text-lg font-extrabold text-slate-900 mt-1">KH: {name}</h3>
        </div>
        
        <button
          onClick={handleCopyZalo}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            copied ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Đã copy' : 'Copy mẫu Zalo'}
        </button>
      </div>

      {/* Grid hiển thị tuổi theo định dạng Tuổi + Tháng */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <span className="text-[10px] text-slate-500 block uppercase font-bold">Tuổi hưu luật định</span>
          <span className="text-sm font-black text-slate-700 block mt-1">{formatAge(data.lawRetirementAge)}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">(Năm {data.lawRetirementYear})</span>
        </div>
        <div className={`p-3 rounded-xl border text-center ${isDelayed ? 'bg-amber-50/60 border-amber-200' : 'bg-blue-50/60 border-blue-200'}`}>
          <span className="text-[10px] text-slate-500 block uppercase font-bold">Tuổi đủ điều kiện hưu</span>
          <span className={`text-sm font-black block mt-1 ${isDelayed ? 'text-amber-600' : 'text-blue-600'}`}>
            {formatAge(data.eligibleRetirementAge)}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">(Năm {data.eligibleRetirementYear})</span>
        </div>
      </div>

      {/* Khối Cảnh Báo Nghiệp Vụ Đặc Biệt Khi Chưa Đủ Điều Kiện Nền */}
      {isDelayed && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl flex gap-2 text-xs leading-relaxed">
          <AlertTriangle size={16} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong className="font-bold">Cảnh báo nghiệp vụ:</strong> Tại năm nghỉ hưu quy định ({data.lawRetirementYear}), khách hàng mới tích lũy được {data.totalAtRetire} năm đóng (Chưa đủ mốc nền 10 năm). Khách hàng phải đóng tiếp định kỳ thêm <span className="font-bold text-amber-700">{data.eligibleRetirementYear - data.lawRetirementYear} năm qua tuổi hưu</span> để đạt mốc tuổi đủ điều kiện đóng gộp.
          </div>
        </div>
      )}

      {/* Lộ trình đóng chi tiết */}
      <div className="space-y-4 relative border-l-2 border-slate-200 pl-4 ml-1">
        <div className="relative">
          <div className="absolute -left-[23px] top-0.5 bg-blue-100 text-blue-600 p-0.5 rounded-full border border-white">
            <Calendar size={12} />
          </div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Giai đoạn 1: Đóng định kỳ tích lũy nền</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Thực hiện đóng định kỳ liên tục trong <strong className="text-blue-600">{data.periodicYears} năm</strong> (từ nay đến năm {data.eligibleRetirementYear}) để tài khoản bảo hiểm đạt chuẩn mốc đóng tối thiểu 10 năm nền.
          </p>
        </div>
        
        {data.lumpSumYears > 0 && (
          <div className="relative">
            <div className="absolute -left-[23px] top-0.5 bg-emerald-100 text-emerald-600 p-0.5 rounded-full border border-white">
              <Award size={12} />
            </div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Giai đoạn 2: Đóng gộp 1 lần hưởng hưu</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ngay tại năm {data.eligibleRetirementYear}, hệ thống kích hoạt quyền đóng gộp. Khách hàng thực hiện <strong className="text-emerald-600">ĐÓNG GỘP 1 LẦN cho {data.lumpSumYears} năm còn thiếu</strong> để nhận ngay quyết định hưởng lương hưu mà không cần chờ đợi thêm.
            </p>
          </div>
        )}

        <div className="relative">
          <div className="absolute -left-[23px] top-0.5 bg-blue-50 text-indigo-600 p-0.5 rounded-full border border-white">
            <ShieldCheck size={12} />
          </div>
          <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">Quyền lợi cam kết nhận lại</h4>
          <ul className="text-xs text-slate-600 mt-1 list-disc pl-4 space-y-1">
            <li>Nhận lương hưu hằng tháng ổn định, có chế độ chống trượt giá tiền tệ của Nhà nước.</li>
            <li>Cấp thẻ BHYT hưu trí <strong>miễn phí trọn đời</strong> với mức hưởng cao lên tới 95% chi phí đúng tuyến.</li>
          </ul>
        </div>
      </div>

      {/* Dòng tiền tối thiểu tham khảo từ hệ thống */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
        <HelpCircle size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-800">Dòng tiền tối thiểu tham khảo:</strong> Đăng ký mức thu nhập 1.500.000đ, nhờ ngân sách giảm trừ 132.000đ, người dân <strong className="text-blue-600">thực đóng chỉ 198.000 đ/tháng</strong>. Lương hưu dự kiến tương ứng nhận về đạt mốc 871.200 đ/tháng.
        </p>
      </div>

      {/* Button link điều hướng nâng cao */}
      <div className="pt-2">
        <a 
          href="https://longwebstudio.io.vn/go/tinh-bhxh-tu-nguyen" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm"
        >
          Mở bảng tính toán chuyên sâu
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}
