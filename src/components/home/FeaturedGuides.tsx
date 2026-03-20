import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { guides } from "@/data/guides";
import { formatPrice } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const featured = guides.filter((g) => g.featured).slice(0, 3);

export default function FeaturedGuides() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionLabel className="justify-center mb-3">Our Guides</SectionLabel>
          <h2 className="heading-lg text-navy mb-4">
            The Guides Every Family Is Talking About
          </h2>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Written by parents who've been there, reviewed by occupational therapists,
            and field-tested at the world's most popular destinations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((guide) => (
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
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Price pill */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-pill">
                  <span className="font-semibold text-navy text-sm">
                    {formatPrice(guide.price)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} color="teal">{tag}</Badge>
                  ))}
                </div>

                <h3 className="heading-sm text-navy mb-2 group-hover:text-terra transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-charcoal-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-navy/8">
                  <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {guide.destination}
                    </span>
                  </div>
                  <span className="text-terra font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All guides CTA */}
        <div className="text-center">
          <Link href="/guides" className="btn-outline">
            View All Guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
