"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import SimplePagination from "@/components/ui/simple-pagination";
import NewsFilter from "./NewsFilter";
import NewsCard from "./NewsCard";

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

interface OverViewListNewsProps {
  data: {
    heading?: string;
    description?: string;
    articles?: NewsArticle[];
  };
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

  // Fake data for development
  const fakeArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Vinhapac mở rộng thị trường xuất khẩu sang châu Âu",
      description:
        "Công ty Vinhapac đã ký kết thành công hợp đồng xuất khẩu sản phẩm bao bì thân thiện môi trường sang các nước châu Âu, đánh dấu bước tiến quan trọng trong chiến lược phát triển quốc tế.",
      coverImage: "/uploads/news.png",
      author: {
        name: "Nguyễn Văn An",
        avatar: "/uploads/authors/author1.jpg",
      },
      updatedAt: "2024-01-15T10:30:00Z",
      slug: "vinhapac-mo-rong-thi-truong-xuat-khau-chau-au",
      category: "Kinh doanh",
      tags: ["xuất khẩu", "châu Âu", "mở rộng"],
    },
    {
      id: "2",
      title: "Công nghệ sản xuất bao bì sinh học tiên tiến",
      description:
        "Vinhapac đầu tư vào công nghệ sản xuất bao bì sinh học mới nhất, giúp giảm thiểu tác động môi trường và nâng cao chất lượng sản phẩm.",
      coverImage: "/uploads/container.png",
      author: {
        name: "Trần Thị Bình",
        avatar: "/uploads/authors/author2.jpg",
      },
      updatedAt: "2024-01-12T14:20:00Z",
      slug: "cong-nghe-san-xuat-bao-bi-sinh-hoc",
      category: "Công nghệ",
      tags: ["công nghệ", "sinh học", "môi trường"],
    },
    {
      id: "3",
      title: "Chứng nhận ISO 14001 về quản lý môi trường",
      description:
        "Vinhapac vinh dự nhận chứng nhận ISO 14001:2015 về hệ thống quản lý môi trường, khẳng định cam kết bảo vệ môi trường trong hoạt động sản xuất.",
      coverImage: "/uploads/pp.png",
      author: {
        name: "Lê Minh Cường",
        avatar: "/uploads/authors/author3.jpg",
      },
      updatedAt: "2024-01-10T09:15:00Z",
      slug: "chung-nhan-iso-14001-quan-ly-moi-truong",
      category: "Chứng nhận",
      tags: ["ISO", "môi trường", "chứng nhận"],
    },
    {
      id: "4",
      title: "Hội thảo quốc tế về bao bì bền vững",
      description:
        "Vinhapac tham gia hội thảo quốc tế về xu hướng bao bì bền vững, chia sẻ kinh nghiệm và học hỏi các công nghệ tiên tiến từ các đối tác quốc tế.",
      coverImage: "/uploads/world.png",
      author: {
        name: "Phạm Thu Hà",
        avatar: "/uploads/authors/author4.jpg",
      },
      updatedAt: "2024-01-08T16:45:00Z",
      slug: "hoi-thao-quoc-te-bao-bi-ben-vung",
      category: "Sự kiện",
      tags: ["hội thảo", "quốc tế", "bền vững"],
    },
    {
      id: "5",
      title: "Đầu tư máy móc sản xuất thế hệ mới",
      description:
        "Công ty đầu tư 50 tỷ đồng mua sắm dây chuyền máy móc sản xuất thế hệ mới từ Đức, nâng cao năng suất và chất lượng sản phẩm.",
      coverImage: "/uploads/banner.png",
      author: {
        name: "Hoàng Văn Đức",
        avatar: "/uploads/authors/author5.jpg",
      },
      updatedAt: "2024-01-05T11:30:00Z",
      slug: "dau-tu-may-moc-san-xuat-the-he-moi",
      category: "Đầu tư",
      tags: ["đầu tư", "máy móc", "công nghệ"],
    },
    {
      id: "6",
      title: "Khai trương nhà máy sản xuất tại Bình Dương",
      description:
        "Vinhapac chính thức khai trương nhà máy sản xuất bao bì mới tại Bình Dương với quy mô 10 hecta, tạo việc làm cho hơn 500 lao động địa phương.",
      coverImage: "/uploads/we-vinhapac.png",
      author: {
        name: "Ngô Thị Lan",
        avatar: "/uploads/authors/author6.jpg",
      },
      updatedAt: "2024-01-03T08:00:00Z",
      slug: "khai-truong-nha-may-binh-duong",
      category: "Sự kiện",
      tags: ["khai trương", "nhà máy", "Bình Dương"],
    },
    {
      id: "7",
      title: "Hợp tác chiến lược với đối tác Nhật Bản",
      description:
        "Vinhapac ký kết hợp tác chiến lược với tập đoàn bao bì hàng đầu Nhật Bản, mở ra cơ hội học hỏi công nghệ và mở rộng thị trường.",
      coverImage: "/uploads/globallogo.png",
      author: {
        name: "Nguyễn Văn An",
        avatar: "/uploads/authors/author1.jpg",
      },
      updatedAt: "2024-01-01T09:00:00Z",
      slug: "hop-tac-chien-luoc-nhat-ban",
      category: "Hợp tác",
      tags: ["hợp tác", "Nhật Bản", "chiến lược"],
    },
    {
      id: "8",
      title: "Giải thưởng doanh nghiệp xuất sắc 2023",
      description:
        "Vinhapac vinh dự nhận giải thưởng doanh nghiệp xuất sắc năm 2023 do Hiệp hội Bao bì Việt Nam trao tặng, ghi nhận những đóng góp tích cực cho ngành.",
      coverImage: "/uploads/trans.png",
      author: {
        name: "Trần Thị Bình",
        avatar: "/uploads/authors/author2.jpg",
      },
      updatedAt: "2023-12-28T15:30:00Z",
      slug: "giai-thuong-doanh-nghiep-xuat-sac-2023",
      category: "Giải thưởng",
      tags: ["giải thưởng", "xuất sắc", "2023"],
    },
  ];

  // Use fake data if no articles provided
  const allArticles = articles && articles.length > 0 ? articles : fakeArticles;

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        !searchTerm ||
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || article.category === selectedCategory;
      const matchesAuthor =
        !selectedAuthor || article.author?.name === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [allArticles, searchTerm, selectedCategory, selectedAuthor]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  // Get unique categories and authors for filters
  const categories = [
    ...new Set(allArticles.map((article) => article.category).filter(Boolean)),
  ];
  const authors = [
    ...new Set(
      allArticles.map((article) => article.author?.name).filter(Boolean)
    ),
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                      filteredCount={displayArticles.length}
                      totalCount={filteredArticles.length}
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
                  onPageChange={setCurrentPage}
                  maxVisiblePages={5}
                  showFirstLast={true}
                  className="justify-center"
                />
              </motion.div>
            )}

            {/* Empty State */}
            {displayArticles.length === 0 && (
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
            )}
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
                filteredCount={displayArticles.length}
                totalCount={filteredArticles.length}
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
      name: "heading",
      label: "Tiêu đề",
      type: "string",
    },
    {
      name: "description",
      label: "Mô tả",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "articles",
      label: "Bài viết",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return {
            label: item?.title || "Bài viết mới",
            id: item?.id,
          };
        },
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
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
          label: "Tiêu đề",
          type: "string",
        },
        {
          name: "description",
          label: "Mô tả ngắn",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "coverImage",
          label: "Ảnh bìa",
          type: "image",
        },
        {
          name: "author",
          label: "Tác giả",
          type: "object",
          fields: [
            {
              name: "name",
              label: "Tên tác giả",
              type: "string",
            },
            {
              name: "avatar",
              label: "Ảnh đại diện",
              type: "image",
            },
          ],
        },
        {
          name: "updatedAt",
          label: "Ngày cập nhật",
          type: "datetime",
        },
        {
          name: "slug",
          label: "Đường dẫn",
          type: "string",
          description: "URL slug cho bài viết (vd: bai-viet-moi)",
        },
      ],
    },
  ],
};

export default OverViewListNews;
