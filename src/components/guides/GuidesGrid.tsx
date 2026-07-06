"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { Guide, GuideCategory } from "@/types";

const categories: { id: GuideCategory | "all"; label: string }[] = [
  { id: "all",            label: "All Guides" },
  { id: "theme-park",     label: "Theme Parks" },
  { id: "airport",        label: "Airports & Flying" },
  { id: "cruise",         label: "Cruises" },
  { id: "resort",         label: "Resorts" },
  { id: "national-park",  label: "National Parks" },
];

export default function GuidesGrid({ guides }: { guides: Guide[] }) {
  const [active, setActive] = useState<GuideCategory | "all">("all");

  const filtered = active === "all" ? guides : guides.filter((g) => g.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="bg-white border-b border-border py-5 sticky top-[72px] z-40">
        <div className="container-site flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                active === cat.id
                  ? "bg-terra border-terra text-white"
                  : "bg-transparent border-border text-charcoal-muted hover:bg-terra hover:border-terra hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          <p className="text-sm text-charcoal-muted mb-6">
            {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((guide) => (
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
                      <span className="badge bg-white/95 text-charcoal shadow-pill">
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

                  <h2 className="font-display font-medium text-lg text-charcoal mb-2 group-hover:text-terra transition-colors line-clamp-2">
                    {guide.title}
                  </h2>
                  <p className="text-charcoal-muted text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {guide.readTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> {guide.destination}
                      </span>
                    </div>
                    <span className="text-terra font-medium text-sm flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-charcoal-muted py-16">
              No guides in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
