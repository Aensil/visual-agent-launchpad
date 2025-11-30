import React, { useState, useCallback } from 'react';
import CTAButton from '@/components/CTAButton';
import WaitlistModal from '@/components/WaitlistModal';

interface PricingSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const openWaitlistModal = useCallback(() => {
    setShowWaitlistModal(true);
  }, []);

  const closeWaitlistModal = useCallback(() => {
    setShowWaitlistModal(false);
  }, []);

  const handleSanityCheck = useCallback(() => {
    window.open('https://calendly.com', '_blank');
  }, []);

  return (
    <section id="pricing-section" className="py-24 px-4 void-gradient relative z-10" aria-label="Pricing Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-text-primary">We only work with teams who are </span>
            <span className="heading-gradient-warm">
              serious about using this.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            We're not selling another seat of dashboard software. We're partnering with a small number of teams who want a Visual Agent that actually runs their conversations.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Card 1 - Launch (Featured) */}
          <div className="glass-panel-elevated p-8 relative overflow-hidden group hover:glass-glow-cyan transition-all duration-300 border-2 border-primary-cyan/30 ring-1 ring-primary-cyan/10">
            {/* Featured badge */}
            <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary-cyan/20 text-primary-cyan rounded-full border border-primary-cyan/30">
              Start here
            </div>

            {/* Glow accent - stronger for featured */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-cyan/15 rounded-full blur-3xl -z-10 group-hover:bg-primary-cyan/25 transition-colors" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-deep-indigo/10 rounded-full blur-3xl -z-10" />

            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Launch your Visual Agent
            </h3>
            <div className="text-3xl md:text-4xl font-bold text-primary-cyan mb-4">
              From $3.5K <span className="text-lg text-text-muted font-normal">one-time</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              "We map your top 2–3 workflows, wire your files and exports into Vuen, and launch a working Visual Data Agent in 4–6 weeks."
            </p>
          </div>

          {/* Card 2 - Keep Alive */}
          <div className="glass-panel p-8 relative overflow-hidden group hover:glass-glow-cyan transition-all duration-300">
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-deep-indigo/10 rounded-full blur-3xl -z-10 group-hover:bg-deep-indigo/20 transition-colors" />

            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Keep your Agent alive
            </h3>
            <div className="text-3xl md:text-4xl font-bold text-deep-indigo mb-4">
              From $200<span className="text-lg text-text-muted font-normal">/month</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              "Your team keeps using Vuen every day. We keep tuning it, adding workflows, and keeping it fast."
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <CTAButton
            variant="primary"
            onClick={openWaitlistModal}
            className="text-lg px-8 py-4"
            aria-label="Book a live demo"
          >
            Book a live demo
          </CTAButton>
          <CTAButton
            variant="secondary"
            onClick={handleSanityCheck}
            className="text-base px-6 py-3"
            aria-label="Quick 20-min call first"
          >
            Quick 20-min call first
          </CTAButton>
        </div>

        {/* Microcopy */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted italic">
            We say no if we don't think we can make you look noticeably sharper in your meetings.
          </p>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default PricingSection;
