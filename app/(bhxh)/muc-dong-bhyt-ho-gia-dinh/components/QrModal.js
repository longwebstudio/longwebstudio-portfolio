'use client'; // 1. Khai báo Client Component cho Next.js

import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QrModal({ 
  onClose, 
  members = [], 
  tongTien = 0, 
  months = 12, 
  bank = '', 
  account = '', 
  name = '' 
}) {
  // 2. Sửa cú pháp URL VietQR chuẩn API QuickLink
  const urlVietQR = `https://img.vietqr.io/image/${(bank || '').toLowerCase()}-${account}-compact.png?amount=${tongTien}&accountName=${encodeURIComponent((name || '').toUpperCase())}`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-white rounded-2xl p-5 max-w-[460px] w-full shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs text-slate-700"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
        
        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase text-center border-b pb-2">
          Thông Tin Đóng Tiền BHYT
        </h4>
        
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border font-sans">
          <p className="font-semibold text-blue-600 mb-1">📋 Danh sách đóng ({months} tháng):</p>
          {members.map((m, idx) => (
            <div key={m.id || idx} className="flex justify-between py-1 border-b border-slate-200/50 last:border-none">
              <span>
                {idx + 1}. {m.name} {m.isShared && <span className="text-[10px] text-slate-400">(Có BHYT)</span>}
              </span>
              <span className="font-mono font-medium">
                {m.isShared ? '0 đ' : `${(m.amountCurrentPeriod || 0).toLocaleString('vi-VN')} đ`}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 mt-1 border-t font-bold text-slate-900 text-sm">
            <span>💰 Tổng cộng:</span>
            <span className="text-blue-700 font-mono">{(tongTien || 0).toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center border-t border-dashed pt-4 border-slate-200">
          <div className="bg-white p-2 rounded-xl border shadow-xs flex flex-col items-center">
            <img 
              src={urlVietQR} 
              alt="Mã VietQR Thanh Toán" 
              className="w-[180px] h-[180px] object-contain" 
              loading="lazy"
            />
            <div className="mt-2 text-center text-[11px] text-slate-500 font-medium uppercase">
              <p className="font-bold text-slate-700">{bank} - {account}</p>
              <p className="mt-0.5">{name}</p>
            </div>
          </div>
          
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 leading-normal w-full">
            <p className="font-bold text-center mb-1">⚠️ HƯỚNG DẪN THANH TOÁN:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Khi quét mã, quý khách vui lòng <strong>tự điền số điện thoại</strong> vào phần nội dung.</li>
              <li>Chuyển xong, hãy <strong>chụp ảnh giao dịch</strong> gửi qua <strong>Zalo nhóm</strong> để nhân viên xác nhận.</li>
            </ol>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700 transition-all cursor-pointer"
        >
          Đóng
        </button>
      </motion.div>
    </div>
  );
}