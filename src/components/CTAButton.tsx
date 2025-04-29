
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CTAButton = ({ children, variant, onClick, className, style }: CTAButtonProps) => {
  return (
    <button 
      className={cn(
        variant === 'primary' ? 'cta-primary' : 'cta-secondary',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default CTAButton;
