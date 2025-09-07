
import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

// Lazy load non-critical components
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));
const FeaturesSection = lazy(() => import('@/components/sections/FeaturesSection'));
const DemoTeaserSection = lazy(() => import('@/components/sections/DemoTeaserSection'));
const TechnologySection = lazy(() => import('@/components/sections/TechnologySection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const CustomCursor = lazy(() => import('@/components/CustomCursor'));
const LanguageSwitcher = lazy(() => import('@/components/LanguageSwitcher'));

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { currentLanguage } = useLanguage();
  
  // Check if reduced motion is preferred
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false, []
  );

  useEffect(() => {
    // Page load animation trigger
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Scroll detection
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
      setIdleTime(0); // Reset idle time on scroll
    };
    
    // Idle time tracking for CTA nudge
    const idleTimer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);
    
    // Custom cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setIdleTime(0); // Reset idle time on mouse movement
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', () => setIdleTime(0));
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(idleTimer);
    };
  }, []);
  
  return (
    <>
      {/* SEO Component - Manages all meta tags and structured data */}
      <SEO language={currentLanguage} />
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        {/* Language Switcher */}
        <Suspense fallback={<div className="fixed top-4 right-4 w-8 h-8" />}>
          <LanguageSwitcher />
        </Suspense>
        
        {/* Custom cursor effect */}
        <Suspense fallback={null}>
          <CustomCursor 
            cursorPosition={cursorPosition}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
        
        {/* Interactive background */}
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        
        {/* Additional background effects */}
        <div className="fixed inset-0 futuristic-grid z-0 opacity-30" aria-hidden="true"></div>
        
        {/* Main Content */}
        <main role="main" aria-label="VUEN AI Visual Agents Landing Page">
          {/* Hero Section - Main landing area */}
          <HeroSection 
            isLoaded={isLoaded}
            idleTime={idleTime}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Features Section - Core capabilities */}
          <Suspense fallback={<div className="py-24 px-4 bg-black min-h-[400px] flex items-center justify-center"><div className="animate-pulse bg-gray-800 w-32 h-8 rounded" /></div>}>
            <FeaturesSection 
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Demo Teaser Section - Interactive preview */}
          <Suspense fallback={<div className="py-24 px-4 bg-black min-h-[400px] flex items-center justify-center"><div className="animate-pulse bg-gray-800 w-32 h-8 rounded" /></div>}>
            <DemoTeaserSection hasScrolled={hasScrolled} />
          </Suspense>

          {/* Technology Section - Technical details */}
          <Suspense fallback={<div className="py-24 px-4 bg-black min-h-[400px] flex items-center justify-center"><div className="animate-pulse bg-gray-800 w-32 h-8 rounded" /></div>}>
            <TechnologySection />
          </Suspense>

          {/* Final CTA Section - Conversion */}
          <Suspense fallback={<div className="py-24 px-4 bg-black min-h-[200px] flex items-center justify-center"><div className="animate-pulse bg-gray-800 w-32 h-8 rounded" /></div>}>
            <CTASection />
          </Suspense>
        </main>

        {/* Footer - Company information and links */}
        <Suspense fallback={<div className="py-12 bg-black min-h-[200px] flex items-center justify-center"><div className="animate-pulse bg-gray-800 w-32 h-8 rounded" /></div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
