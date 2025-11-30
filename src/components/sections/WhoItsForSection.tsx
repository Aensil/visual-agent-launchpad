import React from 'react';

interface WhoItsForSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const WhoItsForSection: React.FC<WhoItsForSectionProps> = () => {
  const personas = [
    {
      title: 'Founder / CEO',
      description: 'You\'re tired of staring at static decks. With Vuen, you walk into your board or investor meeting and drive the conversation live, with real numbers reacting to your questions.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      colorClass: 'primary-cyan'
    },
    {
      title: 'COO / Ops Leader',
      description: 'You run daily or weekly war rooms. Instead of flipping through dashboards, you ask "Where are we leaking orders today?" and watch the problem areas light up on the map.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      colorClass: 'deep-indigo'
    },
    {
      title: 'CFO / Head of Finance',
      description: 'You live in Excel. Vuen lets you talk to those files directly: "Show me margin by product vs last year" – chart, explanation, and follow-up questions, no manual pivoting.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'accent-magenta'
    },
    {
      title: 'Head of Data / BI',
      description: 'You\'re the bottleneck for every "quick question." Vuen lets the rest of the org self-serve by voice, so your team can stop building one-off dashboards and focus on real models.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      colorClass: 'primary-cyan'
    }
  ];

  const getColorStyles = (colorClass: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hoverBg: string }> = {
      'primary-cyan': {
        bg: 'bg-primary-cyan/20',
        text: 'text-primary-cyan',
        border: 'border-primary-cyan/30',
        hoverBg: 'group-hover:bg-primary-cyan/30'
      },
      'deep-indigo': {
        bg: 'bg-deep-indigo/20',
        text: 'text-deep-indigo',
        border: 'border-deep-indigo/30',
        hoverBg: 'group-hover:bg-deep-indigo/30'
      },
      'accent-magenta': {
        bg: 'bg-accent-magenta/20',
        text: 'text-accent-magenta',
        border: 'border-accent-magenta/30',
        hoverBg: 'group-hover:bg-accent-magenta/30'
      }
    };
    return colors[colorClass] || colors['primary-cyan'];
  };

  return (
    <section className="py-24 px-4 section-gradient-magenta relative z-10" aria-label="Who Its For Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">If this is you, Vuen makes you </span>
            <span className="heading-gradient-warm">
              dangerous
            </span>
            <span className="text-text-primary"> (in a good way).</span>
          </h2>
        </div>

        {/* Persona Tiles */}
        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((persona, index) => {
            const styles = getColorStyles(persona.colorClass);
            return (
              <div
                key={index}
                className="glass-panel p-8 hover:glass-glow-cyan transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl ${styles.bg} ${styles.border} border flex items-center justify-center flex-shrink-0 ${styles.text} ${styles.hoverBg} transition-colors`}>
                    {persona.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${styles.text} mb-3`}>
                      {persona.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
