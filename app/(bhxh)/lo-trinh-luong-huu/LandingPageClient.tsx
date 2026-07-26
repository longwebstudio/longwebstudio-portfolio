'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateBHXH, BHXHInput } from '@/utils/bhxh';
import { User, CalendarDays, Shield, ClipboardList } from 'lucide-react';
import ResultBox from './ResultBox';

export default function LandingPageClient() {
  const [formData, setFormData] = useState<BHXHInput>({ name: 'Anh Phú', birthYear: 1975, gender: 'nam', paidYears: 0 });
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased font-sans">
      <header className="bg-slate-900 text-white py-6 px-4 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase flex items-center justify-center gap-2 text-blue-400">
            <Shield size={24} /> Tool Thu BHXH, BHYT Quốc Gia
          </h1>
          <p className="text-slate-400 text-xs mt-1">Hệ thống lập lộ trình đóng tiếp và trích xuất mẫu tin nhắn Zalo tư vấn khách hàng</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-12 gap-6">
        {/* Form nhập liệu */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 md:col-span-5 h-fit">
          <h2 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-1.5 text-slate-700">
            <ClipboardList size={16} /> Nhập liệu hồ sơ
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); setResult(calculateBHXH(formData)); }} className="space-y-4">
            
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Họ và tên khách hàng" 
                required 
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <CalendarDays className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="number" 
                  placeholder="Năm sinh" 
                  required 
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={formData.birthYear} 
                  onChange={(e) => setFormData({ ...formData, birthYear: parseInt(e.target.value) || 1975 })} 
                />
              </div>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.gender} 
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'nam' | 'nu' })}
              >
                <option value="nam">Giới tính: Nam</option>
                <option value="nu">Giới tính: Nữ</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Thời gian đã đóng cũ (năm)</label>
              <input 
                type="number" 
                placeholder="Nhập 0 nếu tham gia từ đầu" 
                min="0" 
                max="14" 
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.paidYears} 
                onChange={(e) => setFormData({ ...formData, paidYears: parseInt(e.target.value) || 0 })} 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Thiết Lập Lộ Trình Tư Vấn
            </button>
          </form>
        </div>

        {/* Khu vực hiển thị kết quả */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 min-h-[320px] flex flex-col items-center justify-center text-xs font-medium"
              >
                Vui lòng điền thông tin khách hàng để hệ thống tính toán phương án đóng gộp chuẩn xác.
              </motion.div>
            ) : (
              <ResultBox key="result" name={formData.name} data={result} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
