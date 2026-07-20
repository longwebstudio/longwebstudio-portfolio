import React from 'react';
import { getLwsProductFromWooGraphQL } from '@/lib/api';

interface LwsPricingTableProps {
  productDatabaseId: number; // ID của sản phẩm cha (Variable Product)
}

export default async function LwsPricingTable({ productDatabaseId }: LwsPricingTableProps) {
  // Tự động kéo dữ liệu sản phẩm từ hàm Core GraphQL WooCommerce trong api.ts
  const productData = await getLwsProductFromWooGraphQL(productDatabaseId);
  
  // Trích xuất danh sách các gói biến thể con (1118, 1119, 1120)
  const variations = productData?.variations?.nodes || [];

  // Đường dẫn link gốc WordPress backend để xử lý cơ chế giỏ hàng mua nhanh
  const baseBackendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://longwebstudio.io.vn';

  if (variations.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-slate-500">
        ⚠️ Không thể tải dữ liệu bảng giá từ WooCommerce hệ thống. Vui lòng kiểm tra lại kết nối GraphQL.
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-6 px-2">
      {variations.map((variant: any) => {
        // Tự động nhận diện gói 1 Năm (hoặc gói chứa chữ Năm) để làm nổi bật (Featured)
        const isYearly = variant.name.includes('1 Năm') || variant.name.includes('Yearly');
        
        return (
          <div 
            key={variant.databaseId} 
            className={`flex w-full max-w-[260px] flex-col rounded-2xl p-6 text-center border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              isYearly 
                ? 'border-2 border-green-700 bg-white shadow-md shadow-green-700/5 relative' 
                : 'border-slate-200 bg-white shadow-sm'
            }`}
          >
            {/* Nhãn nổi bật cho gói cước năm */}
            {isYearly && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Phổ biến nhất
              </span>
            )}
            
            {/* Tên gói dịch vụ lấy động từ WooCommerce (1 Tháng, 1 Năm, 3 Năm) */}
            <h3 className={`text-base font-extrabold tracking-tight ${isYearly ? 'text-green-700' : 'text-slate-700'}`}>
              {variant.name}
            </h3>
            
            {/* Giá tiền tự lấy từ cấu hình sản phẩm trên hệ thống */}
            <div className="my-4 text-2xl font-bold text-slate-900">
              {variant.price}
            </div>
            
            {/* Nội dung mô tả tính năng của từng gói */}
            <div 
              className="mb-6 flex-grow text-xs text-slate-500 sm:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: variant.description || 'Gói dịch vụ quản lý chu kỳ phần mềm tự động hóa.' }}
            />
            
            {/* LINK MUA NHANH CHỐNG TRỐNG GIỎ HÀNG: Tự động nhúng mã ID (1118, 1119, 1120) */}
            <a 
              href={`${baseBackendUrl}/?buy_lws_id=${variant.databaseId}`}
              className={`block w-full rounded-lg py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 active:scale-[0.98] ${
                isYearly 
                  ? 'bg-green-700 hover:bg-green-800 shadow-green-700/10' 
                  : 'bg-slate-600 hover:bg-slate-700 shadow-slate-600/10'
              }`}
            >
              {isYearly ? 'Mua tiết kiệm' : 'Đăng ký ngay'}
            </a>
          </div>
        );
      })}
    </div>
  );
}
