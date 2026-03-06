import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: t('features.voiceFirst.title'),
      description: t('features.voiceFirst.description'),
      accent: 'from-primary-cyan to-deep-indigo',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('features.realTime.title'),
      description: t('features.realTime.description'),
      accent: 'from-deep-indigo to-accent-magenta',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('features.smartViz.title'),
      description: t('features.smartViz.description'),
      accent: 'from-primary-cyan to-deep-indigo',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: t('features.connectData.title'),
      description: t('features.connectData.description'),
      accent: 'from-deep-indigo to-accent-magenta',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t('features.insights.title'),
      description: t('features.insights.description'),
      accent: 'from-primary-cyan to-deep-indigo',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('features.security.title'),
      description: t('features.security.description'),
      accent: 'from-deep-indigo to-accent-magenta',
    },
  ];

  return (
    <section id="product" className="relative py-28 sm:py-32 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Header — distinct typographic scale with section label */}
        <div className="text-center mb-20">
          <p className="text-sm text-primary-cyan font-medium tracking-wide uppercase mb-4">
            {t('nav.product')}
          </p>
          <h2
            className="font-bold text-white mb-6 tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)', lineHeight: '1.15' }}
          >
            {t('features.title')}
          </h2>
          <p className="text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features grid — improved contrast and hierarchy */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group p-7 rounded-2xl
                bg-white/[0.03] border border-white/[0.08]
                hover:bg-white/[0.05] hover:border-white/15
                transition-all duration-300
              "
            >
              {/* Icon — gradient background for visual variety */}
              <div
                className={`
                  w-11 h-11 mb-6 rounded-xl
                  flex items-center justify-center
                  bg-gradient-to-br ${feature.accent}
                  text-white opacity-80
                `}
              >
                {feature.icon}
              </div>

              {/* Content — stronger contrast */}
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Product demo embed — shows what the real UI looks like */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/TS1T9m-HKk8"
                title="Vuen AI Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <p className="text-center text-xs text-white/30 mt-4">
            {t('common.watchDemo')} — {t('hero.subheadline')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
