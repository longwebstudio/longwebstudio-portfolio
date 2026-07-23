import { ReactNode } from 'react';
import '../globals.css';

export const metadata = {
  title: 'Sổ Tay Thu Hộ - Hệ Thống Quản Lý BHYT/BHXH',
};

export default function PortalAppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-900 text-slate-100 min-h-screen">
        
        {/* Thiết lập giao diện Dashboard tối giản, hoàn toàn không bị dính Header/Footer công cộng */}
        <div className="flex">
          <aside className="w-64 bg-slate-950 p-6">Sidebar Menu</aside>
          <main className="flex-grow p-8">{children}</main>
        </div>
        
      </body>
    </html>
  );
}