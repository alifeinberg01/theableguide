import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { formatDate } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustpilotWidget from "@/components/trust/TrustpilotWidget";

export const metadata: Metadata = {
  title: "Testimonials — Real Families, Real Stories",
  description:
    "Read what families say about The Able Guide. Real reviews from parents who traveled with confidence using our accessible travel guides.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="terra">Testimonials</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Families Who Took the Leap</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Real stories from real families — parents who used The Able Guide
            to plan trips they once thought impossible.
          </p>

          {/* Trustpilot widget (hidden until enabled) */}
          <TrustpilotWidget variant="mini" className="mt-8 max-w-sm mx-auto" />
        </div>
      </section>

      <div className="bg-navy">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </div>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="card-base p-8 flex flex-col relative">
                <Quote className="w-8 h-8 text-navy/8 absolute top-6 right-6" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber fill-amber" />
                  ))}
                </div>

                <p className="text-charcoal-light text-sm leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-navy/8">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-semibold">{t.avatarInitials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-charcoal-muted text-xs">{t.location}</p>
                  </div>
                  <p className="ml-auto text-xs text-charcoal-muted">{formatDate(t.date)}</p>
                </div>

                {t.guideTitle && (
                  <p className="mt-3 text-xs text-teal font-medium">↳ {t.guideTitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
