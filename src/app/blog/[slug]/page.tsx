import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPublishedPosts, getPostBySlug } from "@/lib/firestore/blog";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface Props { params: Promise<{ slug: string }> }

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Convert markdown-like content to simple HTML paragraphs
  const paragraphs = post.content.trim().split("\n\n");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[calc(72px+48px)] bg-terra pb-12 overflow-hidden">
        <div className="container-site max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <Badge color="teal" className="mb-4">{post.category}</Badge>
          <h1 className="heading-xl text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-cream pt-0">
        <div className="container-site max-w-4xl -mt-4">
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-card-hover mb-12">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Post body */}
          <article className="prose-guide">
            <p className="body-lg text-charcoal-light italic mb-8">{post.excerpt}</p>
            {paragraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return <h2 key={i}>{para.replace("## ", "")}</h2>;
              }
              if (para.startsWith("### ")) {
                return <h3 key={i}>{para.replace("### ", "")}</h3>;
              }
              if (para.startsWith("---")) {
                return <hr key={i} className="border-border my-8" />;
              }
              // Bullet list with no leading label text
              if (para.startsWith("- ")) {
                const items = para.split("\n- ").map((item) => item.replace(/^- /, ""));
                return <ul key={i}>{items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
              }
              // Bullet list with a label line before the bullets
              if (para.includes("\n- ")) {
                const [label, ...items] = para.split("\n- ");
                return (
                  <div key={i}>
                    {label && <p>{label}</p>}
                    <ul>{items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                  </div>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <Badge key={tag} color="navy">{tag}</Badge>
            ))}
          </div>

          {/* Back */}
          <div className="mt-10">
            <Link href="/blog" className="btn-outline">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Section padding bottom */}
      <div className="bg-cream pb-20" />
    </>
  );
}
