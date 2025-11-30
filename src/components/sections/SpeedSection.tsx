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
      color: 'electric-cyan'
    },
    {
      number: '2',
      title: 'It starts pulling your data',
      description: 'before the AI even decides what to say. Your documents, exports, and tables are already warm.',
      color: 'neural-indigo'
    },
    {
      number: '3',
      title: 'The AI chooses the right visual.',
      description: 'It calls the chart/map/flow tool using data that\'s already in memory.',
      color: 'kinetic-magenta'
    },
    {
      number: '4',
      title: 'The answer appears as soon as the sentence starts.',
      description: 'You get visuals in under a second, not after everyone has checked their phones.',
      color: 'electric-cyan'
    }
  ];

  return (
    <section className="py-24 px-4 bg-black relative z-10" aria-label="Speed Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Everyone else waits on data. </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-kinetic-magenta">
              You don't.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Other tools wait for the AI to ask for data, then go hunting. That's why you stare at spinners.{' '}
            <span className="text-electric-cyan font-semibold">Vuen cheats.</span>
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-cyan via-neural-indigo to-kinetic-magenta hidden md:block"></div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className={`bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-${step.color}/50 transition-all duration-300 inline-block max-w-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Number circle */}
                <div className="relative flex-shrink-0 hidden md:flex">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}/30 to-${step.color}/10 border-2 border-${step.color}/50 flex items-center justify-center z-10`}>
                    <span className={`text-2xl font-bold text-${step.color}`}>{step.number}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Closer Line */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-electric-cyan/10 via-neural-indigo/10 to-kinetic-magenta/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm inline-block">
            <p className="text-xl md:text-2xl font-bold text-white">
              This is the difference between{' '}
              <span className="text-white/50">"we'll follow up"</span>{' '}
              and{' '}
              <span className="text-electric-cyan">"let's decide right now."</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;
