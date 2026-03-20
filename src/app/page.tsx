import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedGuides from "@/components/home/FeaturedGuides";
import HowItWorks from "@/components/home/HowItWorks";
import FreeGuideCallout from "@/components/home/FreeGuideCallout";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import CustomItinerary from "@/components/home/CustomItinerary";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedGuides />
      <HowItWorks />
      <FreeGuideCallout />
      <Testimonials />
      <BlogPreview />
      <CustomItinerary />
    </>
  );
}
