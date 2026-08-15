'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { QrPaymentModal } from './QrPaymentModal';

export const BhytCalculator: React.FC = () => {
  // Mức lương cơ sở / Mức tham chiếu quy định
  const baseSalary = 2530000;

  // State quản lý số lượng và chu kỳ
  const [existingCardCount, setExistingCardCount] = useState<number>(0); // Số người trong hộ đã có thẻ trước đó
  const [memberCount, setMemberCount] = useState<number>(3); // Số người đóng mới đợt này
  const [cycleMonths, setCycleMonths] = useState<number>(12); // Chu kỳ: 3, 6, 12 tháng
  const [copied, setCopied] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  // Tỷ lệ đóng theo thứ tự trong hộ: Người 1 (100%), Người 2 (70%), Người 3 (60%), Người 4 (50%), Người 5+ (40%)
  const getDiscountPercentageByHouseholdPos = (householdPosIndex: number): number => {
    if (householdPosIndex === 0) return 100;
    if (householdPosIndex === 1) return 70;
    if (householdPosIndex === 2) return 60;
    if (householdPosIndex === 3) return 50;
    return 40;
  };

  // Mức đóng gốc 1 tháng (4.5% mức lương cơ sở)
  const monthlyBaseCost = baseSalary * 0.045;

  // Tính chi tiết cho từng người đóng mới
  const membersDetail = Array.from({ length: memberCount }).map((_, idx) => {
    const householdPos = existingCardCount + idx + 1; // Vị trí thực tế trong hộ
    const discountPct = getDiscountPercentageByHouseholdPos(existingCardCount + idx);
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

  // Tổng hợp số liệu
  const totalPeriodCost = membersDetail.reduce((acc, curr) => acc + curr.periodCost, 0);
  const totalFullCost = monthlyBaseCost * memberCount * cycleMonths;
  const totalSavings = totalFullCost - totalPeriodCost;
  const avgCostPerPersonMonth = totalPeriodCost / (memberCount * cycleMonths);
  const avgCostPerPersonYear = avgCostPerPersonMonth * 12;
  const totalHouseholdYearly = (totalPeriodCost / cycleMonths) * 12;

  const formatVnd = (num: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(num));
  };

  // Reset về mặc định
  const handleReset = () => {
    setExistingCardCount(0);
    setMemberCount(1);
    setCycleMonths(12);
  };

  // Tạo nội dung tin nhắn gửi Zalo chuẩn nghiệp vụ
  const generateZaloQuoteText = (): string => {
    const breakdownText = membersDetail
      .map(
        (m) =>
          ` • Người thứ ${m.householdPos} (Đóng mới): ${formatVnd(m.periodCost)} (${m.discountPct}% ${
            m.discountPct < 100 ? `-> giảm ${100 - m.discountPct}%` : ''
          })`
      )
      .join('\n');

    const existingInfoText =
      existingCardCount > 0
        ? `\n📌 Ghi chú: Hộ gia đình đã có ${existingCardCount} người có thẻ BHYT (trong cùng năm tài chính) -> Mức đóng áp dụng giảm trừ từ Người thứ ${
            existingCardCount + 1
          } trở đi.\n`
        : '';

    return `[BÁO GIÁ BHYT HỘ GIA ĐÌNH - ĐẠI LÝ THU BHXH]
Số lượng thành viên đóng mới: ${memberCount} người
Thời hạn tham gia: ${cycleMonths} tháng (Mức tham chiếu: ${formatVnd(baseSalary)})
${existingInfoText}----------------------------------
Chi tiết mức đóng từng thành viên:
${breakdownText}
----------------------------------
👉 TỔNG SỐ TIỀN CẦN NỘP (${cycleMonths} THÁNG): ${formatVnd(totalPeriodCost)}
🎉 Tiết kiệm được nhờ chính sách giảm trừ: ${formatVnd(totalSavings)}
(Tính trung bình: ${formatVnd(avgCostPerPersonYear)}/người/năm)

⚠️ Lưu ý: Quý khách vui lòng nộp gia hạn trước khi thẻ cũ hết hạn để duy trì quyền lợi KCB 5 năm liên tục.
Liên hệ Nhân viên thu để được hỗ trợ cấp / gia hạn thẻ trên VssID ngay!`;
  };

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(generateZaloQuoteText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Không thể copy:', err);
    }
  };

  return (
    <div id="calculator-section" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 text-white p-6 sm:p-8 border-b border-blue-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
              <HeartPulse className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full border border-blue-400/30">
              Công Cụ Nghiệp Vụ BHYT HGĐ
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm mới
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display">
          Tính Mức Đóng BHYT Hộ Gia Đình Tự Động
        </h2>
        <p className="text-blue-100/90 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl">
          Áp dụng mức tham chiếu / lương cơ sở <strong>{formatVnd(baseSalary)}</strong> và tỷ lệ giảm trừ hộ gia đình (1: 100%, 2: 70%, 3: 60%, 4: 50%, 5+: 40%). Hỗ trợ khấu trừ thành viên đã có thẻ sẵn trong năm tài chính.
        </p>
      </div>

      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Điều khiển nhập liệu & Bảng chi tiết (7 cột) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Nhóm điều khiển số lượng thành viên */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            {/* Input 1: Người đã có thẻ */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Số thành viên ĐÃ CÓ THẺ trong hộ (cùng năm tài chính):
                </label>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {existingCardCount > 0 ? `${existingCardCount} người có thẻ` : 'Chưa có ai'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExistingCardCount(Math.max(0, existingCardCount - 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm transition-colors"
                >
                  -
                </button>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-center font-bold text-emerald-800 text-sm shadow-inner">
                  {existingCardCount} người đã có thẻ
                </div>
                <button
                  type="button"
                  onClick={() => setExistingCardCount(Math.min(10, existingCardCount + 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                *Thành viên có thẻ HSSV, công nhân, hưu trí... giúp người đóng sau được tính giảm trừ ngay.
              </p>
            </div>

            {/* Input 2: Người đóng mới */}
            <div className="pt-3 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  Số thành viên ĐÓNG MỚI đợt này:
                </label>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {memberCount} người đóng mới
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm transition-colors"
                >
                  -
                </button>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-center font-bold text-blue-700 text-sm shadow-inner">
                  {memberCount} người tham gia mới
                </div>
                <button
                  type="button"
                  onClick={() => setMemberCount(Math.min(10, memberCount + 1))}
                  className="w-10 h-9 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 text-base cursor-pointer shadow-sm transition-colors"
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
                <span>Thành viên (Thứ tự trong hộ)</span>
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
                      Người thứ {m.householdPos}
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

        {/* Right: Thẻ tổng hợp kết quả & Thao tác báo giá (5 cột) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-slate-700 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400 flex items-center gap-1.5">
                <ReceiptText className="w-4 h-4" />
                Tổng Hợp Thu Phí BHYT
              </span>
              <span className="text-xs text-slate-300 bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                {memberCount} người đóng mới
              </span>
            </div>

            {/* Số tiền cần thu nổi bật */}
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
                  Đóng mức gốc 100% (Người thứ nhất)
                </div>
              )}
            </div>

            {/* Thông số đối chiếu nhanh cho đại lý thu */}
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

          {/* Các nút hành động chính */}
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

            <p className="text-[11px] text-center text-slate-400 leading-tight">
              *Nội dung Zalo đã bao gồm chi tiết giảm trừ &amp; lưu ý quyền lợi 5 năm liên tục.
            </p>
          </div>

          {/* Modal mã QR thu hộ */}
          <QrPaymentModal
            isOpen={isQrOpen}
            onClose={() => setIsQrOpen(false)}
            amount={totalPeriodCost}
            description={`Nop BHYT HGD ${memberCount} nguoi ${cycleMonths}T`}
            serviceType={`BHYT Hộ gia đình (${memberCount} người - ${cycleMonths} tháng)`}
          />
        </div>
      </div>
    </div>
  );
};