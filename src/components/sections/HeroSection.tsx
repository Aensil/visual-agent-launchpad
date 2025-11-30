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
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleWatchOverview = useCallback(() => {
    window.open('https://www.youtube.com/watch?v=TS1T9m-HKk8', '_blank');
  }, []);

  const closeWaitlistModal = useCallback(() => {
    setShowWaitlistModal(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 py-24"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Eyebrow Text */}
      <div
        className={`mb-6 transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${prefersReducedMotion ? '!transition-none !opacity-100 !translate-y-0' : ''}`}
      >
        <span className="microcopy">
          You're making big decisions with tools that stall.
        </span>
      </div>

      {/* Main Headline */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight relative max-w-5xl transition-all duration-500 delay-100 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${prefersReducedMotion ? '!transition-none !opacity-100 !scale-100' : ''}`}
      >
        <span className="heading-gradient">
          Stop wasting meetings waiting for dashboards.
        </span>
        {!prefersReducedMotion && (
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-cyan/10 via-deep-indigo/10 to-accent-magenta/10 rounded-2xl blur-2xl opacity-50 -z-10" />
        )}
      </h1>

      {/* Subheadline */}
      <p
        className={`text-lg md:text-xl text-text-secondary mb-12 max-w-4xl leading-relaxed transition-all duration-500 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${prefersReducedMotion ? '!transition-none !opacity-100 !translate-y-0' : ''}`}
      >
        You walk into a call with hard questions on revenue, churn, ops, and nobody can answer fast enough.
        Someone opens Power BI, someone else digs in Excel, everyone waits.
        <span className="text-primary-cyan font-semibold"> Vuen turns you into the person who asks a question out loud and gets the answer on screen in seconds</span> – chart, explanation, and next step.
      </p>

      {/* === THE ORB === */}
      {/* The orb is the sun - the brightest element, everything else reflects its glow */}
      <div
        className={`relative mb-12 transition-all duration-700 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${prefersReducedMotion ? '!transition-none !opacity-100 !translate-y-0' : ''}`}
      >
        <div className="orb-container relative w-56 h-56 md:w-72 md:h-72 mx-auto">
          {/* Single glow layer - synchronized with orb */}
          <div
            className={`
              absolute -inset-6 rounded-full blur-2xl
              bg-gradient-to-br from-primary-cyan/30 via-deep-indigo/20 to-accent-magenta/15
              ${!prefersReducedMotion ? 'animate-orb-breathe' : 'opacity-50'}
            `}
            aria-hidden="true"
          />

          {/* Main orb gradient - single breathing animation only */}
          <div
            className={`
              absolute inset-4 rounded-full
              bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta
              shadow-orb-idle
              ${!prefersReducedMotion ? 'animate-orb-breathe' : ''}
            `}
          />

          {/* Orb inner glass core */}
          <div className="absolute inset-12 rounded-full bg-void/70 backdrop-blur-sm flex flex-col items-center justify-center border border-primary-cyan/20">
            <span className="text-xs md:text-sm font-bold tracking-widest text-primary-cyan uppercase">
              Visual Data Agent
            </span>
            <span className="text-[10px] md:text-xs text-text-muted mt-1 tracking-wide">
              Talk to your data
            </span>
          </div>

          {/* Logo centered in orb */}
          <img
            src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png"
            alt="VUEN AI Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-18 md:h-18 z-10 opacity-90"
            width="72"
            height="72"
          />

          {/* Subtle reflection/highlight at top */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 w-1/2 h-4 rounded-full bg-white/10 blur-sm"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row gap-4 mb-6 transition-all duration-500 delay-[400ms] ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${prefersReducedMotion ? '!transition-none !opacity-100 !translate-y-0' : ''} ${
          idleTime > 8 && !prefersReducedMotion ? 'animate-nudge' : ''
        }`}
      >
        <CTAButton
          variant="primary"
          onClick={handleBookDemo}
          className={`text-lg px-8 py-4 ${idleTime > 8 && !prefersReducedMotion ? 'animate-attention' : ''}`}
          aria-label="Book a live demo"
        >
          Book a live demo
        </CTAButton>
        <CTAButton
          variant="secondary"
          onClick={handleWatchOverview}
          className="text-base px-6 py-3"
          aria-label="Watch 90-second overview"
        >
          Watch 90s overview first
        </CTAButton>
      </div>

      {/* Microcopy */}
      <p
        className={`text-sm text-text-muted transition-all duration-500 delay-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${prefersReducedMotion ? '!transition-none !opacity-100' : ''}`}
      >
        Built for leaders who are done babysitting dashboards.
      </p>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 delay-[800ms] ${
          isLoaded ? 'opacity-60' : 'opacity-0'
        } ${prefersReducedMotion ? '!transition-none !opacity-60' : ''}`}
      >
        <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex justify-center pt-2">
          <div className={`w-1 h-2 bg-primary-cyan/60 rounded-full ${!prefersReducedMotion ? 'animate-bounce' : ''}`} />
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default HeroSection;
