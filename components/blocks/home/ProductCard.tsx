import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    name: string;
    image: string;
    description: string;
    link: string;
  };
  index: number;
  isMobile?: boolean;
  className?: string;
}

export const ProductCard = ({
  product,
  index,
  isMobile = false,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group overflow-hidden ${
        isMobile ? "rounded-lg" : "rounded-xl sm:rounded-2xl"
      } bg-background/80 backdrop-blur-sm shadow hover:shadow-lg transition-all duration-300 border border-border/50 h-full`}
    >
      <Link href={product.link} className="h-full flex flex-col">
        <div
          className={`relative ${
            isMobile ? "aspect-[3/2]" : "aspect-[4/3]"
          } overflow-hidden`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={isMobile ? "33vw" : "(max-width: 1024px) 50vw, 33vw"}
            priority={index < 3}
          />
        </div>
        <div
          className={`${
            isMobile ? "p-3 space-y-1.5" : "p-4 sm:p-6 space-y-2 sm:space-y-3"
          } flex-1 flex flex-col`}
        >
          <h3
            className={`${
              isMobile
                ? "text-sm line-clamp-1"
                : "text-lg sm:text-xl line-clamp-2"
            } font-semibold text-foreground group-hover:text-primary transition-colors`}
          >
            {product.name}
          </h3>
          <p
            className={`${
              isMobile
                ? "hidden text-xs line-clamp-2"
                : "text-sm sm:text-base line-clamp-3"
            } text-muted-foreground`}
          >
            {product.description}
          </p>
          <div
            className={`${
              isMobile ? "pt-1.5 text-xs" : "pt-2 text-sm"
            } flex items-center font-medium text-primary mt-auto`}
          >
            Xem chi tiết
            <svg
              className={`${
                isMobile ? "ml-1.5 h-3 w-3" : "ml-2 h-4 w-4"
              } transition-transform duration-300 group-hover:translate-x-1`}
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
    </motion.div>
  );
};
