'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  HeartPulse,
  Check,
  Copy,
  Sparkles,
  ShieldAlert,
  QrCode,
  Calendar,
  RotateCcw,
  BadgePercent,
  ReceiptText,
  Edit3,
  X,
  Save,
  Tag,
  Eye,
  Info,
} from 'lucide-react';
import { QrPaymentModal } from './QrPaymentModal';

// Mẫu Zalo mặc định chuẩn hóa theo đúng quy định
const DEFAULT_ZALO_TEMPLATE = `[{tieu_de}]
Số lượng thành viên đóng mới: {so_nguoi} người
Thời hạn tham gia: {chu_ky} tháng (Mức tham chiếu: {luong_co_so})
{thong_tin_da_co_the}----------------------------------
Chi tiết mức đóng từng thành viên (Diện HGĐ):
{chi_tiet_tung_nguoi}
----------------------------------
👉 TỔNG SỐ TIỀN CẦN NỘP ({chu_ky} THÁNG): {tong_tien}
🎉 Tiết kiệm được nhờ chính sách giảm trừ HGĐ: {tiet_kiem}
(Tính trung bình: {trung_binh_nam}/người/năm)

⚠️ Lưu ý: 
- Mức giảm trừ chỉ áp dụng cho các thành viên cùng tham gia BHYT diện Hộ gia đình trong cùng năm tài chính (Không áp dụng cho thành viên đã có thẻ Doanh nghiệp, HSSV, Hưu trí, Hộ nghèo...).
- Quý khách vui lòng nộp gia hạn trước khi thẻ hết hạn để bảo lưu quyền lợi 5 năm liên tục.
📞 Liên hệ nhân viên thu: {ten_nhan_vien} - {sdt_lh} để làm thủ tục ngay!`;

