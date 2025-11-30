import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

// Lazy load non-critical components
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));
const ProblemSection = lazy(() => import('@/components/sections/ProblemSection'));
const AspirationSection = lazy(() => import('@/components/sections/AspirationSection'));
const SolutionSection = lazy(() => import('@/components/sections/SolutionSection'));
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'));
const SpeedSection = lazy(() => import('@/components/sections/SpeedSection'));
const VisualizationSection = lazy(() => import('@/components/sections/VisualizationSection'));
const PersistenceSection = lazy(() => import('@/components/sections/PersistenceSection'));
const WhoItsForSection = lazy(() => import('@/components/sections/WhoItsForSection'));
const UnderTheHoodSection = lazy(() => import('@/components/sections/UnderTheHoodSection'));
const PricingSection = lazy(() => import('@/components/sections/PricingSection'));
const FounderSection = lazy(() => import('@/components/sections/FounderSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const CustomCursor = lazy(() => import('@/components/CustomCursor'));
const LanguageSwitcher = lazy(() => import('@/components/LanguageSwitcher'));

// Loading fallback component with glass styling
const SectionLoader = () => (
  <div className="py-24 px-4 bg-void min-h-[400px] flex items-center justify-center">
    <div className="skeleton w-32 h-8 rounded-lg" />
  </div>
);

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
      <SEO language={currentLanguage} page="home" />

      <div className="min-h-screen bg-void text-text-primary overflow-x-hidden relative">
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

        {/* Interactive particle background */}
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>

        {/* Subtle grid background - respects the orb as main light source */}
        <div className="fixed inset-0 futuristic-grid z-0 opacity-20" aria-hidden="true" />

        {/* Main Content */}
        <main role="main" aria-label="VUEN AI Visual Agents Landing Page">
          {/* Hero Section - Main landing area with orb */}
          <HeroSection
            isLoaded={isLoaded}
            idleTime={idleTime}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Problem Section - "This is your reality" */}
          <Suspense fallback={<SectionLoader />}>
            <ProblemSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Aspiration Section - "What you actually want" */}
          <Suspense fallback={<SectionLoader />}>
            <AspirationSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Solution Section - "What Vuen actually is" */}
          <Suspense fallback={<SectionLoader />}>
            <SolutionSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Experience Section - "How your next meeting looks" */}
          <Suspense fallback={<SectionLoader />}>
            <ExperienceSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Speed Section - "Why it doesn't lag" */}
          <Suspense fallback={<SectionLoader />}>
            <SpeedSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Visualization Section - "What you can see" */}
          <Suspense fallback={<SectionLoader />}>
            <VisualizationSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Persistence Section - "Dashboards that follow you" */}
          <Suspense fallback={<SectionLoader />}>
            <PersistenceSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Who It's For Section - Persona tiles */}
          <Suspense fallback={<SectionLoader />}>
            <WhoItsForSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Under The Hood Section - "Trust without bullshit" */}
          <Suspense fallback={<SectionLoader />}>
            <UnderTheHoodSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Pricing Section - "Early access / Invite only" */}
          <Suspense fallback={<SectionLoader />}>
            <PricingSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>

          {/* Founder Section */}
          <Suspense fallback={<SectionLoader />}>
            <FounderSection
              hasScrolled={hasScrolled}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </main>

        {/* Footer - Company information and links */}
        <Suspense fallback={<div className="py-12 bg-void min-h-[200px] flex items-center justify-center"><div className="skeleton w-32 h-8 rounded-lg" /></div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
