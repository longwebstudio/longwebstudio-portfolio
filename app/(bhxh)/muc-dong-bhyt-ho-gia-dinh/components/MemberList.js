import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

// Thành phần con quản lý riêng ô nhập tên
function MemberNameInput({ id, initialName, onNameChange }) {
  const [localName, setLocalName] = useState(initialName);

  useEffect(() => {
    setLocalName(initialName);
  }, [initialName]);

  const handleBlur = () => {
    if (localName.trim() !== initialName && onNameChange) {
      onNameChange(id, localName.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return React.createElement('input', {
    type: 'text',
    value: localName,
    onChange: (e) => setLocalName(e.target.value),
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    className:
      'text-sm font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full py-0.5 transition-all',
    placeholder: 'Nhập tên thành viên...',
  });
}

export default function MemberList({ members = [], onToggle, onNameChange }) {
  return React.createElement(
    'div',
    { className: 'bg-white p-6 rounded-xl shadow-sm border border-slate-200' },

    // Tiêu đề danh sách
    React.createElement(
      'div',
      { className: 'mb-4' },
      React.createElement(
        'h3',
        { className: 'font-semibold text-slate-700 flex items-center gap-2 text-sm md:text-base' },
        React.createElement(Calculator, { size: 18, className: 'text-blue-600' }),
        'Danh sách chi tiết mức thu từng thành viên'
      ),
      React.createElement(
        'p',
        { className: 'text-[11px] text-slate-400 mt-0.5' },
        '* Nhân viên bấm trực tiếp vào chữ "Thành viên..." để nhập tên khách hàng thực tế (Hệ thống tự lưu khi gõ xong).'
      )
    ),

    // Danh sách thành viên
    React.createElement(
      'div',
      { className: 'space-y-3' },
      members.map((member, index) =>
        React.createElement(
          motion.div,
          {
            key: member.id || index,
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
            className: `p-3 rounded-lg border flex items-center justify-between transition-all ${
              member.isShared
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : 'bg-white border-blue-100 hover:border-blue-300'
            }`,
          },

          // Cột trái: Số thứ tự & Ô nhập tên
          React.createElement(
            'div',
            { className: 'flex items-center gap-3 flex-1 min-w-0' },
            React.createElement(
              'span',
              {
                className:
                  'text-xs bg-slate-200 text-slate-700 font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
              },
              index + 1
            ),
            React.createElement(
              'div',
              { className: 'min-w-0 w-full pr-2' },
              React.createElement(MemberNameInput, {
                id: member.id,
                initialName: member.name,
                onNameChange: onNameChange,
              }),
              React.createElement(
                'p',
                { className: 'text-xs text-slate-400 mt-0.5' },
                member.note
              )
            )
          ),

          // Cột giữa: Số tiền hiển thị
          React.createElement(
            'div',
            { className: 'mx-2 text-right flex-shrink-0' },
            member.isShared
              ? React.createElement('span', { className: 'text-xs font-medium text-slate-400' }, '0 đ')
              : React.createElement(
                  'span',
                  { className: 'text-sm font-mono font-bold text-blue-700' },
                  `${(member.amountCurrentPeriod || 0).toLocaleString('vi-VN')} đ`
                )
          ),

          // Cột phải: Checkbox Miễn đóng (Đã có BHYT)
          React.createElement(
            'div',
            { className: 'flex items-center flex-shrink-0 pl-2' },
            React.createElement(
              'label',
              { className: 'flex items-center gap-1.5 cursor-pointer select-none' },
              React.createElement('input', {
                type: 'checkbox',
                checked: !!member.isShared,
                onChange: () => onToggle && onToggle(member.id),
                className: 'w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500',
              }),
              React.createElement(
                'span',
                { className: 'text-xs text-slate-500 ml-1 hidden sm:inline' },
                'Đã có BHYT'
              )
            )
          )
        )
      )
    )
  );
}