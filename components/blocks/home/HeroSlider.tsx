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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="max-w-4xl"
              >
                <div className="rounded-lg bg-black/30 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 mb-3 sm:mb-4 md:mb-6 w-fit">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                    {slides[currentSlide].slogan}
                  </h1>
                </div>
                {slides[currentSlide].subSlogan && (
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-2xl leading-relaxed">
                    {slides[currentSlide].subSlogan}
                  </p>
                )}
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link
                    href={slides[currentSlide].button.link}
                    className="inline-flex items-center rounded-full bg-vina-primary px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-md font-semibold text-white transition-all duration-300 hover:bg-vina-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-vina-primary/20 transform"
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
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5 sm:gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
              ? "w-6 sm:w-8 md:w-10 bg-white"
              : "w-1.5 sm:w-2 md:w-2.5 bg-white/50 hover:bg-white/70"
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
