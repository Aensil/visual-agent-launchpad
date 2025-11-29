import React, { lazy, Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

// Lazy load non-critical components
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const LanguageSwitcher = lazy(() => import('@/components/LanguageSwitcher'));

const Index: React.FC = () => {
  const { currentLanguage } = useLanguage();

  return (
    <>
      <SEO language={currentLanguage} />

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Language Switcher */}
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>

        {/* Main Content */}
        <main>
          <HeroSection />

          {/* CTA Section */}
          <Suspense fallback={<div className="py-16 bg-black" />}>
            <CTASection />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={<div className="py-12 bg-black" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
