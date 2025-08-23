
import React, { useEffect, useState, useMemo } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DemoTeaserSection from '@/components/sections/DemoTeaserSection';
import TechnologySection from '@/components/sections/TechnologySection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import CustomCursor from '@/components/CustomCursor';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

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
        <LanguageSwitcher />
        
        {/* Custom cursor effect */}
        <CustomCursor 
          cursorPosition={cursorPosition}
          prefersReducedMotion={prefersReducedMotion}
        />
        
        {/* Interactive background */}
        <ParticleBackground />
        
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
          <FeaturesSection 
            hasScrolled={hasScrolled}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Demo Teaser Section - Interactive preview */}
          <DemoTeaserSection hasScrolled={hasScrolled} />

          {/* Technology Section - Technical details */}
          <TechnologySection />

          {/* Final CTA Section - Conversion */}
          <CTASection />
        </main>

        {/* Footer - Company information and links */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
