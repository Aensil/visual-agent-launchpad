import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 px-6">
      <div className="relative max-w-4xl mx-auto">
        {/* Honest metrics for a product in public beta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
          <div className="text-center sm:border-r sm:border-white/8 sm:pr-6 lg:pr-12">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-cyan to-deep-indigo bg-clip-text text-transparent mb-2">
              &lt;2s
            </div>
            <div className="text-sm text-white/50">{t('socialProof.queriesProcessed')}</div>
          </div>
          <div className="text-center sm:border-r sm:border-white/8 sm:pr-6 lg:pr-12">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-cyan to-deep-indigo bg-clip-text text-transparent mb-2">
              6
            </div>
            <div className="text-sm text-white/50">{t('socialProof.fasterDecisions')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-cyan to-deep-indigo bg-clip-text text-transparent mb-2">
              0
            </div>
            <div className="text-sm text-white/50">{t('socialProof.uptimeSLA')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
