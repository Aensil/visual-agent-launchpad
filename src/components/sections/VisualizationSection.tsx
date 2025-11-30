import React from 'react';

interface VisualizationSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const VisualizationSection: React.FC<VisualizationSectionProps> = () => {
  const visualGroups = [
    {
      title: 'To see if you\'re on track',
      description: 'KPI cards, bullet charts, and tables that show targets vs actuals in one glance.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'primary-cyan'
    },
    {
      title: 'To see what changed',
      description: 'Line, bar, and area charts for "vs last quarter", "vs last year", "vs plan".',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      colorClass: 'deep-indigo'
    },
    {
      title: 'To see how it\'s distributed',
      description: 'Histograms and scatter plots for risk, spread, and relationships.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      colorClass: 'accent-magenta'
    },
    {
      title: 'To see where things are flowing or stuck',
      description: 'Sankey diagrams, heatmaps, and maps for funnels, budgets, supply chains, and regions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      colorClass: 'primary-cyan'
    }
  ];

  const getColorStyles = (colorClass: string) => {
    const colors: Record<string, { bg: string; text: string; hoverBg: string }> = {
      'primary-cyan': {
        bg: 'bg-primary-cyan/20',
        text: 'text-primary-cyan',
        hoverBg: 'group-hover:bg-primary-cyan/30'
      },
      'deep-indigo': {
        bg: 'bg-deep-indigo/20',
        text: 'text-deep-indigo',
        hoverBg: 'group-hover:bg-deep-indigo/30'
      },
      'accent-magenta': {
        bg: 'bg-accent-magenta/20',
        text: 'text-accent-magenta',
        hoverBg: 'group-hover:bg-accent-magenta/30'
      }
    };
    return colors[colorClass] || colors['primary-cyan'];
  };

  return (
    <section className="py-24 px-4 void-gradient relative z-10" aria-label="Visualization Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-text-primary">Everything you normally beg a dashboard for – </span>
            <span className="heading-gradient">
              on demand.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            You keep your existing data. Vuen turns it into the visuals you need mid-conversation.
          </p>
        </div>

        {/* Visual Groups */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {visualGroups.map((group, index) => {
            const styles = getColorStyles(group.colorClass);
            return (
              <div
                key={index}
                className="glass-panel p-6 hover:glass-glow-cyan transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${styles.bg} flex items-center justify-center flex-shrink-0 ${styles.text} ${styles.hoverBg} transition-colors`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-cyan transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-text-secondary">
                      {group.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center">
          <p className="text-xl md:text-2xl font-semibold text-text-secondary">
            You don't pick chart types. You ask questions.{' '}
            <span className="text-primary-cyan text-glow-cyan">Vuen picks the visual that makes the answer obvious.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisualizationSection;
