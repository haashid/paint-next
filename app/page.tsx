import SiteHeader from "@/components/layout/SiteHeader";
import CinematicHero from "@/components/hero/CinematicHero";
import TransitionSection from "@/components/sections/TransitionSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import QuoteSection from "@/components/sections/QuoteSection";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#F6F3ED] text-[#20231F] relative">
      {/* Navigation Header */}
      <SiteHeader />

      {/* Signature Cinematic Scroll Experience */}
      <CinematicHero />

      {/* Section Transition */}
      <TransitionSection />

      {/* Core Services */}
      <ServicesSection />

      {/* Selected Portfolio & Before/After Comparison */}
      <PortfolioSection />

      {/* Why Choose Us & Craft Principles */}
      <WhyChooseUsSection />

      {/* Client Perspectives & Craft Reflections */}
      <TestimonialsSection />

      {/* Premium Quote Request & Conversion */}
      <QuoteSection />

      {/* Architectural Site Footer */}
      <SiteFooter />
    </main>
  );
}
