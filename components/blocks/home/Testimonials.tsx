"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Template } from "tinacms";

interface TestimonialProps {
  quote: string;
  author: string;
  authorRole: string;
  logo: string;
}

interface TestimonialsProps {
  heading: string;
  items: TestimonialProps[];
}

export const Testimonials = ({ heading, items }: TestimonialsProps) => {
  return (
    <section className="bg-accent/5 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl bg-background p-8 shadow-lg"
            >
              <Quote className="absolute -top-4 left-6 h-8 w-8 text-primary" />
              <div className="mb-6">
                <p className="text-lg text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.authorRole}
                  </p>
                </div>
                <div className="relative h-12 w-24">
                  <Image
                    src={testimonial.logo}
                    alt={`${testimonial.author} company logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const testimonialsBlockSchema: Template = {
  name: "testimonials",
  label: "Testimonials",
  ui: {
    previewSrc: "/blocks/testimonial.png",
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
      name: "items",
      label: "Testimonials",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.author,
        }),
      },
      fields: [
        {
          type: "string",
          name: "quote",
          label: "Quote",
          ui: {
            component: "textarea",
          },
          required: true,
        },
        {
          type: "string",
          name: "author",
          label: "Author Name",
          required: true,
        },
        {
          type: "string",
          name: "authorRole",
          label: "Author Role",
          required: true,
        },
        {
          type: "image",
          name: "logo",
          label: "Company Logo",
          required: true,
        },
      ],
    },
  ],
}; 