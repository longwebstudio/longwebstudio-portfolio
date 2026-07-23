'use client';

import { useState } from 'react';
import { calculateBHYTHoGiaDinh } from '@/lib/wordpress'; // Nhập thuật toán tính phí đã viết ở bước trước

export default function BHYTCalculatorWidget() {
  const [members, setMembers] = useState(1);
  const [duration, setDuration] = useState(12);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const calculation = calculateBHYTHoGiaDinh(Number(members), Number(duration));
    setResult(calculation);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-xl mx-auto my-10">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
        <span className="text-2xl">⚙️</span>
        <h3 className="text-base font-bold text-red-500 uppercase tracking-wider">Trải Nghiệm Tính Phí BHYT Thực Tế</h3>
      </div>

      <div className="space-y-4">
        {/* Chọn số lượng thành viên */}
        <div>
          <label className="text-xs text-slate-400 font-bold block mb-1">Số lượng người đóng trong gia đình:</label>
          <select 
            value={members} 
            onChange={(e) => setMembers(e.target.value)}
            className="w-full bg-slate-950 text-sm p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-red-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} người</option>
            ))}
          </select>
        </div>

        {/* Chọn thời hạn đóng */}
        <div>
          <label className="text-xs text-slate-400 font-bold block mb-1">Thời hạn tham gia đóng:</label>
          <div className="grid grid-cols-3 gap-2">
            {[3, 6, 12].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setDuration(m)}
                className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${duration === m ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                {m} Tháng
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-xs transition-colors mt-2"
        >
          Tính Phí Tự Động &rarr;
        </button>
      </div>

      {/* Kết quả hiển thị động */}
      {result && (
        <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl">
            <span className="text-xs text-slate-400 font-semibold">TỔNG TIỀN PHẢI NỘP:</span>
            <span className="text-xl font-black text-red-500">
              {result.total.toLocaleString('vi-VN')} đ
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Chi tiết mức đóng từng người:</span>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2">
              {result.details.map((m) => (
                <div key={m.memberPosition} className="flex justify-between items-center text-xs bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                  <span className="text-slate-400">Thành viên thứ {m.memberPosition} ({m.multiplierPercent}%):</span>
                  <span className="font-bold text-slate-200">{m.price.toLocaleString('vi-VN')} đ</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}