import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Logo",
          name: "logo",
          fields: [
            {
              type: "string",
              label: "Logo",
              name: "path",
              ui: {
                component: "image",
              },
            },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        {
          type: "string",
          name: "description",
          label: "Mô tả ngắn",
          ui: { component: "textarea" },
        },
        {
          type: "object",
          name: "contactInfo",
          label: "Thông tin liên hệ",
          fields: [
            { type: "string", name: "address", label: "Địa chỉ" },
            { type: "string", name: "phone", label: "Số điện thoại" },
            { type: "string", name: "email", label: "Email" },
          ],
        },
        {
          type: "object",
          name: "linkColumns",
          label: "Các cột liên kết",
          list: true,
          fields: [
            { type: "string", name: "title", label: "Tiêu đề cột" },
            {
              type: "object",
              name: "links",
              label: "Các liên kết",
              list: true,
              fields: [
                { type: "string", name: "label", label: "Nhãn" },
                { type: "string", name: "url", label: "Đường dẫn" },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "socialLinks",
          label: "Mạng xã hội",
          list: true,
          fields: [
            {
              type: "string",
              name: "platform",
              label: "Nền tảng (VD: LinkedIn, Facebook)",
            },
            { type: "string", name: "url", label: "Đường dẫn" },
          ],
        },
        { type: "string", name: "copyright", label: "Dòng Copyright" },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
