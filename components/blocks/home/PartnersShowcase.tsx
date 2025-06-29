import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const partners = [
  { name: "Carrefour", logo: "/images/bigc-template.png" },
  { name: "Auchan", logo: "/images/bigc-template.png" },
  { name: "Tesco", logo: "/images/bigc-template.png" },
  { name: "Lidl", logo: "/images/bigc-template.png" },
  { name: "Whole Foods", logo: "/images/bigc-template.png" },
  { name: "Big C", logo: "/images/bigc-template.png" },
];

const PartnersShowcase: React.FC = () => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-vina-foreground mb-10"
        >
          Trusted by Global Retailers
        </motion.h2>

        <Marquee
          gradient={true}
          gradientColor="#ffffff"
          speed={40}
          pauseOnHover={true}
          className="overflow-y-hidden"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex items-center cursor-pointer justify-center opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-12"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-24 object-contain"
              />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersShowcase;
