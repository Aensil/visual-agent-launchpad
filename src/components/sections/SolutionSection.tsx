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
      <div className="max-w-6xl mx-auto">
        {/* Two-column layout for visual variety */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Text content */}
          <div className="lg:text-left text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-text-primary">Vuen is your </span>
              <span className="heading-gradient">
                Visual Data Agent.
              </span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              You talk to a 3D orb, and it does the one thing none of your BI tools can:{' '}
              <span className="text-primary-cyan font-semibold text-glow-cyan">it keeps up with you.</span>
            </p>
          </div>

          {/* Right: Mini orb visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-48 h-48 md:w-56 md:h-56 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-cyan/20 via-deep-indigo/15 to-accent-magenta/10 blur-2xl animate-orb-breathe" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta shadow-orb-idle" />
              <div className="absolute inset-12 rounded-full bg-void/70 backdrop-blur-sm border border-primary-cyan/20 flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest text-primary-cyan uppercase">AI Agent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars - horizontal cards */}
        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:glass-glow-cyan transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-deep-indigo/20 border border-primary-cyan/20 flex items-center justify-center flex-shrink-0 text-primary-cyan group-hover:from-primary-cyan/30 group-hover:to-deep-indigo/30 group-hover:border-primary-cyan/40 transition-all duration-300">
                  {pillar.icon}
                </div>

                <div>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-cyan transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
