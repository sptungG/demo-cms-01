"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Template } from "tinacms";

interface CallToActionProps {
  heading: string;
  subheading: string;
  button: {
    label: string;
    link: string;
  };
}

export const CallToAction = ({
  heading,
  subheading,
  button,
}: CallToActionProps) => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground"
          >
            {subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={button.link}
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {button.label}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const callToActionBlockSchema: Template = {
  name: "cta",
  label: "Call to Action",
  ui: {
    previewSrc: "/blocks/cta.png",
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      required: true,
    },
    {
      type: "string",
      name: "subheading",
      label: "Subheading",
      required: true,
    },
    {
      type: "object",
      name: "button",
      label: "Button",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
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