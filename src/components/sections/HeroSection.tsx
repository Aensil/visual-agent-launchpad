import React, { useEffect, useState, useRef } from 'react';
import { domains } from '@/config/site';

interface HeroSectionProps {
  isLoaded: boolean;
  idleTime?: number;
  prefersReducedMotion: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded,
  prefersReducedMotion
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 20%, rgba(75, 63, 227, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 30% 30%, rgba(255, 30, 140, 0.08) 0%, transparent 50%)
          `,
          transform: prefersReducedMotion
            ? 'none'
            : `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 mb-8
            rounded-full border border-white/10 bg-white/[0.03]
            backdrop-blur-sm
            transition-all duration-700 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-cyan"></span>
          </span>
          <span className="text-sm text-white/60 font-medium">
            Now in Public Beta
          </span>
        </div>

        {/* Main Headline - Apple style large typography */}
        <h1
          className={`
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-bold tracking-tight leading-[0.95]
            mb-6
            transition-all duration-700 delay-100 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <span className="block text-white">
            Talk to your data.
          </span>
          <span
            className="block mt-2 bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            See it think.
          </span>
        </h1>

        {/* Subheadline - concise */}
        <p
          className={`
            text-lg sm:text-xl md:text-2xl text-white/50 font-light
            max-w-2xl mx-auto mb-12
            leading-relaxed
            transition-all duration-700 delay-200 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          AI that visualizes your business data in real-time.
          <br className="hidden sm:block" />
          Ask anything. Get instant charts, insights, actions.
        </p>

        {/* CTAs - prominent Start Free */}
        <div
          className={`
            flex flex-col sm:flex-row items-center justify-center gap-4 mb-16
            transition-all duration-700 delay-300 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <a
            href={`${domains.app}/signup`}
            className="
              group relative px-8 py-4 text-lg font-semibold text-white
              rounded-full overflow-hidden
              bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              bg-[length:200%_100%] bg-left
              hover:bg-right
              transition-all duration-500 ease-out
              hover:shadow-[0_0_50px_rgba(0,212,255,0.5)]
              hover:scale-105
              active:scale-100
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="https://www.youtube.com/watch?v=TS1T9m-HKk8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-3 px-6 py-4
              text-white/70 hover:text-white
              transition-colors duration-300
            "
          >
            <span
              className="
                flex items-center justify-center w-12 h-12
                rounded-full border border-white/20
                group-hover:border-white/40 group-hover:bg-white/5
                transition-all duration-300
              "
            >
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-medium">Watch Demo</span>
          </a>
        </div>

        {/* Product Preview - Hero Visual */}
        <div
          className={`
            relative max-w-4xl mx-auto
            transition-all duration-1000 delay-500 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}
          `}
          style={{
            transform: prefersReducedMotion
              ? 'perspective(1000px)'
              : `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`,
            transition: 'transform 0.3s ease-out, opacity 1s ease-out',
          }}
        >
          {/* Glow effect behind */}
          <div
            className="
              absolute -inset-4 rounded-3xl
              bg-gradient-to-r from-primary-cyan/30 via-deep-indigo/30 to-accent-magenta/30
              blur-3xl opacity-50
            "
          />

          {/* Main product container */}
          <div
            className="
              relative rounded-2xl overflow-hidden
              border border-white/10
              bg-void-surface/80 backdrop-blur-xl
              shadow-2xl
            "
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-void/50 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/30">
                  app.vuen.ai
                </div>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative p-6 min-h-[400px] sm:min-h-[500px]">
              {/* Orb - central AI visualization */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  {/* Outer glow rings */}
                  <div
                    className={`
                      absolute -inset-8 rounded-full
                      bg-gradient-to-r from-primary-cyan/20 to-accent-magenta/20
                      ${!prefersReducedMotion ? 'animate-pulse' : ''}
                      blur-2xl
                    `}
                  />
                  <div
                    className={`
                      absolute -inset-4 rounded-full
                      bg-gradient-to-r from-primary-cyan/30 to-deep-indigo/30
                      ${!prefersReducedMotion ? 'animate-pulse' : ''}
                      blur-xl
                    `}
                    style={{ animationDelay: '0.5s' }}
                  />

                  {/* Main orb */}
                  <div
                    className={`
                      absolute inset-0 rounded-full
                      bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta
                      ${!prefersReducedMotion ? 'animate-gradient-cycle' : ''}
                    `}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  {/* Inner glass */}
                  <div className="absolute inset-3 rounded-full bg-void/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-[10px] sm:text-xs font-semibold text-primary-cyan tracking-wider uppercase">
                        Ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI elements - charts */}
              <div
                className={`
                  absolute top-8 left-8 p-4 rounded-xl
                  bg-white/[0.03] border border-white/10 backdrop-blur-sm
                  ${!prefersReducedMotion ? 'animate-float-slow' : ''}
                `}
              >
                <div className="w-32 h-20 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary-cyan/60 to-primary-cyan/20 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-white/40">Revenue</div>
              </div>

              {/* Floating metric card */}
              <div
                className={`
                  absolute top-12 right-8 p-4 rounded-xl
                  bg-white/[0.03] border border-white/10 backdrop-blur-sm
                  ${!prefersReducedMotion ? 'animate-float-slow' : ''}
                `}
                style={{ animationDelay: '1s' }}
              >
                <div className="text-2xl font-bold text-white">+47%</div>
                <div className="text-[10px] text-status-success">MRR Growth</div>
              </div>

              {/* Voice query indicator */}
              <div
                className={`
                  absolute bottom-8 left-1/2 -translate-x-1/2
                  flex items-center gap-3 px-6 py-3 rounded-full
                  bg-white/[0.05] border border-white/10 backdrop-blur-sm
                  ${!prefersReducedMotion ? 'animate-float-slow' : ''}
                `}
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-1 bg-primary-cyan rounded-full ${!prefersReducedMotion ? 'animate-soundwave' : 'h-3'}`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: prefersReducedMotion ? '12px' : undefined,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">"Show me churn by cohort"</span>
              </div>

              {/* Bottom insight card */}
              <div
                className={`
                  absolute bottom-24 right-8 max-w-[200px] p-4 rounded-xl
                  bg-white/[0.03] border border-white/10 backdrop-blur-sm
                  ${!prefersReducedMotion ? 'animate-float-slow' : ''}
                `}
                style={{ animationDelay: '1.5s' }}
              >
                <div className="text-[10px] text-accent-magenta font-medium mb-1">Insight</div>
                <div className="text-xs text-white/60">
                  Q3 cohorts show 23% lower churn than Q2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-700 delay-[1500ms] ease-out
          ${isLoaded ? 'opacity-50' : 'opacity-0'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
          <div
            className={`
              w-5 h-8 rounded-full border border-white/20
              flex justify-center pt-2
            `}
          >
            <div
              className={`
                w-1 h-2 rounded-full bg-white/40
                ${!prefersReducedMotion ? 'animate-bounce' : ''}
              `}
            />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes soundwave {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
        .animate-soundwave {
          animation: soundwave 1s ease-in-out infinite;
        }
        @keyframes gradient-cycle {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-cycle {
          animation: gradient-cycle 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
