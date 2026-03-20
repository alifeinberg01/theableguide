import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const featured = blogPosts.filter((p) => p.featured).slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="section-padding section-gradient">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <SectionLabel className="mb-3" color="navy">From the Blog</SectionLabel>
            <h2 className="heading-lg text-navy">Tips, Stories & Insights</h2>
          </div>
          <Link href="/blog" className="text-navy font-semibold text-sm flex items-center gap-1 hover:text-terra transition-colors">
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group card-base card-hover overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${i === 0 ? "h-56" : "h-44"}`}>
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge color="terra">{post.category}</Badge>
                  <span className="text-charcoal-muted text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime} min
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg text-navy mb-2 group-hover:text-terra transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-charcoal-muted text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <p className="text-xs text-charcoal-muted">{formatDate(post.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
