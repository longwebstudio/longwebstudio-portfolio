// app/(bhxh)/lo-trinh-luong-huu/LandingPageClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateBHXH, BHXHInput } from '@/utils/bhxh';
import { User, CalendarDays, Shield, ClipboardList, ExternalLink } from 'lucide-react';
import ResultBox from './ResultBox';

export default function LandingPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<BHXHInput>({ 
    name: 'Anh Phú', 
    birthMonth: 1, 
    birthYear: 1975, 
    gender: 'nam', 
    paidYears: 0 
  });
  
  const [result, setResult] = useState<any>(null);

  // ĐỌC DỮ LIỆU TỪ URL THAM SỐ TIẾNG VIỆT KHÔNG DẤU
  useEffect(() => {
    const qName = searchParams.get('hoten');
    const qMonth = searchParams.get('thangsinh');
    const qYear = searchParams.get('namsinh');
    const qGender = searchParams.get('gioitinh');
    const qPaid = searchParams.get('namdadong');

    if (qName || qMonth || qYear || qGender || qPaid) {
      const activeData: BHXHInput = {
        name: qName || 'Khách hàng',
        birthMonth: parseInt(qMonth || '1') || 1,
        birthYear: parseInt(qYear || '1975') || 1975,
        gender: (qGender === 'nu' ? 'nu' : 'nam') as 'nam' | 'nu',
        paidYears: parseInt(qPaid || '0') || 0
      };
      setFormData(activeData);
      setResult(calculateBHXH(activeData));
    } else {
      setResult(calculateBHXH(formData));
    }
  }, [searchParams]);

  // GHI DỮ LIỆU LÊN URL THAM SỐ TIẾNG VIỆT KHÔNG DẤU
  const updateUrlParams = (data: BHXHInput) => {
    const params = new URLSearchParams();
    params.set('hoten', data.name);
    params.set('thangsinh', data.birthMonth.toString());
    params.set('namsinh', data.birthYear.toString());
    params.set('gioitinh', data.gender);
    params.set('namdadong', data.paidYears.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateBHXH(formData));
    updateUrlParams(formData);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased font-sans">
      <header className="bg-slate-900 text-white py-6 text-center border-b border-slate-800 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-lg md:text-xl font-black uppercase text-blue-400 flex items-center justify-center md:justify-start gap-2">
              <Shield size={22} /> Tính tuổi nghỉ hưu & Lộ trình đóng tiếp BHXH tự nguyện chuẩn xác nhất
            </h1>
            <p className="text-slate-400 text-xs mt-1">Duy trì bởi Freelancer Long Web Studio phục vụ đồng nghiệp đi tư vấn người dân</p>
          </div>
          <a href="https://www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/10">
            Bảng tính toán chuyên sâu <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-12 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 md:col-span-5 h-fit">
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-sm font-black text-slate-900 uppercase flex items-center gap-1.5 text-slate-700">
              <ClipboardList size={16} /> Thu thập thông tin khách hàng
            </h2>
            <button 
              type="button"
              onClick={() => {
                const defaultData: BHXHInput = { name: 'Anh Phú', birthMonth: 1, birthYear: 1975, gender: 'nam', paidYears: 0 };
                setFormData(defaultData);
                setResult(calculateBHXH(defaultData));
                updateUrlParams(defaultData);
              }}
              className="text-[10px] font-bold text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded"
            >
              Tải lại ví dụ mẫu
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Họ và tên người tham gia</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input type="text" placeholder="Ví dụ: Nguyễn Văn Phú" required className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Tháng sinh</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.birthMonth} onChange={(e) => setFormData({ ...formData, birthMonth: parseInt(e.target.value) || 1 })}>
                  {months.map(m => <option key={m} value={m}>Tháng {m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Năm sinh</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input type="number" placeholder="Năm sinh" required className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.birthYear} onChange={(e) => setFormData({ ...formData, birthYear: parseInt(e.target.value) || 1975 })} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Phân loại đối tượng (Giới tính)</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'nam' | 'nu' })}>
                <option value="nam">Lao động Nam</option>
                <option value="nu">Lao động Nữ</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Thời gian đóng BHXH tích lũy cũ (Năm)</label>
              <input type="number" placeholder="Nhập 0 nếu bắt đầu tham gia mới" min="0" max="14" className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.paidYears} onChange={(e) => setFormData({ ...formData, paidYears: parseInt(e.target.value) || 0 })} />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all">
              Tính tuổi nghỉ hưu & Lộ trình ➔
            </button>
          </form>
        </div>

        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" className="bg-slate-50 border-2 border-dashed rounded-2xl p-8 text-center text-slate-400 min-h-[320px] flex items-center justify-center text-xs">
                Đang thiết lập dữ liệu hệ thống...
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
