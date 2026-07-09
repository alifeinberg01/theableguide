import Hero from "@/components/home/Hero";
import FeaturedGuides from "@/components/home/FeaturedGuides";
import HowItWorks from "@/components/home/HowItWorks";
import FreeGuideCallout from "@/components/home/FreeGuideCallout";
import BlogPreview from "@/components/home/BlogPreview";
import CustomItinerary from "@/components/home/CustomItinerary";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedGuides />
      <HowItWorks />
      <FreeGuideCallout />
      <BlogPreview />
      <CustomItinerary />
    </>
  );
}
