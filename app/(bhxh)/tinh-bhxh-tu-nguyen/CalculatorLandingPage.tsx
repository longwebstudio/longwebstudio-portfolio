'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle, 
  Award, 
  Search,
  ArrowRight,
  Info,
  MessageSquareShare,
  HeartHandshake,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const MIN_INCOME = 1500000;
const MAX_INCOME = 50600000; // Nâng mức thu nhập tối đa lên 50.600.000đ (20 lần lương cơ sở 2.530.000đ từ T7/2026)
const STEP = 50000;
const STATE_SUPPORT = 66000;
const LOCAL_SUPPORT = 66000;

// Hệ số trượt giá (hệ số điều chỉnh thu nhập tháng đã đóng BHXH để chống lạm phát)
const INFLATION_COEFFICIENT = 1.452;

// Lãi suất đầu tư quỹ BHXH bình quân tháng theo quy định thực tế là 0.31%/tháng (~ 3.72%/năm)
const MONTHLY_INTEREST_RATE = 0.0031; 

const PAYMENT_CYCLES = [
  { label: 'Hàng tháng', months: 1 },
  { label: '3 tháng', months: 3 },
  { label: '6 tháng', months: 6 },
  { label: '12 tháng (1 năm)', months: 12 },
  { label: '24 tháng (2 năm)', months: 24 },
  { label: '3 năm (36 tháng)', months: 36 },
  { label: '4 năm (48 tháng)', months: 48 },
  { label: '5 năm (60 tháng)', months: 60 },
];

