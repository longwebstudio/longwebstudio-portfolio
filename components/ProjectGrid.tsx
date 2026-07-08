"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from 'next/image';
import { ProjectNode } from '@/lib/api';

interface ProjectGridProps {
  projects: ProjectNode[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  // Quản lý chuyên mục đang được chọn (Mặc định ban đầu là hiển thị tất cả 'all')
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 1. Tự động quét dữ liệu thô để bóc tách ra danh sách các Danh mục duy nhất (Unique Categories)
  const allCategories = [
    { name: "Tất cả dự án", slug: "all" },
    ...Array.from(
      new Map(
        projects
          .flatMap((p) => p.categories?.nodes || [])
          .map((c) => [c.slug, c])
      ).values()
    ),
  ];

  // 2. Lọc mảng danh sách dự án hiển thị dựa trên State chuyên mục được chọn
  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((project) =>
        project.categories?.nodes?.some((c) => c.slug === selectedCategory)
      );

  return (
    <div className="space-y-12">
      {/* ==========================================
          1. THANH BỘ LỌC CHUYÊN MỤC DỰ ÁN (FILTER BAR)
         ========================================== */}
      <div className="flex flex-wrap justify-center gap-3">
        {allCategories.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className="relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              {/* Hiệu ứng viên nhộng chạy trượt đuổi theo chữ khi đổi nút bằng layoutId */}
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-600 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{ borderRadius: 9999 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500 hover:text-gray-900"}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ==========================================
          2. LƯỚI HIỂN THỊ DỰ ÁN VỚI HIỆU ỨNG LAYOUT CHUYỂN ĐỘNG
         ========================================== */}
      {/* Thuộc tính layout trên thẻ cha giúp đồng bộ hóa chuyển động của lưới */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* AnimatePresence đảm bảo hiệu ứng ẩn/hiện (exit/enter) của thẻ con diễn ra trọn vẹn */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const thumbnail = project.featuredImage?.node?.sourceUrl || '/placeholder.jpg';
            const { clientName, projectUrl, techStack } = project.projectDetails;

            return (
              <motion.article
                key={project.slug}
                layout // Kích hoạt hiệu ứng trượt dịch chuyển vị trí mượt mà khi đổi bộ lọc
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 450, damping: 38 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)" 
                }}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 group h-full"
              >
                {/* Khu vực ảnh đại diện dự án dạng Mockup */}
                <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                  <Image
                    src={thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-103"
                  />
                </div>

                {/* Khối chứa thông tin chi tiết */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Khách hàng: {clientName || 'Đối tác ẩn danh'}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                      {project.title}
                    </h3>
                    
                    {/* Danh sách nhãn công nghệ áp dụng (Tech Stack tags) */}
                    {techStack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {techStack.split(',').map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thanh điều hướng dẫn phễu liên kết xem chi tiết hoặc liên kết ngoài */}
                  <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                    {/* Link xem phân tích Case Study nội bộ Next.js */}
                    <a
                      href={`/portfolio/${project.slug}`}
                      className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      Xem Case Study
                    </a>

                    {/* Link truy cập trực tiếp website chạy thực tế bên ngoài */}
                    {projectUrl && (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group/link"
                      >
                        Ghé thăm web
                        <svg 
                          className="ml-1 h-4 w-4 text-blue-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="2.5" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
