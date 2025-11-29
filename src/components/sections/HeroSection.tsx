import React, { useState, useCallback } from 'react';
import CTAButton from '@/components/CTAButton';
import WaitlistModal from '@/components/WaitlistModal';
import { useTranslation } from '@/hooks/useTranslation';

const HeroSection: React.FC = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const { t } = useTranslation();

  const handleTryDemoClick = useCallback(() => {
    window.location.href = "https://real-estate.vuen.ai/";
  }, []);

  const openWaitlistModal = useCallback(() => {
    setShowWaitlistModal(true);
  }, []);

  const closeWaitlistModal = useCallback(() => {
    setShowWaitlistModal(false);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png"
          alt="VUEN AI Logo"
          className="w-24 h-24 mx-auto"
          width="96"
          height="96"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan via-neural-indigo to-kinetic-magenta">
          {t('hero.title')}
        </span>
      </h1>

      <p className="text-xl md:text-2xl mb-8 text-gray-300">
        {t('hero.subtitle')}
      </p>

      {/* Demo Video */}
      <div className="mb-10 w-full max-w-4xl">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/TS1T9m-HKk8?autoplay=1&mute=1&playsinline=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="rounded-lg"
          allowFullScreen
          title="VUEN AI Demo Video"
          loading="lazy"
        />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        <CTAButton
          variant="primary"
          onClick={handleTryDemoClick}
        >
          {t('hero.tryDemo')}
        </CTAButton>
        <CTAButton
          variant="secondary"
          onClick={openWaitlistModal}
        >
          {t('hero.joinWaitlist')}
        </CTAButton>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default HeroSection;
