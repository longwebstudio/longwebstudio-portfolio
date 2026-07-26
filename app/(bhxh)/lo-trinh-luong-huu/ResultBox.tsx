// app/(bhxh)/lo-trinh-luong-huu/ResultBox.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Calendar, Award, ShieldCheck, Code2, AlertCircle } from 'lucide-react';

interface ResultProps {
  name: string;
  data: {
    currentAgeYears: number;
    currentAgeMonths: number;
    lawRetirementAgeYears: number;
    lawRetirementAgeMonths: number;
    lawRetirementMonth: number;
    lawRetirementYear: number;
    eligibleRetirementMonth: number;
    eligibleRetirementYear: number;
    yearsToLawRetire: number;
    periodicYears: number;
    lumpSumYears: number;
    totalAtLawRetire: number;
    isDelayed: boolean;
  };
}

function formatAgeStr(years: number, months: number): string {
  if (months === 0) return `${years} tuổi`;
  return `${years} tuổi ${months} tháng`;
}

export default function ResultBox({ name, data }: ResultProps) {
  const [copied, setCopied] = useState(false);
  
  const isDelayed = data.eligibleRetirementYear > data.lawRetirementYear || 
    (data.eligibleRetirementYear === data.lawRetirementYear && data.eligibleRetirementMonth > data.lawRetirementMonth);

  const handleCopyZalo = async () => {
    const birthYear = data.lawRetirementYear - data.lawRetirementAgeYears;
    const birthMonth = data.lawRetirementMonth - data.lawRetirementAgeMonths <= 0 
      ? (data.lawRetirementMonth - data.lawRetirementAgeMonths) + 12 
      : data.lawRetirementMonth - data.lawRetirementAgeMonths;
    const genderType = data.lawRetirementAgeYears === 62 || data.lawRetirementAgeYears === 61 || (data.lawRetirementAgeYears === 60 && data.lawRetirementAgeMonths > 0) ? 'nam' : 'nu';
    const originalPaidYears = Math.max(0, data.totalAtLawRetire - data.yearsToLawRetire);

    // THIẾT LẬP THAM SỐ TRUY VẤN BẰNG TIẾNG VIỆT KHÔNG DẤU
    const params = new URLSearchParams();
    params.set('hoten', name);
    params.set('thangsinh', birthMonth.toString());
    params.set('namsinh', birthYear.toString());
    params.set('gioitinh', genderType);
    params.set('namdadong', originalPaidYears.toString());

    const dynamicCustomerLink = `https://www.longwebstudio.io.vn/lo-trinh-luong-huu{params.toString()}`;

    const textTarget = 
`🔴 BÁO CÁO TÍNH TUỔI NGHỈ HƯU VÀ LỘ TRÌNH ĐÓNG BHXH TỰ NGUYỆN CHUẨN XÁC 🔴

Chào anh/chị ${name}, kết hợp sự tận tình của nhân viên thu và thuật toán tính toán từ hệ thống, em gửi anh/chị kết quả phân tích:

⏱️ 1. THÔNG TIN TÍNH TUỔI NGHỈ HƯU LUẬT ĐỊNH
- Tuổi nghỉ hưu: ${formatAgeStr(data.lawRetirementAgeYears, data.lawRetirementAgeMonths)} (Tháng ${data.lawRetirementMonth}/${data.lawRetirementYear})
- Mốc ĐỦ ĐIỀU KIỆN ĐÓNG GỘP: Tháng ${data.eligibleRetirementMonth}/${data.eligibleRetirementYear}
${isDelayed ? `⚠️ Lưu ý: Thời gian đóng chưa đạt 10 năm tại tuổi nghỉ hưu, cần đóng kéo dài đến Tháng ${data.eligibleRetirementMonth}/${data.eligibleRetirementYear}.` : `✓ Đạt chuẩn nền: Đủ điều kiện đóng gộp do đã tích lũy từ đủ 10 năm đóng BHXH trở lên.`}

🗺️ 2. PHƯƠNG ÁN ĐÓNG (TỐI THIỂU 15 NĂM)
- Giai đoạn 1: Đóng định kỳ ${data.periodicYears} năm.
${data.lumpSumYears > 0 ? `- Giai đoạn 2: Đóng một lần ${data.lumpSumYears} năm còn thiếu.` : `- Giai đoạn 2: Đạt chuẩn mốc nhận lương hưu.`}

🎁 3. DỰ TÍNH CHẾ ĐỘ NHẬN LẠI
- Lương hưu nhận hằng tháng, điều chỉnh tăng theo quy định (Chống trượt giá giá trị tiền tệ).
- Thẻ BHYT hưu trí MIỄN PHÍ, quyền lợi chi trả cao lên đến 95% đúng tuyến.

💰 4. ĐỊNH MỨC THỰC ĐÓNG (Mức nền 1.5tr)
- Thực đóng chỉ từ: 198.000 ₫/tháng (Đã hỗ trợ: Nhà nước & Địa phương giảm trừ 132.000đ).
- Tỷ lệ hưởng: 40% (Lao động Nam đóng đủ 15 năm).
- Lương hưu dự kiến: 871.200 ₫ (đã áp dụng hệ số trượt giá 1.452).

👉 Xem lại chi tiết bảng lộ trình thiết lập riêng của anh/chị tại: ${dynamicCustomerLink}
📊 Để tự cấu hình nâng mức đóng cao hơn nhằm tăng lương hưu, mời anh/chị xem tại: https://www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen`;

    try {
      await navigator.clipboard.writeText(textTarget);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-5">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold uppercase tracking-wide">
            <Code2 size={14} /> <span>Thuật toán phát triển bởi Long Web Studio</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mt-1">Khách hàng: {name}</h3>
        </div>
        <button onClick={handleCopyZalo} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${copied ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Đã copy' : 'Copy mẫu Zalo'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-xl border text-center">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Tuổi nghỉ hưu luật định</span>
          <span className="text-sm font-black text-slate-700 block mt-1">Tháng {data.lawRetirementMonth}/{data.lawRetirementYear}</span>
          <span className="text-[10px] text-slate-400">({formatAgeStr(data.lawRetirementAgeYears, data.lawRetirementAgeMonths)})</span>
        </div>
        <div className={`p-3 rounded-xl border text-center ${isDelayed ? 'bg-amber-50/60 border-amber-200' : 'bg-blue-50/60 border-blue-200'}`}>
          <span className="text-[10px] text-slate-500 uppercase font-bold">Mốc Đủ Điều Kiện Đóng Gộp</span>
          <span className={`text-sm font-black block mt-1 ${isDelayed ? 'text-amber-600' : 'text-blue-600'}`}>Tháng {data.eligibleRetirementMonth}/{data.eligibleRetirementYear}</span>
          <span className="text-[10px] text-slate-400">{isDelayed ? 'Đã điều chỉnh tịnh tiến' : 'Đủ điều kiện'}</span>
        </div>
      </div>

      {isDelayed && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl flex gap-2 text-xs leading-relaxed">
          <AlertCircle size={16} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Log hệ thống:</strong> Tại mốc tính tuổi nghỉ hưu luật định ({data.lawRetirementYear}), tổng thời gian đóng BHXH mới đạt {data.totalAtLawRetire} năm, chưa thỏa mãn điều kiện <i>có từ đủ 10 năm đóng trở lên</i>. Hệ thống tự động cấu hình kéo dài phương thức đóng định kỳ để thỏa mãn mốc tuổi đủ điều kiện.
          </div>
        </div>
      )}

      <div className="space-y-4 relative border-l-2 border-slate-200 pl-4 ml-1">
        <div className="relative">
          <div className="absolute -left-[23px] top-0.5 bg-blue-100 p-0.5 rounded-full"><Calendar size={12} /></div>
          <h4 className="text-xs font-bold text-slate-900 uppercase">Giai đoạn 1: Thực thi phương thức đóng định kỳ</h4>
          <p className="text-xs text-slate-600">Đóng định kỳ liên tục trong <strong>{data.periodicYears} năm</strong> từ nay đến thời điểm đủ điều kiện nền để thiết lập móng đóng an toàn.</p>
        </div>
        {data.lumpSumYears > 0 && (
          <div className="relative">
            <div className="absolute -left-[23px] top-0.5 bg-emerald-100 p-0.5 rounded-full"><Award size={12} /></div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase">Giai đoạn 2: Phương thức đóng một lần cho những năm còn thiếu</h4>
            <p className="text-xs text-slate-600">Nộp gộp một lần duy nhất cho <strong>{data.lumpSumYears} năm còn thiếu</strong> ngay tại mốc thời gian đủ điều kiện để chốt hồ sơ nhận chế độ hưu trí.</p>
          </div>
        )}
        <div className="relative">
          <div className="absolute -left-[23px] top-0.5 bg-indigo-100 p-0.5 rounded-full"><ShieldCheck size={12} /></div>
          <h4 className="text-xs font-bold text-indigo-900 uppercase">Output hệ thống dự tính nhận lại</h4>
          <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
            <li>Nhận lương hưu hằng tháng được điều chỉnh tăng định kỳ theo quy định.</li>
            <li>Cấp thẻ BHYT hưu trí miễn phí, quỹ bảo hiểm chi trả 95% chi pháp khám chữa bệnh đúng tuyến.</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-xl border text-[11px] text-slate-500">
        <strong>Thông số dòng tiền:</strong> Thực đóng chỉ từ <strong>198.000 đ/tháng</strong> nhờ ngân sách giảm trừ 132.000đ. Mức lương hưu dự kiến hằng tháng nhận về đạt mốc khoảng 871.200 đ/tháng.
      </div>
    </motion.div>
  );
}
