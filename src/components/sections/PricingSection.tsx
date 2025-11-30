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
    // Could open a calendar link or scroll to contact
    window.open('https://calendly.com', '_blank');
  }, []);

  return (
    <section id="pricing-section" className="py-24 px-4 bg-gradient-to-b from-black via-neural-indigo/5 to-black relative z-10" aria-label="Pricing Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">We only work with teams who are </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-kinetic-magenta to-neural-indigo">
              serious about using this.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            We're not selling another seat of dashboard software. We're partnering with a small number of teams who want a Visual Agent that actually runs their conversations.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Card 1 - Launch */}
          <div className="bg-gradient-to-br from-electric-cyan/10 to-neural-indigo/10 border border-electric-cyan/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-electric-cyan/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/10 rounded-full blur-3xl -z-10"></div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Launch your Visual Agent
            </h3>
            <div className="text-3xl md:text-4xl font-bold text-electric-cyan mb-4">
              From $3.5K <span className="text-lg text-white/50 font-normal">one-time</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              "We map your top 2–3 workflows, wire your files and exports into Vuen, and launch a working Visual Data Agent in 4–6 weeks."
            </p>
          </div>

          {/* Card 2 - Keep Alive */}
          <div className="bg-gradient-to-br from-neural-indigo/10 to-kinetic-magenta/10 border border-neural-indigo/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neural-indigo/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neural-indigo/10 rounded-full blur-3xl -z-10"></div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Keep your Agent alive
            </h3>
            <div className="text-3xl md:text-4xl font-bold text-neural-indigo mb-4">
              From $200<span className="text-lg text-white/50 font-normal">/month</span>
            </div>
            <p className="text-white/70 leading-relaxed">
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
            aria-label="Apply for early access"
          >
            Apply for early access
          </CTAButton>
          <CTAButton
            variant="secondary"
            onClick={handleSanityCheck}
            className="text-base px-6 py-3"
            aria-label="Book a 20-minute sanity check"
          >
            Not sure yet? Book a 20-minute sanity check
          </CTAButton>
        </div>

        {/* Microcopy */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/40 italic">
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
