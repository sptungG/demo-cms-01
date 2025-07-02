"use client";

import { uuidv4 } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Template } from "tinacms";
interface Feature {
    title?: string;
    description?: string;
    id?: string;
}

interface CompanyStats {
    years?: number;
    yearsLabel: string;
    yearsDescription?: string;
    revenue?: number;
    revenueLabel?: string;
    revenueDescription?: string;
}

export interface IIntroCompany {
    companyName?: string;
    slogan?: string;
    stats?: CompanyStats;
    features?: Feature[];
    image?: string;
}

interface Props {
    data?: IIntroCompany;
}

const IntroCompany = ({ data }: Props) => {
    return (
        <section className="relative bg-white">
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <Image
                    src="/images/worldmap-vector.png"
                    alt="World Map Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl relative"></div>
            <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold tracking-tight leading-tight mb-4">
                        <span className="text-vina-primary uppercase">{data?.companyName}</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        {data?.slogan}
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <div className="text-5xl font-extrabold text-vina-primary">{data?.stats?.years}</div>
                        <div className="text-lg font-semibold text-gray-900 mt-2">
                            {data?.stats?.yearsLabel}
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                            {data?.stats?.yearsDescription}
                        </p>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold text-vina-primary">{data?.stats?.revenue}</div>
                        <div className="text-lg font-semibold text-gray-900 mt-2">
                            {data?.stats?.revenueLabel}
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                            {data?.stats?.revenueDescription}
                        </p>
                    </div>
                </motion.div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full aspect-[4/3] rounded-lg md:rounded-2xl overflow-hidden shadow-md md:shadow-xl"
                    >
                        <Image
                            src={data?.image ?? "/uploads/banner.png"}
                            alt={data?.companyName ?? "Vinhapac"}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        className="grid gap-4 md:gap-6 lg:gap-8 h-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.15 }}
                    >
                        {data?.features?.map((feature, index) => (
                            <motion.div
                                key={feature?.id ?? uuidv4()}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative border-l-2 md:border-l-4 border-vina-primary pl-3 md:pl-5"
                            >
                                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-0.5 md:mb-1">
                                    {feature?.title}
                                </h3>
                                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                    {feature?.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const introCompanyBlockSchema: Template = {
    name: "introCompanySection",
    label: "Intro Company",
    fields: [
        {
            type: "string",
            name: "companyName",
            label: "Company Name",
        },
        {
            type: "string",
            name: "slogan",
            label: "Slogan",
        },
        {
            type: "object",
            name: "stats",
            label: "Company Statistics",
            fields: [
                {
                    type: "number",
                    name: "years",
                    label: "Years",
                },
                {
                    type: "string",
                    name: "yearsLabel",
                    label: "Years Label",
                },
                {
                    type: "string",
                    name: "yearsDescription",
                    label: "Years Description",
                },
                {
                    type: "number",
                    name: "revenue",
                    label: "Revenue",
                },
                {
                    type: "string",
                    name: "revenueLabel",
                    label: "Revenue Label",
                },
                {
                    type: "string",
                    name: "revenueDescription",
                    label: "Revenue Description",
                },
            ],
        },
        {
            type: "object",
            name: "features",
            label: "Features",
            list: true,
            ui: {
                itemProps: (item) => {
                    return {
                        label: item?.title,
                        id: item?.id,
                    };
                },
                defaultItem: () => {
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
                    name: "title",
                    label: "Title",
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
                    type: "string",
                    name: "id",
                    label: "ID",
                    ui: {
                        component(props) {
                            return null
                        },
                    }
                },
            ],
        },
        {
            type: "image",
            name: "image",
            label: "Image",
        },
    ],
};
export default IntroCompany;
