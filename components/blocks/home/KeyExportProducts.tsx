import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

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
export interface IKeyExportProducts {
  keyExportProductsHeading?: {
    title?: string;
    description?: string;
  };
  products: Array<{
    title?: string;
    description?: string;
    image?: string;
    id?: string;
  }>;
}
interface Props {
  data: IKeyExportProducts;
}
const KeyExportProducts = ({
  data: { products, keyExportProductsHeading },
}: Props) => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-vina-foreground mb-4">
            {keyExportProductsHeading?.title || "Key Export Products"}
          </h2>
          <p className="text-lg md:text-xl text-vina-muted-foreground max-w-2xl mx-auto font-light">
            {keyExportProductsHeading?.description ||
              `At VINHAPAC, we deliver Vietnam’s signature export products to the
            world – ensuring quality, sustainability, and global standards.`}
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
          {products?.map((category) => {
            return (
              <motion.div
                key={category.id}
                variants={item}
                className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-vina-primary-10 hover:border-vina-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-vina-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative space-y-4">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={category.image || ""}
                      alt={category.title || "Product"}
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export const KeyExportProductsTemplate: Template = {
  name: "keyExportProducts",
  label: "Key Export Products",
  fields: [
    {
      name: "keyExportProductsHeading",
      label: "Section Heading",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      name: "products",
      label: "Export Products",
      type: "object",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.title,
            id: item?.id,
          };
        },
        defaultItem() {
          if (typeof window === "undefined") {
            return {};
          }
          return {
            id: uuidv4(),
          };
        },
      },
      fields: [
        {
          name: "id",
          label: "Key",
          type: "string",
          ui: {
            component: () => null,
          },
        },
        {
          name: "title",
          label: "Product Title",
          type: "string",
        },
        {
          name: "description",
          label: "Product Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "image",
          label: "Product Image",
          type: "image",
        },
      ],
    },
  ],
};
export default KeyExportProducts;
