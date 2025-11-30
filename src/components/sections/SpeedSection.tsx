import React from 'react';

interface SpeedSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const SpeedSection: React.FC<SpeedSectionProps> = () => {
  const steps = [
    {
      number: '1',
      title: 'You finish talking.',
      description: 'Vuen detects it instantly.',
      colorClass: 'primary-cyan'
    },
    {
      number: '2',
      title: 'It starts pulling your data',
      description: 'before the AI even decides what to say. Your documents, exports, and tables are already warm.',
      colorClass: 'deep-indigo'
    },
    {
      number: '3',
      title: 'The AI chooses the right visual.',
      description: 'It calls the chart/map/flow tool using data that\'s already in memory.',
      colorClass: 'accent-magenta'
    },
    {
      number: '4',
      title: 'The answer appears as soon as the sentence starts.',
      description: 'You get visuals in under a second, not after everyone has checked their phones.',
      colorClass: 'primary-cyan'
    }
  ];

  const getColorStyles = (colorClass: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      'primary-cyan': {
        bg: 'bg-primary-cyan/20',
        border: 'border-primary-cyan/40',
        text: 'text-primary-cyan',
        glow: 'hover:glass-glow-cyan'
      },
      'deep-indigo': {
        bg: 'bg-deep-indigo/20',
        border: 'border-deep-indigo/40',
        text: 'text-deep-indigo',
        glow: 'hover:shadow-glow-indigo'
      },
      'accent-magenta': {
        bg: 'bg-accent-magenta/20',
        border: 'border-accent-magenta/40',
        text: 'text-accent-magenta',
        glow: 'hover:glass-glow-magenta'
      }
    };
    return colors[colorClass] || colors['primary-cyan'];
  };

  return (
    <section className="py-24 px-4 bg-void relative z-10" aria-label="Speed Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-text-primary">Everyone else waits on data. </span>
            <span className="heading-gradient">
              You don't.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Other tools wait for the AI to ask for data, then go hunting. That's why you stare at spinners.{' '}
            <span className="text-primary-cyan font-semibold text-glow-cyan">Vuen cheats.</span>
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary-cyan via-deep-indigo to-accent-magenta hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const styles = getColorStyles(step.colorClass);
              return (
                <div
                  key={index}
                  className={`flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`glass-panel p-6 ${styles.glow} transition-all duration-300 inline-block max-w-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      <h3 className="text-xl font-bold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Number circle */}
                  <div className="relative flex-shrink-0 hidden md:flex">
                    <div className={`w-16 h-16 rounded-full ${styles.bg} border-2 ${styles.border} flex items-center justify-center z-10 backdrop-blur-sm`}>
                      <span className={`text-2xl font-bold ${styles.text}`}>{step.number}</span>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Closer Line */}
        <div className="mt-16 text-center">
          <div className="glass-panel-elevated p-8 inline-block">
            <p className="text-xl md:text-2xl font-bold text-text-primary">
              This is the difference between{' '}
              <span className="text-text-muted">"we'll follow up"</span>{' '}
              and{' '}
              <span className="text-primary-cyan text-glow-cyan">"let's decide right now."</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;
