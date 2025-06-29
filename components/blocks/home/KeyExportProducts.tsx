import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const productCategories = [
  {
    title: "Agricultural Products",
    description:
      "We export high-grade rice, robusta & arabica coffee, black pepper, and cashew nuts cultivated from Vietnam's richest farmlands.",
    image: "/uploads/exportProducts/agricultural.png",
  },
  {
    title: "Seafood",
    description:
      "Frozen shrimp, pangasius fillets, squid, and other seafood products meeting global HACCP and ISO standards.",
    image: "/uploads/exportProducts/seafood.png",
  },
  {
    title: "Furniture",
    description:
      "Eco-friendly wooden and bamboo furniture designed for durability, export-ready for US & EU markets.",
    image: "/uploads/exportProducts/furniture.png",
  },
  {
    title: "Garment & Textile",
    description:
      "OEM/ODM apparel production with high-quality fabrics, competitive pricing, and trusted delivery schedules.",
    image: "/uploads/exportProducts/garment.png",
  },
  {
    title: "Handicrafts",
    description:
      "Bamboo, rattan, and lacquer crafts handcrafted by skilled artisans for modern and traditional decor needs.",
    image: "/uploads/exportProducts/handicrafts.png",
  },
  {
    title: "Spices & Herbs",
    description:
      "Vietnamese cinnamon, star anise, ginger, turmeric, and medicinal herbs exported in bulk or retail-ready form.",
    image: "/uploads/exportProducts/spices.png",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const KeyExportProducts: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-vina-foreground mb-4">
            Key Export Products
          </h2>
          <p className="text-lg md:text-xl text-vina-muted-foreground max-w-2xl mx-auto font-light">
            At VINHAPAC, we deliver Vietnam’s signature export products to the
            world – ensuring quality, sustainability, and global standards.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1"
        >
          {productCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={item}
              className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-vina-border/10 hover:border-vina-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vina-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative space-y-4">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-vina-foreground">
                  {category.title}
                </h3>
                <p className="text-vina-muted-foreground text-sm md:text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyExportProducts;
