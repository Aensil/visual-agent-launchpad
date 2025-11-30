import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Stats row - enterprise-grade metrics */}
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-20">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">2.4M+</div>
            <div className="text-sm text-white/50">{t('socialProof.queriesProcessed')}</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">47%</div>
            <div className="text-sm text-white/50">{t('socialProof.fasterDecisions')}</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
            <div className="text-sm text-white/50">{t('socialProof.uptimeSLA')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
