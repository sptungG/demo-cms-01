"use client";

import React from "react";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

interface FormField {
    id?: string;
    label?: string;
    type?: "text" | "email" | "tel" | "textarea" | "select";
    placeholder?: string;
    required?: boolean;
    options?: string[];
    validation?: {
        pattern?: string;
        message?: string;
    };
}

export interface IFormSection {
    title?: string;
    description?: string;
    fields?: FormField[];
    submitButton?: {
        label?: string;
        action?: string;
    };
}

interface Props {
    data?: IFormSection;
}

const FormSection = ({ data }: Props) => {

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{data?.title}</h2>
                    <p className="text-lg text-gray-600">{data?.description}</p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                >
                    {data?.fields?.map((field, index) => (
                        <motion.div
                            key={field.id ?? uuidv4()}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="relative"
                        >
                            <label
                                htmlFor={field.id}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {field.label}
                                {field.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                )}
                            </label>

                            {field.type === "textarea" ? (
                                <textarea
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent"
                                    rows={4}
                                />
                            ) : field.type === "select" ? (
                                <select
                                    id={field.id}
                                    required={field.required}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent"
                                >
                                    <option value="">{field.placeholder}</option>
                                    {field.options?.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    pattern={field.validation?.pattern}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vina-primary focus:border-transparent"
                                />
                            )}

                            {field.validation?.message && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {field.validation.message}
                                </p>
                            )}
                        </motion.div>
                    ))}

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center"
                    >
                        <button
                            type="submit"
                            className="px-8 py-3 bg-vina-primary text-white rounded-lg hover:bg-vina-primary/90 transition-colors"
                        >
                            {data?.submitButton?.label ?? "Submit"}
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </section>
    );
};

export default FormSection;

export const formSectionBlockSchema: Template = {
    name: "formSection",
    label: "Form Section",
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
            type: "object",
            name: "fields",
            label: "Form Fields",
            list: true,
            ui: {
                itemProps: (item) => ({
                    label: item?.label,
                    id: item?.id,
                }),
                defaultItem: () => {
                    if (typeof window === "undefined") return {}
                    return {
                        id: uuidv4(),
                    }
                },
            },
            fields: [
                {
                    type: "string",
                    name: "label",
                    label: "Field Label",
                },
                {
                    type: "string",
                    name: "id",
                    label: "Field ID",
                    ui: {
                        component: () => null
                    }
                },
                {
                    type: "string",
                    name: "type",
                    label: "Field Type",
                    options: ["text", "email", "tel", "textarea", "select"],
                },
                {
                    type: "string",
                    name: "placeholder",
                    label: "Placeholder",
                },
                {
                    type: "boolean",
                    name: "required",
                    label: "Required",
                },
                {
                    type: "string",
                    name: "options",
                    label: "Options (for select field)",
                    list: true,
                    ui: {
                        component: "list",
                    },
                },
                {
                    type: "object",
                    name: "validation",
                    label: "Validation",
                    fields: [
                        {
                            type: "string",
                            name: "pattern",
                            label: "Pattern (regex)",
                        },
                        {
                            type: "string",
                            name: "message",
                            label: "Validation Message",
                        },
                    ],
                },
            ],
        },
        {
            type: "object",
            name: "submitButton",
            label: "Submit Button",
            fields: [
                {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                },
                {
                    type: "string",
                    name: "action",
                    label: "Form Action URL",
                },
            ],
        },
    ],
};