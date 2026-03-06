import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: t('socialProof.stat1Value'), label: t('socialProof.stat1Label') },
    { value: t('socialProof.stat2Value'), label: t('socialProof.stat2Label') },
    { value: t('socialProof.stat3Value'), label: t('socialProof.stat3Label') },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="relative max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${i < 2 ? 'sm:border-r sm:border-white/8 sm:pr-6 lg:pr-12' : ''}`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-cyan to-deep-indigo bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
