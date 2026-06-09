import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/Hero";
import { PMSuryaGharSection } from "@/components/sections/PMSuryaGhar";
import { CapacityGuideSection } from "@/components/sections/CapacityGuide";
import { CalculatorSection } from "@/components/sections/Calculator";
import { ServicesSection } from "@/components/sections/Services";
import { ComparisonSection } from "@/components/sections/Comparison";
import { WhyChooseSection } from "@/components/sections/WhyChoose";
import { GallerySection } from "@/components/sections/Gallery";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQsSection } from "@/components/sections/FAQs";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SK Shine Enterprises — Your Solar Doctor | Rooftop Solar India" },
      { name: "description", content: "Residential, commercial & industrial solar systems with PM Surya Ghar subsidy assistance. Free site survey, 25-yr warranty, expert installation." },
      { property: "og:title", content: "SK Shine Enterprises — Your Solar Doctor" },
      { property: "og:description", content: "On-Grid, Off-Grid and Hybrid rooftop solar systems. Save up to 90% on electricity bills." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      
      <PMSuryaGharSection />
      <CapacityGuideSection />
      <CalculatorSection />
      <ServicesSection />
      <ComparisonSection />
      <WhyChooseSection />
      <GallerySection />
      <BlogSection limit={6} />
      <FAQsSection />
      <ContactSection />
    </>
  );
}
