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
      ],
    },
  ],
};

export default Page;
