'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle, 
  Award, 
  Search,
  ArrowRight,
  Info,
  MessageSquareShare
} from 'lucide-react';

const MIN_INCOME = 1500000;
const MAX_INCOME = 24350000;
const STEP = 50000;
const STATE_SUPPORT = 66000;
const LOCAL_SUPPORT = 66000;

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

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

  // Hàm xử lý việc tạo tin nhắn báo giá, sao chép và điều hướng trực tiếp sang Zalo
  const handleCopyAndSendZalo = () => {
    const cycleText = selectedCycle === 1 ? 'Hàng tháng' : `${selectedCycle} tháng`;
    const discountNote = calculations.isDiscounted 
      ? `\n- Ưu đãi: Áp dụng chiết khấu đóng trước (lãi suất đầu tư quỹ BHXH ~4.2%/năm)\n- Tiết kiệm thêm từ chiết khấu: ${formatVND(calculations.interestSaved)}`
      : '';
      
    const message = `Kính gửi anh/chị, em xin gửi bảng tính toán chi tiết mức đóng BHXH Tự Nguyện cho đối tượng khác tại địa bàn Hà Nội (áp dụng từ T7/2026):

- Mức thu nhập lựa chọn: ${formatVND(selectedIncome)} / tháng
- Mức đóng cơ sở (22%): ${formatVND(calculations.rawContribution)} / tháng
- Ngân sách hỗ trợ (Nhà nước + Địa phương): -132.000đ / tháng
- Mức đóng thực tế: ${formatVND(calculations.monthlyContribution)} / tháng
- Phương thức đóng: ${cycleText}${discountNote}
----------------------------------
👉 TỔNG SỐ TIỀN THỰC ĐÓNG CẢ CHU KỲ: ${formatVND(calculations.totalPayment)}
(Tổng số tiền được giảm trừ: ${formatVND(calculations.totalSupportSaved + calculations.interestSaved)})

* Quyền lợi đi kèm: Nhận lương hưu hàng tháng và thẻ BHYT miễn phí trọn đời khi về già.
Anh/chị cần hỗ trợ thêm thông tin cứ nhắn em nhé!`;

    navigator.clipboard.writeText(message).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3000);

      // Làm sạch số điện thoại khách hàng đã nhập (nếu có) để tạo link kết nối Zalo trực tiếp
      const cleanPhone = leadPhone.replace(/\D/g, '');
      if (cleanPhone) {
        window.open(`https://zalo.me/${cleanPhone}`, '_blank');
      }
    }).catch(err => {
      console.error('Không thể sao chép văn bản: ', err);
    });
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
          <h2 className="text-3xl font-extrabold text-slate-900">Tính Toán Mức Đóng Theo Nhu Cầu</h2>
          <p className="text-slate-700 mt-2 text-base">
            Kéo chọn mức thu nhập hàng tháng làm căn cứ đóng và lựa chọn phương thức thanh toán phù hợp.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-2 flex justify-between">
                <span>1. Thu nhập chọn làm căn cứ đóng:</span>
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
              <div className="flex justify-between text-xs text-slate-600 mt-2 font-medium">
                <span>Tối thiểu: {formatVND(MIN_INCOME)}</span>
                <span>Tối đa: {formatVND(MAX_INCOME)}</span>
              </div>

              <div className="mt-5">
                <span className="text-xs text-slate-650 font-bold block mb-2">Gợi ý mốc thu nhập phổ biến:</span>
                <div className="flex flex-wrap gap-2">
                  {[1500000, 3000000, 5000000, 10000000, 15000000, 20000000, 24350000].map((val) => (
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
                2. Chọn phương thức đóng (Chu kỳ thanh toán):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PAYMENT_CYCLES.map((cycle) => (
                  <button
                    key={cycle.months}
                    onClick={() => setSelectedCycle(cycle.months)}
                    className={`p-3 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                      selectedCycle === cycle.months
                        ? 'border-emerald-700 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-700/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-350'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-500">Chu kỳ</span>
                    <span className="font-extrabold text-sm mt-1">{cycle.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="lg:col-span-5 bg-white border-2 border-emerald-700 p-6 rounded-2xl shadow-md space-y-6">
            <div>
              <h3 className="font-extrabold text-lg mb-6 flex items-center gap-2 text-emerald-850">
                <Calculator className="h-5 w-5" /> Kết quả dự tính chi tiết
              </h3>

              <div className="space-y-4 text-sm text-slate-800">
                <div className="flex justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-650">Mức thu nhập đăng ký</span>
                  <span className="font-extrabold text-slate-900">{formatVND(selectedIncome)}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-650">Mức đóng cơ sở (22%)</span>
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

            {/* Thông báo chiết khấu lãi suất quỹ BHXH khi chọn chu kỳ từ 2 năm trở lên */}
            {calculations.isDiscounted && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <Info className="h-5 w-5 shrink-0 text-blue-700 mt-0.5" />
                <div>
                  <p className="font-bold">Áp dụng ưu đãi chiết khấu trả trước:</p>
                  <p className="mt-1">
                    Đã áp dụng giảm chiết khấu theo lãi suất đầu tư quỹ BHXH bình quân năm trước ({ (MONTHLY_INTEREST_RATE * 12 * 100).toFixed(1) }% / năm) theo quy định của Nhà nước.
                  </p>
                  <p className="mt-1 font-bold text-emerald-800">
                    Tiết kiệm thêm từ chiết khấu: {formatVND(calculations.interestSaved)}
                  </p>
                </div>
              </div>
            )}

            {/* Khối tổng số tiền */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs text-emerald-950 font-bold uppercase tracking-wider block mb-1">
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
                * Hệ thống sẽ tự sao chép báo giá chi tiết và mở Zalo. <br />
                Hãy nhập số điện thoại bên dưới để mở ngay cuộc trò chuyện với khách hàng.
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
            Giải pháp tích lũy tài chính bền vững nhất khi hết tuổi lao động.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
              01
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Nhận Lương Hưu Trực Tiếp</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Nhận tiền hưu trí định kỳ hàng tháng khi đủ điều kiện số năm đóng góp (tối thiểu 20 năm). Số tiền được điều chỉnh tăng định kỳ dựa trên chỉ số giá tiêu dùng CPI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
              02
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Cấp Thẻ BHYT Trọn Đời</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Nhận thẻ Bảo hiểm y tế miễn phí trọn đời từ lúc hưởng chế độ hưu trí, được chi trả 95% chi phí khám chữa bệnh đúng tuyến của cơ sở y tế.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 h-12 w-12 rounded-lg flex items-center justify-center text-emerald-800 font-black text-xl">
              03
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Chế Độ An Sinh Tử Tuất</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Trường hợp người tham gia bảo hiểm không may qua đời, người chịu trách nhiệm lo hậu sự sẽ nhận trợ cấp mai táng bằng 10 lần mức lương cơ sở quy định tại thời điểm đó.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}