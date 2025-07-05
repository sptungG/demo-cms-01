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
import { CapacitySection } from "./about/sections/CapacitySection";
import { HeroAboutSection } from "./about/sections/HeroAboutSection";
import { LeadershipSection } from "./about/sections/LeadershipSection";
import { LegalInfoSection } from "./about/sections/LegalInfoSection";
import { TimelineSection } from "./about/sections/TimelineSection";
import { VisionMissionSection } from "./about/sections/VisionMissionSection";
import HeroSectionSecond, {
  IHeroSectionSecond,
} from "./home/HeroSectionSecond";
import WhoWeAreSection, { IWhoWeAreSection } from "./home/WhoWeAreSection";
import KeyExportProducts, {
  IKeyExportProducts,
} from "./home/KeyExportProducts";
import DeepExportServices, {
  IDeepExportServices,
} from "./home/DeepExportServices";
import PartnersShowcase, { IPartnersShowcase } from "./home/PartnersShowcase";
import CertificationsSection, {
  ICertificationsSection,
} from "./home/CertificationsSection";
import CallToActionSection, {
  ICallToActionSectionSecond,
} from "./home/CallToActionSectionSecond";
import CallToActionSectionSecond from "./home/CallToActionSectionSecond";
import IntroCompany, { IIntroCompany } from "./home/IntroCompany";
import FormSection, { IFormSection } from "./form/FormSection";
import FixedFormButton, { IFixedFormButton } from "../ui/FixedFormButton";

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

interface CapacitySectionBlock extends BaseBlock {
  __typename: "PageBlocksCapacitySection";
  capacityHeading: string;
  capacityItems: Array<{
    icon: string;
    title: string;
    content: string;
  }>;
}

interface HeroAboutSectionBlock extends BaseBlock {
  __typename: "PageBlocksHeroAboutSection";
  heading: string;
  subheading: string;
  backgroundImage: string;
  primaryButton: {
    label: string;
    link: string;
  };
  secondaryButton: {
    label: string;
    link: string;
  };
}

interface LeadershipSectionBlock extends BaseBlock {
  __typename: "PageBlocksLeadershipSection";
  heading: string;
  subheading: string;
  members: Array<{
    name: string;
    role: string;
    image: string;
  }>;
}

interface LegalInfoSectionBlock extends BaseBlock {
  __typename: "PageBlocksLegalInfoSection";
  heading: string;
  companyProfile: {
    title: string;
    description: string;
    buttonLabel: string;
    fileUrl: string;
    image?: string;
  };
  legalDetails: Array<{
    label: string;
    value: string;
  }>;
}

interface TimelineSectionBlock extends BaseBlock {
  __typename: "PageBlocksTimelineSection";
  heading: string;
  timeline: Array<{
    year: string;
    event: string;
  }>;
}

interface VisionMissionSectionBlock extends BaseBlock {
  __typename: "PageBlocksVisionMissionSection";
  vision: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  coreValues: {
    title: string;
    values: Array<{
      name: string;
      description: string;
    }>;
  };
  statistics: {
    orderQuantity: {
      label: string;
      description: string;
      value: number;
    };
    exportQuantity: {
      label: string;
      description: string;
      value: number;
    };
    customerReviews: {
      label: string;
      description: string;
      value: number;
    };
  };
}

interface IHeroSectionSecondTemplateBLock
  extends BaseBlock,
  IHeroSectionSecond {
  __typename: "PageBlocksHeroSectionSecondTemplate";
}

interface IWhoWeAreSectionBlock extends BaseBlock, IWhoWeAreSection {
  __typename: "PageBlocksWhoWeAreSection";
}

interface IKeyExportProductsBlock extends BaseBlock, IKeyExportProducts {
  __typename: "PageBlocksKeyExportProducts";
}

interface IDeepExportServicesBlock extends BaseBlock, IDeepExportServices {
  __typename: "PageBlocksDeepExportServices";
}

interface IPartnersShowcaseBlock extends BaseBlock, IPartnersShowcase {
  __typename: "PageBlocksPartnersShowcase";
}

interface ICertificationsSectionBlock
  extends BaseBlock,
  ICertificationsSection {
  __typename: "PageBlocksCertificationsSection";
}

interface ICallToActionSectionSecondBblock
  extends BaseBlock,
  ICallToActionSectionSecond {
  __typename: "PageBlocksCallToActionSectionSecond";
}

interface IIntroCompanySectionBlock extends BaseBlock, IIntroCompany {
  __typename: "PageBlocksIntroCompanySection";
}

interface IFormSectionBlock extends BaseBlock, IFormSection {
  __typename: "PageBlocksFormSection";
}

interface IFixedFormButtonBlock extends BaseBlock, IFixedFormButton {
  __typename: "PageBlocksFixedFormButton";
}

