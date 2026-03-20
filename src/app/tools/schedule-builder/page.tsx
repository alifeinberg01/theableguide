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
      <section className="bg-navy pt-32 pb-0 overflow-hidden">
        <div className="container-site py-12 text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="sage">Free Tool</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Visual Schedule Builder</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Build a printable visual schedule for your trip. Predictability reduces
            anxiety — and a great schedule is the foundation of a great day.
          </p>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <ScheduleBuilderClient />
        </div>
      </section>
    </>
  );
}
