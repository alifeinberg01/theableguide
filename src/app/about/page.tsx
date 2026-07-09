import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Users } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind The Able Guide — why we started, who we are, and what drives us to help families travel with confidence.",
};

export const revalidate = 300;

const values = [
  {
    icon: GraduationCap,
    title: "Founded by a Special Education Teacher",
    description:
      "The Able Guide was founded by a special education teacher with years of hands-on experience in Applied Behavior Analysis (ABA). Every schedule, script, and backup plan reflects real classroom and clinical strategy — not guesswork from a travel blog.",
    color: "bg-terra-100 text-terra-600",
  },
  {
    icon: ShieldCheck,
    title: "Honest & Independent",
    description:
      "We have no sponsorships, no affiliate relationships with parks or airlines. Our recommendations are based purely on what's best for your family.",
    color: "bg-charcoal/8 text-charcoal",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We give back by making foundational resources free and maintaining a free starter guide that any family can access regardless of budget.",
    color: "bg-sage-100 text-sage-700",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-20 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="terra">Our Story</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">
            We Started Where <em className="italic text-terra">You Are Now</em>
          </h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Staring at a browser full of generic travel blogs, wondering if there was
            anything written specifically for families like ours.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-card-hover">
              <Image
                src="/covers/general.svg"
                alt="Decorative illustration representing family travel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <SectionLabel className="mb-4" color="terra">Our Mission</SectionLabel>
              <h2 className="heading-lg text-charcoal mb-6">
                Every Family Deserves a Guide That Actually Gets It
              </h2>
              <div className="space-y-4 text-charcoal-muted body-md">
                <p>
                  The Able Guide was born from a simple, maddening truth: when you&apos;re
                  planning a trip with a child who has autism or sensory differences,
                  the information you need doesn&apos;t exist in one place. You&apos;re
                  piecing it together from Facebook groups, Reddit threads, and
                  five-year-old blog posts.
                </p>
                <p>
                  We changed that. Our guides are built from the ground up for
                  families like yours — with real sensory ratings, real DAS
                  walkthroughs, real quiet spots, and real contingency plans for
                  when things don&apos;t go as expected.
                </p>
                <p>
                  We call ourselves The Able Guide because &ldquo;able&rdquo; is about
                  capability, not limitation. Your child is able. Your family is able.
                  With the right information, you can go anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding section-gradient">
        <div className="container-site">
          <div className="text-center mb-14">
            <SectionLabel className="justify-center mb-3" color="teal">What We Stand For</SectionLabel>
            <h2 className="heading-lg text-charcoal">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.title} className="card-base p-8 flex flex-col gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${val.color}`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-charcoal text-xl mb-2">{val.title}</h3>
                  <p className="text-charcoal-muted leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal text-center">
        <div className="container-site max-w-2xl">
          <h2 className="heading-lg text-white mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-white/70 body-md mb-8">
            Start with our free guide or dive straight into the destination that&apos;s
            been on your family&apos;s list.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guides" className="btn-primary px-8 py-4 text-base">Browse All Guides</Link>
            <Link href="/free-guide" className="btn bg-white/15 border border-white/30 text-white hover:bg-white/25 rounded-full px-8 py-4 text-base font-medium">
              Get Free Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
