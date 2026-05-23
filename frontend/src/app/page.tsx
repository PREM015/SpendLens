import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ToolLogosSection } from '@/components/landing/ToolLogosSection';
import { FAQSection } from '@/components/landing/FAQSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ToolLogosSection />
      <FAQSection />
    </>
  );
}
