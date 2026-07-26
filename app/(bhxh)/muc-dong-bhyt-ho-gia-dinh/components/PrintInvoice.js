import React from 'react';

export default function PrintInvoice({ members, tongTien, months, luongCoSo }) {
  const activeMembers = members.filter(m => !m.isShared);

  return (
    <div 
      id="invoice-capture" 
      className="w-[500px] p-6 rounded-2xl font-sans"
      style={{ 
        boxSizing: 'border-box',
        backgroundColor: '#f8fafc', // Ép cứng màu nền Slate-50 sáng sủa, không lo bị tối ảnh
        color: '#1e293b'
      }}
    >
      {/* Header Hóa Đơn */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-xl text-center shadow-sm">
        <h2 className="text-base font-bold tracking-wide uppercase">BẢO HIỂM Y TẾ HỘ GIA ĐÌNH 2026</h2>
        <p className="text-[11px] text-blue-100 mt-0.5">Phiếu tính toán mức đóng chi tiết nhanh</p>
      </div>

      {/* Thông tin chung */}
      <div className="my-4 bg-white p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
        <div className="flex justify-between"><span>Phương thức đóng:</span><span className="font-bold text-slate-800">{months} Tháng</span></div>
        <div className="flex justify-between"><span>Lương cơ sở tham chiếu:</span><span className="font-mono">{luongCoSo.toLocaleString('vi-VN')} đ</span></div>
        <div className="flex justify-between"><span>Số người tham gia thu:</span><span className="font-bold text-blue-600">{activeMembers.length} người</span></div>
      </div>

      {/* Danh sách thành viên */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Chi tiết từng người:</p>
        {members.map((member, index) => (
          <div 
            key={member.id} 
            className={`p-3 rounded-lg border text-xs flex justify-between items-center ${
              member.isShared ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-white border-blue-50'
            }`}
          >
            <div>
              <p className="font-semibold text-slate-800">{index + 1}. {member.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{member.note}</p>
            </div>
            <div className="font-mono font-bold text-sm text-blue-600">
              {member.isShared ? '0 đ' : `${member.amountCurrentPeriod.toLocaleString('vi-VN')} đ`}
            </div>
          </div>
        ))}
      </div>

      {/* Tổng tiền nổi bật */}
      <div className="mt-5 bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-4 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <p className="text-[10px] text-blue-200 uppercase font-semibold">Tổng kinh phí phải đóng:</p>
          <p className="text-xs text-yellow-300 font-medium mt-0.5">Thời hạn {months} tháng</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-black font-mono text-yellow-300">
            {tongTien.toLocaleString('vi-VN')} <span className="text-xs uppercase">đ</span>
          </span>
        </div>
      </div>

      {/* Bản quyền thương hiệu chân trang */}
      <div className="mt-5 text-center border-t border-dashed border-slate-200 pt-3">
        <p className="text-[10px] text-slate-400">Hệ thống phát triển và vận hành bởi</p>
        <p className="text-xs font-bold text-blue-600 mt-0.5">Long Web Studio</p>
        <p className="text-[9px] text-slate-400 mt-0.5">www.longwebstudio.io.vn</p>
      </div>
    </div>
  );
}
