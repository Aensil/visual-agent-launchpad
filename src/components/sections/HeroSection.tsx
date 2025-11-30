import React, { useRef, useState, useCallback } from 'react';
import CTAButton from '@/components/CTAButton';
import WaitlistModal from '@/components/WaitlistModal';

interface HeroSectionProps {
  isLoaded: boolean;
  idleTime: number;
  prefersReducedMotion: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded,
  idleTime,
  prefersReducedMotion
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handleBookDemo = useCallback(() => {
    // Scroll to pricing/contact section or open calendar
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleWatchOverview = useCallback(() => {
    // Open video modal or scroll to video
    window.open('https://www.youtube.com/watch?v=TS1T9m-HKk8', '_blank');
  }, []);

  const openWaitlistModal = useCallback(() => {
    setShowWaitlistModal(true);
  }, []);

  const closeWaitlistModal = useCallback(() => {
    setShowWaitlistModal(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-20 pb-16"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Eyebrow Text */}
      <div
        className="mb-4 transition-all duration-500 ease-out"
        style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <span className="text-sm md:text-base text-white/60 tracking-wide uppercase">
          You're making big decisions with tools that stall.
        </span>
      </div>

      {/* Main Headline */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight transition-all duration-800 relative max-w-5xl"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          transitionDelay: '100ms',
        }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-neural-indigo to-kinetic-magenta animate-gradient-cycle bg-[length:400%_100%]">
          Stop wasting meetings waiting for dashboards.
        </span>
        {!prefersReducedMotion && (
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/20 via-neural-indigo/20 to-kinetic-magenta/20 rounded-lg blur-xl opacity-50 -z-10 animate-gradient-cycle"></div>
        )}
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-4xl leading-relaxed transition-all duration-600"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '200ms',
        }}
      >
        You walk into a call with hard questions on revenue, churn, ops, and nobody can answer fast enough.
        Someone opens Power BI, someone else digs in Excel, everyone waits.
        <span className="text-electric-cyan font-semibold"> Vuen turns you into the person who asks a question out loud and gets the answer on screen in seconds</span> – chart, explanation, and next step.
      </p>

      {/* Orb with text */}
      <div
        className="relative mb-10 transition-all duration-700"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: '300ms',
        }}
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
          {/* Orb glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-cyan/40 via-neural-indigo/30 to-kinetic-magenta/40 blur-2xl animate-pulse-glow"></div>

          {/* Orb */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-electric-cyan via-neural-indigo to-kinetic-magenta opacity-80 animate-gradient-cycle bg-[length:400%_400%]"></div>

          {/* Inner glow */}
          <div className="absolute inset-8 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="text-xs md:text-sm font-bold tracking-widest text-electric-cyan">VISUAL DATA AGENT</span>
            <span className="text-[10px] md:text-xs text-white/60 mt-1 tracking-wide">TALK TO YOUR DATA</span>
          </div>

          {/* Logo */}
          <img
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png"
            alt="VUEN AI Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 z-10 opacity-90"
            width="64"
            height="64"
          />
        </div>
      </div>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row gap-4 mb-4 transition-all duration-300 ${
          idleTime > 8 && !prefersReducedMotion ? 'animate-nudge' : ''
        }`}
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '400ms',
        }}
      >
        <CTAButton
          variant="primary"
          onClick={handleBookDemo}
          className={`text-lg px-8 py-4 ${idleTime > 8 ? 'animate-attention' : ''}`}
          aria-label="Book a live demo"
        >
          Book a live demo
        </CTAButton>
        <CTAButton
          variant="secondary"
          onClick={handleWatchOverview}
          className="text-lg px-8 py-4"
          aria-label="Watch 90-second overview"
        >
          Watch 90-second overview
        </CTAButton>
      </div>

      {/* Microcopy */}
      <p
        className="text-sm text-white/40 transition-all duration-500"
        style={{
          opacity: isLoaded ? 1 : 0,
          transitionDelay: '500ms',
        }}
      >
        Built for leaders who are done babysitting dashboards.
      </p>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default HeroSection;
