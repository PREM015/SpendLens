import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ToolLogosSection } from '@/components/landing/ToolLogosSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import { ROICalculatorSlider } from '@/components/landing/ROICalculatorSlider';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ROICalculatorSlider />
      <HowItWorksSection />
      <ToolLogosSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
