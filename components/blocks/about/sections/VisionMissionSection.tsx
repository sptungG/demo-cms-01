"use client";

import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaBoxes, FaShip, FaSmile } from "react-icons/fa";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import { Template } from "tinacms";

interface VisionMissionSectionProps {
  data: {
    vision: {
      title: string;
      content: string;
    };
    mission: {
      title: string;
      content: string;
    };
    coreValues: {
      title: string;
      values: Array<{
        name: string;
        description: string;
      }>;
    };
    statistics: {
      orderQuantity: {
        label: string;
        description: string;
        value: number;
      };
      exportQuantity: {
        label: string;
        description: string;
        value: number;
      };
      customerReviews: {
        label: string;
        description: string;
        value: number;
      };
    };
  };
}

export const VisionMissionSection = ({ data }: VisionMissionSectionProps) => {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl shadow-lg"
          >
            <div className="text-4xl text-vina-primary mb-4">
              <FaEye />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {data.vision?.title}
            </h3>
            <p className="text-gray-600">{data.vision?.content}</p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl shadow-lg"
          >
            <div className="text-4xl text-vina-primary mb-4">
              <FaBullseye />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {data.mission?.title}
            </h3>
            <p className="text-gray-600">{data.mission?.content}</p>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              className="text-4xl text-vina-primary mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <FaBoxes />
            </motion.div>
            <motion.div
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CountUp
                start={0}
                end={data.statistics?.orderQuantity?.value ?? 5000}
                duration={2.5}
                separator=","
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </motion.div>
            <h4 className="text-lg font-semibold mb-2">
              {data.statistics?.orderQuantity?.label ?? "Orders"}
            </h4>
            <p className="text-gray-600 text-sm">
              {data.statistics?.orderQuantity?.description ?? "Completed orders"}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              className="text-4xl text-vina-primary mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <FaShip />
            </motion.div>
            <motion.div
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CountUp
                start={0}
                end={data.statistics?.exportQuantity?.value ?? 500}
                duration={2}
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </motion.div>
            <h4 className="text-lg font-semibold mb-2">
              {data.statistics?.exportQuantity?.label ?? "Export"}
            </h4>
            <p className="text-gray-600 text-sm">
              {data.statistics?.exportQuantity?.description ??
                "Exported products per year"}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              className="text-4xl text-vina-primary mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <FaSmile />
            </motion.div>
            <motion.div
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CountUp
                start={0}
                end={data.statistics?.customerReviews?.value ?? 98}
                duration={3}
                suffix="%"
                enableScrollSpy
                scrollSpyOnce
              />
            </motion.div>
            <h4 className="text-lg font-semibold mb-2">
              {data.statistics?.customerReviews?.label ?? "Customer Reviews"}
            </h4>
            <p className="text-gray-600 text-sm">
              {data.statistics?.customerReviews?.description ??
                "Customer satisfaction percentage"}
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-vina-primary"
          >
            {data.coreValues?.title}
          </motion.h3>
        </div>
        <div className="max-w-7xl mx-auto !overflow-hidden">
          {!data.coreValues?.values || data.coreValues?.values?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg
                  className="w-full h-full text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Chưa có giá trị cốt lõi
              </h3>
              <p className="text-gray-500">
                Giá trị cốt lõi sẽ được hiển thị tại đây
              </p>
            </div>
          ) : (
            <Marquee
              gradient={false}
              speed={30}
              pauseOnHover={true}
              className="py-4"
            >
              <div className="flex gap-[24px] mr-[24px] overflow-hidden">
                {data.coreValues.values.map((value, index) => (
                  <motion.div
                    key={value.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-[300px] flex-shrink-0 text-center p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-lg md:text-xl font-bold mb-3 text-vina-primary line-clamp-1">
                      {value.name}
                    </h4>
                    <p className="text-gray-600 line-clamp-3">
                      {value.description}
                    </p>
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
export const visionMissionSectionBlockSchema: Template = {
  label: "Tầm nhìn & Sứ mệnh",
  name: "visionMissionSection",
  fields: [
    {
      label: "Tầm nhìn",
      name: "vision",
      type: "object",
      fields: [
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
    {
      label: "Sứ mệnh",
      name: "mission",
      type: "object",
      fields: [
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
    {
      name: "statistics",
      label: "Statistics",
      type: "object",
      fields: [
        {
          name: "orderQuantity",
          label: "Số lượng đơn hàng",
          type: "object",
          fields: [
            {
              type: "string",
              name: "label",
              label: "Nhãn",
            },
            {
              type: "string",
              name: "description",
              label: "Mô tả",
            },
            {
              type: "number",
              name: "value",
              label: "Giá trị",
            },
          ],
        },
        {
          name: "exportQuantity",
          label: "Số lượng xuất khẩu",
          type: "object",
          fields: [
            {
              type: "string",
              name: "label",
              label: "Nhãn",
            },
            {
              type: "string",
              name: "description",
              label: "Mô tả",
            },
            {
              type: "number",
              name: "value",
              label: "Giá trị",
            },
          ],
        },
        {
          name: "customerReviews",
          label: "Đánh giá khách hàng",
          type: "object",
          fields: [
            {
              type: "string",
              name: "label",
              label: "Nhãn",
            },
            {
              type: "string",
              name: "description",
              label: "Mô tả",
            },
            {
              type: "number",
              name: "value",
              label: "Giá trị",
            },
          ],
        },
      ],
    },
    {
      label: "Giá trị cốt lõi",
      name: "coreValues",
      type: "object",
      fields: [
        {
          label: "Tiêu đề",
          name: "title",
          type: "string",
        },
        {
          label: "Danh sách giá trị",
          name: "values",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => {
              return { label: item?.name };
            },
          },
          fields: [
            {
              label: "Tên giá trị",
              name: "name",
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
          ],
        },
      ],
    },
  ],
};
