import React from 'react';

interface FounderSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const FounderSection: React.FC<FounderSectionProps> = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black to-black relative z-10" aria-label="Founder Section">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Built by someone who's </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-kinetic-magenta">
              sick of slow tools
            </span>
            <span className="text-white"> wasting strong leaders.</span>
          </h2>
        </div>

        {/* Founder Card */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electric-cyan via-neural-indigo to-kinetic-magenta p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-4xl font-bold text-electric-cyan">AE</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Abdel Enoc Silva Escobar
              </h3>
              <p className="text-electric-cyan font-medium mb-4">
                Founder, Vuen
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                I run ultramarathons for fun and build products for people who move fast. After watching smart teams paralyzed by dashboards and "AI insights" that arrive after the meeting, I decided to build the tool I wanted you to have:{' '}
                <span className="text-white font-semibold">
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
