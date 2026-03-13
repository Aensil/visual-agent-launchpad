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
        {/* Backed by programs */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-14">
          <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
            {t('socialProof.backedBy')}
          </span>
          <div className="flex items-center gap-2">
            {/* Google for Startups logo mark */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm text-white/60 font-medium">Google for Startups</span>
          </div>
          <div className="flex items-center gap-2">
            {/* NVIDIA logo mark */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M8.948 8.798v-1.43c.093-.007.187-.014.282-.014 3.053-.078 5.178 2.647 5.178 2.647s-2.346 2.963-4.873 2.963c-.21 0-.403-.021-.587-.06V9.143c1.39.091 1.67.95 2.498 2.15l1.855-1.56s-1.502-1.87-3.736-1.87c-.21 0-.414.014-.617.035zm0-3.26v1.244l.282-.021c4.108-.178 6.907 3.353 6.907 3.353s-3.196 3.834-6.525 3.834a5.03 5.03 0 01-.664-.042v1.186c.194.014.39.028.59.028 3.09 0 5.322-1.57 7.485-3.46.357.287 1.822 1.396 2.124 1.396.302 0 3.028-2.33 3.028-2.33s-1.792-3.26-3.028-3.26c-.302 0-.765.38-1.124.68-1.802-1.43-4.235-2.665-7.693-2.665-.136 0-.264.014-.382.028v.028zM8.948 14.55v1.092c-3.768-.412-4.842-4.062-4.842-4.062s1.614-1.78 4.842-2.09v1.186l-.028-.007c-1.847-.21-3.288 1.57-3.288 1.57s.828 2.011 3.316 2.311zM2.382 10.645s2.336-3.389 6.566-3.74V5.539C4.26 5.93 0 10.645 0 10.645s2.406 5.885 8.948 6.404v-1.414c-4.34-.498-6.566-4.99-6.566-4.99z" fill="#76B900"/>
            </svg>
            <span className="text-sm text-white/60 font-medium">NVIDIA Inception</span>
          </div>
        </div>

        {/* Stats */}
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
