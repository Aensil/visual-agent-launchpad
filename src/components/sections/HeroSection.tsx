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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-20 pb-16"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Eyebrow Text */}
      <div
        className="mb-6 transition-all duration-500 ease-out"
        style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <span className="microcopy">
          You're making big decisions with tools that stall.
        </span>
      </div>

      {/* Main Headline */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight transition-all duration-800 relative max-w-5xl"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          transitionDelay: '100ms',
        }}
      >
        <span className="heading-gradient bg-[length:400%_100%] animate-gradient-cycle">
          Stop wasting meetings waiting for dashboards.
        </span>
        {!prefersReducedMotion && (
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-cyan/10 via-deep-indigo/10 to-accent-magenta/10 rounded-2xl blur-2xl opacity-50 -z-10" />
        )}
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-12 max-w-4xl leading-relaxed transition-all duration-600"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '200ms',
        }}
      >
        You walk into a call with hard questions on revenue, churn, ops, and nobody can answer fast enough.
        Someone opens Power BI, someone else digs in Excel, everyone waits.
        <span className="text-primary-cyan font-semibold"> Vuen turns you into the person who asks a question out loud and gets the answer on screen in seconds</span> – chart, explanation, and next step.
      </p>

      {/* === THE ORB === */}
      {/* The orb is the sun - the brightest element, everything else reflects its glow */}
      <div
        className="relative mb-12 transition-all duration-700"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: '300ms',
        }}
      >
        <div className="orb-container relative w-56 h-56 md:w-72 md:h-72 mx-auto">
          {/* Outer glow layer - largest, most diffuse */}
          <div
            className={`
              absolute -inset-8 rounded-full blur-3xl
              bg-gradient-to-br from-primary-cyan/30 via-deep-indigo/20 to-accent-magenta/20
              ${!prefersReducedMotion ? 'animate-pulse-glow' : ''}
            `}
            aria-hidden="true"
          />

          {/* Secondary glow ring */}
          <div
            className={`
              absolute -inset-4 rounded-full blur-xl
              bg-gradient-to-br from-primary-cyan/40 via-deep-indigo/30 to-transparent
              ${!prefersReducedMotion ? 'animate-glow-breathe' : ''}
            `}
            aria-hidden="true"
          />

          {/* Main orb gradient - animated */}
          <div
            className={`
              absolute inset-4 rounded-full
              bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta
              bg-[length:400%_400%]
              shadow-orb-idle
              ${!prefersReducedMotion ? 'animate-gradient-cycle animate-orb-breathe' : ''}
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
        className={`flex flex-col sm:flex-row gap-4 mb-6 transition-all duration-300 ${
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
          className={`text-lg px-8 py-4 ${idleTime > 8 && !prefersReducedMotion ? 'animate-attention' : ''}`}
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
        className="text-sm text-text-muted transition-all duration-500"
        style={{
          opacity: isLoaded ? 1 : 0,
          transitionDelay: '500ms',
        }}
      >
        Built for leaders who are done babysitting dashboards.
      </p>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: isLoaded ? 0.6 : 0,
          transitionDelay: '800ms',
        }}
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
