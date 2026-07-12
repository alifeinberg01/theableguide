import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Gift, Download } from "lucide-react";
import FreeGuideForm from "@/components/home/FreeGuideForm";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Free Guide Preview",
  description:
    "Download a free preview from our Disneyland: First Visit guide — a real sample of how every Able Guide is built, before you buy.",
};

export const revalidate = 300;

const includes = [
  "A real sample from our Disneyland: First Visit guide",
  "Pre-visit preparation: social story + visual schedule",
  "DAS pass and arrival strategy for the first 2 hours",
  "A sensory break schedule with quiet-zone planning",
  "The exact design and format of every paid guide",
  "No credit card, no obligation — just a real sample",
];

export default function FreeGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-terra pt-[calc(72px+64px)] pb-20 overflow-hidden">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-6">
                <Gift className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Free — No Credit Card Required</span>
              </div>

              <h1 className="heading-xl text-white mb-4">
                See a Real Guide
                <br />
                <em className="italic text-terra-100">Before You Buy</em>
              </h1>
              <p className="body-lg text-white/80 mb-8">
                A free preview sample from our Disneyland: First Visit guide —
                the same design, the same level of detail, the same honest
                strategy as every one of our 99 destination guides.
              </p>

              <ul className="space-y-3 mb-8">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/85">
                    <CheckCircle className="w-5 h-5 text-sage-200 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/covers/theme-park.svg"
                alt="Preview of the Disneyland: First Visit sample guide"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download form */}
      <section className="section-padding bg-cream">
        <div className="container-site max-w-xl">
          <div className="text-center mb-10">
            <SectionLabel className="justify-center mb-3" color="terra">Download Now</SectionLabel>
            <h2 className="heading-lg text-charcoal mb-3">Get Your Free Guide</h2>
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
