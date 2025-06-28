"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
import { Template } from "tinacms";

interface HeroSectionProps {
  data: {
    backgroundImage: string;
    heading: string;
    subheading: string;
    primaryButton: {
      label: string;
      link: string;
    };
    secondaryButton: {
      label: string;
      link: string;
    };
  };
}

export const HeroAboutSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-screen left-[50%] -translate-x-[50%] overflow-hidden">
      <Image
        src={data.backgroundImage}
        alt="Header Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30">
        <Image
          src={data.backgroundImage}
          alt="Header Background"
          fill
          className="object-cover mix-blend-overlay filter blur-[2px] brightness-90 scale-105"
          priority
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {data.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          >
            {data.subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <button
              className="px-8 py-3 bg-vina-primary hover:bg-vina-primary/90 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => (window.location.href = data.primaryButton.link)}
            >
              <FaPhoneAlt className="w-4 h-4" />
              {data.primaryButton.label}
            </button>
            <button
              className="px-8 py-3 bg-vina-primary/80 hover:bg-vina-primary/90 text-white rounded-full font-medium backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => (window.location.href = data.secondaryButton.link)}
            >
              <FaInfoCircle className="w-4 h-4" />
              {data.secondaryButton.label}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const heroAboutBlockSchema: Template = {
  label: "Hero About Section",
  name: "heroAboutSection",
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Tiêu đề chính của hero section",
    },
    {
      type: "string",
      label: "Subheading",
      name: "subheading",
      description: "Tiêu đề phụ của hero section",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      label: "Background Image",
      name: "backgroundImage",
      description: "Hình nền của hero section",
    },
    {
      type: "object",
      label: "Primary Button",
      name: "primaryButton",
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          description: "Nhãn của nút chính",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
          description: "Đường dẫn khi click vào nút",
        },
        {
          type: "string",
          label: "Icon",
          name: "icon",
          description: "Icon cho nút (FaPhoneAlt)",
          options: ["FaPhoneAlt", "FaEnvelope", "FaComments"],
        },
      ],
    },
    {
      type: "object",
      label: "Secondary Button",
      name: "secondaryButton",
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          description: "Nhãn của nút phụ",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
          description: "Đường dẫn khi click vào nút",
        },
        {
          type: "string",
          label: "Icon",
          name: "icon",
          description: "Icon cho nút (FaInfoCircle)",
          options: ["FaInfoCircle", "FaArrowRight", "FaExternalLinkAlt"],
        },
      ],
    },
  ],
};
