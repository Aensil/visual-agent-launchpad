import React from 'react';

interface PersistenceSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const PersistenceSection: React.FC<PersistenceSectionProps> = () => {
  const features = [
    {
      title: 'One-click save',
      description: 'You\'re in the middle of a discussion, you see a powerful view, you tap Keep. Done.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )
    },
    {
      title: 'A library of real moments',
      description: 'Your dashboards are just the best answers you\'ve seen, organized in a simple grid.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      title: 'Smart labels',
      description: 'Numbers show up as $45K, $1.2M, 42.3%, 5.3M – clean, readable, and scaled for real humans, not analysts squinting at raw values.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 bg-black relative z-10" aria-label="Persistence Section">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">You don't "build dashboards." </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              You save the good moments.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Every time Vuen shows something useful, you hit <span className="text-electric-cyan font-semibold">Keep</span>. That's it. No configuration hell.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-electric-cyan/50 transition-all duration-300 group text-center"
            >
              <div className="w-14 h-14 rounded-full bg-electric-cyan/20 flex items-center justify-center mx-auto mb-4 text-electric-cyan group-hover:bg-electric-cyan/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm inline-block max-w-3xl">
            <p className="text-xl md:text-2xl text-white">
              Your "BI stack" becomes a set of{' '}
              <span className="text-electric-cyan font-semibold">live scenes you can reopen at any time</span>{' '}
              – not a graveyard of half-finished dashboards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersistenceSection;
