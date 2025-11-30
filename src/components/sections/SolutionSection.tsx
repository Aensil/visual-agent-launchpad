import React from 'react';

interface SolutionSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const SolutionSection: React.FC<SolutionSectionProps> = () => {
  const pillars = [
    {
      title: 'Voice-First',
      description: 'You speak like a human. No SQL, no search bar, no training videos.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: 'Instant Visualization',
      description: 'While everyone else is still opening a dashboard, you already have a live chart, map, or flow on the screen.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Verbal Explanation',
      description: 'The AI tells you what changed, why it matters, and offers the next question before anyone can say "let me check."',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 section-gradient-cyan relative z-10" aria-label="Solution Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">Vuen is your </span>
            <span className="heading-gradient">
              Visual Data Agent.
            </span>
          </h2>
        </div>

        {/* One-liner */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            You talk to a 3D orb, and it does the one thing none of your BI tools can:{' '}
            <span className="text-primary-cyan font-semibold text-glow-cyan">it keeps up with you.</span>
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Card */}
              <div className="glass-panel p-8 h-full hover:glass-glow-cyan transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-deep-indigo/20 border border-primary-cyan/20 flex items-center justify-center mb-6 text-primary-cyan group-hover:from-primary-cyan/30 group-hover:to-deep-indigo/30 group-hover:border-primary-cyan/40 transition-all duration-300">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary-cyan transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Glow effect on hover - respects orb hierarchy */}
              <div className="absolute inset-0 rounded-glass bg-primary-cyan/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
