import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, UserCog, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfigModal({ onClose, bank, account, name }) {
  const router = useRouter();
  const [inputBank, setInputBank] = useState(bank);
  const [inputAccount, setInputAccount] = useState(account);
  const [inputName, setInputName] = useState(name);

  const handleSave = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set('bank', inputBank.trim().toLowerCase());
    params.set('account', inputAccount.trim());
    params.set('name', inputName.trim().toUpperCase());
    router.push(`?${params.toString()}`, { scroll: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-5 max-w-[400px] w-full shadow-2xl relative text-xs text-slate-600">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 p-1.5 rounded-full"><X size={16} /></button>
        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase flex items-center gap-1.5 border-b pb-2"><UserCog size={16} className="text-blue-600" /> Tài khoản nhân viên thu</h4>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block font-semibold mb-1">Mã ngân hàng (vietinbank, vcb, mbbank):</label><input type="text" value={inputBank} onChange={(e) => setInputBank(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg font-mono" required /></div>
          <div><label className="block font-semibold mb-1">Số tài khoản ngân hàng:</label><input type="text" value={inputAccount} onChange={(e) => setInputAccount(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg font-mono" required /></div>
          <div><label className="block font-semibold mb-1">Tên chủ tài khoản (Không dấu):</label><input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg font-semibold uppercase" required /></div>
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button type="button" onClick={onClose} className="py-2 border rounded-xl font-semibold">Hủy</button>
            <button type="submit" className="py-2 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-1"><CheckCircle2 size={14} /> Lưu thay đổi</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
