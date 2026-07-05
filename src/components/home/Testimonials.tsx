import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  const shown = testimonials.slice(0, 3);

  return (
    <section className="section-padding bg-cream">
      <div className="container-site">
        <div className="text-center mb-14">
          <SectionLabel className="justify-center mb-3" color="sage">Testimonials</SectionLabel>
          <h2 className="heading-lg text-charcoal mb-4">
            Families Who Took the Leap
          </h2>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Real stories from real families who planned their best trips yet
            using The Able Guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shown.map((t) => (
            <div key={t.id} className="card-base p-8 flex flex-col relative">
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-terra-100 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-terra fill-terra" />
                ))}
              </div>

              <p className="font-display text-lg italic text-charcoal leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-terra-100 flex items-center justify-center shrink-0">
                  <span className="text-terra-700 text-sm font-medium">{t.avatarInitials}</span>
                </div>
                <div>
                  <p className="font-medium text-charcoal text-sm">{t.name}</p>
                  <p className="text-charcoal-muted text-xs">{t.location}</p>
                </div>
              </div>

              {t.guideTitle && (
                <p className="mt-3 text-xs text-dust-700 font-medium">
                  ↳ {t.guideTitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
