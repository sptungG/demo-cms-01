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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedServices: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      selectedServices: [],
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-2">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          {props.data?.title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
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
          <div className="order-1 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
              {props.data?.formTitle && (
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {props.data.formTitle}
                </h3>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-vina-primary focus:border-vina-primary text-gray-900 placeholder-gray-500"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-vina-primary focus:border-vina-primary text-gray-900 placeholder-gray-500"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-vina-primary focus:border-vina-primary text-gray-900 placeholder-gray-500"
                    placeholder="0123 456 789"
                  />
                </div>

                {/* Services Checkbox */}
                {props.data?.services && props.data.services.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Dịch vụ muốn tư vấn
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {props.data.services.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedServices.includes(
                              service.id
                            )}
                            onChange={() => handleServiceChange(service.id)}
                            className="w-4 h-4 text-vina-primary border-gray-300 rounded focus:ring-vina-primary"
                          />
                          <span className="text-sm text-gray-700">
                            {service.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-vina-primary focus:border-vina-primary text-gray-900 placeholder-gray-500 resize-vertical"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-vina-primary text-white font-medium py-3 px-6 rounded-md hover:bg-vina-accent focus:outline-none focus:ring-2 focus:ring-vina-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info & Map Column */}
          <div className="order-2 lg:order-2 space-y-8">
            {/* Contact Info */}
            {props.data?.contactInfo && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-6">
                  {props.data.contactInfo.address && (
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                        <MapPin className="w-4 h-4 text-vina-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
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
                        <h4 className="font-medium text-gray-900 mb-1">
                          Điện thoại
                        </h4>
                        <a
                          href={`tel:${props.data.contactInfo.phone}`}
                          className="text-vina-primary hover:text-vina-accent text-sm"
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
                        <h4 className="font-medium text-gray-900 mb-1">
                          Email
                        </h4>
                        <a
                          href={`mailto:${props.data.contactInfo.email}`}
                          className="text-vina-primary hover:text-vina-accent text-sm"
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
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
                {props.data?.socialTitle && (
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
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
                      className="flex items-center justify-center space-x-2 p-3 border border-gray-200 hover:border-vina-primary hover:bg-vina-primary hover:text-white rounded-md transition-colors duration-200"
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
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {props.data?.mapTitle && (
                  <div className="p-6 sm:p-8 pb-4 border-b border-gray-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {props.data.mapTitle}
                    </h3>
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div
                    className="relative w-full h-64 sm:h-80 bg-gray-100 rounded-md overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: props.data.mapEmbedUrl,
                    }}
                  ></div>
                </div>
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
