import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

// Thành phần con quản lý riêng ô nhập tên để tránh giật lag khi gõ (Lag-free Input)
function MemberNameInput({ id, initialName, onNameChange }) {
  const [localName, setLocalName] = useState(initialName);

  // Đồng bộ lại tên nếu danh sách bên ngoài thay đổi (khi dùng thanh trượt hoặc URL)
  useEffect(() => {
    setLocalName(initialName);
  }, [initialName]);

  const handleBlur = () => {
    if (localName.trim() !== initialName) {
      onNameChange(id, localName.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Tự động lưu khi nhấn Enter
    }
  };

  return (
    <input
      type="text"
      value={localName}
      onChange={(e) => setLocalName(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="text-sm font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full py-0.5 transition-all"
      placeholder="Nhập tên thành viên..."
    />
  );
}

export default function MemberList({ members, onToggle, onNameChange }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      {/* Tiêu đề danh sách */}
      <div className="mb-4">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2 text-sm md:text-base">
          <Calculator size={18} className="text-blue-600" />
          Danh sách chi tiết mức thu từng thành viên
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          * Nhân viên bấm trực tiếp vào chữ "Thành viên..." để nhập tên khách hàng thực tế (Hệ thống tự lưu khi gõ xong).
        </p>
      </div>

      {/* Danh sách thành viên */}
      <div className="space-y-3">
        {members.map((member, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            key={member.id} 
            className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
              member.isShared ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-blue-100 hover:border-blue-300'
            }`}
          >
            {/* Cột trái: Số thứ tự & Ô nhập tên đã tối ưu mượt mà */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-xs bg-slate-200 text-slate-700 font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0 w-full pr-2">
                <MemberNameInput 
                  id={member.id} 
                  initialName={member.name} 
                  onNameChange={onNameChange} 
                />
                <p className="text-xs text-slate-400 mt-0.5">{member.note}</p>
              </div>
            </div>

            {/* Cột giữa: Số tiền hiển thị rõ ràng */}
            <div className="mx-2 text-right flex-shrink-0">
              {member.isShared ? (
                <span className="text-xs font-medium text-slate-400">0 đ</span>
              ) : (
                <span className="text-sm font-mono font-bold text-blue-700">
                  {member.amountCurrentPeriod.toLocaleString('vi-VN')} đ
                </span>
              )}
            </div>

            {/* Cột phải: Toggle trạng thái Đã tham gia (Miễn đóng) */}
            <div className="flex items-center flex-shrink-0 pl-2">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={member.isShared} 
                  onChange={() => onToggle(member.id)} 
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                />
                <span className="text-xs text-slate-500 ml-1 hidden sm:inline">Đã có BHYT</span>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
