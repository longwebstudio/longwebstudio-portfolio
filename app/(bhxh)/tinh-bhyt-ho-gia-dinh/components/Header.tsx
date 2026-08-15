'use client';

import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Khóa cuộn trang trên mobile khi mở menu drawer
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Xử lý chia sẻ link
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Công cụ tính mức đóng BHYT Hộ gia đình',
          text: 'Tiện ích tính nhanh mức đóng BHYT hộ gia đình dành cho Nhân viên thu BHXH',
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
    {
      name: 'Công cụ tính BHYT',
      href: '#calculator-section',
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      badge: 'Chính',
    },
    {
      name: 'Bảng đối chiếu',
      href: '#bang-doi-chieu',
      icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />,
    },
    {
      name: 'Lưu ý nghiệp vụ',
      href: '#luu-y-nghiep-vu',
      icon: <HelpCircle className="w-4 h-4 text-indigo-600" />,
    },
  ];

  const ecosystemTools = [
    {
      name: 'Tính BHXH Tự Nguyện',
      href: 'https://www.longwebstudio.io.vn/tinh-bhxh-tu-nguyen',
      icon: <Calculator className="w-4 h-4 text-blue-500" />,
    },
    {
      name: 'Lộ Trình Lương Hưu',
      href: 'https://www.longwebstudio.io.vn/lo-trinh-luong-huu',
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
    },
    {
      name: 'Sổ Thu BHXH - BHYT',
      href: 'https://sothu.longwebstudio.io.vn/',
      icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
      tag: 'Điểm thu',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* Logo Brand */}
          <Link href="/tinh-bhyt-ho-gia-dinh" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm sm:text-lg tracking-tight block leading-none">
                BHYT <span className="text-blue-600">HỘ GIA ĐÌNH</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                Tiện ích tính nhanh • Long Web Studio
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

          {/* Desktop & Header Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Chia sẻ link công cụ"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
              <span>{copiedLink ? 'Đã copy' : 'Chia sẻ'}</span>
            </button>

            <a
              href="https://zalo.me/0966570913"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span>Zalo: 0966.570.913</span>
            </a>



            {/* Nút Toggle Menu trên Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors active:scale-95"
              aria-label="Mở menu di động"
            >
              <Menu className="w-6 h-6 text-slate-800" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER (MENU TRƯỢT TỐI ƯU MOBILE) */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Lớp phủ Backdrop làm mờ nền */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Khung Drawer trượt từ phải sang */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain z-10 animate-in slide-in-from-right duration-200">
            {/* 1. Header Drawer */}
            <div>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-xs block leading-tight">
                      BHYT HỘ GIA ĐÌNH
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Menu Tiện Ích</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Danh mục điều hướng trang */}
              <div className="p-4 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                    Nội dung chính
                  </span>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 active:bg-blue-100 text-slate-800 text-xs font-bold transition-all border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200/50">
                            {link.icon}
                          </div>
                          <span>{link.name}</span>
                        </div>
                        {link.badge ? (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-bold">
                            {link.badge}
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. Hệ sinh thái công cụ Long Web Studio */}
                <div>
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Công cụ khác (Long Web Studio)
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {ecosystemTools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors border border-slate-100"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-white rounded-lg border border-slate-200/60">
                            {tool.icon}
                          </div>
                          <span className="text-xs">{tool.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {tool.tag && (
                            <span className="text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded font-bold">
                              {tool.tag}
                            </span>
                          )}
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 4. Nút chia sẻ nhanh link */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
                  <span>{copiedLink ? 'Đã sao chép link công cụ!' : 'Chia sẻ công cụ cho đồng nghiệp'}</span>
                </button>
              </div>
            </div>

            {/* 5. Footer Drawer: Liên hệ & Hỗ trợ kỹ thuật */}
            <div className="p-4 bg-slate-900 text-white space-y-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                Hỗ trợ tùy biến bởi <strong className="text-slate-200">Long Web Studio</strong>
              </div>
              <a
                href="https://zalo.me/0966570913"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo: 0966.570.913</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};