import React from 'react';

interface UnderTheHoodSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const UnderTheHoodSection: React.FC<UnderTheHoodSectionProps> = () => {
  const techPoints = [
    {
      text: 'Built on FastAPI, Vite, WebGL (Three.js), and OpenAI Realtime – already serving live traffic.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      text: 'Your files are isolated per tenant in their own storage and vector stores. No cross-contamination.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      text: 'Every upload, query, and visualization runs through a quota system so the platform stays fast and predictable instead of collapsing when people actually use it.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 bg-void relative z-10" aria-label="Under The Hood Section">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">This isn't a slide. </span>
            <span className="heading-gradient">
              It's a running product.
            </span>
          </h2>
        </div>

        {/* Tech Points */}
        <div className="space-y-4 mb-12">
          {techPoints.map((point, index) => (
            <div
              key={index}
              className="glass-panel p-5 flex items-start gap-4 hover:glass-glow-cyan transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-cyan/20 border border-primary-cyan/30 flex items-center justify-center flex-shrink-0 text-primary-cyan group-hover:bg-primary-cyan/30 transition-colors">
                {point.icon}
              </div>
              <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* One Line */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-semibold text-text-primary">
            You're not betting on a prototype.{' '}
            <span className="text-primary-cyan text-glow-cyan">You're plugging into an engine that's already alive.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnderTheHoodSection;
