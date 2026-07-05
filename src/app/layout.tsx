import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Able Guide — Travel Guides for Families with Special Needs",
    template: "%s | The Able Guide",
  },
  description:
    "Expert travel guides for families raising children with autism, sensory differences, and other disabilities. Theme parks, airports, cruises, and more — planned for every family.",
  keywords: [
    "autism travel",
    "sensory friendly travel",
    "disability travel guide",
    "Disney World autism",
    "DAS guide",
    "accessible family travel",
    "autism theme park",
    "sensory processing travel",
  ],
  authors: [{ name: "The Able Guide" }],
  creator: "The Able Guide",
  metadataBase: new URL("https://theableguide.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theableguide.com",
    siteName: "The Able Guide",
    title: "The Able Guide — Travel for Every Family",
    description:
      "Expert travel guides for families raising children with autism, sensory differences, and other disabilities.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Able Guide — Travel for Every Family",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Able Guide — Travel for Every Family",
    description:
      "Expert travel guides for families raising children with autism, sensory differences, and other disabilities.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C4714A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
