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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-background shadow-lg transition-all hover:shadow-xl"
            >
              <Link href={post.link} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "dd MMMM, yyyy", {
                        locale: vi,
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Đọc thêm
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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