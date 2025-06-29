import React from "react";
import { motion } from "framer-motion";
import { Tablets, Fish, Sofa, Shirt, Palette, Leaf } from "lucide-react";

const productCategories = [
  {
    title: "Agricultural Products",
    description:
      "Premium quality rice, coffee, and pepper from Vietnam's fertile regions",
    icon: <Tablets className="w-12 h-12 text-vina-primary" />,
  },
  {
    title: "Seafood",
    description:
      "Fresh and processed shrimp, pangasius, and other seafood products",
    icon: <Fish className="w-12 h-12 text-vina-primary" />,
  },
  {
    title: "Furniture",
    description:
      "Expertly crafted wooden furniture and sustainable bamboo products",
    icon: <Sofa className="w-12 h-12 text-vina-primary" />,
  },
  {
    title: "Garment & Textile",
    description: "High-quality apparel and textiles for global fashion brands",
    icon: <Shirt className="w-12 h-12 text-vina-primary" />,
  },
  {
    title: "Handicrafts",
    description:
      "Traditional and modern Vietnamese handicrafts with unique designs",
    icon: <Palette className="w-12 h-12 text-vina-primary" />,
  },
  {
    title: "Spices & Herbs",
    description:
      "Premium cinnamon, star anise, and other authentic Vietnamese spices",
    icon: <Leaf className="w-12 h-12 text-vina-primary" />,
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
    <section className="py-16 bg-gradient-to-br from-vina-background via-vina-muted to-vina-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-vina-foreground mb-4">
            Key Export Products
          </h2>
          <p className="text-vina-muted-foreground text-lg max-w-2xl mx-auto">
            Delivering Vietnam's finest products to global markets with quality,
            reliability, and sustainable practices
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {productCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={item}
              className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-vina-border/10 hover:border-vina-primary/30 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vina-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative space-y-4">
                <div className="bg-vina-primary/10 rounded-xl p-3 w-fit">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-vina-foreground">
                  {category.title}
                </h3>
                <p className="text-vina-muted-foreground">
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
