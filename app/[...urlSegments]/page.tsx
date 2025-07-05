import React from "react";
import { notFound, redirect } from "next/navigation";
import { countries } from "country-flag-icons";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { Section } from "@/components/layout/section";
import ClientPage from "./client-page";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const segments = resolvedParams.urlSegments;
  const getLocale = segments[0] && segments[0] !== "vn" ? segments[0] : "";

  // Kiểm tra nếu chỉ có 1 segment và đó là locale
  const checktIsLocale = countries.some(
    (x) => x.toLowerCase() === getLocale.toLowerCase()
  );

  const filepath =
    segments.length === 1 && getLocale && checktIsLocale
      ? `/${getLocale.toLowerCase()}/index`
      : segments.join("/");
  let data;

  try {
    data = await client.queries.page({
      relativePath: `${filepath}.json`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data} locale={getLocale}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === "home")); // exclude the home page
  return params;
}
