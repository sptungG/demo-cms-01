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
    <section className="">
      <div className="container mx-auto px-4">
        <div className="mb-4 sm:mb-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-vina-primary text-3xl relative font-bold"
          >
            {heading}
            {/* <p className="absolute top-full bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-vina-primary"></p> */}
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

        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl bg-transparent backdrop-blur-sm flex items-center justify-center p-4">
          <WorldMap countries={(countries as any) ?? []} />
        </div>
      </div>
    </section>
  );
};
export const exportMarketsBlockSchema: Template = {
  name: "exportMarkets",
  label: "Export Markets World Map",
  ui: {
    previewSrc: "/blocks/sectionscms/exportmarketworldmap.png",
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
