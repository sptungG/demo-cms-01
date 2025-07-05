import React from "react";
import { motion } from "framer-motion";
import { Globe, ArrowRight, Users, Star, Package, History } from "lucide-react";
import CountUp from "react-countup";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

export interface IHeroSectionSecond {
  badge?: {
    text?: string;
  };
  heroSectionSecondheading?: {
    title?: string;
    highlight?: string;
  };
  description?: string;
  buttons?: Array<{
    label?: string;
    actionKey?: string;
    variant?: string;
    id?: string;
  }>;
  heroSectionSecondstatistics?: Array<{
    number?: number;
    text?: string;
    id?: string;
  }>;
}
interface HeroSectionProps {
  data: IHeroSectionSecond;
  onQuoteClick?: () => void;
  onSupplierClick?: () => void;
}

const HeroSectionSecond: React.FC<HeroSectionProps> = ({
  data,
  onQuoteClick,
  onSupplierClick,
}) => {
  return (
    <section className="relative left-1/2 -translate-x-1/2 mx-auto w-screen rounded-xl relative bg-gradient-to-br from-vina-background via-vina-muted to-vina-background overflow-hidden py-2">
      <div className="mx-auto px-4 z-10 container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            className="space-y-4 xl:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-vina-border/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Star className="w-4 h-4 text-vina-primary mr-2" />
              <span className="text-sm font-medium text-vina-primary">
                {data.badge?.text}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-vina-foreground leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {data.heroSectionSecondheading?.title}
              <span className="text-vina-primary font-bold">
                {data.heroSectionSecondheading?.highlight}
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-vina-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {data.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={onQuoteClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl shadow-lg bg-vina-primary text-white hover:opacity-90 transition"
              >
                <Globe className="w-5 h-5" />
                {data.buttons?.[0]?.label}
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
              <motion.button
                onClick={onSupplierClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm font-semibold rounded-xl shadow-lg bg-white/10 border border-vina-border text-vina-foreground hover:bg-white/20 transition"
              >
                <Users className="w-5 h-5" />
                {data.buttons?.[1]?.label}
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column (Stats) */}
          <motion.div
            className="grid mt-4 sm:mt-0 grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {data.heroSectionSecondstatistics
              ?.slice(0, 4)
              .map((item, index: number) => {
                const icons = [Users, Globe, Package, History];
                const Icon = icons[index];
                const colors = [
                  "text-vina-primary",
                  "text-vina-secondary",
                  "text-vina-accent",
                  "bg-gradient-to-r from-vina-primary to-vina-accent bg-clip-text text-vina-primary",
                ];

                return (
                  <motion.div
                    key={item.id ?? uuidv4()}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-vina-border/10 backdrop-blur-md shadow hover:shadow-lg hover:border-vina-primary transition"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Icon className={`w-6 h-6 ${colors[index ?? 1]} mb-1`} />
                    <div className={colors[index ?? 1]}>
                      <CountUp
                        end={(item?.number as number) || 500}
                        duration={2}
                        className="text-2xl font-bold"
                      />
                      <span className="text-2xl font-bold">+</span>
                    </div>
                    <div className="text-sm text-vina-muted-foreground mt-1">
                      {item.text ?? ""}
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const heroSectionSecondTemplate: Template = {
  name: "heroSectionSecondTemplate",
  label: "Hero Section Second",
  ui: {
    previewSrc: "/blocks/sectionscms/herosectionsecond.png",
  },
  fields: [
    {
      type: "object",
      name: "badge",
      label: "Badge",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Badge Text",
        },
      ],
    },
    {
      type: "object",
      name: "heroSectionSecondheading",
      label: "Heading",
      required: false,
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "string",
          name: "highlight",
          label: "Highlight Text",
        },
      ],
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "buttons",
      label: "Buttons",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.label,
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
          type: "string",
          name: "label",
          label: "Button Label",
        },
        {
          type: "string",
          name: "actionKey",
          label: "Action Key",
        },
        {
          type: "string",
          name: "variant",
          label: "Button Variant",
          options: [
            {
              label: "Default",
              value: "default",
            },
            {
              label: "Outline",
              value: "outline",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "heroSectionSecondstatistics",
      label: "Statistics",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.text,
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
          type: "string",
          name: "id",
          label: "Id",
          ui: {
            component(props) {
              return <></>;
            },
          },
        },
        {
          type: "number",
          name: "number",
          label: "Number Value",
        },
        {
          type: "string",
          name: "text",
          label: "Statistic Label",
        },
      ],
    },
  ],
};
export default HeroSectionSecond;
