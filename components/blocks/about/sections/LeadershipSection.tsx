"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import EmptyLeader from "../EmptyLeader";
import { Template } from "tinacms";

interface LeadershipSectionProps {
  data: {
    heading: string;
    subheading: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
    }>;
  };
}

export const LeadershipSection = ({ data }: LeadershipSectionProps) => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-vina-primary mb-4"
          >
            {data.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {data.subheading}
          </motion.p>
        </div>
        <div className="max-w-7xl mx-auto">
          {!data.members || data.members.length === 0 ? (
            <EmptyLeader />
          ) : (
            <Marquee
              gradient={false}
              speed={40}
              pauseOnHover={true}
              className="py-2"
              play={data.members.length > 3}
            >
              <div className="flex gap-[24px] mr-[24px] overflow-hidden">
                {data.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-[200px] flex-shrink-0 bg-white rounded-xl border overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-base font-bold mb-1 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-vina-primary font-medium text-sm line-clamp-1">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Marquee>
          )}
        </div>
      </div>
    </section>
  );
};
export const leadershipSectionBlockSchema: Template = {
  label: "Ban lãnh đạo",
  name: "leadershipSection",
  fields: [
    {
      label: "Tiêu đề",
      name: "heading",
      type: "string",
    },
    {
      label: "Tiêu đề phụ",
      name: "subheading",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Danh sách thành viên",
      name: "members",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name,
        }),
      },
      fields: [
        {
          label: "Họ và tên",
          name: "name",
          type: "string",
        },
        {
          label: "Chức vụ",
          name: "role",
          type: "string",
        },
        {
          label: "Hình ảnh",
          name: "image",
          type: "image",
        },
      ],
    },
  ],
};
