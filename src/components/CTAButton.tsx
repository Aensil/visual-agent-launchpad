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
      bg-gradient-to-br from-deep-indigo to-accent-magenta
      text-white keep-white
      shadow-glow-indigo
      hover:from-accent-magenta hover:to-deep-indigo-bright
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      px-6 py-3
      bg-white/15 backdrop-blur-[20px]
      text-text-primary
      border border-white/[0.16]
      hover:bg-white/20 hover:border-primary-cyan hover:text-primary-cyan
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    danger: `
      px-6 py-3
      bg-status-error/15
      text-status-error
      border border-status-error/15
      hover:bg-status-error hover:text-white hover:keep-white
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
      <span className="relative z-10 font-semibold">{children}</span>
    </button>
  );
};

export default CTAButton;
