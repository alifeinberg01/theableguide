import type { Metadata } from "next";
import FAQClient from "@/components/faq/FAQClient";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Everything you need to know about our guides, custom itineraries, accessibility programs, and more.",
};

export const revalidate = 300;

export default function FAQPage() {
  return <FAQClient />;
}
