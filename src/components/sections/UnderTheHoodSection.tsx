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
    <section className="py-24 px-4 bg-black relative z-10" aria-label="Under The Hood Section">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">This isn't a slide. </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              It's a running product.
            </span>
          </h2>
        </div>

        {/* Tech Points */}
        <div className="space-y-4 mb-12">
          {techPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-electric-cyan/20 flex items-center justify-center flex-shrink-0 text-electric-cyan">
                {point.icon}
              </div>
              <p className="text-white/80 leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* One Line */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-semibold text-white">
            You're not betting on a prototype.{' '}
            <span className="text-electric-cyan">You're plugging into an engine that's already alive.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnderTheHoodSection;
