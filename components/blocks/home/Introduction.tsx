"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Template } from "tinacms";

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

export const Introduction = ({ heading, content, image }: IntroductionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square overflow-hidden rounded-2xl"
          >
            <Image
              src={image}
              alt={heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {content.children.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.children.map((text, i) => (
                    <React.Fragment key={i}>{text.text}</React.Fragment>
                  ))}
                </p>
              ))}
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
      type: "rich-text",
      name: "content",
      label: "Content",
      required: true,
    },
    {
      type: "image",
      name: "image",
      label: "Image",
      required: true,
    },
  ],
}; 