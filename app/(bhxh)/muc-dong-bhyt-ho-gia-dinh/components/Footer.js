export default function Footer() {
    return (
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 mt-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-slate-200 mb-1">CÔNG CỤ HỖ TRỢ THU BHXH Y TẾ HỘ GIA ĐÌNH 2026</p>
            <p className="leading-relaxed">Công cụ tính nhanh dành cho nhân viên thu và cộng tác viên. Chức năng tính toán dựa trên biểu thuế hộ gia đình hiện hành và mức lương tham chiếu năm 2026.</p>
          </div>
          <div className="md:text-right space-y-1">
            <p>Sản phẩm miễn phí được duy trì bởi:</p>
            <p className="font-medium text-slate-200">Freelancer Long Web Studio</p>
            <p>Website Chính thức: <a href="https://longwebstudio.io.vn" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.longwebstudio.io.vn</a></p>
          </div>
        </div>
      </footer>
    );
  }
  