import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of The Able Guide's website and digital travel guides.",
};

const LAST_UPDATED = "July 8, 2026";

export default function TermsPage() {
  return (
    <>
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="teal">Legal</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">Terms of Service</h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="prose-guide">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website
              located at theableguide.com (the &quot;Site&quot;) and the digital travel guides, tools,
              and related content offered by The Able Guide (&quot;The Able Guide,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). By visiting the Site, creating an account, or purchasing
              a guide, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
            </p>

            <h2>1. Who We Are</h2>
            <p>
              The Able Guide creates sensory-friendly and accessibility-focused travel guides for
              families of children with autism, sensory processing differences, and other disabilities.
              Our content is written from an educational and personal-experience perspective and is
              intended to help families plan and prepare for travel.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old, or the age of legal majority in your jurisdiction, to
              purchase a guide or use our paid services. The Site is intended for use by parents,
              caregivers, and travel planning professionals — not by children.
            </p>

            <h2>3. Digital Products and Purchases</h2>
            <p>
              Our guides, printable tools, and related materials are sold as digital downloads
              (typically PDF files) delivered electronically after purchase. When you buy a guide:
            </p>
            <ul>
              <li>Payment is processed securely through Stripe. We do not store your full payment card details.</li>
              <li>You will receive access to download your guide immediately, or by email, after your payment is confirmed.</li>
              <li>You are purchasing a personal-use license to the content, not the content itself (see Section 5, Intellectual Property).</li>
              <li>Prices are listed in U.S. dollars and are subject to change without notice for future purchases.</li>
            </ul>

            <h2>4. Refunds and Guarantee</h2>
            <p>
              We offer a 30-day money-back guarantee on guide purchases. If a guide isn&apos;t a good
              fit for your family, contact us at{" "}
              <a href="mailto:hello@theableguide.com">hello@theableguide.com</a> within 30 days of
              purchase and we&apos;ll issue a refund. Because our products are digital and delivered
              instantly, we reserve the right to decline refund requests made outside this window or
              in cases of suspected abuse (for example, repeated purchase-and-refund of the same
              content).
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All guides, text, graphics, templates, logos, and other content on the Site are owned by
              The Able Guide or its licensors and are protected by copyright and other intellectual
              property laws. When you purchase a guide, we grant you a limited, non-exclusive,
              non-transferable license to download and use it for your own family&apos;s personal,
              non-commercial travel planning.
            </p>
            <p>You may not:</p>
            <ul>
              <li>Resell, redistribute, or share purchased guides or printable tools with people outside your immediate family or household.</li>
              <li>Post, upload, or otherwise make guide content publicly available online.</li>
              <li>Modify, reproduce, or create derivative works from our content for commercial purposes.</li>
              <li>Use our name, logo, or branding without written permission.</li>
            </ul>

            <h2>6. Not Medical, Legal, or Behavioral-Health Advice</h2>
            <p>
              Our guides include general travel-planning strategies, behavior-support tools, and
              accessibility information drawn from personal and professional experience, including
              applied behavior analysis (ABA) concepts. This content is provided for informational and
              educational purposes only. It is not a substitute for individualized medical, psychological,
              behavioral, legal, or professional advice. Every child and family is different — always
              consult your child&apos;s physician, therapist, BCBA, or other qualified professional before
              making decisions about your child&apos;s care, medication (including any sleep aids or
              supplements mentioned in our materials), or behavior plan.
            </p>

            <h2>7. Accuracy of Destination Information</h2>
            <p>
              We make a good-faith effort to keep destination details (accessibility policies, program
              names such as DAS, ride accommodations, hours, and similar information) accurate and
              current at the time of writing. However, theme parks, airports, cruise lines, resorts, and
              other venues change their policies and offerings without notice. Always confirm
              accessibility accommodations, program requirements, and current procedures directly with
              the venue before you travel. The Able Guide is not responsible for changes made by
              third-party venues after a guide&apos;s publication date.
            </p>

            <h2>8. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
              <li>Attempt to gain unauthorized access to any part of the Site, other accounts, or our systems.</li>
              <li>Interfere with or disrupt the Site&apos;s functionality or security.</li>
              <li>Use automated means (bots, scrapers) to access or copy Site content without our permission.</li>
            </ul>

            <h2>9. Third-Party Services and Links</h2>
            <p>
              The Site uses third-party services, including Stripe for payment processing, Firebase for
              data storage, and Resend for transactional email. The Site may also link to third-party
              websites (such as official park, airline, or cruise line accessibility pages). We are not
              responsible for the content, policies, or practices of any third-party service or website.
            </p>

            <h2>10. Disclaimer of Warranties</h2>
            <p>
              The Site and our guides are provided &quot;as is&quot; and &quot;as available,&quot;
              without warranties of any kind, express or implied, including implied warranties of
              merchantability, fitness for a particular purpose, or non-infringement. We do not
              guarantee that your trip will be free of meltdowns, delays, or unexpected challenges, or
              that any accommodation request will be granted by a third-party venue.
            </p>

            <h2>11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Able Guide and its founder will not be liable
              for any indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits or revenues, arising out of or related to your use of the Site or our guides. Our
              total liability for any claim arising from these Terms or your purchase will not exceed the
              amount you paid for the guide or service giving rise to the claim.
            </p>

            <h2>12. Indemnification</h2>
            <p>
              You agree to indemnify and hold The Able Guide harmless from any claims, damages, or
              expenses (including reasonable attorneys&apos; fees) arising from your violation of these
              Terms or your misuse of the Site or our content.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will
              update the &quot;Last updated&quot; date above. Your continued use of the Site after
              changes are posted constitutes acceptance of the revised Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the United States and the state in which The
              Able Guide operates, without regard to conflict-of-law principles.
            </p>

            <h2>15. Contact Us</h2>
            <p>
              Questions about these Terms? Email us at{" "}
              <a href="mailto:hello@theableguide.com">hello@theableguide.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
