import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Gift, Download } from "lucide-react";
import FreeGuideForm from "@/components/home/FreeGuideForm";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Free Sensory Travel Starter Guide",
  description:
    "Download our free Sensory-Friendly Travel Starter Guide — preparation strategies, a sensory kit packing list, and honest advice for your family's first adventure.",
};

const includes = [
  "Pre-trip preparation strategies that actually work",
  "The complete sensory travel kit packing list",
  "Scripts for preparing your child for travel",
  "How to scope out a new destination in advance",
  "What to do when things go sideways",
  "A printable visual schedule template",
  "Emergency information card template",
];

export default function FreeGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-0 overflow-hidden">
        <div className="container-site py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-2 mb-6">
                <Gift className="w-4 h-4 text-amber" />
                <span className="text-amber text-sm font-semibold">Free — No Credit Card Required</span>
              </div>

              <h1 className="heading-xl text-white mb-4">
                Your Free Sensory Travel
                <span className="text-amber-300"> Starter Guide</span>
              </h1>
              <p className="body-lg text-white/75 mb-8">
                25+ pages of practical, honest guidance for families who are new
                to traveling with a child with autism or sensory differences.
                Start here. Build from here.
              </p>

              <ul className="space-y-3 mb-8">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/free-guide-preview.jpg"
                alt="Preview of the Sensory-Friendly Travel Starter Guide"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </section>

      {/* Download form */}
      <section className="section-padding bg-cream">
        <div className="container-site max-w-xl">
          <div className="text-center mb-10">
            <SectionLabel className="justify-center mb-3" color="terra">Download Now</SectionLabel>
            <h2 className="heading-lg text-navy mb-3">Get Your Free Guide</h2>
            <p className="text-charcoal-muted">
              Enter your name and email and we&apos;ll send the guide straight to your inbox.
              No spam. Unsubscribe anytime.
            </p>
          </div>

          <FreeGuideForm />
        </div>
      </section>
    </>
  );
}
