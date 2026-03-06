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
  transition: 1000,
  dashboard: 4500,
  returning: 1000,
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
  const showOrb = phase === 'orb' || phase === 'listening';
  const showDashboard = isDashboardPhase || isTransitioning;
  // Bars should start growing as soon as the dashboard container is visible
  const barsGrow = isTransitioning || isDashboardPhase;
  // Show glow burst during transition
  const showGlowBurst = isTransitioning;

  // Orb scale/opacity — smoother arc through transition
  const orbScale = isDashboardPhase ? 0.15 : isTransitioning ? 0.4 : isReturning ? 0.85 : 1;
  const orbOpacity = isDashboardPhase ? 0 : isTransitioning ? 0.15 : isReturning ? 0.7 : 1;

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
        <div className="glass-panel flex items-center gap-3 px-4 py-3 !rounded-2xl">
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
              {typedText || (isDashboardPhase || isTransitioning ? queryText : '')}
              {phase === 'listening' && (
                <span className="inline-block w-[2px] h-4 bg-primary-cyan/80 ml-[1px] align-middle animate-pulse" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main animation container */}
      <div className="relative" style={{ minHeight: '320px' }}>

        {/* === Glow burst — the visual bridge between orb and dashboard === */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
        >
          {/* Expanding teal ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: showGlowBurst ? '500px' : '80px',
              height: showGlowBurst ? '500px' : '80px',
              background: 'radial-gradient(circle, rgba(0, 229, 200, 0.25) 0%, rgba(0, 229, 200, 0.08) 40%, transparent 70%)',
              opacity: showGlowBurst ? 0 : isReturning ? 0 : 0,
              transition: 'all 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              // Start visible at begin of transition, fade to 0 as it expands
              ...(isTransitioning && {
                opacity: 1,
                animation: 'glow-burst 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }),
            }}
          />
          {/* Core flash */}
          <div
            className="absolute rounded-full"
            style={{
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(0, 229, 200, 0.6) 0%, rgba(124, 92, 250, 0.3) 50%, transparent 80%)',
              opacity: isTransitioning ? 1 : 0,
              transform: isTransitioning ? 'scale(1.5)' : 'scale(0.5)',
              filter: 'blur(20px)',
              transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Orb layer */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: orbOpacity,
            transform: `scale(${orbScale})`,
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
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
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: showDashboard ? 1 : 0,
            transform: showDashboard ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: showDashboard ? 10 : 1,
            pointerEvents: showDashboard ? 'auto' : 'none',
          }}
        >
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
            {/* Bar chart panel — uses glass-panel for proper depth */}
            <div className="glass-panel flex-1 !rounded-2xl p-4 sm:p-5">
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

              {/* Bar chart — bars start growing during transition, not just dashboard */}
              <div className="flex items-end justify-around gap-2 sm:gap-4 h-[140px] sm:h-[170px]">
                {barData.map((bar, i) => (
                  <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-end gap-1 h-full w-full justify-center">
                      {/* Current year bar */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm bg-gradient-to-t from-primary-cyan/80 to-primary-cyan"
                        style={{
                          height: barsGrow ? `${bar.current}%` : '0%',
                          transition: `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 100}ms, box-shadow 600ms ease ${i * 120 + 400}ms`,
                          boxShadow: isDashboardPhase ? '0 0 12px rgba(0, 229, 200, 0.35)' : 'none',
                        }}
                      />
                      {/* Previous year bar */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm bg-white/15"
                        style={{
                          height: barsGrow ? `${bar.previous}%` : '0%',
                          transition: `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 200}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/40 mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards column — stacks vertically on mobile too */}
            <div className="flex flex-col gap-3 sm:w-[180px]">
              {/* Total Revenue */}
              <div
                className="glass-panel flex-1 !rounded-2xl p-3 sm:p-4 text-center"
                style={{
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 350ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-white/90">$4.2M</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">+23% YoY</p>
              </div>

              {/* Top Region */}
              <div
                className="glass-panel flex-1 !rounded-2xl p-3 sm:p-4 text-center"
                style={{
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">Top Region</p>
                <p className="text-lg sm:text-xl font-bold text-white/90">APAC</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">+63% growth</p>
              </div>

              {/* AI Insight */}
              <div
                className="glass-panel flex-1 !rounded-2xl !border-primary-cyan/20 p-3 sm:p-4 text-center"
                style={{
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 650ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 650ms',
                  background: 'rgba(0, 229, 200, 0.04)',
                }}
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
