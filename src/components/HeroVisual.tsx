import React, { useEffect, useState, useCallback, useRef } from 'react';
import OrbCanvas from '@/components/OrbCanvas';
import DashboardMockup from '@/components/DashboardMockup';

interface HeroVisualProps {
  prefersReducedMotion: boolean;
  className?: string;
}

const ORB_DURATION = 5000;
const DASHBOARD_DURATION = 5000;
const TRANSITION_DURATION = 1000; // matches CSS duration-1000

const HeroVisual: React.FC<HeroVisualProps> = ({
  prefersReducedMotion,
  className = '',
}) => {
  const [phase, setPhase] = useState<'orb' | 'dashboard'>('orb');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scheduleNext = useCallback(() => {
    if (prefersReducedMotion) return;
    const duration = phase === 'orb' ? ORB_DURATION : DASHBOARD_DURATION;
    timerRef.current = setTimeout(() => {
      if (isVisibleRef.current) {
        setPhase(prev => prev === 'orb' ? 'dashboard' : 'orb');
      }
    }, duration);
  }, [phase, prefersReducedMotion]);

  // Cycle timer
  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleNext]);

  // Pause when off-screen
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

  // If reduced motion, just show the orb
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <OrbCanvas
          prefersReducedMotion={prefersReducedMotion}
          className="mx-auto w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '240px' }}
    >
      {/* Orb layer */}
      <div
        className="flex items-center justify-center transition-all ease-out"
        style={{
          transitionDuration: `${TRANSITION_DURATION}ms`,
          opacity: phase === 'orb' ? 1 : 0,
          transform: phase === 'orb' ? 'scale(1)' : 'scale(0.9)',
        }}
      >
        <OrbCanvas
          prefersReducedMotion={prefersReducedMotion}
          className="mx-auto w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]"
        />
      </div>

      {/* Dashboard layer */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all ease-out"
        style={{
          transitionDuration: `${TRANSITION_DURATION}ms`,
          opacity: phase === 'dashboard' ? 1 : 0,
          transform: phase === 'dashboard' ? 'scale(1)' : 'scale(1.05)',
        }}
      >
        <DashboardMockup animateIn={phase === 'dashboard'} />
      </div>
    </div>
  );
};

export default HeroVisual;
