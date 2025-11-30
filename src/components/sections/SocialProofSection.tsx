import React from 'react';

const SocialProofSection: React.FC = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Stats row - enterprise-grade metrics */}
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-20">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">2.4M+</div>
            <div className="text-sm text-white/50">Queries processed monthly</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">47%</div>
            <div className="text-sm text-white/50">Faster decision-making</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
            <div className="text-sm text-white/50">Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
