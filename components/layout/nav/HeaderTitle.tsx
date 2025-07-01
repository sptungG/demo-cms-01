"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeaderTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center gap-6 py-4 bg-white sticky"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="relative w-14 h-14"
      >
        <Image
          src="/uploads/logo.png"
          alt="Viglacera Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-xl font-bold text-vina-primary uppercase tracking-wider">
          CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ XUẤT NHẬP KHẨU VIGLACERA
        </h1>
        <span className="text-lg text-center text-vina-primary tracking-wider font-semibold">
          VIGLACERA-EXIM J.S.C
        </span>
      </motion.div>
    </motion.div>
  );
};

export default HeaderTitle;
