"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCertificate, FaIndustry, FaUsersCog, FaAward } from "react-icons/fa";
import { Template } from "tinacms";

const icons = {
  FaCertificate,
  FaIndustry,
  FaUsersCog,
  FaAward,
};

interface FeatureProps {
  title: string;
  description: string;
  icon: keyof typeof icons;
}

interface WhyChooseUsProps {
  heading: string;
  features: FeatureProps[];
}

export const WhyChooseUs = ({ heading, features }: WhyChooseUsProps) => {
  return (
    <section className="py-4 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16 text-center text-xl font-bold text-vina-primary md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>

        <div className="grid gap-2 sm:gap-8 grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl bg-background p-6 text-center shadow-lg transition-all hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-vina-primary/10 text-vina-primary transition-colors group-hover:bg-vina-primary group-hover:text-white">
                  <Icon className="h-4 w-4 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-4 text-[12px] sm:text-xl md:text-sm font-semibold text-vina-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-[10px] sm:text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const whyChooseUsBlockSchema: Template = {
  name: "whyChooseUs",
  label: "Why Choose Us",
  // ui: {
  //   previewSrc: "/blocks/features.png",
  // },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      // required: true,
    },
    {
      type: "object",
      name: "features",
      label: "Features",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
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
          name: "icon",
          label: "Icon",
          options: [
            { label: "Certificate", value: "FaCertificate" },
            { label: "Industry", value: "FaIndustry" },
            { label: "Users & Cog", value: "FaUsersCog" },
            { label: "Award", value: "FaAward" },
          ],
          // required: true,
        },
      ],
    },
  ],
};
