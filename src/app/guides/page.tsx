import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag, Filter } from "lucide-react";
import { getPublishedGuides } from "@/lib/firestore/guides";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "All Travel Guides",
  description:
    "Browse all sensory-friendly and accessible travel guides — theme parks, airports, cruises, and more. Written for families raising children with autism and sensory differences.",
};

const categories = [
  { id: "all",           label: "All Guides" },
  { id: "theme-park",   label: "Theme Parks" },
  { id: "airport",      label: "Airports & Flying" },
  { id: "cruise",       label: "Cruises" },
  { id: "resort",       label: "Resorts" },
  { id: "national-park",label: "National Parks" },
];

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const guides = await getPublishedGuides();
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="teal">Our Library</SectionLabel>
          <h1 className="heading-xl text-white mb-4">All Travel Guides</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Destination-specific, sensory-rated, and written for families
            who need more than a generic travel blog.
          </p>
        </div>
      </section>

      {/* Wave */}
      <div className="bg-navy">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </div>

      {/* Guides Grid */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border border-navy/15 text-charcoal cursor-pointer hover:border-navy hover:text-navy transition-colors shadow-pill"
              >
                {cat.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group card-base card-hover overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={guide.coverImage}
                    alt={guide.coverImageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    {guide.price === "free" ? (
                      <span className="badge bg-sage text-white">Free</span>
                    ) : (
                      <span className="badge bg-white/95 text-navy shadow-pill">
                        {formatPrice(guide.price)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {guide.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} color="teal">{tag}</Badge>
                    ))}
                  </div>

                  <h2 className="font-display font-semibold text-lg text-navy mb-2 group-hover:text-terra transition-colors line-clamp-2">
                    {guide.title}
                  </h2>
                  <p className="text-charcoal-muted text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-navy/8">
                    <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {guide.readTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> {guide.destination}
                      </span>
                    </div>
                    <span className="text-terra font-semibold text-sm flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
