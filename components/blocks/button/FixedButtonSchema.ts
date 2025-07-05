import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

export const fixedButtonBlockSchema: Template = {
    name: "fixedFormButton",
    label: "Fixed Button",
    ui: {
        itemProps(item) {
            return {
                label: item?.name,
            }
        },
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "string",
        },
        {
            type: "object",
            name: "button",
            label: "Button Settings",
            fields: [
                {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                },
                {
                    type: "object",
                    name: "position",
                    label: "Button Position",
                    fields: [
                        {
                            type: "number",
                            name: "top",
                            label: "Top Position",
                        },
                        {
                            type: "number",
                            name: "right",
                            label: "Right Position",
                        },
                        {
                            type: "number",
                            name: "bottom",
                            label: "Bottom Position",
                        },
                        {
                            type: "number",
                            name: "left",
                            label: "Left Position",
                        }
                    ]
                },
                {
                    type: "string",
                    name: "icon",
                    label: "Button Icon",
                    description: "Icon name from Lucide icons"
                }
            ]
        },
        {
            type: "object",
            name: "form",
            label: "Form Settings",
            fields: [
                {
                    type: "string",
                    name: "title",
                    label: "Form Title",
                },
                {
                    type: "string",
                    name: "description",
                    label: "Form Description",
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
            ]
        }
    ],
};