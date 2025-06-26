import { HeroSlider } from "./home/HeroSlider";
import { Introduction } from "./home/Introduction";
import { FeaturedProducts } from "./home/FeaturedProducts";
import { WhyChooseUs } from "./home/WhyChooseUs";
import { ExportMarkets } from "./home/ExportMarkets";
import { Testimonials } from "./home/Testimonials";
import { NewsAndEvents } from "./home/NewsAndEvents";
import { CallToAction } from "./home/CallToAction";
import { tinaField } from "tinacms/dist/react";
import { IObj } from "@/utils/types";

type Maybe<T> = T | null | undefined;

type IconType = "FaCertificate" | "FaIndustry" | "FaUsersCog" | "FaAward";

interface BaseBlock {
  __typename: string;
}

interface HeroSliderBlock extends BaseBlock {
  __typename: "PageBlocksHeroSlider";
  slides: Array<{
    slogan: string;
    subSlogan: string;
    backgroundImage: string;
    button: {
      label: string;
      link: string;
    };
  }>;
}

interface IntroductionBlock extends BaseBlock {
  __typename: "PageBlocksIntroduction";
  heading: string;
  content: {
    type: string;
    children: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  image: string;
}

interface FeaturedProductsBlock extends BaseBlock {
  __typename: "PageBlocksFeaturedProducts";
  heading: string;
  subheading: string;
  products: Array<{
    name: string;
    image: string;
    description: string;
    link: string;
  }>;
}

interface WhyChooseUsBlock extends BaseBlock {
  __typename: "PageBlocksWhyChooseUs";
  heading: string;
  features: Array<{
    title: string;
    description: string;
    icon: IconType;
  }>;
}

interface ExportMarketsBlock extends BaseBlock {
  __typename: "PageBlocksExportMarkets";
  heading: string;
  subheading: string;
  mapImage: string;
  countries: IObj[];
}

interface TestimonialsBlock extends BaseBlock {
  __typename: "PageBlocksTestimonials";
  heading: string;
  items: Array<{
    quote: string;
    author: string;
    authorRole: string;
    logo: string;
  }>;
}

interface NewsAndEventsBlock extends BaseBlock {
  __typename: "PageBlocksNewsAndEvents";
  heading: string;
  posts: Array<{
    title: string;
    category: string;
    date: string;
    image: string;
    link: string;
  }>;
}

interface CtaBlock extends BaseBlock {
  __typename: "PageBlocksCta";
  heading: string;
  subheading: string;
  button: {
    label: string;
    link: string;
  };
}

type PageBlock =
  | HeroSliderBlock
  | IntroductionBlock
  | FeaturedProductsBlock
  | WhyChooseUsBlock
  | ExportMarketsBlock
  | TestimonialsBlock
  | NewsAndEventsBlock
  | CtaBlock;

interface Page {
  blocks?: Maybe<PageBlock>[];
  id: string;
  _sys: any;
  _values: any;
}

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values"> | any) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map((block: any, i: any) => {
        if (!block) return null;
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} />
          </div>
        );
      })}
    </>
  );
};

export const Block = ({ block }: { block: PageBlock }) => {
  switch (block.__typename) {
    case "PageBlocksHeroSlider":
      return <HeroSlider slides={block.slides || []} />;
    case "PageBlocksIntroduction":
      return (
        <Introduction
          heading={block.heading}
          content={block.content}
          image={block.image}
        />
      );
    case "PageBlocksFeaturedProducts":
      return (
        <FeaturedProducts
          heading={block.heading}
          subheading={block.subheading}
          products={block.products || []}
        />
      );
    case "PageBlocksWhyChooseUs":
      return (
        <WhyChooseUs heading={block.heading} features={block.features || []} />
      );
    case "PageBlocksExportMarkets":
      return (
        <ExportMarkets
          heading={block.heading}
          subheading={block.subheading}
          mapImage={block.mapImage}
          countries={(block.countries as IObj[]) || []}
        />
      );
    case "PageBlocksTestimonials":
      return <Testimonials heading={block.heading} items={block.items || []} />;
    case "PageBlocksNewsAndEvents":
      return (
        <NewsAndEvents heading={block.heading} posts={block.posts || []} />
      );
    case "PageBlocksCta":
      return (
        <CallToAction
          heading={block.heading}
          subheading={block.subheading}
          button={block.button || { label: "", link: "" }}
        />
      );
    default:
      return null;
  }
};
