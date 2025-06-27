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
} from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Button } from "@/components/ui/button";
import { mockData } from "./mockData";

export const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src={mockData.blocks[0].backgroundImage as string}
          alt="Header Background"
          fill
          className="object-cover"
          priority
        />
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
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              {mockData.blocks[0].subheading}
            </motion.p>
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
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {mockData.blocks[2]?.coreValues?.values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg md:text-xl font-bold mb-3 text-vina-primary">
                  {value.name}
                </h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mockData.blocks[3]?.members?.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 md:h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-vina-primary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockData.blocks[4]?.items?.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl text-vina-primary mb-4">
                  {item.icon === "FaIndustry" && <FaIndustry />}
                  {item.icon === "FaWarehouse" && <FaWarehouse />}
                  {item.icon === "FaChartLine" && <FaChartLine />}
                  {item.icon === "FaMicrochip" && <FaMicrochip />}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
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
              className="p-8 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4">
                {mockData.blocks[5]?.companyProfile?.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {mockData.blocks[5]?.companyProfile?.description}
              </p>
              <Button
                variant="default"
                className="bg-vina-primary hover:bg-vina-primary/90"
                asChild
              >
                <a href={mockData.blocks[5]?.companyProfile?.fileUrl} download>
                  {mockData.blocks[5]?.companyProfile?.buttonLabel}
                </a>
              </Button>
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
