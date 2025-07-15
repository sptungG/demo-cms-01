import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import Link from "next/link";
import { Timeline, TimelineEntry } from "@/components/ui/time-line";

interface TimeLineContent {
  year?: string;
  event?: string;
  image?: string;
  id?: string;
  href?: string;
  index?: number;
}
export interface ITimeline {
  heading?: string;
  backgroundImage?: string;
  timeline?: Array<TimeLineContent>;
}
interface TimelineSectionProps {
  data: ITimeline;
}
const TimeLineContent = ({
  event,
  href,
  id,
  image,
  year,
  index,
}: TimeLineContent) => {
  return (
    <Link href={href ?? "#"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index ? index * 0.2 : 0, duration: 0.6 }}
        className="group cursor-pointer"
      >
        {image && (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={image}
              alt={`${year} - ${event}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        <div className="p-4">
          {!image && (
            <h3 className="vertical-timeline-element-title text-xl font-bold text-vina-primary mb-3">
              {year}
            </h3>
          )}

          <div className="space-y-2">
            <div className="text-gray-700 leading-relaxed prose max-w-none">
              <TinaMarkdown content={event as unknown as TinaMarkdownContent} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
const TimeLineSection2 = ({ data }: TimelineSectionProps) => {
  const listDataTimeLine: TimelineEntry[] =
    data.timeline?.map((item) => {
      return {
        title: (item.year as string) ?? "",
        content: <TimeLineContent {...item} key={item.id} />,
      };
    }) ?? [];
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
          <Timeline data={listDataTimeLine} />
        </div>
      </div>
    </section>
  );
};

export default TimeLineSection2;
