import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Stats row - enterprise-grade metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
          <div className="text-center sm:border-r sm:border-white/10 sm:pr-6 lg:pr-12">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">2.4M+</div>
            <div className="text-sm text-white/50">{t('socialProof.queriesProcessed')}</div>
          </div>
          <div className="text-center sm:border-r sm:border-white/10 sm:pr-6 lg:pr-12">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">47%</div>
            <div className="text-sm text-white/50">{t('socialProof.fasterDecisions')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">99.9%</div>
            <div className="text-sm text-white/50">{t('socialProof.uptimeSLA')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
