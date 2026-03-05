import React, { useRef, useEffect, useCallback } from 'react';

interface OrbCanvasProps {
  size?: number;
  className?: string;
  prefersReducedMotion?: boolean;
}

const OrbCanvas: React.FC<OrbCanvasProps> = ({
  size = 420,
  className = '',
  prefersReducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.34;
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Background particles
    const particleSeed = 42;
    for (let i = 0; i < 30; i++) {
      const px = ((Math.sin(particleSeed * i * 0.73) + 1) / 2) * w;
      const py = ((Math.cos(particleSeed * i * 0.91) + 1) / 2) * h;
      const twinkle = Math.sin(t * 0.5 + i * 1.7) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(px, py, 0.8 + twinkle * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 200, ${0.1 + twinkle * 0.15})`;
      ctx.fill();
    }

    // Subtle outer glow
    const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.6, cx, cy, baseRadius * 1.5);
    glowGrad.addColorStop(0, 'rgba(0, 229, 200, 0.06)');
    glowGrad.addColorStop(0.5, 'rgba(0, 229, 200, 0.02)');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw multiple ring layers for the organic orb effect
    const ringCount = 50;
    const mouseInfluence = prefersReducedMotion ? 0 : 0.15;

    for (let ring = 0; ring < ringCount; ring++) {
      const ringProgress = ring / ringCount;
      const alpha = 0.03 + Math.sin(ringProgress * Math.PI) * 0.08;
      const radiusOffset = (ringProgress - 0.5) * baseRadius * 0.12;
      const phaseOffset = ring * 0.13;
      const distortStrength = 4 + Math.sin(ringProgress * Math.PI * 2) * 6;

      ctx.beginPath();

      const segments = 180;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;

        // Organic noise-like distortion from multiple sine waves
        const noise =
          Math.sin(angle * 3 + t * 0.7 + phaseOffset) * distortStrength +
          Math.sin(angle * 5 - t * 0.5 + phaseOffset * 2) * (distortStrength * 0.5) +
          Math.sin(angle * 7 + t * 0.3 + phaseOffset * 0.5) * (distortStrength * 0.3) +
          Math.sin(angle * 2 - t * 0.9 + ring * 0.05) * (distortStrength * 0.4);

        // Mouse influence
        const mx = mouseRef.current.x * mouseInfluence * Math.cos(angle) * 15;
        const my = mouseRef.current.y * mouseInfluence * Math.sin(angle) * 15;

        const r = baseRadius + radiusOffset + noise + mx + my;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Color shifts across rings: teal core, hints of violet at edges
      const hue = 170 + ringProgress * 20; // teal to cyan range
      const sat = 85 + ringProgress * 10;
      const light = 55 + Math.sin(ringProgress * Math.PI) * 10;

      ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
      ctx.lineWidth = 0.6 + Math.sin(ringProgress * Math.PI) * 0.4;
      ctx.stroke();
    }

    // Inner bright ring (the most visible one)
    for (let pass = 0; pass < 3; pass++) {
      ctx.beginPath();
      const passAlpha = [0.25, 0.15, 0.08][pass];
      const passWidth = [1.2, 2.0, 3.5][pass];
      const passRadius = baseRadius + pass * 0.5;

      const segments = 200;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const noise =
          Math.sin(angle * 3 + t * 0.7) * 5 +
          Math.sin(angle * 5 - t * 0.5) * 3 +
          Math.sin(angle * 7 + t * 0.3) * 2;

        const mx = mouseRef.current.x * mouseInfluence * Math.cos(angle) * 15;
        const my = mouseRef.current.y * mouseInfluence * Math.sin(angle) * 15;

        const r = passRadius + noise + mx + my;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 229, 200, ${passAlpha})`;
      ctx.lineWidth = passWidth;
      ctx.shadowColor = 'rgba(0, 229, 200, 0.4)';
      ctx.shadowBlur = pass === 2 ? 20 : 0;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssSize = size;

    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    ctx.scale(dpr, dpr);

    if (prefersReducedMotion) {
      timeRef.current = 0;
      draw(ctx, cssSize, cssSize);
      return;
    }

    const animate = () => {
      timeRef.current += 0.012;
      draw(ctx, cssSize, cssSize);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [size, draw, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
};

export default OrbCanvas;
