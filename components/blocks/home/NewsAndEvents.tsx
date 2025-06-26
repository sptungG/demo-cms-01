"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Template } from "tinacms";

interface PostProps {
  title: string;
  category: string;
  date: string;
  image: string;
  link: string;
}

interface NewsAndEventsProps {
  heading: string;
  posts: PostProps[];
}

export const NewsAndEvents = ({ heading, posts }: NewsAndEventsProps) => {
  return (
    <section className="py-4 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-xl font-bold text-vina-primary md:text-4xl lg:text-5xl text-center"
        >
          {heading}
        </motion.h2>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 md:grid-cols-4">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg sm:rounded-2xl bg-background/80 backdrop-blur-sm shadow hover:shadow-lg transition-all duration-300 border border-border/50"
            >
              <Link href={post.link} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    priority={index < 2}
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="mb-2 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="text-[8px] sm:text-sm rounded-full bg-vina-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 font-medium text-vina-primary">
                      {post.category}
                    </span>
                    <time dateTime={post.date} className="text-[8px] sm:text-sm">
                      {format(new Date(post.date), "dd MMMM, yyyy", {
                        locale: vi,
                      })}
                    </time>
                  </div>
                  <h3 className="text-[10px] sm:text-lg md:text-xl font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-2 sm:mt-4 flex items-center text-[10px] sm:text-sm font-medium text-primary">
                    Đọc thêm
                    <svg
                      className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const newsAndEventsBlockSchema: Template = {
  name: "newsAndEvents",
  label: "News & Events",
  ui: {
    previewSrc: "/blocks/content.png",
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      required: true,
    },
    {
      type: "object",
      name: "posts",
      label: "Posts",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          required: true,
        },
        {
          type: "string",
          name: "category",
          label: "Category",
          required: true,
        },
        {
          type: "datetime",
          name: "date",
          label: "Date",
          required: true,
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          required: true,
        },
        {
          type: "string",
          name: "link",
          label: "Link",
          required: true,
        },
      ],
    },
  ],
};
