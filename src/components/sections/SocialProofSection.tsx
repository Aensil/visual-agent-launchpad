import React from 'react';

const SocialProofSection: React.FC = () => {
  // Placeholder company logos - these would be real customer logos
  const logos = [
    { name: 'Company 1', opacity: 0.4 },
    { name: 'Company 2', opacity: 0.4 },
    { name: 'Company 3', opacity: 0.4 },
    { name: 'Company 4', opacity: 0.4 },
    { name: 'Company 5', opacity: 0.4 },
    { name: 'Company 6', opacity: 0.4 },
  ];

  return (
    <section className="relative py-20 px-6 border-t border-white/[0.04]">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Trusted by text */}
        <p className="text-center text-sm text-white/30 font-medium tracking-wide uppercase mb-12">
          Trusted by data-driven teams
        </p>

        {/* Logo grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center
                h-8 px-6
                text-white/30 font-semibold tracking-wide
                hover:text-white/50 transition-colors duration-300
              "
            >
              {/* Placeholder - replace with actual logo images */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-white/10" />
                <span className="text-sm">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-12 mt-16 pt-12 border-t border-white/[0.04]">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">10K+</div>
            <div className="text-sm text-white/40">Queries processed</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-white/40">Active users</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">&lt;2s</div>
            <div className="text-sm text-white/40">Avg response time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
