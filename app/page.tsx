import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";
import HomePage from "@/mockup/homepage";

export const revalidate = 0;

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.json`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
