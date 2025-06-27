"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface IntroductionProps {
  heading: string;
  content: {
    type: string;
    children: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  image: string;
}

export const Introduction = ({
  heading,
  content,
  image,
}: IntroductionProps) => {
  return (
    <section className="py-4 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
          >
            <Image
              src={image}
              alt={heading}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-vina-primary">
              {heading}
            </h2>
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-muted-foreground">
              {content.children.map((paragraph, index) => {
                return (
                  <TinaMarkdown
                    key={index}
                    content={paragraph as unknown as TinaMarkdownContent}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const introductionBlockSchema: Template = {
  name: "introduction",
  label: "Introduction",
  // ui: {
  //   previewSrc: "/blocks/content.png",
  // },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      // required: true,
    },
    {
      type: "rich-text",
      name: "content",
      label: "Content",
      // required: true,
    },
    {
      type: "image",
      name: "image",
      label: "Image",
      // required: true,
    },
  ],
};
