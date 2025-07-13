"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface NewsArticle {
  id?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  author?: {
    name?: string;
    avatar?: string;
  };
  updatedAt?: string;
  slug?: string;
  category?: string;
  tags?: string[];
}

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  variant?: "grid" | "list";
  className?: string;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const NewsCard = ({ article, index = 0, variant = "list", className = "" }: NewsCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (variant === "grid") {
    return (
      <motion.article
        key={article.id || index}
        variants={item}
        className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-vina-primary/20 ${className}`}
      >
        {/* Cover Image */}
        <div className="relative w-full h-48 overflow-hidden">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title || "Article cover"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-vina-primary/10 to-vina-secondary/10 flex items-center justify-center">
              <div className="text-vina-primary/40">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {article.category && (
                <span className="px-3 py-1 bg-vina-primary/10 text-vina-primary text-xs font-medium rounded-full">
                  {article.category}
                </span>
              )}
            </div>
            {article.updatedAt && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(article.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-vina-primary transition-colors duration-200">
            {article.title || "Tiêu đề bài viết"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.description || "Mô tả ngắn về nội dung bài viết..."}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-vina-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-vina-primary" />
                </div>
              )}
              <span className="text-xs font-medium text-gray-700">
                {article.author?.name || "Tác giả"}
              </span>
            </div>

            <Link
              href={`/tin-tuc/${article.slug || "#"}`}
              className="inline-flex items-center space-x-2 text-vina-primary hover:text-vina-secondary transition-colors duration-200 font-medium text-sm group/link"
            >
              <span>Đọc thêm</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // List variant (default)
  return (
    <motion.article
      key={article.id || index}
      variants={item}
      className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-vina-primary/20 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Cover Image */}
        <div className="relative w-full h-48 md:h-auto overflow-hidden md:col-span-2">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title || "Article cover"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-vina-primary/10 to-vina-secondary/10 flex items-center justify-center">
              <div className="text-vina-primary/40">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="md:col-span-3 p-4 md:p-6">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {article.category && (
                <span className="px-3 py-1 bg-vina-primary/10 text-vina-primary text-xs font-medium rounded-full">
                  {article.category}
                </span>
              )}
            </div>
            {article.updatedAt && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(article.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-vina-primary transition-colors duration-200">
            {article.title || "Tiêu đề bài viết"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {article.description || "Mô tả ngắn về nội dung bài viết..."}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-vina-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-vina-primary" />
                </div>
              )}
              <span className="text-xs font-medium text-gray-700">
                {article.author?.name || "Tác giả"}
              </span>
            </div>

            <Link
              href={`/tin-tuc/${article.slug || "#"}`}
              className="inline-flex items-center space-x-2 text-vina-primary hover:text-vina-secondary transition-colors duration-200 font-medium text-sm group/link"
            >
              <span>Đọc thêm</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;