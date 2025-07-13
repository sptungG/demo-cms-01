"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import SimplePagination from "@/components/ui/simple-pagination";
import NewsFilter from "./NewsFilter";
import NewsCard, { NewsArticle } from "./NewsCard";

export type TOverViewListNews = Partial<{
  heading?: string;
  description?: string;
  articles?: NewsArticle[];
}>;
interface OverViewListNewsProps {
  data: TOverViewListNews;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const OverViewListNews = ({ data }: OverViewListNewsProps) => {
  const { heading, description, articles } = data;

  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Use provided articles or empty array
  const allArticles = articles || [];

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    if (allArticles.length === 0) return [];

    return allArticles.filter((article) => {
      const matchesSearch =
        !searchTerm ||
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || article.category === selectedCategory;
      const matchesAuthor =
        !selectedAuthor || article.author === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [allArticles, searchTerm, selectedCategory, selectedAuthor]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Reset to page 1 if current page exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  // Get unique categories and authors for filters
  const categories = useMemo(() => {
    return [
      ...new Set(
        allArticles.map((article) => article.category).filter(Boolean)
      ),
    ];
  }, [allArticles]);

  const authors = useMemo(() => {
    return [
      ...new Set(allArticles.map((article) => article.author).filter(Boolean)),
    ];
  }, [allArticles]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleAuthorChange = (value: string) => {
    setSelectedAuthor(value);
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedCategory || selectedAuthor;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-vina-primary mb-4">
              {heading || "Tin Tức & Bài Viết"}
            </h2>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-vina-primary"></div>
          </div>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              {description}
            </p>
          )}
        </motion.div>

        {/* Mobile Filter - Disclosure */}
        <div className="lg:hidden mb-8">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-vina-primary focus-visible:ring-opacity-75">
                  <div className="flex items-center space-x-2">
                    <FilterIcon className="w-5 h-5 text-vina-primary" />
                    <span>Bộ lọc</span>
                    {hasActiveFilters && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-vina-primary text-white">
                        {
                          [searchTerm, selectedCategory, selectedAuthor].filter(
                            Boolean
                          ).length
                        }
                      </span>
                    )}
                  </div>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500 transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NewsFilter
                      searchTerm={searchTerm}
                      selectedCategory={selectedCategory}
                      selectedAuthor={selectedAuthor}
                      categories={categories as any}
                      authors={authors as any}
                      filteredCount={filteredArticles.length}
                      totalCount={allArticles.length}
                      onSearchChange={handleSearchChange}
                      onCategoryChange={handleCategoryChange}
                      onAuthorChange={handleAuthorChange}
                      onResetFilters={resetFilters}
                    />
                  </motion.div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles List - Full width on mobile, 3/4 on desktop */}
          <div className="lg:col-span-3">
            {/* Articles List */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {displayArticles.map((article, index) => (
                <NewsCard
                  key={article.id || index}
                  article={article}
                  index={index}
                  variant="list"
                  className=""
                />
              ))}
            </motion.div>

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <SimplePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  maxVisiblePages={5}
                  showFirstLast={true}
                  className="justify-center"
                />
              </motion.div>
            )}

            {/* Empty State */}
            {allArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có bài viết nào
                </h3>
                <p className="text-gray-500">
                  Hiện tại chưa có bài viết nào được thêm vào.
                </p>
              </motion.div>
            ) : displayArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy bài viết nào
                </h3>
                <p className="text-gray-500 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-vina-primary text-white rounded-lg hover:bg-vina-secondary transition-colors duration-200"
                >
                  Xóa bộ lọc
                </button>
              </motion.div>
            ) : null}
          </div>

          {/* Desktop Filter Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <NewsFilter
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedAuthor={selectedAuthor}
                categories={categories as any}
                authors={authors as any}
                filteredCount={filteredArticles.length}
                totalCount={allArticles.length}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                onAuthorChange={handleAuthorChange}
                onResetFilters={resetFilters}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const overViewListNewsTemplate: Template = {
  name: "overViewListNews",
  label: "Danh Sách Tin Tức",
  fields: [
    {
      label: "Tiêu đề",
      name: "heading",
      type: "string",
    },
    {
      label: "Mô tả",
      name: "description",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Danh sách bài viết",
      name: "articles",
      type: "object",
      list: true,
      ui: {
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
        itemProps: (item) => ({
          label: item?.title,
          id: item?.id,
        }),
      },
      fields: [
        {
          name: "id",
          label: "ID",
          type: "string",
          ui: {
            component: "hidden",
          },
        },
        {
          name: "title",
          label: "Tiêu đề bài viết/Title",
          type: "string",
        },
        {
          name: "slug",
          label: "URL/Đường dẫn bài viết",
          type: "string",
        },
        {
          name: "description",
          label: "Description/Mô tả",
          type: "string",
        },
        {
          name: "createdAt",
          label: "Created At/Ngày tạo",
          type: "datetime",
        },
        {
          name: "coverImage",
          label: "Cover Image/Ảnh bìa",
          type: "image",
        },
        {
          name: "author",
          label: "Author/Tác giả",
          type: "string",
        },
        {
          name: "category",
          label: "Category/Thể loại",
          type: "string",
        },
      ],
    },
  ],
};

export default OverViewListNews;
