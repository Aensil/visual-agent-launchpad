import React from 'react';
import { domains } from '@/config/site';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 30% 80%, rgba(75, 63, 227, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 90%, rgba(255, 30, 140, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Ready to see
          <br />
          <span className="bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta bg-clip-text text-transparent">
            your data think?
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-white/50 mb-12 max-w-xl mx-auto">
          Join thousands of teams making faster, smarter decisions with Vuen.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${domains.app}/signup`}
            className="
              group relative px-10 py-5 text-lg font-semibold text-white
              rounded-full overflow-hidden
              bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              bg-[length:200%_100%] bg-left
              hover:bg-right
              transition-all duration-500 ease-out
              hover:shadow-[0_0_60px_rgba(0,212,255,0.5)]
              hover:scale-105
              active:scale-100
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <a
            href={domains.app}
            className="
              px-8 py-5 text-lg font-medium text-white/70
              hover:text-white transition-colors duration-300
            "
          >
            Sign in →
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-white/30">
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
