'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Copy,
  Check,
  Settings2,
  Landmark,
  Save,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';

interface QrPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  serviceType: string;
}

const POPULAR_BANKS = [
  { id: 'ICB', name: 'VietinBank' },
  { id: 'VCB', name: 'Vietcombank' },
  { id: 'BIDV', name: 'BIDV' },
  { id: 'VBA', name: 'Agribank' },
  { id: 'MB', name: 'MBBank' },
  { id: 'TCB', name: 'Techcombank' },
  { id: 'VPB', name: 'VPBank' },
  { id: 'ACB', name: 'ACB' },
  { id: 'STB', name: 'Sacombank' },
  { id: 'LPB', name: 'LPBank' },
];

export const QrPaymentModal: React.FC<QrPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  serviceType,
}) => {
  const [isConfigMode, setIsConfigMode] = useState<boolean>(false);
  const [bankId, setBankId] = useState<string>('ICB');
  const [accountNumber, setAccountNumber] = useState<string>('10987654321');
  const [accountName, setAccountName] = useState<string>('DAI LY THU BHXH BHYT');

  const [copiedStk, setCopiedStk] = useState<boolean>(false);
  const [copiedContent, setCopiedContent] = useState<boolean>(false);
  const [copiedAmount, setCopiedAmount] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Đọc cấu hình từ LocalStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('bhyt_agent_bank_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed.bankId) setBankId(parsed.bankId);
        if (parsed.accountNumber) setAccountNumber(parsed.accountNumber);
        if (parsed.accountName) setAccountName(parsed.accountName);
      }
    } catch (err) {
      console.error('Lỗi đọc LocalStorage:', err);
    }
  }, []);

  // Phím ESC đóng modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Chặn cuộn trang chính khi mở modal
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleSaveBankConfig = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        'bhyt_agent_bank_config',
        JSON.stringify({ bankId, accountNumber, accountName: accountName.toUpperCase() })
      );
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsConfigMode(false);
      }, 1000);
    } catch (err) {
      console.error('Lỗi lưu LocalStorage:', err);
    }
  };

  const handleResetBankConfig = () => {
    setBankId('ICB');
    setAccountNumber('10987654321');
    setAccountName('DAI LY THU BHXH BHYT');
    localStorage.removeItem('bhyt_agent_bank_config');
  };

  const cleanDescription = description
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toUpperCase();

  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${Math.round(
    amount
  )}&addInfo=${encodeURIComponent(cleanDescription)}&accountName=${encodeURIComponent(accountName)}`;

  const formatVnd = (num: number): string =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(num));

  const handleCopy = async (text: string, type: 'stk' | 'content' | 'amount') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'stk') {
        setCopiedStk(true);
        setTimeout(() => setCopiedStk(false), 2000);
      } else if (type === 'content') {
        setCopiedContent(true);
        setTimeout(() => setCopiedContent(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
    } catch (err) {
      console.error('Lỗi copy:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container: Trên Mobile tự bo góc tròn trên dạng Bottom Sheet, giới hạn chiều cao tối đa 92dvh */}
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl border border-slate-100 relative transition-all">
        {/* Header Modal - Cố định (Sticky) */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 bg-white/15 rounded-xl backdrop-blur-sm shrink-0">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 pr-2">
              <h4 className="font-bold text-xs sm:text-sm truncate">Mã QR Thanh Toán BHYT</h4>
              <p className="text-[10px] sm:text-[11px] text-blue-200 truncate">{serviceType}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsConfigMode(!isConfigMode)}
              title={isConfigMode ? 'Quay lại' : 'Cài đặt STK'}
              className={`p-1.5 sm:p-2 rounded-xl transition-all ${
                isConfigMode
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isConfigMode ? <ArrowLeft className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nội dung Modal - Tự động cuộn mượt mà trên điện thoại */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4 overscroll-contain">
          {isConfigMode ? (
            /* View 1: Màn hình cài đặt STK cho Đại lý */
            <form onSubmit={handleSaveBankConfig} className="space-y-3 text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-blue-900 text-[11px] sm:text-xs leading-relaxed">
                <strong className="block text-xs mb-0.5">⚙️ Cài đặt STK thu tiền của bạn:</strong>
                Mã QR sẽ tự động sinh theo STK này để người dân quét chuyển tiền trực tiếp.
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Ngân hàng:</label>
                <select
                  value={bankId}
                  onChange={(e) => setBankId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {POPULAR_BANKS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.id} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Số tài khoản thu:</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.trim())}
                  placeholder="Nhập số tài khoản"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Tên chủ tài khoản (In hoa không dấu):
                </label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                  placeholder="VD: NGUYEN VAN A"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                />
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] text-xs"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      Đã lưu thành công!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Lưu STK của tôi
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetBankConfig}
                  title="Khôi phục mặc định"
                  className="p-2.5 border border-slate-300 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* View 2: Màn hình hiển thị QR & Thông tin thanh toán */
            <>
              {/* Khung ảnh QR Code (Responsive co giãn trên mobile) */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt={`Mã VietQR nộp BHYT ${formatVnd(amount)}`}
                  className="w-40 sm:w-52 h-auto rounded-xl shadow-sm border border-slate-200/80 bg-white"
                />
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-1.5 text-center">
                  Mở App Ngân hàng bất kỳ để quét (Tự điền <strong>{formatVnd(amount)}</strong>)
                </p>
              </div>

              {/* Danh sách thông tin & Nút Copy */}
              <div className="space-y-2 text-xs">
                {/* Số tiền */}
                <div className="flex justify-between items-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Số tiền cần thu:</span>
                    <span className="font-black text-blue-700 text-sm sm:text-base">{formatVnd(amount)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(Math.round(amount).toString(), 'amount')}
                    className="px-2 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 flex items-center gap-1 text-[10px] sm:text-[11px] transition-colors"
                  >
                    {copiedAmount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedAmount ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>

                {/* STK & Tên chủ TK */}
                <div className="flex justify-between items-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                  <div className="pr-2 min-w-0">
                    <span className="text-slate-500 block text-[10px]">Chủ TK / Số tài khoản:</span>
                    <span className="font-bold text-slate-900 block truncate text-[11px] sm:text-xs">{accountName}</span>
                    <span className="font-mono font-bold text-blue-700 text-[11px] sm:text-xs">
                      {accountNumber} ({bankId})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(accountNumber, 'stk')}
                    className="shrink-0 px-2 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 flex items-center gap-1 text-[10px] sm:text-[11px] transition-colors"
                  >
                    {copiedStk ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedStk ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>

                {/* Nội dung chuyển khoản */}
                <div className="flex justify-between items-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                  <div className="pr-2 min-w-0">
                    <span className="text-slate-500 block text-[10px]">Nội dung chuyển khoản:</span>
                    <span className="font-bold text-slate-900 truncate block text-[11px] sm:text-xs">{cleanDescription}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(cleanDescription, 'content')}
                    className="shrink-0 px-2 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 flex items-center gap-1 text-[10px] sm:text-[11px] transition-colors"
                  >
                    {copiedContent ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedContent ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* Thông báo nghiệp vụ */}
              <div className="flex items-start gap-1.5 p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-[10px] sm:text-[11px] border border-emerald-200 leading-normal">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  Sau khi nhận chuyển khoản, nhân viên thu kiểm tra biến động số dư và tiến hành nộp gia hạn trên cổng DVC BHXH.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};