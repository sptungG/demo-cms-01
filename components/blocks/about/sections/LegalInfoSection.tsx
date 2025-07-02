"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Template } from "tinacms";

interface LegalInfoSectionProps {
  data: {
    heading: string;
    companyProfile: {
      title: string;
      description: string;
      buttonLabel: string;
      fileUrl: string;
      image?: string;
    };
    legalDetails: Array<{
      label: string;
      value: string;
    }>;
  };
}

export const LegalInfoSection = ({ data }: LegalInfoSectionProps) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
        >
          {data.heading}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Company Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl space-y-4 sm:space-y-6"
          >
            <h3 className="text-lg sm:text-xl font-bold">
              {data.companyProfile?.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {data.companyProfile?.description}
            </p>
            <Button
              variant="default"
              className="bg-vina-primary hover:bg-vina-primary/90 w-full sm:w-auto"
              asChild
            >
              <a
                href={data.companyProfile?.fileUrl}
                download
                className="flex items-center justify-center gap-2"
              >
                <FaFileDownload className="text-lg" />
                {data.companyProfile?.buttonLabel}
              </a>
            </Button>
            {data.companyProfile?.image !== "undefined" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative w-full aspect-[16/9] mt-6 rounded-lg overflow-hidden"
              >
                <Image
                  src={data.companyProfile?.image as string}
                  alt={data.companyProfile?.title || "Company Profile"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Legal Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {data.legalDetails?.map((detail) => (
              <div key={detail.label} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-vina-primary">
                  {detail.label}
                </h4>
                <p className="text-gray-600">{detail.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const legalInfoSectionBlockSchema: Template = {
  label: "Thông tin pháp lý",
  name: "legalInfoSection",
  fields: [
    {
      label: "Tiêu đề",
      name: "heading",
      type: "string",
    },
    {
      label: "Hồ sơ công ty",
      name: "companyProfile",
      type: "object",
      fields: [
        {
          label: "Tiêu đề",
          name: "title",
          type: "string",
        },
        {
          label: "Mô tả",
          name: "description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          label: "Nhãn nút tải xuống",
          name: "buttonLabel",
          type: "string",
        },
        {
          label: "Đường dẫn file",
          name: "fileUrl",
          type: "string",
        },
        {
          label: "Hình ảnh",
          name: "image",
          type: "image",
        },
      ],
    },
    {
      label: "Thông tin chi tiết",
      name: "legalDetails",
      type: "object",
      list: true,
      fields: [
        {
          label: "Nhãn",
          name: "label",
          type: "string",
        },
        {
          label: "Giá trị",
          name: "value",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
