import type { Metadata } from "next";
import ResourcesClient from "@/components/resources/ResourcesClient";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Tools, links, programs, and organizations that make accessible travel easier — all vetted and organized in one place.",
};

export const revalidate = 300;

export default function ResourcesPage() {
  return <ResourcesClient />;
}
