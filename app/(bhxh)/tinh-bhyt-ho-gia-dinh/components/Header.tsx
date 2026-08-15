'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calculator,
  FileSpreadsheet,
  HelpCircle,
  PhoneCall,
  Share2,
  Menu,
  X,
  Check,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Công cụ tính mức đóng BHYT Hộ gia đình',
          text: 'Tiện ích tính nhanh mức đóng BHYT hộ gia đình cho Nhân viên thu BHXH',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Công cụ tính', href: '#calculator-section', icon: <Calculator className="w-4 h-4 text-blue-600" /> },
    { name: 'Bảng đối chiếu', href: '#bang-doi-chieu', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> },
    { name: 'Lưu ý nghiệp vụ', href: '#luu-y-nghiep-vu', icon: <HelpCircle className="w-4 h-4 text-indigo-600" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/tinh-bhyt-ho-gia-dinh" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight block leading-none">
              BHYT <span className="text-blue-600">HỘ GIA ĐÌNH</span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
              Trợ lý điểm thu &amp; nhân viên thu BHXH
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Nút chia sẻ link trang web */}
          <button
            type="button"
            onClick={handleShare}
            title="Chia sẻ link công cụ cho đồng nghiệp"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
            <span>{copiedLink ? 'Đã copy link' : 'Chia sẻ'}</span>
          </button>

          {/* Hotline hỗ trợ */}
          <a
            href="tel:0966570913"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-600/20 active:scale-95 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tổng đài BHXH:</span>
            <span>0966 570 913</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              handleShare();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors text-left"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>{copiedLink ? 'Đã sao chép link trang' : 'Chia sẻ công cụ cho đồng nghiệp'}</span>
          </button>
        </div>
      )}
    </header>
  );
};