import React, { useState, useEffect, useCallback, useRef } from 'react';
import OrbCanvas from '@/components/OrbCanvas';
import { useTranslation } from '@/hooks/useTranslation';

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
  { labelKey: 'hero.demo.regionNA', current: 78, previous: 65 },
  { labelKey: 'hero.demo.regionEU', current: 62, previous: 58 },
  { labelKey: 'hero.demo.regionAPAC', current: 90, previous: 55 },
  { labelKey: 'hero.demo.regionLATAM', current: 45, previous: 40 },
];

// Voice waveform bars (simulated amplitudes)
const waveformBars = [3, 5, 8, 12, 7, 14, 9, 11, 6, 13, 10, 8, 15, 7, 11, 9, 5, 12, 8, 6];

const OrbToGraphsAnimation: React.FC<OrbToGraphsAnimationProps> = ({
  prefersReducedMotion,
  isLoaded,
}) => {
  const { t } = useTranslation();
  // Reduced motion: skip straight to dashboard so users still see the product story
  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'dashboard' : 'orb');
  const [typedText, setTypedText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const queryText = t('hero.demo.voiceQuery');

  // Typing effect
  useEffect(() => {
    if (phase !== 'listening' || prefersReducedMotion) {
      if (phase !== 'listening') setTypedText('');
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
  }, [phase, queryText, prefersReducedMotion]);

  // Phase cycling
  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      const idx = PHASE_ORDER.indexOf(prev);
      return PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    });
  }, []);

  // BUG 1 FIX: Re-schedule timeout when visibility returns.
  // Track whether a phase advance was skipped while off-screen.
  const pendingAdvanceRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) return;

    // If currently not visible, mark as pending and don't start timer
    if (!isVisibleRef.current) {
      pendingAdvanceRef.current = true;
      return;
    }

    pendingAdvanceRef.current = false;
    timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[phase]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, advancePhase, prefersReducedMotion, isLoaded]);

  // Pause when off screen — and resume pending advance when back
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasHidden = !isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;

        // BUG 1 FIX: If we just became visible and there's a pending advance, fire it
        if (wasHidden && entry.isIntersecting && pendingAdvanceRef.current) {
          pendingAdvanceRef.current = false;
          advancePhase();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [advancePhase]);

  const isDashboardPhase = phase === 'dashboard';
  const isTransitioning = phase === 'transition';
  const isReturning = phase === 'returning';
  const showOrb = phase === 'orb' || phase === 'listening';
  const showDashboard = isDashboardPhase || isTransitioning;

  // FIX: Bars must grow AFTER the dashboard container is visible, not during
  // the transition when the container is still fading in (which hides the animation).
  // Use a delayed flag so bars start animating once the dashboard is actually opaque.
  const [barsReady, setBarsReady] = useState(prefersReducedMotion);
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isDashboardPhase && !barsReady) {
      // Small delay so the dashboard container is fully visible before bars animate
      const id = setTimeout(() => setBarsReady(true), 80);
      return () => clearTimeout(id);
    }
    if (!isDashboardPhase && !isTransitioning) {
      setBarsReady(false);
    }
  }, [isDashboardPhase, isTransitioning, barsReady, prefersReducedMotion]);

  const barsGrow = barsReady || isDashboardPhase;

  // REGRESSION 2 FIX: Don't render OrbCanvas when it's fully invisible
  const orbIsHidden = isDashboardPhase;

  // Orb scale/opacity — fast shrink during transition for decisive exit
  const orbScale = isDashboardPhase ? 0.1 : isTransitioning ? 0.2 : isReturning ? 0.85 : 1;
  const orbOpacity = isDashboardPhase ? 0 : isTransitioning ? 0 : isReturning ? 0.7 : 1;

  // For reduced motion, show dashboard statically with voice bar
  const isReducedMotionStatic = prefersReducedMotion;

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Voice query bar — shown during listening phase (or always for reduced motion) */}
      <div
        className={`
          mx-auto mb-4 sm:mb-6 max-w-xl
          transition-all duration-700 ease-out
          ${isReducedMotionStatic || phase === 'listening' || isTransitioning || isDashboardPhase
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="glass-panel-static flex items-center gap-3 px-4 py-3 !rounded-2xl">
          {/* Mic icon */}
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${phase === 'listening' && !prefersReducedMotion ? 'bg-primary-cyan/20' : 'bg-white/5'}
            transition-colors duration-500
          `}>
            <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" />
            </svg>
          </div>

          {/* Waveform — hidden for reduced motion */}
          {!prefersReducedMotion && (
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
          )}

          {/* Typed text */}
          <div className="flex-1 min-w-0">
            <span className="text-sm text-white/70 font-light truncate block">
              {isReducedMotionStatic
                ? queryText
                : (typedText || (isDashboardPhase || isTransitioning ? queryText : ''))}
              {phase === 'listening' && !prefersReducedMotion && (
                <span className="inline-block w-[2px] h-4 bg-primary-cyan/80 ml-[1px] align-middle animate-pulse" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main animation container — BUG 3 FIX: dynamic height per phase */}
      <div
        className="relative transition-[min-height] duration-700 ease-out"
        style={{
          minHeight: (showDashboard || isReducedMotionStatic) ? '420px' : '320px',
        }}
      >

        {/* === Glow burst — the visual bridge between orb and dashboard === */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 20 }}
          >
            {/* Expanding teal ring — FIX: removed base opacity:0 that fought with animation */}
            <div
              className="absolute rounded-full"
              style={{
                width: isTransitioning ? '500px' : '80px',
                height: isTransitioning ? '500px' : '80px',
                background: 'radial-gradient(circle, rgba(0, 229, 200, 0.25) 0%, rgba(0, 229, 200, 0.08) 40%, transparent 70%)',
                opacity: isTransitioning ? 1 : 0,
                transition: isTransitioning
                  ? 'width 900ms cubic-bezier(0.16, 1, 0.3, 1), height 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-out'
                  : 'opacity 300ms ease-out',
                ...(isTransitioning && {
                  animation: 'glow-burst 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }),
              }}
            />
            {/* Core flash */}
            <div
              className="absolute rounded-full"
              style={{
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(0, 229, 200, 0.7) 0%, rgba(124, 92, 250, 0.35) 45%, transparent 75%)',
                opacity: isTransitioning ? 1 : 0,
                transform: isTransitioning ? 'scale(2)' : 'scale(0.3)',
                filter: 'blur(25px)',
                transition: isTransitioning
                  ? 'opacity 200ms ease-out, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'opacity 400ms ease-out, transform 400ms ease-in',
              }}
            />
          </div>
        )}

        {/* Orb layer — REGRESSION 2 FIX: conditionally render OrbCanvas */}
        {!isReducedMotionStatic && (
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
              {!orbIsHidden && (
                <OrbCanvas
                  prefersReducedMotion={prefersReducedMotion}
                  className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]"
                />
              )}
            </div>
          </div>
        )}

        {/* Dashboard layer */}
        <div
          className={`
            ${isReducedMotionStatic ? 'relative' : 'absolute inset-0'} flex items-center justify-center
          `}
          style={isReducedMotionStatic ? {} : {
            opacity: showDashboard ? 1 : 0,
            transform: showDashboard ? 'scale(1)' : 'scale(0.8)',
            transition: showDashboard
              ? 'opacity 500ms ease-out 200ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms'
              : 'opacity 400ms ease-in, transform 400ms ease-in',
            zIndex: showDashboard ? 10 : 1,
            pointerEvents: showDashboard ? 'auto' : 'none',
          }}
        >
          {/* GAP 3 FIX: ltr direction to prevent RTL flex-row reversal */}
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 px-2" dir="ltr">
            {/* Bar chart panel — REGRESSION 1 FIX: glass-panel-static (no hover lift) */}
            <div className="glass-panel-static flex-1 !rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white/90">{t('hero.demo.chartTitle')}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{t('hero.demo.chartSubtitle')}</p>
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
                  <div key={bar.labelKey} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-end gap-1 h-full w-full justify-center">
                      {/* Current year bar — GAP 4 FIX: uses CSS variable via class */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm demo-bar-current"
                        style={{
                          height: (barsGrow || isReducedMotionStatic) ? `${bar.current}%` : '0%',
                          transition: prefersReducedMotion ? 'none' : `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 100}ms, box-shadow 600ms ease ${i * 120 + 400}ms`,
                          boxShadow: (isDashboardPhase || isReducedMotionStatic) ? '0 0 12px var(--primary-cyan-glow)' : 'none',
                        }}
                      />
                      {/* Previous year bar */}
                      <div
                        className="w-[18px] sm:w-[28px] rounded-t-sm bg-white/15"
                        style={{
                          height: (barsGrow || isReducedMotionStatic) ? `${bar.previous}%` : '0%',
                          transition: prefersReducedMotion ? 'none' : `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 200}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/40 mt-1">{t(bar.labelKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards column — stacks vertically on all screens */}
            <div className="flex flex-col gap-3 sm:w-[180px]">
              {/* Total Revenue */}
              <div
                className="glass-panel-static flex-1 !rounded-2xl p-3 sm:p-4 text-center"
                style={isReducedMotionStatic ? {} : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 350ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">{t('hero.demo.totalRevenue')}</p>
                <p className="text-xl sm:text-2xl font-bold text-white/90">{t('hero.demo.totalRevenueValue')}</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">{t('hero.demo.totalRevenueChange')}</p>
              </div>

              {/* Top Region */}
              <div
                className="glass-panel-static flex-1 !rounded-2xl p-3 sm:p-4 text-center"
                style={isReducedMotionStatic ? {} : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">{t('hero.demo.topRegion')}</p>
                <p className="text-lg sm:text-xl font-bold text-white/90">{t('hero.demo.topRegionValue')}</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">{t('hero.demo.topRegionChange')}</p>
              </div>

              {/* AI Insight */}
              <div
                className="glass-panel-static flex-1 !rounded-2xl !border-primary-cyan/20 p-3 sm:p-4 text-center"
                style={isReducedMotionStatic ? { background: 'rgba(0, 229, 200, 0.04)' } : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 600ms ease-out 650ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 650ms',
                  background: 'rgba(0, 229, 200, 0.04)',
                }}
              >
                <p className="text-[10px] sm:text-xs text-primary-cyan/60 mb-1">{t('hero.demo.aiInsight')}</p>
                <p className="text-xs sm:text-sm text-white/70 leading-snug">
                  {t('hero.demo.aiInsightText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase indicator dots — hidden for reduced motion (static view) */}
      {!isReducedMotionStatic && (
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
      )}
    </div>
  );
};

export default OrbToGraphsAnimation;