export const BhytCalculator: React.FC = () => {
  const baseSalary = 2530000; // Mức lương cơ sở / tham chiếu

  // Số thành viên ĐÃ ĐÓNG BHYT THEO DIỆN HỘ GIA ĐÌNH trước đó trong cùng năm tài chính
  const [existingHgcCount, setExistingHgcCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(1);
  const [cycleMonths, setCycleMonths] = useState<number>(12);
  const [copied, setCopied] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  // State chỉnh sửa mẫu tin nhắn Zalo
  const [isZaloModalOpen, setIsZaloModalOpen] = useState<boolean>(false);
  const [zaloTemplate, setZaloTemplate] = useState<string>(DEFAULT_ZALO_TEMPLATE);
  const [agentName, setAgentName] = useState<string>('BÁO GIÁ BHYT HỘ GIA ĐÌNH - ĐẠI LÝ THU BHXH');
  const [collectorName, setCollectorName] = useState<string>('Điểm Thu BHXH');
  const [collectorPhone, setCollectorPhone] = useState<string>('0966.570.913');
  const [saveTemplateSuccess, setSaveTemplateSuccess] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedTemplate = localStorage.getItem('bhyt_custom_zalo_template');
      const savedAgent = localStorage.getItem('bhyt_custom_zalo_info');
      if (savedTemplate) setZaloTemplate(savedTemplate);
      if (savedAgent) {
        const parsed = JSON.parse(savedAgent);
        if (parsed.agentName) setAgentName(parsed.agentName);
        if (parsed.collectorName) setCollectorName(parsed.collectorName);
        if (parsed.collectorPhone) setCollectorPhone(parsed.collectorPhone);
      }
    } catch (err) {
      console.error('Lỗi đọc LocalStorage:', err);
    }
  }, []);

  const getDiscountPercentageByHouseholdPos = (householdPosIndex: number): number => {
    if (householdPosIndex === 0) return 100;
    if (householdPosIndex === 1) return 70;
    if (householdPosIndex === 2) return 60;
    if (householdPosIndex === 3) return 50;
    return 40;
  };

  const monthlyBaseCost = baseSalary * 0.045;

  // Tính chi tiết mức đóng cho từng người đóng mới đợt này
  const membersDetail = Array.from({ length: memberCount }).map((_, idx) => {
    const householdPos = existingHgcCount + idx + 1; // Vị trí diện HGĐ trong năm tài chính
    const discountPct = getDiscountPercentageByHouseholdPos(existingHgcCount + idx);
    const monthlyCost = monthlyBaseCost * (discountPct / 100);
    const periodCost = monthlyCost * cycleMonths;
    const fullPeriodCost = monthlyBaseCost * cycleMonths;
    const periodSavings = fullPeriodCost - periodCost;

    return {
      newMemberNumber: idx + 1,
      householdPos,
      discountPct,
      monthlyCost,
      periodCost,
      periodSavings,
    };
  });

  const totalPeriodCost = membersDetail.reduce((acc, curr) => acc + curr.periodCost, 0);
  const totalFullCost = monthlyBaseCost * memberCount * cycleMonths;
  const totalSavings = totalFullCost - totalPeriodCost;
  const avgCostPerPersonMonth = totalPeriodCost / (memberCount * cycleMonths);
  const avgCostPerPersonYear = avgCostPerPersonMonth * 12;
  const totalHouseholdYearly = (totalPeriodCost / cycleMonths) * 12;

  const formatVnd = (num: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(num));
  };

  const handleReset = () => {
    setExistingHgcCount(0);
    setMemberCount(1);
    setCycleMonths(12);
  };

  const renderZaloMessage = (template: string): string => {
    const breakdownText = membersDetail
      .map(
        (m) =>
          ` • Người thứ ${m.householdPos} (Diện HGĐ): ${formatVnd(m.periodCost)} (${m.discountPct}% ${
            m.discountPct < 100 ? `-> giảm ${100 - m.discountPct}%` : ''
          })`
      )
      .join('\n');

    const existingInfoText =
      existingHgcCount > 0
        ? `\n📌 Ghi chú: Hộ đã có ${existingHgcCount} thành viên đã đóng BHYT diện HGĐ trước đó (cùng năm tài chính) -> Thành viên mới được tính mức giảm từ Người thứ ${
            existingHgcCount + 1
          } trở đi.\n`
        : '';

    return template
      .replace(/{tieu_de}/g, agentName)
      .replace(/{so_nguoi}/g, memberCount.toString())
      .replace(/{chu_ky}/g, cycleMonths.toString())
      .replace(/{luong_co_so}/g, formatVnd(baseSalary))
      .replace(/{thong_tin_da_co_the}/g, existingInfoText)
      .replace(/{chi_tiet_tung_nguoi}/g, breakdownText)
      .replace(/{tong_tien}/g, formatVnd(totalPeriodCost))
      .replace(/{tiet_kiem}/g, formatVnd(totalSavings))
      .replace(/{trung_binh_nam}/g, formatVnd(avgCostPerPersonYear))
      .replace(/{trung_binh_ho_nam}/g, formatVnd(totalHouseholdYearly))
      .replace(/{ten_nhan_vien}/g, collectorName)
      .replace(/{sdt_lh}/g, collectorPhone);
  };

  const handleCopyQuote = async () => {
    try {
      const quoteText = renderZaloMessage(zaloTemplate);
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Không thể copy:', err);
    }
  };

  const handleSaveZaloTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('bhyt_custom_zalo_template', zaloTemplate);
      localStorage.setItem(
        'bhyt_custom_zalo_info',
        JSON.stringify({ agentName, collectorName, collectorPhone })
      );
      setSaveTemplateSuccess(true);
      setTimeout(() => {
        setSaveTemplateSuccess(false);
        setIsZaloModalOpen(false);
      }, 1000);
    } catch (err) {
      console.error('Lỗi lưu template:', err);
    }
  };

  const handleResetZaloTemplate = () => {
    setZaloTemplate(DEFAULT_ZALO_TEMPLATE);
    setAgentName('BÁO GIÁ BHYT HỘ GIA ĐÌNH - ĐẠI LÝ THU BHXH');
    setCollectorName('Điểm Thu BHXH');
    setCollectorPhone('0966.570.913');
    localStorage.removeItem('bhyt_custom_zalo_template');
    localStorage.removeItem('bhyt_custom_zalo_info');
  };

  const insertPlaceholder = (tag: string) => {
    setZaloTemplate((prev) => prev + tag);
  };

  const availableTags = [
    { tag: '{tieu_de}', desc: 'Tiêu đề / Tên đại lý' },
    { tag: '{so_nguoi}', desc: 'Số người mua mới' },
    { tag: '{chu_ky}', desc: 'Chu kỳ tháng' },
    { tag: '{chi_tiet_tung_nguoi}', desc: 'Chi tiết từng người' },
    { tag: '{tong_tien}', desc: 'Tổng tiền cần nộp' },
    { tag: '{tiet_kiem}', desc: 'Số tiền tiết kiệm' },
    { tag: '{ten_nhan_vien}', desc: 'Tên nhân viên' },
    { tag: '{sdt_lh}', desc: 'Số điện thoại' },
  ];

  return (
    <div id="calculator-section" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 text-white p-5 sm:p-8 border-b border-blue-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
              <HeartPulse className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full border border-blue-400/30">
              Công Cụ Nghiệp Vụ BHYT HGĐ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZaloModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Sửa Mẫu Zalo</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display">
          Tính Mức Đóng BHYT Hộ Gia Đình Tự Động
        </h2>
        <p className="text-blue-100/90 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl">
          Mức tham chiếu: <strong>{formatVnd(baseSalary)}</strong>. Áp dụng chính sách giảm trừ bậc thang (1: 100%, 2: 70%, 3: 60%, 4: 50%, 5+: 40%) cho các thành viên cùng tham gia <strong>diện Hộ gia đình trong năm tài chính</strong>.
        </p>
      </div>

      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Inputs & Table (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Nhóm điều khiển thành viên */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            {/* Input 1: Thành viên đã đóng diện HGĐ trước đó */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Số người ĐÃ ĐÓNG BHYT DIỆN HGĐ trước đó (cùng năm tài chính):
                </label>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {existingHgcCount > 0 ? `${existingHgcCount} người đã đóng HGĐ` : 'Chưa có ai'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExistingHgcCount(Math.max(0, existingHgcCount - 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm"
                >
                  -
                </button>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-center font-bold text-emerald-800 text-sm shadow-inner">
                  {existingHgcCount} người (Đã đóng diện HGĐ trước)
                </div>
                <button
                  type="button"
                  onClick={() => setExistingHgcCount(Math.min(10, existingHgcCount + 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm"
                >
                  +
                </button>
              </div>

              {/* Cảnh báo nghiệp vụ pháp luật rõ ràng */}
              <div className="flex items-start gap-1.5 mt-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-normal">
                <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Lưu ý nghiệp vụ:</strong> KHÔNG tính các thành viên đã có thẻ thuộc nhóm ưu tiên khác (Doanh nghiệp, Học sinh - Sinh viên, Hưu trí, Hộ nghèo, Trẻ em...). Chỉ tính người đã tham gia <strong>theo diện Hộ gia đình</strong> trong cùng năm tài chính.
                </span>
              </div>
            </div>

            {/* Input 2: Thành viên đóng mới diện HGĐ */}
            <div className="pt-3 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  Số thành viên ĐÓNG MỚI diện HGĐ đợt này:
                </label>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {memberCount} người đóng mới
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm"
                >
                  -
                </button>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-center font-bold text-blue-700 text-sm shadow-inner">
                  {memberCount} người tham gia mới
                </div>
                <button
                  type="button"
                  onClick={() => setMemberCount(Math.min(10, memberCount + 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Chọn chu kỳ đóng */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Thời hạn tham gia BHYT:
              </label>
              <span className="text-[11px] font-medium text-slate-500">
                Mức tham chiếu: <strong className="text-slate-700">{formatVnd(baseSalary)}</strong>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '3 Tháng', val: 3 },
                { label: '6 Tháng', val: 6 },
                { label: '12 Tháng (1 Năm)', val: 12 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setCycleMonths(item.val)}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center text-center ${
                    cycleMonths === item.val
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bảng chi tiết từng người */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <div className="bg-slate-100 p-3 px-4 text-xs font-bold text-slate-700 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5 text-blue-600" />
                <span>Thành viên diện HGĐ (Thứ tự giảm trừ)</span>
              </div>
              <div>Thành tiền ({cycleMonths}T)</div>
            </div>

            <div className="divide-y divide-slate-200 max-h-56 overflow-y-auto">
              {membersDetail.map((m) => (
                <div
                  key={m.householdPos}
                  className="p-3 px-4 text-xs flex justify-between items-center hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Người thứ {m.householdPos} (HGĐ)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        m.discountPct === 100
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {m.discountPct}% {m.discountPct < 100 ? `(giảm ${100 - m.discountPct}%)` : '(gốc)'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-700 text-sm">
                      {formatVnd(m.periodCost)}
                    </div>
                    {m.periodSavings > 0 && (
                      <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        Giảm: -{formatVnd(m.periodSavings)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-slate-700 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400 flex items-center gap-1.5">
                <ReceiptText className="w-4 h-4" />
                Tổng Hợp Thu Phí BHYT HGĐ
              </span>
              <span className="text-xs text-slate-300 bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                {memberCount} người đóng mới
              </span>
            </div>

            {/* Số tiền cần thu */}
            <div className="bg-blue-950/80 border border-blue-500/40 rounded-2xl p-4 sm:p-5 mb-4 text-center">
              <div className="text-[11px] text-blue-300 uppercase font-semibold tracking-wide mb-1">
                TỔNG SỐ TIỀN CẦN THU ({cycleMonths} THÁNG):
              </div>
              <div className="text-3xl sm:text-4xl font-black text-blue-300 tracking-tight">
                {formatVnd(totalPeriodCost)}
              </div>
              {totalSavings > 0 ? (
                <div className="text-xs text-emerald-400 font-semibold mt-2 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Đã tiết kiệm {formatVnd(totalSavings)} nhờ giảm trừ hộ
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium mt-2">
                  Đóng mức gốc 100% (Người thứ nhất diện HGĐ)
                </div>
              )}
            </div>

            {/* Đối chiếu */}
            <div className="space-y-2 text-xs text-slate-300 mb-5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center">
                <span>Mức gốc 100%:</span>
                <span className="font-semibold text-slate-200">
                  {formatVnd(monthlyBaseCost * 12)} / người / năm
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Trung bình cả hộ:</span>
                <span className="font-semibold text-amber-300">
                  {formatVnd(totalHouseholdYearly)} / năm
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Trung bình / người / năm:</span>
                <span className="font-semibold text-emerald-400">
                  {formatVnd(avgCostPerPersonYear)} / người
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Kỳ gia hạn tiếp theo:
                </span>
                <span className="font-bold text-white">Sau {cycleMonths} tháng</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsQrOpen(true)}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-[0.98]"
            >
              <QrCode className="w-4 h-4 text-slate-950" />
              <span>Mở Mã QR Thu Tiền (VietQR Tự Động)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyQuote}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  Đã sao chép mẫu báo giá Zalo!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao Chép Báo Giá Gửi Zalo Khách Hàng
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>*Đã bao gồm lưu ý theo quy định BHXH</span>
              <button
                type="button"
                onClick={() => setIsZaloModalOpen(true)}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                Chỉnh sửa mẫu
              </button>
            </div>
          </div>

          <QrPaymentModal
            isOpen={isQrOpen}
            onClose={() => setIsQrOpen(false)}
            amount={totalPeriodCost}
            description={`Nop BHYT HGD ${memberCount} nguoi ${cycleMonths}T`}
            serviceType={`BHYT Hộ gia đình (${memberCount} người - ${cycleMonths} tháng)`}
          />
        </div>
      </div>

      {/* Modal Sửa Mẫu Zalo */}
      {isZaloModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl border border-slate-100">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/15 rounded-xl">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Chỉnh Sửa Mẫu Tin Nhắn Zalo Báo Giá</h3>
                  <p className="text-[11px] text-blue-200">
                    Cá nhân hóa nội dung gửi khách hàng &amp; tự động lưu
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsZaloModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveZaloTemplate} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="sm:col-span-3">
                  <label className="block text-slate-700 font-bold mb-1">
                    Tiêu đề tin nhắn ({'{tieu_de}'}):
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="VD: BÁO GIÁ BHYT - ĐIỂM THU XÃ AN HÒA"
                    className="w-full p-2 border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Tên nhân viên thu ({'{ten_nhan_vien}'}):
                  </label>
                  <input
                    type="text"
                    value={collectorName}
                    onChange={(e) => setCollectorName(e.target.value)}
                    placeholder="VD: Thu Hà"
                    className="w-full p-2 border border-slate-300 rounded-xl font-medium text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Số điện thoại / Zalo ({'{sdt_lh}'}):
                  </label>
                  <input
                    type="text"
                    value={collectorPhone}
                    onChange={(e) => setCollectorPhone(e.target.value)}
                    placeholder="VD: 0988.xxx.xxx"
                    className="w-full p-2 border border-slate-300 rounded-xl font-bold text-blue-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-slate-700 font-bold mb-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span>Bấm vào biến để chèn nhanh vào mẫu tin:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((item) => (
                    <button
                      key={item.tag}
                      type="button"
                      onClick={() => insertPlaceholder(item.tag)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-800 border border-slate-200 hover:border-blue-300 rounded-lg text-[11px] font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.tag}</span>
                      <span className="text-[10px] text-slate-500 font-sans font-normal">({item.desc})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Nội dung khung mẫu tin nhắn:
                </label>
                <textarea
                  rows={8}
                  value={zaloTemplate}
                  onChange={(e) => setZaloTemplate(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-2xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs border-b border-slate-800 pb-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem trước nội dung thực tế (Live Preview):</span>
                </div>
                <pre className="text-[11px] font-sans text-slate-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {renderZaloMessage(zaloTemplate)}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleResetZaloTemplate}
                  className="px-3.5 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center gap-1.5 transition-colors text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục mặc định</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsZaloModalOpen(false)}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-xs cursor-pointer"
                  >
                    Đóng
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 text-xs cursor-pointer"
                  >
                    {saveTemplateSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        Đã lưu mẫu!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Lưu cấu hình mẫu
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};