import React from 'react';
import { CalendarDays } from 'lucide-react';

export default function PaymentPeriod({ months, onChange }) {
  const periods = [
    { label: '3 Tháng', value: 3 },
    { label: '6 Tháng', value: 6 },
    { label: '12 Tháng (1 Năm)', value: 12 },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-semibold text-slate-700 flex items-center gap-2 text-sm mb-3">
        <CalendarDays size={18} className="text-blue-600" />
        Chọn phương thức đóng bảo hiểm
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {periods.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
              months === item.value
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
