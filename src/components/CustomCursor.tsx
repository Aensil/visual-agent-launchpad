import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorPosition: { x: number; y: number };
  prefersReducedMotion: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorPosition,
  prefersReducedMotion,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Show cursor after initial movement
    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);

    // Detect hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Outer glow ring */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-150 ease-out"
        style={{
          left: cursorPosition.x - 20,
          top: cursorPosition.y - 20,
          width: 40,
          height: 40,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        <div
          className={`
            w-full h-full rounded-full
            border border-primary-cyan/40
            transition-all duration-200
            ${isHovering ? 'border-primary-cyan/60 bg-primary-cyan/5' : ''}
          `}
        />
      </div>

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 4,
          top: cursorPosition.y - 4,
          width: 8,
          height: 8,
        }}
        aria-hidden="true"
      >
        <div
          className={`
            w-full h-full rounded-full
            bg-primary-cyan/80
            transition-all duration-100
            ${isHovering ? 'scale-0' : 'scale-100'}
          `}
        />
      </div>
    </>
  );
};

export default CustomCursor;
