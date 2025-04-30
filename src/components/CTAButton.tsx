
import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CTAButton = ({ children, variant, onClick, className, style }: CTAButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <button 
      className={cn(
        'relative overflow-hidden backdrop-blur-sm',
        variant === 'primary' ? 'cta-primary' : 'cta-secondary',
        className
      )}
      onClick={onClick}
      style={{
        ...style,
        boxShadow: isHovered && variant === 'primary' ? '0 0 25px rgba(0, 210, 255, 0.5)' : ''
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <span
            className={`absolute inset-0 z-0 opacity-70 ${
              variant === 'primary' ? 'bg-electric-cyan/30' : 'bg-neural-indigo/30'
            }`}
            style={{
              background: variant === 'primary' 
                ? 'radial-gradient(circle at var(--x) var(--y), rgba(0, 210, 255, 0.8), rgba(0, 210, 255, 0.4) 50%, rgba(0, 210, 255, 0) 100%)'
                : 'radial-gradient(circle at var(--x) var(--y), rgba(92, 51, 255, 0.8), rgba(92, 51, 255, 0.4) 50%, rgba(92, 51, 255, 0) 100%)',
              '--x': `${mousePosition.x}px`,
              '--y': `${mousePosition.y}px`
            } as React.CSSProperties}
          />
          <span className={`absolute inset-0 blur-sm ${variant === 'primary' ? 'glow-effect-cyan' : 'glow-effect-indigo'}`}></span>
        </>
      )}
    </button>
  );
};

export default CTAButton;