type PageBlock =
  | HeroSliderBlock
  | IntroductionBlock
  | FeaturedProductsBlock
  | WhyChooseUsBlock
  | ExportMarketsBlock
  | TestimonialsBlock
  | NewsAndEventsBlock
  | CtaBlock
  | CapacitySectionBlock
  | HeroAboutSectionBlock
  | LeadershipSectionBlock
  | LegalInfoSectionBlock
  | TimelineSectionBlock
  | VisionMissionSectionBlock
  | IWhoWeAreSectionBlock
  | IKeyExportProductsBlock
  | IDeepExportServicesBlock
  | IPartnersShowcaseBlock
  | ICertificationsSectionBlock
  | ICallToActionSectionSecondBblock
  | IIntroCompanySectionBlock
  | IFormSectionBlock
  | IFixedFormButtonBlock
  | IHeroSectionSecondTemplateBLock;

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
    case "PageBlocksCapacitySection":
      return (
        <CapacitySection
          data={{
            capacityHeading: block.capacityHeading,
            capacityItems: block.capacityItems || [],
          }}
        />
      );
    case "PageBlocksHeroAboutSection":
      return (
        <HeroAboutSection
          data={{
            backgroundImage: block.backgroundImage,
            heading: block.heading,
            subheading: block.subheading,
            primaryButton: block.primaryButton || { label: "", link: "" },
            secondaryButton: block.secondaryButton || { label: "", link: "" },
          }}
        />
      );
    case "PageBlocksLeadershipSection":
      return (
        <LeadershipSection
          data={{
            heading: block.heading,
            subheading: block.subheading,
            members: block.members || [],
          }}
        />
      );
    case "PageBlocksLegalInfoSection":
      return (
        <LegalInfoSection
          data={{
            heading: block.heading,
            companyProfile: block.companyProfile || {
              title: "",
              description: "",
              buttonLabel: "",
              fileUrl: "",
              image: "",
            },
            legalDetails: block.legalDetails || [],
          }}
        />
      );
    case "PageBlocksTimelineSection":
      return (
        <TimelineSection
          data={{
            heading: block.heading,
            timeline: block.timeline || [],
          }}
        />
      );
    case "PageBlocksVisionMissionSection":
      return (
        <VisionMissionSection
          data={{
            vision: block.vision || { title: "", content: "" },
            mission: block.mission || { title: "", content: "" },
            coreValues: block.coreValues || { title: "", values: [] },
            statistics: block.statistics || {
              orderQuantity: {
                label: "",
                description: "",
                value: 0,
              },
              exportQuantity: {
                label: "",
                description: "",
                value: 0,
              },
              customerReviews: {
                label: "",
                description: "",
                value: 0,
              },
            },
          }}
        />
      );
    case "PageBlocksHeroSectionSecondTemplate":
      return (
        <HeroSectionSecond
          data={{
            badge: {
              text: block.badge?.text ?? "",
            },
            heroSectionSecondheading: block.heroSectionSecondheading,
            description: block.description,
            buttons: block.buttons || [],
            heroSectionSecondstatistics: block.heroSectionSecondstatistics,
          }}
        />
      );
    case "PageBlocksWhoWeAreSection":
      return (
        <WhoWeAreSection
          data={{
            whoWeAreSectionHeading: block.whoWeAreSectionHeading || {
              title: "",
              description: "",
            },
            features: block.features || [],
            mission: block.mission || {
              title: "",
              description: "",
              image: "",
            },
            vision: block.vision || {
              title: "",
              description: "",
              image: "",
            },
          }}
        />
      );

    case "PageBlocksKeyExportProducts":
      return (
        <KeyExportProducts
          data={{
            keyExportProductsHeading: block.keyExportProductsHeading || {
              title: "",
              description: "",
            },
            products: block.products || [],
          }}
        />
      );
    case "PageBlocksDeepExportServices":
      return (
        <DeepExportServices
          data={{
            deepExportServicesHeading: block.deepExportServicesHeading || {
              title: "",
              description: "",
            },
            services: block.services || [],
          }}
        />
      );
    case "PageBlocksPartnersShowcase":
      return (
        <PartnersShowcase
          data={{
            partnersShowcaseHeading: {
              title: block.partnersShowcaseHeading?.title ?? "",
            },
            partners: block.partners || [],
          }}
        />
      );
    case "PageBlocksCertificationsSection":
      return (
        <CertificationsSection
          data={{
            certifications: block.certifications || [],
            certificationHeading: {
              title: block.certificationHeading?.title ?? "",
            },
          }}
        />
      );
    case "PageBlocksCallToActionSectionSecond":
      return (
        <CallToActionSectionSecond
          data={{
            buyer: block.buyer || {
              title: "",
              description: "",
              button: {
                text: "",
              },
              features: [],
            },
            supplier: block.supplier || {
              title: "",
              description: "",
              button: {
                text: "",
              },
              features: [],
            },
            callToActionSecondHeading: block.callToActionSecondHeading || {
              title: "",
              description: "",
            },
          }}
        />
      );
    case "PageBlocksIntroCompanySection":
      return (
        <IntroCompany
          data={{
            companyName: block.companyName,
            slogan: block.slogan,
            stats: block.stats,
            features: block.features,
            image: block.image,
          }}
        />
      );
    case "PageBlocksFormSection":
      return <FormSection data={block} />;
    case "PageBlocksFixedFormButton":
      return <FixedFormButton data={{
        form: block.form,
        button: block.button,
        name: block.name
      }} />
    default:
      return null;
  }
};
