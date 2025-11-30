import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

const TestimonialsSection: React.FC = () => {
  const { t, tArray } = useTranslation();
  const testimonials = tArray<Testimonial>('testimonials.items');

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary-cyan font-medium tracking-wide uppercase mb-4">
            {t('testimonials.sectionLabel')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="
                p-6 rounded-2xl
                bg-white/[0.02] border border-white/[0.06]
                hover:bg-white/[0.03] hover:border-white/10
                transition-all duration-300
              "
            >
              {/* Metric badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan text-xs font-medium mb-4">
                {testimonial.metric}
              </div>

              {/* Quote */}
              <blockquote className="text-white/70 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <span className="text-sm font-medium text-white/60">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonial.author}</div>
                  <div className="text-xs text-white/40">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 pt-12 border-t border-white/[0.04]">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">{t('testimonials.trustBadges.soc2')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm">{t('testimonials.trustBadges.gdpr')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{t('testimonials.trustBadges.uptime')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{t('testimonials.trustBadges.sso')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
