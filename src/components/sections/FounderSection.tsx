import React from 'react';

interface FounderSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const FounderSection: React.FC<FounderSectionProps> = ({ prefersReducedMotion }) => {
  return (
    <section className="py-24 px-4 bg-void relative z-10" aria-label="Founder Section">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-text-primary">Built by someone who's </span>
            <span className="heading-gradient">
              sick of slow tools
            </span>
            <span className="text-text-primary"> wasting strong leaders.</span>
          </h2>
        </div>

        {/* Founder Card */}
        <div className="glass-panel-elevated p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar with orb-like styling */}
            <div className="flex-shrink-0 relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary-cyan/30 via-deep-indigo/20 to-accent-magenta/20 blur-xl ${!prefersReducedMotion ? 'animate-pulse-glow' : ''}`} />

              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta p-1">
                <div className="w-full h-full rounded-full bg-void flex items-center justify-center border border-primary-cyan/20">
                  <span className="text-4xl font-bold text-primary-cyan">AE</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Abdel Enoc Silva Escobar
              </h3>
              <p className="text-primary-cyan font-medium mb-4">
                Founder, Vuen
              </p>
              <p className="text-text-secondary leading-relaxed text-lg">
                I run ultramarathons for fun and build products for people who move fast. After watching smart teams paralyzed by dashboards and "AI insights" that arrive after the meeting, I decided to build the tool I wanted you to have:{' '}
                <span className="text-text-primary font-semibold">
                  a Visual Agent that makes you the sharpest person in the room, every time.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
