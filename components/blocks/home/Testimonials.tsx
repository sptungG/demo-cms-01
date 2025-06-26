"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Template } from "tinacms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section className="bg-accent/5 py-4 sm:py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-4 sm:mb-8 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-vina-primary text-center"
        >
          {heading}
        </motion.h2>

        <div className="block md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {items.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] md:basis-[40%]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true}}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-vina-primary/20 hover:border-accent/20 transition-all duration-300 hover:shadow-xl h-full"
                  >
                    <Quote className="absolute -top-1 sm:-top-2 left-4 sm:left-4 h-4 w-4 sm:h-8 sm:w-8 text-vina-primary opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="mb-4 sm:mb-6">
                      <p className="text-sm sm:text-lg text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300 line-clamp-3">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-vina-primary text-sm sm:text-base truncate">
                          {testimonial.author}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {testimonial.authorRole}
                        </p>
                      </div>
                      <div className="relative h-10 w-20 sm:h-12 sm:w-24 shrink-0">
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.author} company logo`}
                          fill
                          sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 120px"
                          className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex">
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </div>
          </Carousel>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl bg-background/80 backdrop-blur-sm p-8 shadow-lg border border-accent/10 hover:border-accent/20 transition-all duration-300 hover:shadow-xl"
            >
              <Quote className="absolute -top-4 left-6 h-8 w-8 text-vina-primary opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="mb-6">
                <p className="text-lg text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-vina-primary text-base truncate">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.authorRole}
                  </p>
                </div>
                <div className="relative h-12 w-24 shrink-0">
                  <Image
                    src={testimonial.logo}
                    alt={`${testimonial.author} company logo`}
                    fill
                    sizes="(max-width: 1024px) 96px, 120px"
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
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