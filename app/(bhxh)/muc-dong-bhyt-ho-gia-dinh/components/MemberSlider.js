import React from 'react';
import { Users } from 'lucide-react';

export default function MemberSlider({ count, onChange }) {
  // Định nghĩa mảng chọn nhanh từ 1 đến 6 thành viên
  const quickOptions =[1,2,3,4,5,6];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
      {/* Tiêu đề và hiển thị số lượng người hiện tại */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2 text-sm">
          <Users size={18} className="text-blue-600" />
          Số thành viên trong hộ gia đình
        </h3>
        <span className="text-sm font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-100">
          {count} Người
        </span>
      </div>
      
      {/* Các nút bấm chọn nhanh từ 1 đến 6 người */}
      <div className="grid grid-cols-6 gap-1.5">
        {quickOptions.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`py-1.5 text-xs font-semibold rounded-md border transition-all text-center ${
              count === num
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {num} Ng
          </button>
        ))}
      </div>

      {/* Thanh trượt kéo tinh chỉnh số lượng từ 1 đến 15 người */}
      <div className="flex items-center gap-4 pt-1">
        <span className="text-xs text-slate-400 font-medium w-3 text-center">1</span>
        <input
          type="range"
          min="1"
          max="15"
          value={count}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 border border-slate-200"
        />
        <span className="text-xs text-slate-400 font-medium w-4 text-center">15</span>
      </div>
    </div>
  );
}
