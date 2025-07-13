"use client";

import { uuidv4 } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHistory } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export interface ITimeline {
  heading?: string;
  backgroundImage?: string;
  timeline?: Array<{
    year?: string;
    event?: string;
    image?: string;
    id?: string;
    href?: string;
  }>;
}
interface TimelineSectionProps {
  data: ITimeline;
}

export const TimelineSection = ({ data }: TimelineSectionProps) => {
  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2">
      <div className="container mx-auto">
        <div className="relative z-10 container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-2xl md:text-4xl font-bold text-center mb-12 ${
              data.backgroundImage
                ? "text-vina-primary drop-shadow-sm"
                : "text-vina-primary"
            }`}
          >
            {data.heading}
          </motion.h2>

          <VerticalTimeline
            lineColor="var(--vina-primary)"
            animate={true}
            className="before:!w-[2px] !max-w-full !w-full !m-0 before:!shadow-lg [&_.vertical-timeline-element-date]:!hidden"
          >
            {data.timeline?.map((item, index) => (
              <VerticalTimelineElement
                key={item?.id}
                className="vertical-timeline-element--work cursor-pointer"
                contentStyle={{
                  background: data.backgroundImage
                    ? "rgba(255, 255, 255, 0.95)"
                    : "#ffffff",
                  boxShadow: data.backgroundImage
                    ? "0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)"
                    : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  borderRadius: "0.75rem",
                  borderColor: "var(--vina-primary)",
                  borderWidth: "1px",
                  padding: "0",
                  overflow: "hidden",
                  backdropFilter: data.backgroundImage ? "blur(10px)" : "none",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--vina-primary)",
                }}
                date={item.year}
                iconStyle={{
                  background: "var(--vina-primary)",
                  color: "#fff",
                  boxShadow: data.backgroundImage
                    ? "0 0 0 4px rgba(255, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.15)"
                    : "none",
                  border: data.backgroundImage ? "3px solid white" : "none",
                }}
                icon={<FaHistory />}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group"
                >
                  {/* Cover Image */}
                  {item.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`${item.year} - ${item.event}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block px-3 py-1 bg-vina-primary text-white text-sm font-bold rounded-full shadow-lg">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Year title (only show if no image) */}
                    {!item.image && (
                      <h3 className="vertical-timeline-element-title text-xl font-bold text-vina-primary mb-3">
                        {item.year}
                      </h3>
                    )}

                    {/* Event description */}
                    <div className="space-y-2">
                      <div className="text-gray-700 leading-relaxed prose max-w-none">
                        <TinaMarkdown
                          content={item.event as unknown as TinaMarkdownContent}
                        />
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-vina-primary to-transparent"></div>
                        <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                          Milestone
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        {/* Bottom decorative element */}
        {data.backgroundImage && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-5" />
        )}
      </div>
    </section>
  );
};

export const timelineSectionBlockSchema: Template = {
  label: "Lịch sử phát triển",
  name: "timelineSection",
  fields: [
    {
      label: "Tiêu đề",
      name: "heading",
      type: "string",
    },
    {
      label: "Hình ảnh nền",
      name: "backgroundImage",
      type: "image",
      description: "Hình ảnh nền cho section timeline (tùy chọn)",
      ui: {
        component: "hidden",
      },
    },
    {
      label: "Các mốc thời gian",
      name: "timeline",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: `${item?.year}`, id: item?.id };
        },
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
      },
      fields: [
        {
          label: "ID",
          name: "id",
          type: "string",
          ui: {
            component: "hidden",
          },
        },
        {
          label: "Năm",
          name: "year",
          type: "string",
        },
        {
          label: "Hình ảnh bìa",
          name: "image",
          type: "image",
          description: "Hình ảnh minh họa cho mốc thời gian này",
        },
        {
          label: "Sự kiện",
          name: "event",
          type: "rich-text",
        },
        {
          label: "Url",
          name: "href",
          type: "string",
          description: "Đường dẫn đến sự kiện/Url to event",
        },
      ],
    },
  ],
};
