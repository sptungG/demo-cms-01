"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaEye,
  FaBullseye,
  FaIndustry,
  FaWarehouse,
  FaChartLine,
  FaMicrochip,
  FaHistory,
  FaBoxes,
  FaShip,
  FaSmile,
  FaFileDownload,
  FaPhoneAlt,
  FaInfoCircle,
} from "react-icons/fa";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Button } from "@/components/ui/button";
import { mockData } from "./mockData";
import EmptyLeader from "./EmptyLeader";

export const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-screen left-[50%] -translate-x-[50%] overflow-hidden">
        <Image
          src={mockData.blocks[0].backgroundImage as string}
          alt="Header Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <Image
            src={mockData.blocks[0].backgroundImage as string}
            alt="Header Background"
            fill
            className="object-cover mix-blend-overlay filter blur-[2px] brightness-90 scale-105"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {mockData.blocks[0].heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
            >
              {mockData.blocks[0].subheading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <button
                className="px-8 py-3 bg-vina-primary hover:bg-vina-primary/90 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/contact'}
              >
                <FaPhoneAlt className="w-4 h-4" />
                Liên hệ tư vấn
              </button>
              <button
                className="px-8 py-3 bg-vina-primary/80 hover:bg-vina-primary/90 text-white rounded-full font-medium backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/about'}
              >
                <FaInfoCircle className="w-4 h-4" />
                Tìm hiểu thêm
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
          >
            {mockData.blocks[1].heading}
          </motion.h2>
          <VerticalTimeline
            lineColor="var(--vina-primary)"
            className="before:!w-[1px]"
          >
            {mockData.blocks[1]?.timeline?.map((item, index) => (
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

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
                {mockData.blocks[2]?.vision?.title || ""}
              </h3>
              <p className="text-gray-600">
                {mockData.blocks[2]?.vision?.content || ""}
              </p>
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
                {mockData.blocks[2]?.mission?.title}
              </h3>
              <p className="text-gray-600">
                {mockData.blocks[2]?.mission?.content}
              </p>
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
                  end={5000}
                  duration={2.5}
                  separator=","
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">Đơn Hàng</h4>
              <p className="text-gray-600 text-sm">Đã hoàn thành thành công</p>
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
                  end={500}
                  duration={2}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">Container</h4>
              <p className="text-gray-600 text-sm">Xuất khẩu mỗi năm</p>
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
                  end={98}
                  duration={2}
                  suffix="%"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">Khách Hàng</h4>
              <p className="text-gray-600 text-sm">Hài lòng với dịch vụ</p>
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
              {mockData.blocks[2]?.coreValues?.title}
            </motion.h3>
          </div>
          <div className="max-w-7xl mx-auto !overflow-hidden">
            {!mockData.blocks[2]?.coreValues?.values ||
            mockData.blocks[2].coreValues.values.length === 0 ? (
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
                  {mockData.blocks[2].coreValues.values.map((value, index) => (
                    <motion.div
                      key={value.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="w-[300px] flex-shrink-0 text-center p-6 bg-white rounded-lg border  hover:shadow-lg transition-shadow"
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

      {/* Leadership Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-vina-primary mb-4"
            >
              {mockData.blocks[3].heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              {mockData.blocks[3].subheading}
            </motion.p>
          </div>
          <div className="max-w-7xl mx-auto">
            {!mockData.blocks[3]?.members ||
            mockData.blocks[3].members.length === 0 ? (
              <EmptyLeader />
            ) : (
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover={true}
                className="py-2"
                play={mockData.blocks[3].members.length > 3}
              >
                <div className="flex gap-[24px] mr-[24px] overflow-hidden">
                  {mockData.blocks[3].members.map((member, index) => (
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

      {/* Capacity Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
          >
            {mockData.blocks[4].heading}
          </motion.h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {mockData.blocks[4]?.items?.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-4 sm:p-5 lg:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl text-vina-primary mb-3 sm:mb-4">
                  {item.icon === "FaIndustry" && (
                    <FaIndustry className="transform hover:scale-110 transition-transform duration-300" />
                  )}
                  {item.icon === "FaWarehouse" && (
                    <FaWarehouse className="transform hover:scale-110 transition-transform duration-300" />
                  )}
                  {item.icon === "FaChartLine" && (
                    <FaChartLine className="transform hover:scale-110 transition-transform duration-300" />
                  )}
                  {item.icon === "FaMicrochip" && (
                    <FaMicrochip className="transform hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center text-vina-primary mb-12"
          >
            {mockData.blocks[5].heading}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Company Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-xl space-y-4 sm:space-y-6 "
            >
                <h3 className="text-lg sm:text-xl font-bold">
                  {mockData.blocks[5]?.companyProfile?.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {mockData.blocks[5]?.companyProfile?.description}
                </p>
                <Button
                  variant="default"
                  className="bg-vina-primary hover:bg-vina-primary/90 w-full sm:w-auto"
                  asChild
                >
                  <a
                    href={mockData.blocks[5]?.companyProfile?.fileUrl}
                    download
                    className="flex items-center justify-center gap-2"
                  >
                    <FaFileDownload className="text-lg" />
                    {mockData.blocks[5]?.companyProfile?.buttonLabel}
                  </a>
                </Button>
              {mockData.blocks[5]?.companyProfile?.image !== "undefined" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full aspect-[16/9] mt-6 rounded-lg overflow-hidden"
                >
                  <Image
                    src={mockData.blocks[5]?.companyProfile?.image as string}
                    alt={
                      mockData.blocks[5]?.companyProfile?.title ||
                      "Company Profile"
                    }
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
              {mockData.blocks[5]?.legalDetails?.map((detail, index) => (
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
    </div>
  );
};
