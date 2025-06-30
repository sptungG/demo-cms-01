import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { uuidv4 } from "@/lib/utils";
import { Template } from "tinacms";

const partners = [
  { name: "Carrefour", logo: "/images/bigc-template.png" },
  { name: "Auchan", logo: "/images/bigc-template.png" },
  { name: "Tesco", logo: "/images/bigc-template.png" },
  { name: "Lidl", logo: "/images/bigc-template.png" },
  { name: "Whole Foods", logo: "/images/bigc-template.png" },
  { name: "Big C", logo: "/images/bigc-template.png" },
];
export interface IPartnersShowcase {
  partnersShowcaseHeading?: {
    title?: string;
  };
  partners?: Array<{
    name?: string;
    logo?: string;
    id?: string;
  }>;
}
interface Props {
  data: IPartnersShowcase;
}
const PartnersShowcase = ({
  data: { partnersShowcaseHeading, partners },
}: Props) => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-vina-foreground mb-10"
        >
          {partnersShowcaseHeading?.title ?? "Trusted by Global Retailers"}
        </motion.h2>

        <Marquee
          gradient={true}
          gradientColor="#ffffff"
          speed={40}
          pauseOnHover={true}
          className="overflow-y-hidden"
        >
          {partners?.map((partner) => (
            <motion.div
              key={partner.id ?? uuidv4()}
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
export const partnersShowcaseSchemaTemplate: Template = {
  name: "partnersShowcase",
  label: "Partners Showcase",
  fields: [
    {
      name: "partnersShowcaseHeading",
      label: "Heading",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
      ],
    },
    {
      name: "partners",
      label: "Partners",
      type: "object",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.name,
            id: item?.id,
          };
        },
        defaultItem() {
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
          name: "name",
          label: "Partner Name",
          type: "string",
        },
        {
          name: "logo",
          label: "Partner Logo",
          type: "image",
        },
      ],
    },
  ],
};
export default PartnersShowcase;
