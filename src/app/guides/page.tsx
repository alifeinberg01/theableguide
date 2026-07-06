import type { Metadata } from "next";
import { getPublishedGuides } from "@/lib/firestore/guides";
import SectionLabel from "@/components/ui/SectionLabel";
import GuidesGrid from "@/components/guides/GuidesGrid";

export const metadata: Metadata = {
  title: "All Travel Guides",
  description:
    "Browse all sensory-friendly and accessible travel guides — theme parks, airports, cruises, and more. Written for families raising children with autism and sensory differences.",
};

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const guides = await getPublishedGuides();
  return (
    <>
      {/* Hero */}
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site">
          <SectionLabel className="mb-4" color="terra">Our Library</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4 max-w-2xl">
            Trips designed for <em className="italic text-terra">your</em> family
          </h1>
          <p className="body-lg text-charcoal-muted max-w-xl">
            Destination-specific, sensory-rated, and written for families
            who need more than a generic travel blog.
          </p>
        </div>
      </section>

      <GuidesGrid guides={guides} />
    </>
  );
}
