import { capacitySectionBlockSchema } from "@/components/blocks/about/sections/CapacitySection";
import { heroAboutBlockSchema } from "@/components/blocks/about/sections/HeroAboutSection";
import { leadershipSectionBlockSchema } from "@/components/blocks/about/sections/LeadershipSection";
import { legalInfoSectionBlockSchema } from "@/components/blocks/about/sections/LegalInfoSection";
import { timelineSectionBlockSchema } from "@/components/blocks/about/sections/TimelineSection";
import { visionMissionSectionBlockSchema } from "@/components/blocks/about/sections/VisionMissionSection";
import { fixedButtonBlockSchema } from "@/components/blocks/button/FixedButtonSchema";
import { callToActionBlockSchema } from "@/components/blocks/home/CallToAction";
import { callToActionSetionSecondSchema } from "@/components/blocks/home/CallToActionSectionSecond";
import { certificationsSectionSchema } from "@/components/blocks/home/CertificationsSection";
import { deepExportServicesSchemaTemplate } from "@/components/blocks/home/DeepExportServices";
import { exportMarketsBlockSchema } from "@/components/blocks/home/ExportMarkets";
import { featuredProductsBlockSchema } from "@/components/blocks/home/FeaturedProducts";
import { heroSectionSecondTemplate } from "@/components/blocks/home/HeroSectionSecond";
import { heroSliderBlockSchema } from "@/components/blocks/home/HeroSlider";
import { introCompanyBlockSchema } from "@/components/blocks/home/IntroCompany";
import { introductionBlockSchema } from "@/components/blocks/home/Introduction";
import { KeyExportProductsTemplate } from "@/components/blocks/home/KeyExportProducts";
import { newsAndEventsBlockSchema } from "@/components/blocks/home/NewsAndEvents";
import { partnersShowcaseSchemaTemplate } from "@/components/blocks/home/PartnersShowcase";
import { testimonialsBlockSchema } from "@/components/blocks/home/Testimonials";
import { whoWeAreSectionTemplate } from "@/components/blocks/home/WhoWeAreSection";
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
        heroSectionSecondTemplate,
        introductionBlockSchema,
        introCompanyBlockSchema,
        featuredProductsBlockSchema,
        whyChooseUsBlockSchema,
        whoWeAreSectionTemplate,
        exportMarketsBlockSchema,
        partnersShowcaseSchemaTemplate,
        certificationsSectionSchema,
        KeyExportProductsTemplate,
        deepExportServicesSchemaTemplate,
        newsAndEventsBlockSchema,
        testimonialsBlockSchema,
        callToActionBlockSchema,
        callToActionSetionSecondSchema,
        fixedButtonBlockSchema,

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
