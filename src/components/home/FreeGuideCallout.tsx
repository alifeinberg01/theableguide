import Link from "next/link";
import Image from "next/image";
import { Gift, CheckCircle } from "lucide-react";

const perks = [
  "Pre-trip preparation strategies",
  "The sensory travel kit packing list",
  "Scripts for talking to your child about travel",
  "What to do when things go sideways",
];

export default function FreeGuideCallout() {
  return (
    <section className="section-padding bg-navy overflow-hidden relative">
      {/* Decorative blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-terra/15 blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-2 mb-6">
              <Gift className="w-4 h-4 text-amber" />
              <span className="text-amber text-xs font-semibold tracking-wide uppercase">
                100% Free — No Credit Card Required
              </span>
            </div>

            <h2 className="heading-lg text-white mb-4">
              Start Here: Our Free
              <br />
              <span className="text-amber-300">Sensory Travel Starter Guide</span>
            </h2>

            <p className="text-white/75 body-md mb-8">
              Not sure where to begin? This free guide gives you the foundation —
              preparation strategies, a sensory kit packing list, and honest advice
              for your family's first adventure.
            </p>

            <ul className="space-y-3 mb-10">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                  <span className="text-sm">{perk}</span>
                </li>
              ))}
            </ul>

            <Link href="/free-guide" className="btn bg-terra text-white hover:bg-terra-700 px-8 py-4 text-base rounded-full font-semibold inline-flex items-center gap-2 shadow-lg">
              <Gift className="w-4 h-4" />
              Download the Free Guide
            </Link>
          </div>

          {/* Right — Mockup Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/free-guide-preview.jpg"
                alt="Preview of the Sensory-Friendly Travel Starter Guide — a family at an outdoor destination"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              {/* Overlay pill */}
              <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
                <p className="font-display font-bold text-navy text-sm leading-tight">
                  Sensory-Friendly Travel Starter Guide
                </p>
                <p className="text-charcoal-muted text-xs mt-1">25+ pages · Free forever</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
