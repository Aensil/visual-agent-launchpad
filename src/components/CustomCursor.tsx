
import React, { useRef, useEffect } from 'react';

interface CustomCursorProps {
  cursorPosition: { x: number, y: number };
  prefersReducedMotion: boolean;
}

const CustomCursor = ({ cursorPosition, prefersReducedMotion }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      ref={cursorRef}
      className="fixed w-6 h-6 rounded-full border-2 border-electric-cyan pointer-events-none z-50 mix-blend-difference hidden sm:block"
      style={{
        transition: 'transform 0.1s ease-out',
        top: '-3px',
        left: '-3px'
      }}
    ></div>
  );
};

export default CustomCursor;
