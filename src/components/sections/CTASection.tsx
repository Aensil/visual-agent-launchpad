import React from 'react';
import { domains } from '@/config/site';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 px-6">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Start making better decisions today
        </h2>

        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
          Get instant insights from your data. No setup required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={domains.app}
            className="
              group px-8 py-4 text-base font-semibold text-white
              rounded-full
              bg-primary-cyan
              hover:bg-primary-cyan/90
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]
            "
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <a
            href={`mailto:hello@vuen.ai?subject=Enterprise%20Demo%20Request`}
            className="
              px-8 py-4 text-base font-medium text-white/70
              border border-white/10 rounded-full
              hover:text-white hover:border-white/20 hover:bg-white/5
              transition-all duration-300
            "
          >
            Request Demo
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
