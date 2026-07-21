import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { formatVND } from '../utils';

interface HeroProps {
  stateSupport: number;
  localSupport: number;
}

export default function Hero({ stateSupport, localSupport }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 text-slate-900 py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-300 px-3.5 py-1.5 rounded-full text-emerald-900 text-sm font-bold">
            <span>Bảng đóng cập nhật mới nhất từ T7/2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Tự Chủ Tài Chính Hưu Trí <br />
            <span className="text-emerald-800">An Nhàn Tuổi Già</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
            Lựa chọn mức đóng phù hợp để tích lũy lương hưu hàng tháng và nhận thẻ BHYT miễn phí trọn đời khi về già. Ngân sách nhà nước và địa phương hỗ trợ lên tới 132.000đ/tháng.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#calculator" 
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-lg transition flex items-center gap-2 shadow-sm"
            >
              Tính phí đóng <ArrowRight className="h-4 w-4" />
            </a>
            <a 
              href="#table-lookup" 
              className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-300 font-bold px-6 py-3 rounded-lg transition shadow-sm"
            >
              Bảng giá chi tiết
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-6 w-6 text-emerald-800" />
            <h3 className="font-extrabold text-lg text-slate-900">Chính Sách Hỗ Trợ</h3>
          </div>
          <p className="text-sm text-slate-700 mb-6 leading-relaxed">
            Mức đóng thực tế được giảm trừ trực tiếp nhờ các nguồn kinh phí hỗ trợ an sinh xã hội:
          </p>
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-900">Nhà nước hỗ trợ</span>
              <span className="font-extrabold text-emerald-800">-{formatVND(stateSupport)}/tháng</span>
            </div>
            <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-lg flex justify-between items-center">
              <span className="text-sm font-bold text-blue-900">Ngân sách địa phương</span>
              <span className="font-extrabold text-blue-800">-{formatVND(localSupport)}/tháng</span>
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Tổng giảm trừ thực tế:</span>
              <span className="text-rose-750 font-extrabold">-{formatVND(stateSupport + localSupport)}/tháng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}