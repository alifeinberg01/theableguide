import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    title: "Pre-visit preparation",
    detail: "Social story + visual schedule (print at home)",
  },
  {
    title: "DAS Pass + arrival strategy",
    detail: "Quiet entry, orientation time, first 2 hrs",
  },
  {
    title: "Sensory break schedule",
    detail: "Quiet zones, feeling check-ins, rest plan",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-terra-50 overflow-hidden pt-[calc(72px+80px)] pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative glows */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-terra-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-sage-100/60 blur-3xl pointer-events-none" />

      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left — Copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-1.5 mb-8 shadow-card">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span className="text-charcoal-muted text-xs font-medium">
              Built by a special education teacher
            </span>
          </div>

          <h1 className="heading-xl text-charcoal mb-6">
            Travel <em className="italic text-terra">confidently</em>
            <br />
            with your child.
          </h1>

          <p className="body-lg text-charcoal-muted mb-10 max-w-xl">
            The Able Guide helps families of children with disabilities plan calm,
            predictable, and genuinely joyful trips — step by step.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/free-guide" className="btn-primary">
              ✦ Get your free guide
            </Link>
            <Link href="/guides" className="btn-secondary group">
              Browse guides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right — Sample itinerary preview */}
        <div className="relative">
          <div className="absolute -top-4 left-6 bg-white rounded-full px-4 py-2 shadow-card-hover text-xs font-medium text-charcoal flex items-center gap-2 z-10">
            <Check className="w-3.5 h-3.5 text-sage" /> Sensory-verified guides
          </div>

          <div className="card-base p-8 pt-10">
            <p className="label-tag mb-3">✈ Sample itinerary preview</p>
            <h3 className="font-display text-2xl font-medium text-charcoal mb-2">
              Disneyland: First Visit
            </h3>
            <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
              A complete sensory-friendly day guide designed for children with autism &amp; sensory needs.
            </p>

            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-terra-100 text-terra-600 flex items-center justify-center text-xs font-medium shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{step.title}</p>
                    <p className="text-xs text-charcoal-muted mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-4 right-6 bg-white rounded-full px-4 py-2 shadow-card-hover text-xs font-medium text-charcoal flex items-center gap-2">
            🧠 Visual supports included
          </div>
        </div>
      </div>
    </section>
  );
}
