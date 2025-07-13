import React, { useState } from "react";
import { Template } from "tinacms";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { uuidv4 } from "@/lib/utils";
import LucideIcon from "@/components/LucideIcon";
import ContactForm from "./ContactForm";

interface IContactSection {
  title: string;
  subtitle: string;
  formTitle: string;
  mapTitle: string;
  socialTitle: string;
  services: {
    id: string;
    name: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
    id: string;
  }[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  mapEmbedUrl: string;
}

export type TContactSection = Partial<IContactSection>;

interface Props {
  data?: TContactSection;
}

const Contact = (props: Props) => {
  return (
    <section className="py-12 sm:py-16 lg:py-2">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          {props.data?.title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-vina-primary mb-4">
              {props.data.title}
            </h2>
          )}
          {props.data?.subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {props.data.subtitle}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Column */}
          <ContactForm
            formTitle={props.data?.formTitle}
            services={props.data?.services}
          />

          {/* Info & Map Column */}
          <div className="order-2 lg:order-2 space-y-8">
            {/* Contact Info */}
            {props.data?.contactInfo && (
              <div className="">
                <h3 className="text-xl sm:text-2xl font-bold text-vina-primary mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-6">
                  {props.data.contactInfo.address && (
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                        <MapPin className="w-4 h-4 text-vina-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-vina-primary mb-1">
                          Địa chỉ
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {props.data.contactInfo.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {props.data.contactInfo.phone && (
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                        <Phone className="w-4 h-4 text-vina-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-vina-primary mb-1">
                          Điện thoại
                        </h4>
                        <a
                          href={`tel:${props.data.contactInfo.phone}`}
                          className="hover:text-vina-accent text-sm"
                        >
                          {props.data.contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {props.data.contactInfo.email && (
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                        <Mail className="w-4 h-4 text-vina-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-vina-primary mb-1">
                          Email
                        </h4>
                        <a
                          href={`mailto:${props.data.contactInfo.email}`}
                          className="hover:text-vina-accent text-sm"
                        >
                          {props.data.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Media */}
            {props.data?.socialLinks && props.data.socialLinks.length > 0 && (
              <div className="">
                {props.data?.socialTitle && (
                  <h3 className="text-xl sm:text-2xl font-bold text-vina-primary mb-6">
                    {props.data.socialTitle}
                  </h3>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {props.data.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex items-center justify-center space-x-2 p-3 border border-gray-200 hover:border-vina-primary hover:bg-vina-primary hover:text-white rounded-md transition-colors duration-200"
                    >
                      <LucideIcon icon={social.icon} />
                      <span className="text-sm font-medium capitalize">
                        {social.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {props.data?.mapEmbedUrl && (
              <div className="w-full">
                <div
                  className="relative w-full h-64 sm:h-80  rounded-md overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: props.data.mapEmbedUrl,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const contactSectionTemplate: Template = {
  name: "contactSection",
  label: "Contact Section",
  fields: [
    {
      name: "title",
      label: "Tiêu đề chính",
      type: "string",
    },
    {
      name: "subtitle",
      label: "Mô tả",
      type: "string",
    },
    {
      name: "formTitle",
      label: "Tiêu đề form",
      type: "string",
    },
    {
      name: "mapTitle",
      label: "Tiêu đề bản đồ",
      type: "string",
    },
    {
      name: "socialTitle",
      label: "Tiêu đề mạng xã hội",
      type: "string",
    },
    {
      name: "services",
      label: "Danh sách dịch vụ",
      type: "object",
      list: true,
      ui: {
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
        itemProps(item) {
          return {
            label: item?.name,
          };
        },
      },
      fields: [
        {
          name: "id",
          label: "ID",
          type: "string",
        },
        {
          name: "name",
          label: "Tên dịch vụ",
          type: "string",
        },
      ],
    },
    {
      name: "socialLinks",
      label: "Liên kết mạng xã hội",
      type: "object",
      list: true,
      ui: {
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
        itemProps(item) {
          return {
            label: item?.platform,
          };
        },
      },
      fields: [
        {
          name: "id",
          label: "ID",
          type: "string",
        },
        {
          name: "platform",
          label: "Nền tảng",
          type: "string",
        },
        {
          name: "url",
          label: "URL",
          type: "string",
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
        },
      ],
    },
    {
      name: "contactInfo",
      label: "Thông tin liên hệ",
      type: "object",
      fields: [
        {
          name: "address",
          label: "Địa chỉ",
          type: "string",
        },
        {
          name: "phone",
          label: "Số điện thoại",
          type: "string",
        },
        {
          name: "email",
          label: "Email",
          type: "string",
        },
      ],
    },
    {
      name: "mapEmbedUrl",
      label: "URL nhúng bản đồ",
      type: "string",
      description: "HTML iframe từ Google Maps",
    },
  ],
};

export default Contact;
