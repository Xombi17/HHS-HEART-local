import Hero from "@/components/landing/Hero";
import FeatureHighlights from "@/components/landing/FeatureHighlights";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CtaSection from "@/components/landing/CtaSection";
import SectionDivider from "@/components/common/SectionDivider";
import { Suspense } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";

// Lazy loading placeholder for sections
const SectionPlaceholder = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Suspense fallback={<SectionPlaceholder />}>
        <AnimatedSection animation="fadeIn" threshold={0.1} triggerOnce={true}>
          <Hero />
        </AnimatedSection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <AnimatedSection animation="fadeIn" threshold={0.1} triggerOnce={true}>
          <FeatureHighlights />
        </AnimatedSection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <SectionDivider from="from-gray-900" to="to-gray-900" height="h-0" wave={false} />
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <AnimatedSection animation="fadeIn" threshold={0.1} triggerOnce={true}>
          <StatsSection />
        </AnimatedSection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <AnimatedSection animation="fadeIn" threshold={0.1} triggerOnce={true}>
          <TestimonialSection />
        </AnimatedSection>
      </Suspense>
      
      <Suspense fallback={<SectionPlaceholder />}>
        <AnimatedSection animation="fadeIn" threshold={0.1} triggerOnce={true}>
          <CtaSection />
        </AnimatedSection>
      </Suspense>
    </main>
  );
}
