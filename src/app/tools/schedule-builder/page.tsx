import type { Metadata } from "next";
import ScheduleBuilderClient from "@/components/tools/ScheduleBuilderClient";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Visual Schedule Builder — Free Tool",
  description:
    "Build a printable visual schedule for your trip. Help your child with autism or sensory differences know what to expect, step by step.",
};

export default function ScheduleBuilderPage() {
  return (
    <>
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="sage">Free Tool</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            Visual <em className="italic text-terra">Schedule Builder</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Build a printable visual schedule for your trip. Predictability reduces
            anxiety — and a great schedule is the foundation of a great day.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <ScheduleBuilderClient />
        </div>
      </section>
    </>
  );
}
