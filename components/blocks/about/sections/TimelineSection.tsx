"use client";

import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Template } from "tinacms";

interface TimelineSectionProps {
  data: {
    heading: string;
    timeline: Array<{
      year: string;
      event: string;
    }>;
  };
}

export const TimelineSection = ({ data }: TimelineSectionProps) => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
        >
          {data.heading}
        </motion.h2>
        <VerticalTimeline
          lineColor="var(--vina-primary)"
          className="before:!w-[1px]"
        >
          {data.timeline?.map((item, index) => (
            <VerticalTimelineElement
              key={item.year}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "#ffffff",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                borderRadius: "0.75rem",
                borderColor: "var(--vina-primary)",
                borderWidth: "1px",
              }}
              contentArrowStyle={{
                borderRight: "7px solid var(--vina-primary)",
              }}
              date={item.year}
              iconStyle={{
                background: "var(--vina-primary)",
                color: "#fff",
                boxShadow: "none",
              }}
              icon={<FaHistory />}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-vina-primary mb-2">
                  {item.year}
                </h3>
                <p className="text-gray-600">{item.event}</p>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
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
      label: "Các mốc thời gian",
      name: "timeline",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: `${item?.year}` };
        },
      },
      fields: [
        {
          label: "Năm",
          name: "year",
          type: "string",
        },
        {
          label: "Sự kiện",
          name: "event",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
