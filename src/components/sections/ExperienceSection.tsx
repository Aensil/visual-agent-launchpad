import React from 'react';

interface ExperienceSectionProps {
  hasScrolled?: boolean;
  prefersReducedMotion?: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-electric-cyan/5 to-black relative z-10" aria-label="Experience Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Your next revenue review, with a </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
              Visual Agent.
            </span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - The Movie */}
          <div className="space-y-6">
            {/* First interaction */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-electric-cyan/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">You say:</p>
                  <p className="text-white text-lg font-medium">"How's revenue this quarter?"</p>
                </div>
              </div>

              <div className="ml-14 space-y-3">
                <p className="text-white/70 text-sm font-medium">What happens:</p>
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-electric-cyan mt-1">→</span>
                    <span>A line chart flashes onto the screen: <span className="text-electric-cyan font-semibold">$2.4M, up 15%</span> vs last quarter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-cyan mt-1">→</span>
                    <span>December glows at <span className="text-electric-cyan font-semibold">$850K</span>, clearly the peak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-cyan mt-1">→</span>
                    <span>A transcript panel shows: <em className="text-white/80">"Revenue hit $2.4M this quarter, up 15%. December was strongest at $850K. Source: Q4_Report.xlsx. Want this by region or forecast?"</em></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second interaction */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-neural-indigo/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neural-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Then you say:</p>
                  <p className="text-white text-lg font-medium">"Break it down by region."</p>
                </div>
              </div>

              <div className="ml-14 space-y-3">
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-neural-indigo mt-1">→</span>
                    <span>The chart morphs into a <span className="text-neural-indigo font-semibold">bar chart by region</span>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neural-indigo mt-1">→</span>
                    <span>The Visual Agent calls out: <em className="text-white/80">"North is leading with $1.2M. West is lagging at $320K."</em></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - The Punchline */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-electric-cyan/10 via-neural-indigo/10 to-kinetic-magenta/10 border border-white/20 rounded-2xl p-10 backdrop-blur-sm">
              {/* Visual representation */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-electric-cyan via-neural-indigo to-kinetic-magenta opacity-80 animate-gradient-cycle bg-[length:400%_400%]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-black/60 flex items-center justify-center">
                    <svg className="w-10 h-10 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-white font-bold text-center leading-relaxed">
                You look like the only person in the room who came prepared –{' '}
                <span className="text-electric-cyan">even though you didn't touch a single dashboard.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
