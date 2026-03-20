import { Search, Download, MapPin, Smile } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find Your Destination",
    description:
      "Browse our library of guides by destination, park type, or accessibility need. Not sure where to start? Our free starter guide lays the foundation.",
    color: "bg-navy/10 text-navy",
  },
  {
    icon: Download,
    step: "02",
    title: "Download Your Guide",
    description:
      "Purchase securely via Stripe. Your guide is delivered instantly as a PDF with printable maps, sensory ratings, and day-by-day itineraries.",
    color: "bg-teal/10 text-teal-700",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Plan with Confidence",
    description:
      "Use your guide to pre-register for DAS, prep your sensory kit, set realistic expectations, and build a trip your whole family will enjoy.",
    color: "bg-terra/10 text-terra-700",
  },
  {
    icon: Smile,
    step: "04",
    title: "Travel & Make Memories",
    description:
      "Walk into your destination knowing exactly what to expect. Focus on your family — not the logistics. The hard part is already done.",
    color: "bg-sage/10 text-sage-700",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding section-gradient">
      <div className="container-site">
        <div className="text-center mb-14">
          <SectionLabel className="justify-center mb-3" color="teal">How It Works</SectionLabel>
          <h2 className="heading-lg text-navy mb-4">
            From Overwhelmed to Fully Prepared
          </h2>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            We've designed the simplest possible path from "we want to travel"
            to "we just had the best trip of our lives."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%_-_1rem)] w-8 h-px bg-navy/15 z-10" />
              )}

              <div className="card-base p-6 h-full">
                {/* Step number + icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold text-3xl text-navy/20">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
