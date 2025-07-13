import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import Link from "next/link";

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
    url?: string;
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
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl uppercase text-vina-primary mb-4 relative  font-bold">
            {deepExportServicesHeading?.title || "Deep Export Services"}
            <div className="absolute top-full bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-vina-primary"></div>
          </h2>
          {deepExportServicesHeading?.description && (
            <p className="text-lg text-vina-muted-foreground max-w-2xl mx-auto">
              {deepExportServicesHeading?.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 p-1"
        >
          {services?.map((service, index) => (
            <motion.div
              key={service.id ?? uuidv4()}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-vina-primary-10 hover:border-vina-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute z-1 inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image ?? ""}
                    alt={service.title ?? "Service"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute group z-2 inset-0 flex flex-col items-center justify-center p-6">
                  <h3 className="text-xl uppercase font-bold text-white text-center mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white text-center mb-3">
                    {service.description}
                  </p>
                  <Link href={service.url ?? ""}>
                    <motion.button className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 bg-vina-primary text-white rounded-lg">
                      View More
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
          name: "url",
          label: "Url",
          type: "string",
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
