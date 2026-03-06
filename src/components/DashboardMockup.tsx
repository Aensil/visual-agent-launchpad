import React, { useEffect, useRef, useState } from 'react';

interface DashboardMockupProps {
  animateIn: boolean;
}

const BAR_DATA = [
  { label: 'NA', current: 65, previous: 50 },
  { label: 'EU', current: 48, previous: 42 },
  { label: 'APAC', current: 82, previous: 35 },
  { label: 'LATAM', current: 40, previous: 55 },
];

const WAVEFORM_BARS = [3, 6, 4, 8, 5, 10, 7, 12, 6, 9, 4, 7, 3, 5, 8, 6, 4];

function useCountUp(target: number, animateIn: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animateIn) {
      setValue(0);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animateIn, target, duration]);

  return value;
}

const DashboardMockup: React.FC<DashboardMockupProps> = ({ animateIn }) => {
  const revenue = useCountUp(42, animateIn, 1800);
  const yoyGrowth = useCountUp(23, animateIn, 1600);
  const regionGrowth = useCountUp(63, animateIn, 1400);

  return (
    <div
      className="w-full max-w-[600px] mx-auto select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="rounded-t-xl bg-void-surface border border-white/10 border-b-0">
        <div className="flex items-center px-4 py-2.5 gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-[10px] text-white/40">
              <svg className="w-2.5 h-2.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              app.vuen.ai
            </div>
          </div>
          <div className="w-[46px]" /> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Dashboard body */}
      <div className="rounded-b-xl bg-void border border-white/10 border-t-white/5 overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-10 sm:w-12 shrink-0 border-r border-white/5 py-3 flex flex-col items-center gap-2.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-primary-cyan/30" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white/10" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white/10" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white/8" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white/5" />
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0 p-2.5 sm:p-3.5">
            {/* Voice input bar */}
            <div className="mb-3 rounded-lg border border-primary-cyan/30 bg-primary-cyan/5 px-3 py-2 flex items-center gap-2.5">
              {/* Mic icon */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-cyan/20 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-cyan" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </div>
              {/* Waveform */}
              <div className="flex items-center gap-[2px] h-4">
                {WAVEFORM_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full bg-primary-cyan/60"
                    style={{
                      height: animateIn ? `${h}px` : '2px',
                      transition: `height 0.4s ease-out ${i * 30}ms`,
                    }}
                  />
                ))}
              </div>
              {/* Prompt text */}
              <div className="flex gap-3 text-[9px] sm:text-[10px] text-white/40 truncate ml-1">
                <span>&quot;Compare Q3 revenue...&quot;</span>
                <span className="hidden sm:inline text-white/25">&quot;Compare Q3 revenue by region with last year&quot;</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              {/* Chart panel */}
              <div className="flex-1 min-w-0 rounded-lg border border-white/8 bg-void-surface/50 p-2.5 sm:p-3">
                {/* Chart header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] sm:text-xs font-semibold text-white/80">Revenue by Region</div>
                    <div className="text-[8px] sm:text-[9px] text-white/30 mt-0.5">Q3 2024 vs Q3 2023</div>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-medium bg-primary-cyan/15 text-primary-cyan border border-primary-cyan/20">
                      2024
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-medium bg-white/5 text-white/40 border border-white/10">
                      2023
                    </span>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end justify-around gap-1 h-[80px] sm:h-[100px]">
                  {BAR_DATA.map((d, i) => (
                    <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
                      <div className="flex items-end gap-[3px] sm:gap-1 h-[60px] sm:h-[80px]">
                        {/* Current year bar */}
                        <div
                          className="w-3 sm:w-4 rounded-t bg-primary-cyan/80"
                          style={{
                            height: animateIn ? `${d.current}%` : '0%',
                            transition: `height 0.8s ease-out ${200 + i * 120}ms`,
                          }}
                        />
                        {/* Previous year bar */}
                        <div
                          className="w-3 sm:w-4 rounded-t bg-white/15"
                          style={{
                            height: animateIn ? `${d.previous}%` : '0%',
                            transition: `height 0.8s ease-out ${260 + i * 120}ms`,
                          }}
                        />
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-white/30">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI cards */}
              <div className="hidden sm:flex flex-col gap-2 w-[130px] shrink-0">
                {/* Total Revenue */}
                <div className="rounded-lg border border-white/8 bg-void-surface/50 px-2.5 py-2 text-center">
                  <div className="text-[9px] text-white/40 mb-0.5">Total Revenue</div>
                  <div className="text-base font-bold text-white/90">
                    ${revenue / 10 > 0 ? (revenue / 10).toFixed(1) : '0.0'}M
                  </div>
                  <div className="text-[9px] text-primary-cyan font-medium">+{yoyGrowth}% YoY</div>
                </div>

                {/* Top Region */}
                <div className="rounded-lg border border-white/8 bg-void-surface/50 px-2.5 py-2 text-center">
                  <div className="text-[9px] text-white/40 mb-0.5">Top Region</div>
                  <div className="text-sm font-bold text-white/90">APAC</div>
                  <div className="text-[9px] text-primary-cyan font-medium">+{regionGrowth}% growth</div>
                </div>

                {/* AI Insight */}
                <div className="rounded-lg border border-white/8 bg-void-surface/50 px-2.5 py-2 text-center">
                  <div className="text-[9px] text-white/40 mb-0.5">AI Insight</div>
                  <div className="text-[9px] text-white/60 leading-tight">
                    APAC outperformance driven by enterprise deals.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
