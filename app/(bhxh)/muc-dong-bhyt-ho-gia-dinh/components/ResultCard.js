import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Copy, Check, QrCode, UserCog } from 'lucide-react';
import ConfigModal from './ConfigModal';
import QrModal from './QrModal';

const DEFAULT_BANK = 'vietinbank'; 
const DEFAULT_ACCOUNT = '104005520822';
const DEFAULT_NAME = 'LO VAN LONG';

export default function ResultCard({ members, tongTien, luongCoSo, months }) {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const maNganHang = searchParams.get('bank') || DEFAULT_BANK;
  const soTaiKhoan = searchParams.get('account') || DEFAULT_ACCOUNT;
  const tenTaiKhoan = searchParams.get('name') || DEFAULT_NAME;

  const handleCopyMessage = async () => {
    let activeIndex = 0;
    const detailText = members.map(m => m.isShared ? `${m.name}: Da co BHYT` : `Nguoi thu ${++activeIndex} (${m.name}): ${m.amountCurrentPeriod.toLocaleString('vi-VN')} d`).join('\n');
    let fullMessage = `📌 Chi tiết mức đóng BHYT cho ${activeIndex} người (${months} tháng):\n\n${detailText}\n\n💰 Tổng cộng: ${tongTien.toLocaleString('vi-VN')} đ / ${months} tháng\n\nLink tra cứu: ${window.location.href}`;
    
    if (searchParams.get('bank') || searchParams.get('account')) {
      fullMessage += `\n\n💳 Tài khoản thanh toán:\n- Ngân hàng: ${maNganHang.toUpperCase()}\n- STK: ${soTaiKhoan}\n- Chủ TK: ${tenTaiKhoan.toUpperCase()}`;
    }
    
    await navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
        <div className="flex justify-between items-center border-b border-blue-600/50 pb-2">
          <h3 className="text-xs font-semibold tracking-wide text-blue-200 uppercase">Kết quả mức đóng 2026</h3>
          <button onClick={() => setShowConfigModal(true)} className="text-[11px] bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-1 rounded-md flex items-center gap-1 transition-all">
            <UserCog size={13} /> Tài khoản thu
          </button>
        </div>
        
        <div className="space-y-3 border-b border-blue-600/50 pb-2 text-xs text-blue-100">
          <div className="flex justify-between"><span>Lương cơ sở:</span><span className="font-mono">{luongCoSo.toLocaleString('vi-VN')} đ</span></div>
          <div className="flex justify-between"><span>Phương thức đóng:</span><span className="font-semibold text-yellow-300">{months} tháng</span></div>
          <div className="flex justify-between"><span>Phải đóng:</span><span>{members.filter(m => !m.isShared).length} người</span></div>
        </div>

        <div>
          <p className="text-xs text-blue-200">Tổng số tiền phải đóng:</p>
          <p className="text-2xl font-bold font-mono text-yellow-300 mt-1">{tongTien.toLocaleString('vi-VN')} <span className="text-sm">VNĐ</span></p>
        </div>

        <div className="space-y-2 pt-2">
          <button onClick={handleCopyMessage} className={`w-full font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all ${copied ? 'bg-emerald-600' : 'bg-sky-500 hover:bg-sky-600'}`}>
            {copied ? <><Check size={16} /> Đã sao chép!</> : <><Copy size={16} /> Sao chép tin nhắn Zalo</>}
          </button>
          <button onClick={() => setShowQrModal(true)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm">
            <QrCode size={16} /> Xem Phiếu Thu & Mã QR
          </button>
        </div>
      </div>

      {showConfigModal && <ConfigModal onClose={() => setShowConfigModal(false)} bank={maNganHang} account={soTaiKhoan} name={tenTaiKhoan} />}
      {showQrModal && <QrModal onClose={() => setShowQrModal(false)} members={members} tongTien={tongTien} months={months} bank={maNganHang} account={soTaiKhoan} name={tenTaiKhoan} />}
    </>
  );
}
