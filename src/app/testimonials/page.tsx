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
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="terra">Family Stories</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            Real families. Real trips. <em className="italic text-terra">Real results.</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            These are the families who packed up, faced the fear, and took their kids
            into the world. We are so proud of every single one.
          </p>

          {/* Trustpilot widget (hidden until enabled) */}
          <TrustpilotWidget variant="mini" className="mt-8 max-w-sm mx-auto" />
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-cream pt-14">
        <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-5 pb-4">
          {[
            { value: "3,500+", label: "Families helped" },
            { value: "47", label: "Destinations covered" },
            { value: "98%", label: "Would travel again" },
            { value: "4.9★", label: "Average guide rating" },
          ].map((stat) => (
            <div key={stat.label} className="card-base p-6 text-center">
              <p className="font-display text-4xl font-medium text-terra mb-1">{stat.value}</p>
              <p className="text-sm text-charcoal-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-cream pt-10">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="card-base p-8 flex flex-col relative">
                <Quote className="w-8 h-8 text-terra-100 absolute top-6 right-6" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-terra fill-terra" />
                  ))}
                </div>

                <p className="font-display text-base italic text-charcoal leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center shrink-0">
                    <span className="text-terra-700 text-sm font-medium">{t.avatarInitials}</span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">{t.name}</p>
                    <p className="text-charcoal-muted text-xs">{t.location}</p>
                  </div>
                  <p className="ml-auto text-xs text-charcoal-muted">{formatDate(t.date)}</p>
                </div>

                {t.guideTitle && (
                  <p className="mt-3 text-xs text-dust-700 font-medium">↳ {t.guideTitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
