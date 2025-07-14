"use client";

import React, { useRef } from "react";
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
import Autoplay from "embla-carousel-autoplay";

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
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-vina-primary"
          >
            {heading}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 sm:-ml-4 md:-ml-6">
              {items.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: (index % 4) * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="group relative h-full"
                  >
                    <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-vina-primary/20 hover:border-vina-primary/40 transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm h-full flex flex-col group-hover:scale-[1.02] transform">
                      {/* Quote Icon */}
                      <Quote className="absolute -top-2 sm:-top-3 left-4 sm:left-6 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-vina-primary opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />

                      {/* Quote Content */}
                      <div className="flex-1 mb-4 sm:mb-6 mt-2 sm:mt-4">
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed line-clamp-4 sm:line-clamp-5">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4 mt-auto">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-vina-primary text-sm sm:text-base md:text-lg truncate group-hover:text-vina-secondary transition-colors duration-300">
                            {testimonial.author}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate">
                            {testimonial.authorRole}
                          </p>
                        </div>

                        {/* Company Logo */}
                        <div className="relative h-8 w-16 sm:h-10 sm:w-20 md:h-12 md:w-24 shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Image
                            src={testimonial.logo}
                            alt={`${testimonial.author} company logo`}
                            fill
                            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 120px"
                            className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                          />
                        </div>
                      </div>

                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-vina-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export const testimonialsBlockSchema: Template = {
  name: "testimonials",
  label: "Testimonials 1",
  ui: {
    previewSrc: "/blocks/sectionscms/testimonial1.png",
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      // required: true,
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
          // required: true,
        },
        {
          type: "string",
          name: "author",
          label: "Author Name",
          // required: true,
        },
        {
          type: "string",
          name: "authorRole",
          label: "Author Role",
          // required: true,
        },
        {
          type: "image",
          name: "logo",
          label: "Company Logo",
          // required: true,
        },
      ],
    },
  ],
};
