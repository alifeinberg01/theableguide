import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, CheckCircle, ArrowLeft, ShoppingCart, Gift } from "lucide-react";
import { guides, getGuideBySlug } from "@/data/guides";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import BuyButton from "@/components/guides/BuyButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [{ url: guide.coverImage, alt: guide.coverImageAlt }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const isFree = guide.price === "free";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-0 bg-navy overflow-hidden">
        <div className="container-site py-12">
          <Link href="/guides" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.tags.map((t) => (
                  <Badge key={t} color="teal">{t}</Badge>
                ))}
              </div>

              <h1 className="heading-lg text-white mb-3">{guide.title}</h1>
              <p className="text-white/70 body-md mb-6">{guide.subtitle}</p>

              <div className="flex items-center gap-4 text-sm text-white/55 mb-8">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {guide.readTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" /> {guide.destination}
                </span>
              </div>

              {/* Pricing CTA */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm">Guide Price</p>
                    <p className="font-display font-bold text-3xl text-white">
                      {formatPrice(guide.price)}
                    </p>
                  </div>
                  {!isFree && (
                    <div className="text-right">
                      <p className="text-white/60 text-xs">Lifetime updates included</p>
                      <p className="text-sage text-sm font-semibold">30-day guarantee</p>
                    </div>
                  )}
                </div>

                {isFree ? (
                  <Link href="/free-guide" className="btn-primary w-full justify-center py-4 text-base">
                    <Gift className="w-4 h-4" /> Download Free Guide
                  </Link>
                ) : (
                  <BuyButton
                    guideId={guide.id}
                    stripePriceId={guide.stripePriceId!}
                    title={guide.title}
                    price={guide.price as number}
                  />
                )}
              </div>
            </div>

            {/* Cover image */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={guide.coverImage}
                alt={guide.coverImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40V20C360 0 720 40 1080 20C1260 10 1380 28 1440 32V40H0Z" fill="#FEFDF8" />
        </svg>
      </section>

      {/* Body */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="heading-md text-navy mb-4">About This Guide</h2>
                <p className="body-md text-charcoal-muted">{guide.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="heading-md text-navy mb-4">What You&apos;ll Learn</h2>
                <ul className="space-y-3">
                  {guide.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                      <span className="text-charcoal">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              {guide.sections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="heading-md text-navy">{section.title}</h2>
                  <p className="body-md text-charcoal-muted">{section.content}</p>

                  {section.image && (
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-card my-6">
                      <Image
                        src={section.image}
                        alt={section.imageAlt || section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  )}

                  {section.tips && section.tips.length > 0 && (
                    <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6">
                      <p className="font-semibold text-teal-700 text-sm uppercase tracking-wider mb-3">
                        Pro Tips
                      </p>
                      <ul className="space-y-2">
                        {section.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-sm text-charcoal">
                            <span className="text-teal mt-0.5">→</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What's Included */}
              <div className="card-base p-6">
                <h3 className="font-display font-semibold text-navy text-lg mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {guide.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm text-charcoal">
                      <CheckCircle className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sticky Buy Box */}
              <div className="card-base p-6 border-2 border-terra/20 sticky top-24">
                <p className="font-display font-bold text-3xl text-navy mb-1">
                  {formatPrice(guide.price)}
                </p>
                <p className="text-charcoal-muted text-sm mb-6">
                  One-time purchase · Lifetime updates
                </p>

                {isFree ? (
                  <Link href="/free-guide" className="btn-primary w-full justify-center py-3">
                    <Gift className="w-4 h-4" /> Get Free Guide
                  </Link>
                ) : (
                  <BuyButton
                    guideId={guide.id}
                    stripePriceId={guide.stripePriceId!}
                    title={guide.title}
                    price={guide.price as number}
                  />
                )}

                <p className="text-center text-xs text-charcoal-muted mt-3">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
