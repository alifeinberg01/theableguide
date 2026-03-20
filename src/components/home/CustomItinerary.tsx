import Link from "next/link";
import Image from "next/image";
import { ClipboardList, Clock, CheckCircle, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const features = [
  "Day-by-day schedule tailored to your child's profile",
  "Attraction picks matched to their sensory needs",
  "Accommodation & dining recommendations",
  "Contingency plans for hard moments",
  "Delivered in 5–7 business days",
];

export default function CustomItinerary() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-[480px] shadow-card-hover">
              <Image
                src="/images/custom-itinerary-planning.jpg"
                alt="Family reviewing a detailed travel plan together at home"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-5 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal" />
                </div>
                <p className="font-semibold text-navy text-sm">Delivered in 5–7 days</p>
              </div>
              <p className="text-charcoal-muted text-xs leading-relaxed">
                Tell us about your child and your destination. We'll handle the rest.
              </p>
            </div>
          </div>

          {/* Copy side */}
          <div>
            <SectionLabel className="mb-3" color="terra">Custom Itineraries</SectionLabel>
            <h2 className="heading-lg text-navy mb-4">
              Your Trip, Planned by
              <br />
              <span className="text-terra">People Who Understand</span>
            </h2>
            <p className="body-md text-charcoal-muted mb-8">
              Every child is different. A custom itinerary goes beyond our pre-written
              guides — it's a plan built specifically around your child's sensory profile,
              your family's travel experience, and your destination's unique challenges.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                  <span className="text-charcoal text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/custom" className="btn-primary px-8 py-4 text-base group">
                Order Custom Itinerary
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/custom#faq" className="btn-ghost text-sm px-6 py-4">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
