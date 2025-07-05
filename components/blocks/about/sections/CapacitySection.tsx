"use client";

import { uuidv4 } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  FaIndustry,
  FaWarehouse,
  FaChartLine,
  FaMicrochip,
} from "react-icons/fa";
import { Template } from "tinacms";

interface CapacitySectionProps {
  data: {
    capacityHeading?: string;
    capacityItems?: Array<{
      icon?: string;
      title?: string;
      content?: string;
      id?: string
    }>;
  };
}

export const CapacitySection = ({ data }: CapacitySectionProps) => {
  const iconComponents = {
    FaIndustry,
    FaWarehouse,
    FaChartLine,
    FaMicrochip,
  };

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
        >
          {data.capacityHeading}
        </motion.h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {data.capacityItems?.map((item, index) => {
            const IconComponent =
              iconComponents[item.icon as keyof typeof iconComponents];
            return (
              <motion.div
                key={item.id ?? uuidv4()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-4 sm:p-5 lg:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl text-vina-primary mb-3 sm:mb-4">
                  {IconComponent && (
                    <IconComponent className="transform hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                  {item.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export const capacitySectionBlockSchema: Template = {
  label: "Năng lực sản xuất",
  name: "capacitySection",
  fields: [
    {
      label: "Tiêu đề",
      name: "capacityHeading",
      type: "string",
    },
    {
      label: "Danh sách năng lực",
      name: "capacityItems",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title,
          id: item?.id,
        }),
        defaultItem() {
          if (typeof window === "undefined") return {}
          return {
            id: uuidv4(),
          }
        },
      },
      fields: [
        {
          name: "id",
          label: "id",
          type: "string",
          ui: {
            component: () => <></>
          }
        },
        {
          label: "Icon",
          name: "icon",
          type: "string",
          options: [
            {
              label: "Công nghiệp",
              value: "FaIndustry",
            },
            {
              label: "Kho bãi",
              value: "FaWarehouse",
            },
            {
              label: "Biểu đồ",
              value: "FaChartLine",
            },
            {
              label: "Chip",
              value: "FaMicrochip",
            },
          ],
        },
        {
          label: "Tiêu đề",
          name: "title",
          type: "string",
        },
        {
          label: "Nội dung",
          name: "content",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
