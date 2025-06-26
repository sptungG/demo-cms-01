"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Template } from "tinacms";

interface ExportMarketsProps {
  heading: string;
  subheading: string;
  mapImage: string;
  countries: string[];
}

export const ExportMarkets = ({
  heading,
  subheading,
  mapImage,
  countries,
}: ExportMarketsProps) => {
  return (
    <section className="bg-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-vina-primary md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            {subheading}
          </motion.p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg"
          >
            <Image
              src={mapImage}
              alt="World Map"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {countries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center rounded-lg bg-background p-4 shadow-md"
                >
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {index + 1}
                  </div>
                  <span className="font-medium text-vina-primary">{country}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const exportMarketsBlockSchema: Template = {
  name: "exportMarkets",
  label: "Export Markets",
  ui: {
    previewSrc: "/blocks/features.png",
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
      required: true,
    },
    {
      type: "string",
      name: "subheading",
      label: "Subheading",
      required: true,
    },
    {
      type: "image",
      name: "mapImage",
      label: "World Map Image",
      required: true,
    },
    {
      type: "string",
      name: "countries",
      label: "Countries",
      list: true,
      required: true,
    },
  ],
};
