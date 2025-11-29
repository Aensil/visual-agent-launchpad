import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

const CTAButton = ({ children, variant, onClick, className }: CTAButtonProps) => {
  return (
    <button
      className={cn(
        variant === 'primary' ? 'cta-primary' : 'cta-secondary',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CTAButton;
