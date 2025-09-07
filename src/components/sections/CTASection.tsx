import React, { useRef, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import WaitlistModal from '@/components/WaitlistModal';
import { useLanguage } from '@/hooks/useLanguage';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const { t } = useLanguage();

  const openWaitlistModal = () => {
    setShowWaitlistModal(true);
  };

  const closeWaitlistModal = () => {
    setShowWaitlistModal(false);
  };

  return (
    <section ref={sectionRef} className="relative py-16 px-4 bg-black border-t border-gray-800 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-xl mb-8 md:mb-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-electric-cyan">
            {t('cta.title')}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <CTAButton 
            variant="primary" 
            onClick={() => window.location.href = "https://real-estate.vuen.ai/"}
          >
            {t('cta.tryDemo')}
          </CTAButton>
          <CTAButton 
            variant="secondary" 
            onClick={openWaitlistModal}
          >
            {t('cta.joinWaitlist')}
          </CTAButton>
        </div>
      </div>

      {showWaitlistModal && (
        <WaitlistModal onClose={closeWaitlistModal} />
      )}
    </section>
  );
};

export default CTASection;
