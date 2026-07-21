import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { formatVND } from '../utils';

interface TableLookupProps {
  minIncome: number;
  maxIncome: number;
  step: number;
  stateSupport: number;
  localSupport: number;
  onSelectIncome: (income: number) => void;
}

export default function TableLookup({
  minIncome,
  maxIncome,
  step,
  stateSupport,
  localSupport,
  onSelectIncome
}: TableLookupProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLevels = useMemo(() => {
    const results = [];
    let currentIdx = 0;
    const totalSupport = stateSupport + localSupport;
    
    for (let income = minIncome; income <= maxIncome; income += step) {
      const raw = income * 0.22;
      const act = raw - totalSupport;
      const matchText = `${income} ${act}`;
      if (!searchQuery || matchText.includes(searchQuery.replace(/\D/g, ''))) {
        results.push({ level: currentIdx, income, contribution: act });
      }
      currentIdx++;
      if (results.length >= 8) break;
    }
    return results;
  }, [searchQuery, minIncome, maxIncome, step, stateSupport, localSupport]);

  return (
    <section id="table-lookup" className="py-16 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Bảng Tra Cứu Nhanh Mức Đóng</h2>
          <p className="text-slate-700 mt-2 text-base">
            Tìm kiếm nhanh theo số thu nhập hoặc số tiền mong muốn thực tế.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Nhập mức thu nhập muốn tìm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-slate-900 placeholder-slate-500 text-sm font-medium"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="text-xs text-slate-900 uppercase bg-slate-100 border-b-2 border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3.5 font-extrabold">Mức chuẩn</th>
                <th scope="col" className="px-6 py-3.5 font-extrabold">Mức thu nhập tháng đăng ký</th>
                <th scope="col" className="px-6 py-3.5 font-extrabold">Thực đóng hàng tháng (Đã giảm trừ)</th>
                <th scope="col" className="px-6 py-3.5 font-extrabold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-bold">
              {filteredLevels.map((row) => (
                <tr key={row.level} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-extrabold text-slate-900">Mức #{row.level}</td>
                  <td className="px-6 py-4 text-slate-900">{formatVND(row.income)}</td>
                  <td className="px-6 py-4 text-emerald-800 font-black">{formatVND(row.contribution)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onSelectIncome(row.income)}
                      className="text-emerald-700 hover:text-emerald-850 font-black inline-flex items-center gap-1.5"
                    >
                      Chọn mức <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLevels.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}