export default function CalculatorLandingPage() {
  const [selectedIncome, setSelectedIncome] = useState<number>(1500000);
  const [selectedCycle, setSelectedCycle] = useState<number>(1); 
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam'); 
  const [yearsOfContribution, setYearsOfContribution] = useState<number>(15); // Mặc định thời gian tích lũy khởi điểm là 15 năm
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Thuật toán tính toán đóng phí và chiết khấu đóng trước
  const calculations = useMemo(() => {
    const rawContribution = selectedIncome * 0.22;
    const totalSupport = STATE_SUPPORT + LOCAL_SUPPORT;
    const monthlyContribution = Math.max(0, rawContribution - totalSupport);
    
    let totalPayment = 0;
    let totalSupportSaved = 0;
    const undiscountedTotalPayment = monthlyContribution * selectedCycle;

    const isDiscounted = selectedCycle >= 24;

    if (isDiscounted) {
      for (let i = 1; i <= selectedCycle; i++) {
        totalPayment += monthlyContribution / Math.pow(1 + MONTHLY_INTEREST_RATE, i);
        totalSupportSaved += totalSupport / Math.pow(1 + MONTHLY_INTEREST_RATE, i);
      }
      totalPayment = Math.round(totalPayment);
      totalSupportSaved = Math.round(totalSupportSaved);
    } else {
      totalPayment = monthlyContribution * selectedCycle;
      totalSupportSaved = totalSupport * selectedCycle;
    }

    const interestSaved = Math.max(0, undiscountedTotalPayment - totalPayment);

    return {
      rawContribution,
      totalSupport,
      monthlyContribution,
      totalPayment,
      totalSupportSaved,
      undiscountedTotalPayment,
      isDiscounted,
      interestSaved,
    };
  }, [selectedIncome, selectedCycle]);

  // Thuật toán tính tỷ lệ hưởng lương hưu chi tiết dựa trên giới tính và hệ số trượt giá
  const pensionCalculations = useMemo(() => {
    let rate = 0;
    
    if (gender === 'Nam') {
      if (yearsOfContribution >= 15 && yearsOfContribution < 20) {
        // Nam đóng 15 đến dưới 20 năm: 15 năm đầu đạt 40%, mỗi năm sau cộng thêm 1%
        rate = 40 + (yearsOfContribution - 15) * 1;
      } else if (yearsOfContribution >= 20) {
        // Nam từ 20 năm trở lên: 20 năm đầu đạt 45%, mỗi năm sau cộng thêm 2% để chạm trần 75% tại mốc 35 năm
        rate = 45 + (yearsOfContribution - 20) * 2;
      }
    } else { // Nữ giới
      if (yearsOfContribution >= 15) {
        // Nữ đóng từ 15 năm trở lên: 15 năm đầu đạt 45%, mỗi năm sau cộng thêm 2% để chạm trần 75% tại mốc 30 năm
        rate = 45 + (yearsOfContribution - 15) * 2;
      }
    }
    
    const finalRate = Math.min(75, rate); // Giới hạn trần tối đa 75%
    
    const adjustedIncomeBase = selectedIncome * INFLATION_COEFFICIENT;
    const estimatedPensionMonthly = Math.round(adjustedIncomeBase * (finalRate / 100));

    return {
      rate: finalRate,
      adjustedIncomeBase,
      pensionAmount: estimatedPensionMonthly
    };
  }, [selectedIncome, yearsOfContribution, gender]);

  const filteredLevels = useMemo(() => {
    const results = [];
    let currentIdx = 0;
    for (let income = MIN_INCOME; income <= MAX_INCOME; income += STEP) {
      const raw = income * 0.22;
      const act = raw - (STATE_SUPPORT + LOCAL_SUPPORT);
      const matchText = `${income} ${act}`;
      if (!searchQuery || matchText.includes(searchQuery.replace(/\D/g, ''))) {
        results.push({ level: currentIdx, income, contribution: act });
      }
      currentIdx++;
      if (results.length >= 8) break;
    }
    return results;
  }, [searchQuery]);

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName && leadPhone) {
      setSubmitted(true);
    }
  };

  const handleGenderChange = (newGender: 'Nam' | 'Nữ') => {
    setGender(newGender);
    if (newGender === 'Nữ' && yearsOfContribution > 30) {
      setYearsOfContribution(30);
    }
  };

  const handleCopyAndSendZalo = () => {
    const cycleText = selectedCycle === 1 ? 'Hàng tháng' : `${selectedCycle} tháng`;
    const discountNote = calculations.isDiscounted 
      ? `\n- Ưu đãi: Áp dụng chiết khấu đóng trước (lãi suất đầu tư quỹ BHXH ~3.72%/năm)\n- Tiết kiệm thêm từ chiết khấu: ${formatVND(calculations.interestSaved)}`
      : '';
      
    const message = `Kính gửi anh/chị, em xin gửi bảng tính toán chi tiết mức đóng BHXH Tự Nguyện dự kiến (áp dụng từ T7/2026):

1️⃣ THÔNG TIN ĐÓNG PHÍ CHI TIẾT (Quy định tại Điều 87 - Luật BHXH số 58/2014/QH13):
- Mức thu nhập lựa chọn: ${formatVND(selectedIncome)} / tháng
- Mức đóng cơ sở (22%): ${formatVND(calculations.rawContribution)} / tháng
- Ngân sách hỗ trợ (Nhà nước + Địa phương): -132.000đ / tháng
- Mức đóng thực tế: ${formatVND(calculations.monthlyContribution)} / tháng
- Phương thức đóng: ${cycleText}${discountNote}
👉 TỔNG SỐ TIỀN THỰC ĐÓNG CẢ CHU KỲ: ${formatVND(calculations.totalPayment)}
(Tổng số tiền được giảm trừ: ${formatVND(calculations.totalSupportSaved + calculations.interestSaved)})

2️⃣ DỰ TÍNH QUYỀN LỢI LƯƠNG HƯU TƯƠNG LAI (*Dự tính tại năm tra cứu):
- Đối tượng: Lao động ${gender}
- Dự kiến thời gian tích lũy: ${yearsOfContribution} năm đóng BHXH
- Hệ số trượt giá bảo toàn tiền tệ: ${INFLATION_COEFFICIENT}
- Mức thu nhập tính lương hưu sau điều chỉnh: ${formatVND(pensionCalculations.adjustedIncomeBase)}
- Tỷ lệ hưởng lương hưu: ${pensionCalculations.rate}%
👉 MỨC LƯƠNG HƯU NHẬN HẰNG THÁNG: ${formatVND(pensionCalculations.pensionAmount)} / tháng (trọn đời)
- Thẻ BHYT hưu trí: Được cấp MIỄN PHÍ TRỌN ĐỜI (hưởng 95% đúng tuyến) từ thời điểm nhận lương hưu.

* Chú ý: Mức lương hưu sau này được tính dựa vào Hệ số trượt giá hàng năm theo quy định của Nhà nước, vì vậy mức lương hưu được tính trên đây chỉ là dự kiến tại năm tra cứu.

Anh/chị cần hỗ trợ thêm thông tin hoặc làm hồ sơ đăng ký cứ nhắn em nhé!`;

    navigator.clipboard.writeText(message).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3050);

      const cleanPhone = leadPhone.replace(/\D/g, '');
      if (cleanPhone) {
        window.open(`https://zalo.me/${cleanPhone}`, '_blank');
      }
    }).catch(err => {
      console.error('Không thể sao chép văn bản: ', err);
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 text-slate-900 py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-300 px-3.5 py-1.5 rounded-full text-emerald-900 text-sm font-bold">
              <span>Bảng đóng cập nhật mới nhất từ T7/2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Tự Chủ Tài Chính Hưu Trí <br />
              <span className="text-emerald-800">An Nhàn Tuổi Già</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
              Lựa chọn mức đóng phù hợp để tích lũy lương hưu hàng tháng và nhận thẻ BHYT miễn phí trọn đời khi về già. Ngân sách nhà nước và địa phương hỗ trợ lên tới 132.000đ/tháng.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#calculator" 
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-lg transition flex items-center gap-2 shadow-sm"
              >
                Tính phí đóng <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#table-lookup" 
                className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-300 font-bold px-6 py-3 rounded-lg transition shadow-sm"
              >
                Bảng giá chi tiết
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl shadow-md border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6 text-emerald-800" />
              <h3 className="font-extrabold text-lg text-slate-900">Chính Sách Hỗ Trợ</h3>
            </div>
            <p className="text-sm text-slate-700 mb-6 leading-relaxed">
              Mức đóng thực tế được giảm trừ trực tiếp nhờ các nguồn kinh phí hỗ trợ an sinh xã hội:
            </p>
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-900">Nhà nước hỗ trợ</span>
                <span className="font-extrabold text-emerald-800">-{formatVND(STATE_SUPPORT)}/tháng</span>
              </div>
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-lg flex justify-between items-center">
                <span className="text-sm font-bold text-blue-900">Ngân sách địa phương</span>
                <span className="font-extrabold text-blue-800">-{formatVND(LOCAL_SUPPORT)}/tháng</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Tổng giảm trừ thực tế:</span>
                <span className="text-rose-750 font-extrabold">-{formatVND(STATE_SUPPORT + LOCAL_SUPPORT)}/tháng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Tính Toán Mức Đóng & Dự Tính Lương Hưu</h2>
          <p className="text-slate-700 mt-2 text-base">
            Kéo chọn mức thu nhập làm căn cứ đóng và chọn số năm dự kiến tham gia để hoạch định kế hoạch hưu trí tương lai của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Khối 1: Chọn thu nhập và phương thức đóng */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="font-extrabold text-base text-slate-900 border-b pb-3 border-slate-100 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
                Cấu hình phương thức đóng phí bảo hiểm
              </h3>
              
              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 flex justify-between">
                  <span>Thu nhập tháng chọn làm căn cứ đóng:</span>
                  <span className="text-emerald-850 font-black text-lg">{formatVND(selectedIncome)}</span>
                </label>
                <input 
                  type="range" 
                  min={MIN_INCOME} 
                  max={MAX_INCOME} 
                  step={STEP} 
                  value={selectedIncome}
                  onChange={(e) => setSelectedIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-xs text-slate-650 mt-2 font-medium">
                  <span>Tối thiểu: {formatVND(MIN_INCOME)}</span>
                  <span>Tối đa: {formatVND(MAX_INCOME)}</span>
                </div>

                <div className="mt-4">
                  <span className="text-xs text-slate-650 font-bold block mb-2">Mốc thu nhập tham khảo nhanh:</span>
                  <div className="flex flex-wrap gap-2">
                    {[1500000,3000000, 5000000, 10000000, 20000000, 30000000, 40000000, 50600000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelectedIncome(val)}
                        className={`px-3 py-1.5 text-xs rounded-lg border-2 transition font-bold ${
                          selectedIncome === val 
                            ? 'bg-emerald-700 border-emerald-750 text-white' 
                            : 'bg-white border-slate-250 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {formatVND(val)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-3">
                  Chọn phương thức đóng (Chu kỳ thanh toán):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PAYMENT_CYCLES.map((cycle) => (
                    <button
                      key={cycle.months}
                      onClick={() => setSelectedCycle(cycle.months)}
                      className={`p-2.5 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                        selectedCycle === cycle.months
                          ? 'border-emerald-700 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-700/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Chu kỳ</span>
                      <span className="font-extrabold text-xs mt-1">{cycle.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Khối 2: Dự toán lương hưu */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="font-extrabold text-base text-slate-900 border-b pb-3 border-slate-100 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
                Thời gian tích lũy đóng BHXH dự kiến
              </h3>

              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2">
                  Giới tính người tham gia bảo hiểm:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2.5 cursor-pointer font-bold text-sm text-slate-800">
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={gender === 'Nam'} 
                      onChange={() => handleGenderChange('Nam')} 
                      className="h-4 w-4 text-emerald-750 focus:ring-emerald-500 border-slate-300"
                    />
                    Nam
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer font-bold text-sm text-slate-800">
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={gender === 'Nữ'} 
                      onChange={() => handleGenderChange('Nữ')} 
                      className="h-4 w-4 text-emerald-750 focus:ring-emerald-500 border-slate-300"
                    />
                    Nữ
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 flex justify-between">
                  <span>Tổng thời gian đóng BHXH:</span>
                  <span className="text-blue-800 font-black text-lg">{yearsOfContribution} năm</span>
                </label>
                <input 
                  type="range" 
                  min={15} 
                  max={gender === 'Nam' ? 35 : 30} // Khống chế động mốc tối đa: Nam tối đa 35 năm, Nữ tối đa 30 năm
                  step={1} 
                  value={yearsOfContribution}
                  onChange={(e) => setYearsOfContribution(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#1e40af' }}
                />
                <div className="flex justify-between text-xs text-slate-655 mt-2 font-medium">
                  <span>Tối thiểu: 15 năm</span>
                  <span>Đạt tỷ lệ tối đa (75%): {gender === 'Nam' ? '35 năm' : '30 năm'}</span>
                </div>
              </div>

              {/* Thông tin giải trình chi tiết từng giới tính & hệ số trượt giá */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl font-medium">
                  <span className="text-xs text-blue-900 font-bold block mb-1">Tỷ lệ hưởng lương hưu hằng tháng</span>
                  <span className="text-2xl font-black text-blue-800 block">{pensionCalculations.rate}%</span>
                  <p className="text-[11px] text-slate-655 mt-2 leading-relaxed">
                    {gender === 'Nam' ? (
                      <span>
                        Lao động <strong className="text-slate-800">Nam</strong> đóng 15 năm hưởng <strong className="text-slate-900">40%</strong>. Từ năm 16 đến 20, mỗi năm cộng <strong className="text-slate-900">1%</strong> (đạt 45% khi đóng đủ 20 năm). Từ năm thứ 21 trở đi, mỗi năm đóng thêm cộng <strong className="text-slate-900">2%</strong>, đạt tỷ lệ hưởng lương hưu tối đa hưởng <strong>75%</strong> khi đóng đủ <strong className="text-emerald-800">35 năm</strong>.
                      </span>
                    ) : (
                      <span>
                        Lao động <strong className="text-slate-800">Nữ</strong> đóng 15 năm hưởng ngay <strong className="text-slate-900">45%</strong>. Từ năm thứ 16 trở đi, mỗi năm đóng thêm được cộng thêm <strong className="text-slate-900">2%</strong>, đạt tỷ lệ hưởng tối đa <strong>75%</strong> khi đóng đủ <strong className="text-emerald-800">30 năm</strong>.
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-emerald-950 font-bold block mb-1">Mức lương hưu nhận hàng tháng</span>
                    <span className="text-2xl font-black text-emerald-800 block">{formatVND(pensionCalculations.pensionAmount)}</span>
                  </div>
                  <p className="text-[11px] text-slate-655 mt-2 leading-relaxed">
                    Đã áp dụng <strong>hệ số trượt giá trị tiền tệ là {INFLATION_COEFFICIENT}</strong> để bảo toàn giá trị đồng tiền và tránh mất giá do lạm phát trước khi nhân tỷ lệ hưu trí.
                  </p>
                </div>
              </div>

              {/* Chú ý quan trọng */}
              <p className="text-[11px] text-rose-700 font-bold leading-relaxed border-t border-slate-100 pt-3">
                ⚠️ Chú ý: Mức lương hưu sau này được tính dựa vào Hệ số trượt giá hàng năm theo quy định của Nhà nước, vì vậy mức lương hưu được tính trên đây chỉ là dự kiến tại năm tra cứu.
              </p>
            </div>

            {/* Khối 3: Quyền lợi BHYT hưu trí */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-start gap-3">
              <HeartHandshake className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-amber-900">Quyền lợi y tế đi kèm khi nhận lương hưu</h4>
                <p className="text-xs text-slate-750 mt-1 leading-relaxed">
                  Ngay khi bắt đầu hưởng lương hưu, bạn được <strong>cấp thẻ BHYT miễn phí trọn đời</strong> (quỹ BHXH tự nguyện đóng) với mức hưởng <strong>95% chi phí khám chữa bệnh đúng tuyến</strong>, vượt trội hơn hẳn thẻ BHYT tự nguyện hộ gia đình thông thường (80%).
                </p>
              </div>
            </div>

          </div>

          {/* Cột phải */}
          <div className="lg:col-span-5 bg-white border-2 border-emerald-700 p-6 rounded-2xl shadow-md space-y-6">
            <div>
              <h3 className="font-extrabold text-lg mb-6 flex items-center gap-2 text-emerald-850">
                <Calculator className="h-5 w-5" /> Kết quả dự tính đóng phí
              </h3>

              <div className="space-y-4 text-sm text-slate-800">
                <div className="flex justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-655">Mức thu nhập đăng ký</span>
                  <span className="font-extrabold text-slate-900">{formatVND(selectedIncome)}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-655">Mức đóng cơ sở (22%)</span>
                  <span className="font-extrabold text-slate-900">{formatVND(calculations.rawContribution)}/tháng</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200 text-emerald-850">
                  <span className="font-bold">Ngân sách hỗ trợ giảm trừ</span>
                  <span className="font-extrabold">-{formatVND(calculations.totalSupport)}/tháng</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200 font-bold">
                  <span className="text-slate-800">Mức đóng thực tế (1 tháng)</span>
                  <span className="text-emerald-850 font-black text-base">{formatVND(calculations.monthlyContribution)}/tháng</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600 font-bold">
                  <span>Phương thức đóng đã chọn</span>
                  <span className="text-slate-900 font-extrabold">
                    {selectedCycle === 1 ? 'Hàng tháng' : `${selectedCycle} tháng`}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông báo chiết khấu */}
            {calculations.isDiscounted && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <Info className="h-5 w-5 shrink-0 text-blue-700 mt-0.5" />
                <div>
                  <p className="font-bold">Áp dụng ưu đãi chiết khấu trả trước:</p>
                  <p className="mt-1 leading-relaxed">
                    Đã áp dụng giảm chiết khấu theo lãi suất đầu tư quỹ BHXH bình quân năm trước ({ (MONTHLY_INTEREST_RATE * 12 * 100).toFixed(1) }% / năm, tức 0.31% / tháng) theo quy định của Nhà nước.
                  </p>
                  <p className="mt-1 font-bold text-emerald-800">
                    Tiết kiệm thêm từ chiết khấu: {formatVND(calculations.interestSaved)}
                  </p>
                </div>
              </div>
            )}

            {/* Khối tổng số tiền */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs text-emerald-955 font-bold uppercase tracking-wider block mb-1">
                Tổng số tiền thực đóng
              </span>
              <span className="text-3xl font-black text-emerald-800 block">
                {formatVND(calculations.totalPayment)}
              </span>
              <div className="mt-2 text-xs text-emerald-900 font-bold">
                Tiết kiệm tổng cộng {formatVND(calculations.totalSupportSaved + calculations.interestSaved)} nhờ ngân sách hỗ trợ & chiết khấu!
              </div>
            </div>

            {/* Nút sao chép & gửi Zalo cho Khách hàng */}
            <div className="space-y-2">
              <button
                onClick={handleCopyAndSendZalo}
                className="w-full bg-[#0068FF] hover:bg-[#0052cc] text-white font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquareShare className="h-5 w-5" />
                {copyStatus ? 'Đã sao chép báo giá!' : 'Sao chép & Gửi Zalo báo giá'}
              </button>
              <p className="text-[11px] text-slate-500 text-center leading-relaxed font-medium">
                * Báo giá gửi đi tự động cập nhật mức đóng phí (Điều 87 - Luật BHXH số 58/2014/QH13), chiết khấu, hệ số trượt giá {INFLATION_COEFFICIENT} và lương hưu dự kiến hằng tháng.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-sm font-extrabold mb-3 text-slate-900">Nhập thông tin khách hàng để kết nối trực tiếp:</h4>
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-lg text-xs text-emerald-850 font-bold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0" /> Gửi thông tin thành công! Tư vấn viên sẽ liên hệ lại sớm nhất.
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Họ và tên của bạn" 
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-350 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-700"
                  />
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại liên hệ" 
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-350 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-700"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 rounded-lg text-sm transition shadow-sm"
                  >
                    Gửi yêu cầu hỗ trợ ngay
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tra cứu nhanh */}
      <section id="table-lookup" className="py-16 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Bảng Tra Cứu Nhanh Mức Đóng</h2>
            <p className="text-slate-700 mt-2 text-base">
              Tìm kiếm nhanh theo số thu nhập hoặc số tiền mong muốn thực tế.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Nhập mức thu nhập muốn tìm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-slate-900 placeholder-slate-500 text-sm font-medium"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
            <table className="w-full text-sm text-left text-slate-700">
              <thead className="text-xs text-slate-900 uppercase bg-slate-100 border-b-2 border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-extrabold">Mức chuẩn</th>
                  <th scope="col" className="px-6 py-3.5 font-extrabold">Mức thu nhập tháng đăng ký</th>
                  <th scope="col" className="px-6 py-3.5 font-extrabold">Thực đóng hàng tháng (Đã giảm trừ)</th>
                  <th scope="col" className="px-6 py-3.5 font-extrabold">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-bold">
                {filteredLevels.map((row) => (
                  <tr key={row.level} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-extrabold text-slate-900">Mức #{row.level}</td>
                    <td className="px-6 py-4 text-slate-900">{formatVND(row.income)}</td>
                    <td className="px-6 py-4 text-emerald-800 font-black">{formatVND(row.contribution)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedIncome(row.income);
                          const element = document.getElementById('calculator');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-emerald-700 hover:text-emerald-850 font-black inline-flex items-center gap-1.5"
                      >
                        Chọn mức <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLevels.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                      Không tìm thấy dữ liệu phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quyền lợi */}
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

      {/* Phân hệ Hỏi - Đáp (FAQ) */}
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
            {/* Câu hỏi 1: Chế độ tử tuất & mai táng phí */}
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
                    ✔️ <strong>Trợ cấp mai táng (Mai táng phí):</strong> Người lo mai táng nhận hỗ trợ một lần bằng 10 lần lương cơ sở khi người tham gia đóng đủ từ <strong>5 năm (60 tháng) BHXH tự nguyện</strong> HOẶC đóng đủ từ <strong>12 tháng BHXH bắt buộc trở lên</strong> (hoặc đang hưởng lương hưu) qua đời. Kể từ 07/2026, mức lương cơ sở là 2.530.000đ, tương đương khoản trợ cấp là <strong>25.300.000đ</strong> [1.2.6, 1.4.5].
                  </p>
                  <p>
                    ✔️ <strong>Trợ cấp tuất một lần:</strong> Thân nhân được nhận trợ cấp một lần dựa trên số năm đóng góp (mỗi năm đóng từ 2014 tính bằng <strong>2 tháng</strong> thu nhập đóng BHXH) hoặc dựa theo thời gian đã hưởng lương hưu còn lại (lên tới 48 tháng lương hưu nếu qua đời trong 2 tháng đầu nhận lương hưu) [1.2.5, 1.2.9].
                  </p>
                </div>
              )}
            </div>

            {/* Câu hỏi 2: Thay đổi mức đóng khi nào */}
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
                    Người tham gia Bảo hiểm xã hội tự nguyện hoàn toàn <strong>có thể chủ động thay đổi</strong> mức thu nhập làm căn cứ đóng (từ 1,5 triệu đến 24,35 triệu) hoặc phương thức đóng (hàng tháng, 3 tháng, 6 tháng, đóng gộp...) sau khi <strong>kết thúc chu kỳ đóng cũ đã đăng ký trước đó</strong> [3.1].
                  </p>
                  <p className="mt-2.5">
                    Để thực hiện điều chỉnh, bạn chỉ cần thông báo cho Nhân viên thu (Đại lý thu) tại thời điểm chuẩn bị đóng tiền cho chu kỳ tiếp theo [3.1]. Hệ thống sẽ tự động cập nhật và áp dụng mức đóng mới theo quy định tại <strong>Điều 87 Luật BHXH số 58/2014/QH13</strong> ngay lập tức mà không ảnh hưởng tới quá trình tích lũy số năm tham gia bảo hiểm trước đó.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}