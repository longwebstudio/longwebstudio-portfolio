import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function GuideTable({ luongCoSo = 2530000, months = 12 }) {
  // Mức đóng BHYT của 1 người trong 1 tháng (4.5% lương cơ sở)
  const mucDongMotThangChuan = (luongCoSo || 0) * 0.045;

  // Số tiền gốc của người thứ 1 theo thời hạn đóng đã chọn (3, 6, 12 tháng...)
  const mucGocTheoThangChon = mucDongMotThangChuan * (months || 12);

  // Danh sách các mức giảm trừ theo thứ tự
  const rows = [
    { order: 'Người thứ 1', rate: '100% mức đóng chuẩn', factor: 1.0, isPrimary: true },
    { order: 'Người thứ 2', rate: '70% mức người thứ 1', factor: 0.7, isPrimary: false },
    { order: 'Người thứ 3', rate: '60% mức người thứ 1', factor: 0.6, isPrimary: false },
    { order: 'Người thứ 4', rate: '50% mức người thứ 1', factor: 0.5, isPrimary: false },
    { order: 'Từ người thứ 5 trở đi', rate: '40% mức người thứ 1', factor: 0.4, isPrimary: false },
  ];

  return React.createElement(
    'section',
    { className: 'mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200' },
    
    // Header
    React.createElement(
      'div',
      { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4' },
      React.createElement(
        'h3',
        { className: 'font-semibold text-slate-800 flex items-center gap-2 text-sm md:text-base' },
        React.createElement(HelpCircle, { size: 18, className: 'text-blue-600 shrink-0' }),
        `Bảng Mức Đóng BHYT Hộ Gia Đình (Tính Cho ${months} Tháng)`
      ),
      React.createElement(
        'span',
        { className: 'text-[11px] bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto' },
        `Lương cơ sở: ${(luongCoSo || 0).toLocaleString('vi-VN')} đ`
      )
    ),

    // Table Container
    React.createElement(
      'div',
      { className: 'overflow-x-auto' },
      React.createElement(
        'table',
        { className: 'w-full text-left text-xs border-collapse' },
        
        // Table Head
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            { className: 'bg-slate-100/80 text-slate-700 border-b border-slate-200' },
            React.createElement('th', { className: 'p-2.5 font-semibold' }, 'Thứ tự thành viên'),
            React.createElement('th', { className: 'p-2.5 font-semibold' }, 'Tỷ lệ mức đóng'),
            React.createElement('th', { className: 'p-2.5 font-semibold text-right' }, `Số tiền đóng (${months} tháng)`)
          )
        ),

        // Table Body
        React.createElement(
          'tbody',
          { className: 'divide-y divide-slate-100 text-slate-600' },
          rows.map((row) =>
            React.createElement(
              'tr',
              { key: row.order, className: 'hover:bg-slate-50/80 transition-colors' },
              React.createElement('td', { className: 'p-2.5 font-medium text-slate-900' }, row.order),
              React.createElement(
                'td',
                { className: row.isPrimary ? 'p-2.5 font-medium text-slate-700' : 'p-2.5' },
                row.rate
              ),
              React.createElement(
                'td',
                { className: `p-2.5 text-right font-mono font-bold ${row.isPrimary ? 'text-blue-700' : 'text-slate-800'}` },
                `${Math.round(mucGocTheoThangChon * row.factor).toLocaleString('vi-VN')} đ`
              )
            )
          )
        )
      )
    ),

    // Footer Note
    React.createElement(
      'p',
      { className: 'text-[11px] text-slate-500 italic mt-3.5 leading-normal' },
      '* ',
      React.createElement('strong', null, 'Lưu ý nghiệp vụ:'),
      ' Thứ tự đóng tiền áp dụng cho các thành viên cùng tham gia BHYT hộ gia đình trong năm tài chính. Các thành viên đã tham gia BHYT theo nhóm đối tượng khác (NLĐ, học sinh - sinh viên, đối tượng do NSNN đóng...) không được tính thứ tự giảm trừ.'
    )
  );
}