import React, { useEffect, useState, useRef } from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();

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
      className="relative min-h-[100svh] landscape:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
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
            {t('hero.badge')}
          </span>
        </div>

        {/* Main Headline - Clear value proposition */}
        <h1
          className={`
            text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-bold tracking-tight leading-[0.95]
            mb-6
            transition-all duration-700 delay-100 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            fontSize: 'clamp(2.25rem, 5vw + 1rem, 6rem)',
          }}
        >
          <span className="block text-white">
            {t('hero.headline1')}
          </span>
          <span
            className="block mt-2 bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            {t('hero.headline2')}
          </span>
        </h1>

        {/* Subheadline - specific value prop */}
        <p
          className={`
            text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 font-light
            max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12
            leading-relaxed
            transition-all duration-700 delay-200 ease-out
            [text-wrap:balance]
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {t('hero.subheadline')}
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
            href={domains.app}
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
              {t('common.startFree')}
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
              group flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:py-4
              text-white/70 hover:text-white
              transition-colors duration-300
              border border-white/10 sm:border-transparent rounded-full sm:rounded-none
            "
          >
            <span
              className="
                flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
                rounded-full border border-white/20
                group-hover:border-white/40 group-hover:bg-white/5
                transition-all duration-300
              "
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-medium text-sm sm:text-base">{t('common.watchDemo')}</span>
          </a>
        </div>

        {/* Product Preview - Real Dashboard Screenshot */}
        <div
          className={`
            relative max-w-5xl mx-auto
            transition-all duration-1000 delay-500 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}
          `}
          style={{
            transform: prefersReducedMotion
              ? 'perspective(1000px)'
              : `perspective(1000px) rotateX(${mousePosition.y * -3}deg) rotateY(${mousePosition.x * 3}deg)`,
            transition: 'transform 0.3s ease-out, opacity 1s ease-out',
          }}
        >
          {/* Subtle glow effect behind */}
          <div
            className="
              absolute -inset-4 rounded-3xl
              bg-gradient-to-r from-primary-cyan/20 via-deep-indigo/20 to-accent-magenta/20
              blur-3xl opacity-40
            "
          />

          {/* Main product container */}
          <div
            className="
              relative rounded-2xl overflow-hidden
              border border-white/10
              bg-void-surface/90
              shadow-2xl
            "
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-void/60 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/40 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  app.vuen.ai
                </div>
              </div>
            </div>

            {/* Dashboard layout */}
            <div className="relative p-4 sm:p-6 min-h-[280px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[520px] bg-[#0a0c14]">
              {/* Sidebar - hidden on mobile */}
              <div className="hidden sm:flex absolute left-0 top-0 bottom-0 w-14 md:w-16 bg-void/50 border-r border-white/5 flex-col items-center py-4 gap-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary-cyan/20 flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-primary-cyan/60" />
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5" />
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5" />
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5" />
              </div>

              {/* Main content area */}
              <div className="sm:ml-16 md:ml-20">
                {/* Voice input indicator */}
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 rounded-xl bg-white/[0.03] border border-primary-cyan/20">
                    {/* Microphone icon with pulse */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary-cyan/30 rounded-full animate-ping" />
                      <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-cyan/20 flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                    {/* Voice waveform - fewer bars on mobile */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[3, 5, 8, 12, 8, 5, 3].map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 sm:w-1 bg-primary-cyan/60 rounded-full animate-pulse"
                          style={{
                            height: `${h * 1.5}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                      <div className="hidden sm:flex items-center gap-1">
                        {[6, 10, 6, 4].map((h, i) => (
                          <div
                            key={i + 7}
                            className="w-1 bg-primary-cyan/60 rounded-full animate-pulse"
                            style={{
                              height: `${h * 2}px`,
                              animationDelay: `${(i + 7) * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-white/70 ml-1 sm:ml-2 truncate">"Compare Q3 revenue..."</span>
                    <span className="hidden md:inline text-sm text-white/70">"Compare Q3 revenue by region with last year"</span>
                  </div>
                </div>

                {/* Charts grid - stacked on mobile, 2-col on tablet, 3-col on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Main chart - full width on mobile, 2-col span on larger */}
                  <div className="sm:col-span-2 p-3 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">Revenue by Region</div>
                        <div className="text-[10px] sm:text-xs text-white/40">Q3 2024 vs Q3 2023</div>
                      </div>
                      <div className="flex gap-1.5 sm:gap-2">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs bg-primary-cyan/20 text-primary-cyan">2024</span>
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs bg-white/10 text-white/50">2023</span>
                      </div>
                    </div>
                    {/* Bar chart */}
                    <div className="flex items-end justify-between h-20 sm:h-28 md:h-32 gap-2 sm:gap-3 mt-3 sm:mt-4">
                      {[
                        { label: 'NA', h1: 85, h2: 70 },
                        { label: 'EU', h1: 72, h2: 65 },
                        { label: 'APAC', h1: 90, h2: 55 },
                        { label: 'LATAM', h1: 45, h2: 40 },
                      ].map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex gap-0.5 sm:gap-1 items-end justify-center h-16 sm:h-24 md:h-28">
                            <div
                              className="w-3 sm:w-4 md:w-5 bg-primary-cyan/70 rounded-t"
                              style={{ height: `${d.h1}%` }}
                            />
                            <div
                              className="w-3 sm:w-4 md:w-5 bg-white/20 rounded-t"
                              style={{ height: `${d.h2}%` }}
                            />
                          </div>
                          <span className="text-[8px] sm:text-[10px] text-white/40">{d.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side metrics - horizontal scroll on mobile, stacked on larger */}
                  <div className="flex sm:flex-col gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
                    <div className="flex-shrink-0 w-[140px] sm:w-auto p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] sm:text-xs text-white/40 mb-1">Total Revenue</div>
                      <div className="text-lg sm:text-2xl font-bold text-white">$4.2M</div>
                      <div className="text-[10px] sm:text-xs text-green-400 mt-1">+23% YoY</div>
                    </div>
                    <div className="flex-shrink-0 w-[140px] sm:w-auto p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] sm:text-xs text-white/40 mb-1">Top Region</div>
                      <div className="text-base sm:text-lg font-semibold text-white">APAC</div>
                      <div className="text-[10px] sm:text-xs text-primary-cyan mt-1">+63% growth</div>
                    </div>
                    <div className="flex-shrink-0 w-[160px] sm:w-auto p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] sm:text-xs text-white/40 mb-1 sm:mb-2">AI Insight</div>
                      <div className="text-[10px] sm:text-xs text-white/70 leading-relaxed">
                        APAC outperformance driven by enterprise deals.
                      </div>
                    </div>
                  </div>
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
          <span className="text-[10px] text-white/30 uppercase tracking-widest">{t('hero.scroll')}</span>
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

    </section>
  );
};

export default HeroSection;
