import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import Footer from "./nav/footer";
import { checktIsLocale } from "@/lib/utils";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
  locale?: string;
};

export default async function Layout({
  children,
  rawPageData,
  locale,
}: LayoutProps) {
  const isLocale = checktIsLocale(locale as string);
  const { data: globalData } = await client.queries.global(
    {
      relativePath: `${
        locale && isLocale ? `${locale}/index.json` : "index.json"
      }`,
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );


  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header locale={isLocale ? (locale as string) : "vn"} />
      <main className="overflow-x-hidden pt-16">{children}</main>
      <Footer data={globalData.global.footer} />
    </LayoutProvider>
  );
}
