import type { Metadata } from "next";
import ResourcesClient from "@/components/resources/ResourcesClient";
import { resourceCategories } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Tools, links, programs, and organizations that make accessible travel easier — all vetted and organized in one place.",
};

export const revalidate = 300;

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ResourcesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const initialCategory = category && resourceCategories.includes(category) ? category : "All";

  return <ResourcesClient key={initialCategory} initialCategory={initialCategory} />;
}
