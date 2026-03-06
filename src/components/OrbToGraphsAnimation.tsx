import React, { useState, useEffect, useCallback, useRef } from 'react';
import OrbCanvas from '@/components/OrbCanvas';

interface OrbToGraphsAnimationProps {
  prefersReducedMotion: boolean;
  isLoaded: boolean;
}

type Phase = 'orb' | 'listening' | 'transition' | 'dashboard' | 'returning';

const PHASE_DURATIONS: Record<Phase, number> = {
  orb: 2200,
  listening: 2800,
  transition: 900,
  dashboard: 4500,
  returning: 900,
};

const PHASE_ORDER: Phase[] = ['orb', 'listening', 'transition', 'dashboard', 'returning'];

// Bar chart data matching the screenshot
const barData = [
  { label: 'NA', current: 78, previous: 65 },
  { label: 'EU', current: 62, previous: 58 },
  { label: 'APAC', current: 90, previous: 55 },
  { label: 'LATAM', current: 45, previous: 40 },
];

// Voice waveform bars (simulated amplitudes)
const waveformBars = [3, 5, 8, 12, 7, 14, 9, 11, 6, 13, 10, 8, 15, 7, 11, 9, 5, 12, 8, 6];

const OrbToGraphsAnimation: React.FC<OrbToGraphsAnimationProps> = ({
  prefersReducedMotion,
  isLoaded,
}) => {
  const [phase, setPhase] = useState<Phase>('orb');
  const [typedText, setTypedText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const queryText = 'Compare Q3 revenue by region with last year';

  // Typing effect
  useEffect(() => {
    if (phase !== 'listening') {
      setTypedText('');
      return;
    }

    let i = 0;
    setTypedText('');

    const type = () => {
      if (i < queryText.length) {
        setTypedText(queryText.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 45 + Math.random() * 25);
      }
    };

    typingRef.current = setTimeout(type, 400);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase]);

  // Phase cycling
  const advancePhase = useCallback(() => {
    if (!isVisibleRef.current) return;

    setPhase((prev) => {
      const idx = PHASE_ORDER.indexOf(prev);
      return PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) return;

    timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[phase]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, advancePhase, prefersReducedMotion, isLoaded]);

  // Pause when off screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDashboardPhase = phase === 'dashboard';
  const isTransitioning = phase === 'transition';
  const isReturning = phase === 'returning';
  const showOrb = phase === 'orb' || phase === 'listening' || phase === 'returning';
  const showDashboard = isDashboardPhase || isTransitioning;

  // Orb scale/opacity
  const orbScale = isDashboardPhase ? 0.3 : isTransitioning ? 0.5 : isReturning ? 0.9 : 1;
  const orbOpacity = isDashboardPhase ? 0 : isTransitioning ? 0.3 : isReturning ? 0.8 : 1;

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Voice query bar — shown during listening phase */}
      <div
        className={`
          mx-auto mb-4 sm:mb-6 max-w-xl
          transition-all duration-700 ease-out
          ${phase === 'listening' || isTransitioning || isDashboardPhase
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
          {/* Mic icon */}
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${phase === 'listening' ? 'bg-primary-cyan/20' : 'bg-white/5'}
            transition-colors duration-500
          `}>
            <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" />
            </svg>
          </div>

          {/* Waveform */}
          <div className={`
            flex items-center gap-[2px] h-6
            transition-opacity duration-500
            ${phase === 'listening' ? 'opacity-100' : 'opacity-0'}
          `}>
            {waveformBars.map((amp, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-primary-cyan/60"
                style={{
                  height: phase === 'listening' ? `${amp + 4}px` : '3px',
                  transition: `height 0.3s ease ${i * 30}ms`,
                  animation: phase === 'listening' ? `waveform-bar 0.8s ease-in-out ${i * 0.05}s infinite alternate` : 'none',
                }}
              />
            ))}
          </div>

          {/* Typed text */}
          <div className="flex-1 min-w-0">
            <span className="text-sm text-white/70 font-light truncate block">
              {typedText}
              {phase === 'listening' && (
                <span className="inline-block w-[2px] h-4 bg-primary-cyan/80 ml-[1px] align-middle animate-pulse" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main animation container */}
      <div className="relative" style={{ minHeight: '320px' }}>
        {/* Orb layer */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            opacity: orbOpacity,
            transform: `scale(${orbScale})`,
            zIndex: showOrb ? 10 : 1,
            pointerEvents: showOrb ? 'auto' : 'none',
          }}
        >
          <div className={`
            relative
            ${phase === 'listening' ? 'animate-[orb-listening_2s_ease-in-out_infinite]' : ''}
          `}>
            <OrbCanvas
              prefersReducedMotion={prefersReducedMotion}
              className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]"
            />
          </div>
        </div>

        {/* Dashboard layer */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-700 ease-out
            ${showDashboard ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
          style={{ zIndex: showDashboard ? 10 : 1 }}
        >
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
            {/* Bar chart panel */}
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white/90">Revenue by Region</h3>
                  <p className="text-xs text-white/40 mt-0.5">Q3 2024 vs Q3 2023</p>
                </div>
                <div className="flex gap-3 text-[10px] text-white/50">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-primary-cyan" />
                    2024
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-white/20" />
                    2023
                  </span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end justify-around gap-2 sm:gap-4 h-[140px] sm:h-[170px]">
                {barData.map((bar, i) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-end gap-1 h-full w-full justify-center">
                      {/* Current year bar */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm bg-gradient-to-t from-primary-cyan/80 to-primary-cyan transition-all duration-700 ease-out"
                        style={{
                          height: isDashboardPhase ? `${bar.current}%` : '0%',
                          transitionDelay: `${i * 120 + 200}ms`,
                          boxShadow: isDashboardPhase ? '0 0 10px rgba(0, 229, 200, 0.3)' : 'none',
                        }}
                      />
                      {/* Previous year bar */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm bg-white/15 transition-all duration-700 ease-out"
                        style={{
                          height: isDashboardPhase ? `${bar.previous}%` : '0%',
                          transitionDelay: `${i * 120 + 300}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/40 mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards column */}
            <div className="flex sm:flex-col gap-3 sm:w-[180px]">
              {/* Total Revenue */}
              <div
                className={`
                  flex-1 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm
                  p-3 sm:p-4 text-center
                  transition-all duration-600 ease-out
                  ${isDashboardPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-white/90">$4.2M</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">+23% YoY</p>
              </div>

              {/* Top Region */}
              <div
                className={`
                  flex-1 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm
                  p-3 sm:p-4 text-center
                  transition-all duration-600 ease-out
                  ${isDashboardPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '600ms' }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">Top Region</p>
                <p className="text-lg sm:text-xl font-bold text-white/90">APAC</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">+63% growth</p>
              </div>

              {/* AI Insight */}
              <div
                className={`
                  flex-1 rounded-2xl border border-primary-cyan/20 bg-primary-cyan/[0.04] backdrop-blur-sm
                  p-3 sm:p-4 text-center
                  transition-all duration-600 ease-out
                  ${isDashboardPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '800ms' }}
              >
                <p className="text-[10px] sm:text-xs text-primary-cyan/60 mb-1">AI Insight</p>
                <p className="text-xs sm:text-sm text-white/70 leading-snug">
                  APAC outperformance driven by enterprise deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {(['orb', 'dashboard'] as const).map((p) => (
          <div
            key={p}
            className={`
              h-1.5 rounded-full transition-all duration-500
              ${(p === 'orb' && (phase === 'orb' || phase === 'listening'))
                || (p === 'dashboard' && (phase === 'dashboard' || phase === 'transition'))
                ? 'w-6 bg-primary-cyan/60'
                : 'w-1.5 bg-white/20'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default OrbToGraphsAnimation;
