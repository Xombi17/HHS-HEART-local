import Hero from "@/components/landing/Hero";
import FeatureHighlights from "@/components/landing/FeatureHighlights";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CtaSection from "@/components/landing/CtaSection";
import SectionDivider from "@/components/common/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      
      <SectionDivider from="from-white" to="to-white" height="h-16" />
      
      <FeatureHighlights />
      
      <SectionDivider from="from-white" to="to-red-50" height="h-24" wave={true} />
      
      <StatsSection />
      
      <SectionDivider from="from-white" to="to-white" height="h-16" />
      
      <TestimonialSection />
      
      <SectionDivider from="from-white" to="to-white" height="h-16" />
      
      <CtaSection />
    </>
  );
}
