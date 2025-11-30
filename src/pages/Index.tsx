import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentLanguage } = useLanguage();

  const prefersReducedMotion = useMemo(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false, []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO language={currentLanguage} page="home" />

      <div className="min-h-screen bg-void text-white overflow-x-hidden">
        {/* Fixed Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero - Primary CTA to sign up */}
          <HeroSection
            isLoaded={isLoaded}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Social Proof - Logos and stats */}
          <SocialProofSection />

          {/* Features - What the product does */}
          <FeaturesSection />

          {/* Pricing - SaaS tiers */}
          <PricingSection />

          {/* Final CTA */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
