import { capacitySectionBlockSchema } from "@/components/blocks/about/sections/CapacitySection";
import { heroAboutBlockSchema } from "@/components/blocks/about/sections/HeroAboutSection";
import { leadershipSectionBlockSchema } from "@/components/blocks/about/sections/LeadershipSection";
import { legalInfoSectionBlockSchema } from "@/components/blocks/about/sections/LegalInfoSection";
import { timelineSectionBlockSchema } from "@/components/blocks/about/sections/TimelineSection";
import { visionMissionSectionBlockSchema } from "@/components/blocks/about/sections/VisionMissionSection";
import { callToActionBlockSchema } from "@/components/blocks/home/CallToAction";
import { exportMarketsBlockSchema } from "@/components/blocks/home/ExportMarkets";
import { featuredProductsBlockSchema } from "@/components/blocks/home/FeaturedProducts";
import { heroSliderBlockSchema } from "@/components/blocks/home/HeroSlider";
import { introductionBlockSchema } from "@/components/blocks/home/Introduction";
import { newsAndEventsBlockSchema } from "@/components/blocks/home/NewsAndEvents";
import { testimonialsBlockSchema } from "@/components/blocks/home/Testimonials";
import { whyChooseUsBlockSchema } from "@/components/blocks/home/WhyChooseUs";
import type { Collection } from "tinacms";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "json",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
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
      name: "slug",
      label: "Slug",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroSliderBlockSchema,
        introductionBlockSchema,
        featuredProductsBlockSchema,
        whyChooseUsBlockSchema,
        exportMarketsBlockSchema,
        newsAndEventsBlockSchema,
        testimonialsBlockSchema,
        callToActionBlockSchema,
        capacitySectionBlockSchema,
        heroAboutBlockSchema,
        leadershipSectionBlockSchema,
        legalInfoSectionBlockSchema,
        timelineSectionBlockSchema,
        visionMissionSectionBlockSchema,
      ],
    },
  ],
};

export default Page;
