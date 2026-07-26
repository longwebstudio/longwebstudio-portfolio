import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">CÔNG CỤ TÍNH MỨC ĐÓNG BHYT HỘ GIA ĐÌNH</h1>
          <p className="text-xs text-blue-100 mt-1">Dành cho nhân viên thu BHXH, BHYT toàn quốc</p>
        </div>
        <div className="text-right text-xs">
          <p>Phát triển bởi: <span className="font-semibold">Freelancer Long Web Studio</span></p>
          <a href="https://longwebstudio.io.vn" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline flex items-center gap-1 justify-end mt-0.5">
            www.longwebstudio.io.vn <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </header>
  );
}
