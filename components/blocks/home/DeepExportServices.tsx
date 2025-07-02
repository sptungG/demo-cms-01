import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

const services = [
  {
    title: "End-to-End Export Solutions",
    image: "/uploads/services/export-solutions.png",
    description:
      "Comprehensive support from sourcing, logistics, to international compliance handling.",
  },
  {
    title: "Customs & Documentation",
    image: "/uploads/services/customs-documentation.png",
    description:
      "Fast and accurate customs clearance and international export documentation services.",
  },
  {
    title: "Product Sourcing & Consolidation",
    image: "/uploads/services/product-sourcing.png",
    description:
      "Strong ties with local manufacturers across industries like apparel, food, furniture, and more.",
  },
  {
    title: "Quality Control & Certification",
    image: "/uploads/services/quality-control.png",
    description:
      "Strict quality inspection with international certification assurance for every shipment.",
  },
  {
    title: "Tailored Distribution Network",
    image: "/uploads/services/distribution-network.png",
    description:
      "Flexible and scalable delivery channels to match partner requirements worldwide.",
  },
  {
    title: "Global Partner Relationships",
    image: "/uploads/services/global-partners.png",
    description:
      "Strategic partnerships with logistics and supply chain experts in France, USA, and Asia.",
  },
];

export interface IDeepExportServices {
  deepExportServicesHeading?: {
    title?: string;
    description?: string;
  };
  services?: Array<{
    title?: string;
    description?: string;
    image?: string;
    id?: string;
  }>;
}

interface Props {
  data: IDeepExportServices;
}
const DeepExportServices = ({
  data: { deepExportServicesHeading, services },
}: Props) => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-vina-foreground mb-4">
            {deepExportServicesHeading?.title || "Deep Export Services"}
          </h2>
          <p className="text-lg text-vina-muted-foreground max-w-2xl mx-auto">
            {deepExportServicesHeading?.description ||
              `VINHAPAC offers comprehensive export support tailored to help you
            scale globally with confidence.`}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services?.map((service, index) => (
            <motion.div
              key={service.id ?? uuidv4()}
              className="group bg-white/5 backdrop-blur-xl border border-vina-primary-10 rounded-2xl hover:border-vina-primary/30 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image ?? ""}
                  alt={service.title ?? "Service"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-vina-foreground mb-3 group-hover:text-vina-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-vina-muted-foreground text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export const deepExportServicesSchemaTemplate: Template = {
  name: "deepExportServices",
  label: "Deep Export Services",
  fields: [
    {
      name: "deepExportServicesHeading",
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
      name: "services",
      label: "Export Services",
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
          label: "Service Title",
          type: "string",
        },
        {
          name: "description",
          label: "Service Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "image",
          label: "Service Image",
          type: "image",
        },
      ],
    },
  ],
};
export default DeepExportServices;
