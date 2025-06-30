import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";
import { Globe, Building } from "lucide-react";

interface CallToActionSectionProps {
  onQuoteClick: () => void;
  onSupplierClick: () => void;
}

export interface ICallToActionSectionSecond {
  callToActionSecondHeading?: {
    title?: string;
    description?: string;
  };
  buyer?: {
    title?: string;
    description?: string;
    button: {
      text?: string;
    };
    features?: { title?: string; id?: string }[];
    id?: string;
  };
  supplier?: {
    title?: string;
    description?: string;
    button?: {
      text?: string;
    };
    features?: { title?: string; id?: string }[];
    id?: string;
  };
}

interface Props {
  data: ICallToActionSectionSecond;
}

const CallToActionSectionSecond: React.FC<Props> = ({ data }) => {
  return (
    <section className="container mx-auto rounded-xl relative overflow-hidden py-6 md:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl font-bold text-vina-foreground mb-6 relative">
            {data.callToActionSecondHeading?.title || ""}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-vina-primary via-vina-secondary to-vina-accent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p
            className="text-xl text-vina-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {data.callToActionSecondHeading?.description ||
              `Whether you're looking to source products or export your goods, we
            have the expertise to help you succeed.`}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {[data.buyer, data.supplier].map((item, i) => {
            const icons = [
              <Globe className="w-12 h-12 text-vina-primary" />,
              <Building className="w-12 h-12  text-vina-primary" />,
            ];
            return (
              <motion.div
                key={item?.id ?? uuidv4()}
                className="bg-gradient-to-br from-vina-background via-vina-muted to-vina-background backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-vina-border transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 + 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {icons[i]}
                </div>
                <div className="text-center mb-8 relative z-10">
                  <h3 className="text-2xl font-bold text-vina-foreground mb-4">
                    {item?.title}
                  </h3>
                  <p className="text-vina-muted-foreground">
                    {item?.description}
                  </p>
                </div>
                <div className="space-y-4 mb-8 relative z-10">
                  {item?.features?.map((feature, idx) => (
                    <motion.div
                      key={feature?.id || uuidv4()}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-vina-primary" />
                      <span className="text-vina-foreground">
                        {feature.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  // onClick={i === 0 ? onQuoteClick : onSupplierClick}
                  className="w-full bg-gradient-to-r border border-vina-primary rounded-2xl text-vina-primary cursor-pointer py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 relative z-10 group/btn overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10">{item?.button?.text}</span>
                  <motion.div
                    className="relative z-10 rounded-2xl border border-vina-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const callToActionSetionSecondSchema: Template = {
  name: "callToActionSectionSecond",
  label: "Call To Action Section Second",
  ui: {
    defaultItem() {
      return {
        id: uuidv4(),
      };
    },
  },
  fields: [
    {
      name: "callToActionSecondHeading",
      label: "Heading",
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
      name: "buyer",
      label: "International Buyer Section",
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
        {
          name: "button",
          label: "Button",
          type: "object",
          fields: [
            {
              name: "text",
              label: "Button Text",
              type: "string",
            },
          ],
        },
        {
          name: "features",
          label: "Features",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              id: item?.id,
              label: item?.title,
            }),
            defaultItem() {
              return {
                id: uuidv4(),
              };
            },
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "id",
              label: "key",
              type: "string",
              ui: {
                component(props) {
                  return <></>;
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "supplier",
      label: "Vietnamese Supplier Section",
      type: "object",
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
        defaultItem() {
          return {
            id: uuidv4(),
          };
        },
      },
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
        {
          name: "button",
          label: "Button",
          type: "object",
          fields: [
            {
              name: "text",
              label: "Button Text",
              type: "string",
            },
          ],
        },
        {
          name: "features",
          label: "Features",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({
              id: item?.id,
              label: item?.title,
            }),
            defaultItem() {
              return {
                id: uuidv4(),
              };
            },
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "id",
              label: "key",
              type: "string",
              ui: {
                component(props) {
                  return <></>;
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default CallToActionSectionSecond;
