"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { countryOptions } from "@/utils/global";
import WorldMap from "@/components/WorldMap";
import { IObj } from "@/utils/types";

interface ExportMarketsProps {
  heading: string;
  subheading: string;
  mapImage: string;
  countries: IObj[];
}

export const ExportMarkets = ({
  heading,
  subheading,
  mapImage,
  countries,
}: ExportMarketsProps) => {
  return (
    <section className="bg-accent/5 py-4 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xl font-bold text-vina-primary md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground"
          >
            {subheading}
          </motion.p>
        </div>

        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <WorldMap countries={(countries as any) ?? []} />
        </div>
      </div>
    </section>
  );
};
export const exportMarketsBlockSchema: Template = {
  name: "exportMarkets",
  label: "Export Markets",
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
      type: "string",
      name: "subheading",
      label: "Subheading",
      // required: true,
    },
    {
      type: "image",
      name: "mapImage",
      label: "World Map Image",
      // required: true,
    },
    {
      type: "object",
      name: "countries",
      label: "Countries",
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
          label: "Nhãn",
        },
        {
          type: "string",
          name: "country",
          label: "Quốc gia",
        },
        {
          type: "string",
          label: "Mã ISO",
          name: "iso",
          options: countryOptions,
        },
      ],
    },
  ],
};
