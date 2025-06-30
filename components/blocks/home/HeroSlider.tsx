"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Template } from "tinacms";

interface SlideProps {
  slogan: string;
  subSlogan: string;
  backgroundImage: string;
  button: {
    label: string;
    link: string;
  };
}

interface HeroSliderProps {
  slides: SlideProps[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          <Image
            src={slides[currentSlide].backgroundImage}
            alt={slides[currentSlide].slogan}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-4xl text-center"
              >
                <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl">
                  {slides[currentSlide].slogan}
                </h1>
                <p className="mb-6 text-sm text-gray-200 sm:text-base md:mb-8 md:text-lg lg:text-xl">
                  {slides[currentSlide].subSlogan}
                </p>
                <Link
                  href={slides[currentSlide].button.link}
                  className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-base md:text-lg"
                >
                  {slides[currentSlide].button.label}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:block">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 sm:p-3 md:left-6 lg:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 sm:p-3 md:right-6 lg:right-8"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2 md:bottom-8 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all sm:h-2 ${
              index === currentSlide
                ? "w-6 bg-white sm:w-8 md:w-10"
                : "w-1.5 bg-white/50 sm:w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const heroSliderBlockSchema: Template = {
  name: "heroSlider",
  label: "Hero Slider",
  ui: {
    previewSrc: "/blocks/sectionscms/herosection1.png",
  },
  fields: [
    {
      type: "object",
      name: "slides",
      label: "Slides",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.slogan,
        }),
      },
      fields: [
        {
          type: "string",
          name: "slogan",
          label: "Slogan",
          // required: true,
        },
        {
          type: "string",
          name: "subSlogan",
          label: "Sub Slogan",
          // required: true,
        },
        {
          type: "image",
          name: "backgroundImage",
          label: "Background Image",
          // required: true,
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
    },
  ],
}; 