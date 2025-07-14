"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, Eye, Tag } from "lucide-react";
import { type NewsArticle } from "./NewsCard";
import RelatedArticles from "./RelatedArticles";
import NewsLetterSignUp from "./NewsLetterSignUp";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import CustomTinaMarkdown from "@/components/CustomTinaMarkdown";

export interface IArcticle {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  coverImage?: string;
  author?: string;
  updatedAt?: string;
  slug?: string;
  category?: string;
  views?: number;
  tags?: string[];
}
interface IRelatedArticle {
  title?: string;
  items?: NewsArticle[];
}
interface IFormRegister {
  title?: string;
  description?: string;
  buttonLabel?: string;
  note?: string;
}
export interface INewsDetailPage {
  article?: IArcticle;
  relatedArticles?: IRelatedArticle;
  breadcrumb?: {
    label?: string;
    backUrl?: string;
  };
  shareText?: string;
  form?: IFormRegister;
}

const NewsDetail = ({
  article = {},
  relatedArticles = {},
  breadcrumb,
  shareText,
  form,
}: INewsDetailPage) => {
  const currentArticle = article;
  const related = relatedArticles;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <motion.div variants={itemVariants} className="w-full">
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 overflow-hidden">
          {currentArticle?.coverImage ? (
            <Image
              src={currentArticle?.coverImage ?? ""}
              alt={currentArticle?.title || "Article cover"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-vina-primary/20 to-vina-secondary/20 flex items-center justify-center">
              <div className="text-vina-primary/40">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center space-x-1 sm:space-x-2 text-vina-primary hover:text-vina-secondary transition-colors duration-200"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium text-sm sm:text-base">
                {breadcrumb?.label ?? "Quay lại"}
              </span>
            </Link>
            <span className="text-gray-300 text-sm">/</span>
            <span className="text-gray-600 text-xs sm:text-sm truncate max-w-32 sm:max-w-md">
              {currentArticle?.title}
            </span>
          </div>
        </div>
      </motion.div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <motion.article
              variants={itemVariants}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {currentArticle?.category && (
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-vina-primary/10 text-vina-primary text-xs sm:text-sm font-medium rounded-full">
                      {currentArticle?.category}
                    </span>
                  )}
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{formatDate(currentArticle?.updatedAt!)}</span>
                    </div>
                    {currentArticle?.views && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{currentArticle?.views.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {currentArticle?.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {currentArticle?.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 border-t border-b border-gray-100 gap-4 sm:gap-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vina-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-vina-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {currentArticle?.author}
                      </p>
                    </div>
                  </div>
                  <button className="cursor-pointer inline-flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 w-full sm:w-auto">
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">{shareText}</span>
                  </button>
                </div>
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none mt-6 sm:mt-8 prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-vina-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-img:rounded-lg sm:prose-img:rounded-xl prose-img:shadow-lg">
                  <CustomTinaMarkdown
                    content={
                      currentArticle?.content as unknown as TinaMarkdownContent
                    }
                  />
                </div>
                {currentArticle?.tags && currentArticle?.tags.length > 0 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentArticle?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 sm:px-3 sm:py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm rounded-full transition-colors duration-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          </div>
          <div className="lg:col-span-1">
            <motion.div
              variants={itemVariants}
              className="lg:sticky lg:top-24 space-y-4 sm:space-y-6"
            >
              <RelatedArticles items={related?.items} title={related?.title} />
              <NewsLetterSignUp form={form} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsDetail;

export const newsDetailTemplate: Template = {
  name: "newsDetailSection",
  label: "Chi tiết Tin tức/Bài viết - News/Blog detail",
  fields: [
    {
      label: "News/Blog detail",
      name: "article",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Tiêu đề/Title",
          type: "string",
        },
        {
          name: "description",
          label: "Mô tả ngắn/Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "content",
          label: "Nội dung/content",
          type: "rich-text",
          templates: [
            {
              name: "youtubeEmbed",
              label: "YouTube Video",
              fields: [
                {
                  name: "url",
                  label: "YouTube URL",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "coverImage",
          label: "Ảnh bìa/Cover image",
          type: "image",
        },
        {
          name: "author",
          label: "Tác giả/Author",
          type: "string",
        },
        {
          name: "updatedAt",
          label: "Ngày cập nhật/Updated At",
          type: "datetime",
        },
        {
          name: "slug",
          label: "Slug/Đường dẫn",
          type: "string",
        },
        {
          name: "category",
          label: "Thể loại/Category",
          type: "string",
        },
        {
          name: "views",
          label: "Lượt xem/Views",
          type: "number",
        },
        {
          name: "tags",
          label: "Thẻ tag/Tags",
          type: "string",
          list: true,
        },
      ],
    },
    {
      label: "Bài viết liên quan/Related Articles",
      name: "relatedArticles",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Tiêu đề phần bài viết liên quan",
          type: "string",
        },
        {
          name: "items",
          label: "Danh sách bài viết/List",
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
              label: "Tiêu đề/Title",
              type: "string",
            },
            {
              name: "slug",
              label: "URL/Đường dẫn",
              type: "string",
            },
            {
              name: "coverImage",
              label: "Ảnh bìa/Cover image",
              type: "image",
            },
            {
              name: "category",
              label: "Thể loại/Category",
              type: "string",
            },
            {
              name: "updatedAt",
              label: "Ngày cập nhật/Updated At",
              type: "datetime",
            },
          ],
        },
      ],
    },
    {
      label: "Breadcrumb",
      name: "breadcrumb",
      type: "object",
      fields: [
        {
          name: "label",
          label: "Nhãn breadcrumb",
          type: "string",
        },
        {
          name: "backUrl",
          label: "URL quay lại",
          type: "string",
        },
      ],
    },
    {
      name: "shareText",
      label: "Nhãn chia sẻ/Share label",
      type: "string",
    },
    {
      label: "Form đăng ký nhận tin/Form newsletter signup",
      name: "form",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Tiêu đề form/Form title",
          type: "string",
        },
        {
          name: "description",
          label: "Mô tả form/Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "buttonLabel",
          label: "Nhãn nút/Button label",
          type: "string",
        },
        {
          name: "note",
          label: "Ghi chú/Note",
          type: "string",
        },
      ],
    },
  ],
};
