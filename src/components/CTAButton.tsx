import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const baseStyles = `
    relative font-semibold rounded-xl overflow-hidden
    transition-all duration-250 ease-smooth
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 focus:ring-offset-2 focus:ring-offset-void
  `;

  const variants = {
    primary: `
      px-6 py-3
      bg-gradient-to-r from-primary-cyan via-deep-indigo to-primary-cyan
      bg-[length:200%_100%] bg-left
      text-text-primary
      shadow-[0_4px_20px_rgba(0,212,255,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:bg-right hover:shadow-[0_8px_30px_rgba(0,212,255,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      px-6 py-3
      bg-void-glass backdrop-blur-glass
      text-text-primary
      border border-primary-cyan/30
      hover:border-primary-cyan hover:bg-primary-cyan/10
      hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
    `,
    danger: `
      px-6 py-3
      bg-status-error/20
      text-status-error
      border border-status-error/30
      hover:bg-status-error/30 hover:border-status-error/50
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Subtle inner glow for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default CTAButton;
