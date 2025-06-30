import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Target, Book } from "lucide-react";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

export interface IWhoWeAreSection {
  whoWeAreSectionHeading?: {
    title?: string;
    description?: string;
  };
  features?: Array<{
    title?: string;
    desc?: string;
    id?: string;
  }>;
  mission?: {
    title?: string;
    description?: string;
    image?: string;
  };
  vision?: {
    title?: string;
    description?: string;
    image?: string;
  };
}
interface Props {
  data: IWhoWeAreSection;
}
const WhoWeAreSection = (props: Props) => {
  return (
    <section className="container py-6 md:py-10 lg:py-14 bg-vina-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6 flex flex-col gap-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-vina-foreground mb-2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {props.data.whoWeAreSectionHeading?.title || "Who We Are"}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-vina-muted-foreground mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {props.data.whoWeAreSectionHeading?.description ||
              "VINHAPAC is Vietnam's leading B2B export service provider, specializing in connecting high-quality Vietnamese products with international markets worldwide."}
          </motion.p>
        </motion.div>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-3 gap-10">
          {props.data.features?.slice(0, 3)?.map((feature, index) => {
            const icons = [
              <Trophy className="w-8 h-8 text-vina-primary" />,
              <Target className="w-8 h-8 text-vina-primary" />,
              <Book className="w-8 h-8 text-vina-primary" />,
            ];
            const delays = [0.2, 0.4, 0.6];
            return (
              <motion.div
                key={feature.id ?? uuidv4()}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: delays[index], duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {icons[index]}
                </div>
                <h3 className="text-xl font-semibold text-vina-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-vina-muted-foreground text-base leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group bg-white/5 backdrop-blur-md border border-vina-border rounded-xl overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={props.data.mission?.image || "/uploads/ourmission.png"}
                alt="Our Mission"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold text-vina-foreground mb-3">
                {props.data.mission?.title || "Our Mission"}
              </h4>
              <p className="text-vina-muted-foreground leading-relaxed">
                {props.data.mission?.description ||
                  `Empower Vietnamese businesses to thrive globally by providing
                seamless export solutions and building sustainable international
                partnerships.`}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group bg-white/5 backdrop-blur-md border border-vina-border rounded-xl overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={props.data.vision?.image || "/uploads/ourvision.png"}
                alt="Our Vision"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold text-vina-foreground mb-3">
                {props.data.vision?.title || "Our Vision"}
              </h4>
              <p className="text-vina-muted-foreground leading-relaxed">
                {props.data.vision?.description ||
                  `To be the leading bridge connecting Vietnamese excellence with
                the global market — trusted, innovative, and impactful.`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const whoWeAreSectionTemplate: Template = {
  name: "whoWeAreSection",
  label: "Who We Are Section",
  fields: [
    {
      name: "whoWeAreSectionHeading",
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
      name: "features",
      label: "Features",
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
          required: true,
          uid: true,
        },
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "desc",
          label: "Description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      name: "mission",
      label: "Our Mission",
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
          name: "image",
          label: "Image",
          type: "image",
        },
      ],
    },
    {
      name: "vision",
      label: "Our Vision",
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
          name: "image",
          label: "Image",
          type: "image",
        },
      ],
    },
  ],
};
export default WhoWeAreSection;
