"use client";

import { useState } from "react";
import { ExternalLink, BookOpen, Link2, CheckSquare, Wrench, Building2 } from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";
import { cn } from "@/lib/utils";
import type { ResourceType } from "@/types";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const typeIcons: Record<ResourceType, React.ElementType> = {
  link:         Link2,
  checklist:    CheckSquare,
  template:     BookOpen,
  tool:         Wrench,
  organization: Building2,
};

const typeColors: Record<ResourceType, "navy" | "teal" | "terra" | "sage" | "amber"> = {
  link:         "navy",
  checklist:    "teal",
  template:     "terra",
  tool:         "sage",
  organization: "amber",
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="sage">Resource Library</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Free Resources for Every Family</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Tools, links, programs, and organizations that make accessible travel easier —
            all vetted and organized in one place.
          </p>
        </div>
      </section>

      <div className="bg-navy">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </div>

      <section className="section-padding bg-cream">
        <div className="container-site">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                  activeCategory === cat
                    ? "bg-navy text-white shadow-pill"
                    : "bg-white border border-navy/15 text-charcoal hover:border-navy hover:text-navy"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type];
              const color = typeColors[resource.type];

              return (
                <div key={resource.id} className="card-base card-hover p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}/10`}>
                      <Icon className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div className="flex gap-2">
                      {resource.free && <Badge color="sage">Free</Badge>}
                      <Badge color={color}>{resource.type}</Badge>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-navy text-lg mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed flex-1 mb-4">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-navy/5 text-charcoal-muted rounded-full px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {resource.url && (
                    <a
                      href={resource.url}
                      target={resource.url.startsWith("http") ? "_blank" : undefined}
                      rel={resource.url.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-teal font-semibold text-sm hover:text-teal-700 transition-colors"
                    >
                      Visit Resource
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
