"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeaderTitle = () => {
  return (
    <motion.div
      className="hidden sm:flex items-center justify-center gap-6 py-4 bg-white sticky"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
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
        className="flex flex-col gap-1"
      >
        <motion.h1
          className="text-xl font-bold text-vina-primary uppercase tracking-wider"
        >
          VINHAPAC – KẾT NỐI THỊ TRƯỜNG, XÂY DỰNG NIỀM TIN
        </motion.h1>
        <motion.span
          className="text-lg uppercase text-center text-vina-primary tracking-wider font-semibold"
        >
          vinhapac
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default HeaderTitle;
