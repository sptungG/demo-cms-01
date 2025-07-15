import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import Link from "next/link";

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
    url?: string;
  }>;
  backgroundImage?: string;
}
interface Props {
  data: IKeyExportProducts;
}
const KeyExportProducts = ({
  data: { products, keyExportProductsHeading, backgroundImage },
}: Props) => {
  return (
    <section className="relative -translate-x-1/2 left-1/2 overflow-hidden w-screen bg-gradient-to-br from-vina-background via-vina-muted to-vina-background py-4">
      {/* {backgroundImage && ( */}
      {/* <div className="absolute inset-0 z-0">
          <Image
            src={"/uploads/container.png"}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div> */}
      {/* )} */}

      {/* Fallback gradient background */}
      {/* {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-vina-background via-vina-muted to-vina-background" />
      )} */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-3xl text-vina-primary mb-4 relative font-bold">
            {keyExportProductsHeading?.title || "Key Export Products"}
            {/* <div className="absolute top-full bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-vina-primary"></div> */}
          </h2>
          {keyExportProductsHeading?.description && (
            <p className="text-xl text-vina-muted-foreground max-w-2xl mx-auto font-light">
              {keyExportProductsHeading?.description ||
                `At VINHAPAC, we deliver Vietnam’s signature export products to the
            world – ensuring quality, sustainability, and global standards.`}
            </p>
          )}
        </motion.div>

        {/* Product grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 p-1"
        >
          {products?.map((category) => {
            return (
              <motion.div
                key={category.id}
                variants={item}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-vina-primary-10 hover:border-vina-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute z-1 inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={category.image || ""}
                      alt={category.title || "Product"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute group z-2 inset-0 flex flex-col items-center justify-center p-6 hover:">
                    <h3 className="text-xl uppercase font-bold text-white text-center mb-3">
                      {category.title}
                    </h3>
                    <p className="text-white text-center mb-3">
                      {category.description}
                    </p>
                    <Link href={category.url ?? "#"}>
                      <motion.button className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 bg-vina-primary text-white rounded-lg">
                        View More
                      </motion.button>
                    </Link>
                  </div>
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
          name: "url",
          label: "Url",
          type: "string",
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
