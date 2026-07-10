import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Able Guide collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "July 8, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-terra-50 pt-[calc(72px+64px)] pb-16 border-b border-border">
        <div className="container-site text-center">
          <SectionLabel className="justify-center mb-4" color="teal">Legal</SectionLabel>
          <h1 className="heading-xl text-charcoal mb-4">Privacy Policy</h1>
          <p className="body-lg text-charcoal-muted max-w-2xl mx-auto">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-site">
          <div className="prose-guide">
            <p>
              This Privacy Policy explains how The Able Guide (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, and protects information when you visit theableguide.com
              or purchase our guides and tools (together, the &quot;Site&quot;).
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect information in a few ways:</p>
            <ul>
              <li>
                <strong>Information you give us directly</strong> — your name and email address when
                you request our free starter guide, submit a custom itinerary request, contact us, or
                subscribe to our email list.
              </li>
              <li>
                <strong>Purchase information</strong> — when you buy a guide, your payment is processed
                by Stripe. We receive confirmation of your purchase and your email address for order
                delivery, but we do not receive or store your full card number.
              </li>
              <li>
                <strong>Information from our tools</strong> — details you enter into tools like the
                Accessibility Card builder or Schedule Builder (for example, a child&apos;s name,
                diagnosis-related notes, or emergency contact information) are used only to generate the
                printable output you request in your browser. We do not require an account to use these
                tools, and we do not intentionally store this information on our servers beyond what is
                needed to generate your download.
              </li>
              <li>
                <strong>Usage information</strong> — like most websites, we automatically collect basic
                technical information such as your IP address, browser type, device type, and pages
                visited, via Google Analytics and standard server logs.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Deliver the guides, tools, and services you purchase or request</li>
              <li>Send transactional emails (order confirmations, download links, receipts)</li>
              <li>Send our free starter guide and, if you opt in, occasional emails with tips and new guide announcements</li>
              <li>Respond to customer service inquiries and custom itinerary requests</li>
              <li>Understand how visitors use the Site so we can improve it</li>
              <li>Detect, prevent, and address fraud, abuse, or technical issues</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h2>3. Third-Party Services We Use</h2>
            <p>We rely on a small number of trusted third-party services to run the Site:</p>
            <ul>
              <li><strong>Stripe</strong> — payment processing. Stripe handles your payment details directly; we never see your full card number.</li>
              <li><strong>Firebase (Google)</strong> — secure storage of guide content, order records, and files you generate with our tools.</li>
              <li><strong>Resend</strong> — delivery of transactional and marketing emails.</li>
              <li><strong>Google Analytics</strong> — aggregated, anonymized website traffic analytics.</li>
            </ul>
            <p>
              Each of these providers has its own privacy policy governing how it handles data on our
              behalf. We only share the minimum information necessary for each service to perform its
              function.
            </p>

            <h2>4. Cookies</h2>
            <p>
              We use cookies and similar technologies for essential site functionality (like keeping your
              cart or checkout session working) and for analytics. You can control cookies through your
              browser settings; disabling them may affect how parts of the Site function.
            </p>

            <h2>5. Children&apos;s Privacy</h2>
            <p>
              The Site is intended for use by parents, caregivers, and adult professionals — not by
              children. We do not knowingly collect personal information directly from children under
              13. Information about a child (such as a name entered into an Accessibility Card
              template) is provided by a parent or guardian for the sole purpose of generating that
              parent&apos;s own printable tool, and is treated with the same care as any other personal
              information under this Policy. If you believe a child has provided us with personal
              information directly, please contact us and we will delete it.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain purchase and account records for as long as needed to provide our services,
              comply with legal and tax obligations, and resolve disputes. You may request deletion of
              your personal information at any time (see Section 8), subject to records we&apos;re
              required to keep for legal or accounting purposes.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We use industry-standard measures, including encrypted connections (HTTPS) and access
              controls on our Firebase database, to protect your information. No method of transmission
              or storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>8. Your Rights and Choices</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing emails at any time (every marketing email includes an unsubscribe link)</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@theableguide.com">hello@theableguide.com</a>.
            </p>

            <h2>9. International Visitors</h2>
            <p>
              The Site is operated in the United States, and information you provide will be processed
              and stored in the United States (via our service providers). By using the Site, you consent
              to this transfer and processing.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will
              update the &quot;Last updated&quot; date above. We encourage you to review this page
              periodically.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              Questions about this Privacy Policy or how we handle your information? Email us at{" "}
              <a href="mailto:hello@theableguide.com">hello@theableguide.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
