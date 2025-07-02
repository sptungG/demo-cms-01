"use client";

import React from "react";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";

interface ProductProps {
  name: string;
  image: string;
  description: string;
  link: string;
}

interface FeaturedProductsProps {
  heading: string;
  subheading: string;
  products: ProductProps[];
}

export const FeaturedProducts = ({
  heading,
  subheading,
  products,
}: FeaturedProductsProps) => {
  return (
    <section className="bg-accent/5">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="mb-6 sm:mb-10 text-center space-y-2 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-3xl md:text-4xl font-bold text-vina-primary"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Mobile Carousel View */}
        <div className="block sm:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {[...products, ...products].map((product, index) => (
                <CarouselItem key={index} className="pl-2 basis-[40%]">
                  <ProductCard
                    product={product}
                    index={index}
                    isMobile={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...products, ...products].map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const featuredProductsBlockSchema: Template = {
  name: "featuredProducts",
  label: "Featured Products 1",
  ui: {
    previewSrc: "/blocks/sectionscms/featuredproduct1.png",
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      // required: true,
    },
    {
      type: "string",
      name: "subheading",
      label: "Subheading",
      // required: true,
    },
    {
      type: "object",
      name: "products",
      label: "Products",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name,
        }),
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
          // required: true,
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          // required: true,
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          ui: {
            component: "textarea",
          },
          // required: true,
        },
        {
          type: "string",
          name: "link",
          label: "Link",
          // required: true,
        },
      ],
    },
  ],
};
