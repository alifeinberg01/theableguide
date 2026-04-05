import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/firestore/blog";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Blog — Tips, Stories & Travel Insights",
  description:
    "Practical travel tips, real family stories, gear reviews, and destination guides for families raising children with autism and sensory differences.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getPublishedPosts();
  const [hero, ...rest] = blogPosts;

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4 text-white/60" color="teal">The Blog</SectionLabel>
          <h1 className="heading-xl text-white mb-4">Tips, Stories & Insights</h1>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Practical advice, honest accounts, and inspiration for every family
            that refuses to let a diagnosis define their adventures.
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
          {/* Featured hero post */}
          {hero && (
            <Link
              href={`/blog/${hero.slug}`}
              className="group card-base card-hover overflow-hidden grid grid-cols-1 md:grid-cols-2 mb-14"
            >
              <div className="relative h-72 md:h-full overflow-hidden">
                <Image
                  src={hero.coverImage}
                  alt={hero.coverImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge color="terra" className="mb-4 w-fit">{hero.category}</Badge>
                <h2 className="heading-md text-navy group-hover:text-terra transition-colors mb-3">
                  {hero.title}
                </h2>
                <p className="text-charcoal-muted body-md mb-6">{hero.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-charcoal-muted">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {hero.readTime} min</span>
                  <span>{formatDate(hero.publishedAt)}</span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group card-base card-hover overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge color="navy">{post.category}</Badge>
                    <span className="text-xs text-charcoal-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy group-hover:text-terra transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
                  <p className="text-xs text-charcoal-muted">{formatDate(post.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
