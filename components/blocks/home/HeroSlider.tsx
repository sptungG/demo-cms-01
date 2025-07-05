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
      className="relative h-[20vh] left-1/2 -translate-x-1/2 w-screen overflow-hidden sm:h-[25vh] md:h-[35vh] lg:h-[40vh] xl:h-[50vh]"
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
          transition={{ duration: 1 }}
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
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto">
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mx-auto text-center"
              >
                <div className="rounded-lg w-fit bg-neutral-400/35 p-6 flex items-center mb-4 md:mb-6">
                  <h1 className="text-2xl text-left font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    {slides[currentSlide].slogan}
                  </h1>
                </div>
                {slides[currentSlide].subSlogan && (
                  <p className="mb-6 text-sm text-left text-gray-200 sm:text-base md:mb-8 md:text-lg lg:text-xl">
                    {slides[currentSlide].subSlogan}
                  </p>
                )}
                <div className="flex justify-start">
                  <Link
                    href={slides[currentSlide].button.link}
                    className="inline-flex items-center rounded-lg bg-vina-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vina-primary sm:px-8 sm:py-4 sm:text-base md:text-lg"
                  >
                    {slides[currentSlide].button.label}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
