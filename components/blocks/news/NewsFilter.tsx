"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

interface NewsFilterProps {
  searchTerm?: string;
  selectedCategory?: string;
  selectedAuthor?: string;
  categories?: string[];
  authors?: string[];
  filteredCount?: number;
  totalCount?: number;
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onAuthorChange?: (value: string) => void;
  onResetFilters?: () => void;
}

const NewsFilter = ({
  searchTerm = "",
  selectedCategory = "",
  selectedAuthor = "",
  categories = [],
  authors = [],
  filteredCount = 0,
  totalCount = 0,
  onSearchChange = () => {},
  onCategoryChange = () => {},
  onAuthorChange = () => {},
  onResetFilters = () => {},
}: NewsFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-vina-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tìm kiếm
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nhập từ khóa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent transition-colors duration-200"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Danh mục
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent transition-colors duration-200"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Author Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tác giả
        </label>
        <select
          value={selectedAuthor}
          onChange={(e) => onAuthorChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent transition-colors duration-200"
        >
          <option value="">Tất cả tác giả</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onResetFilters}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
      >
        Xóa bộ lọc
      </button>

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Hiển thị {filteredCount} / {totalCount} bài viết
        </p>
      </div>
    </motion.div>
  );
};

export default NewsFilter;
