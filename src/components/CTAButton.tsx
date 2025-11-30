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
      bg-primary-cyan text-void
      shadow-[0_4px_20px_rgba(0,212,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:bg-primary-cyan-bright hover:shadow-[0_8px_30px_rgba(0,212,255,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
      hover:-translate-y-0.5
      active:translate-y-0 active:bg-primary-cyan-dim
    `,
    secondary: `
      px-6 py-3
      bg-void-glass backdrop-blur-glass
      text-text-primary
      border border-primary-cyan/30
      hover:border-primary-cyan hover:bg-primary-cyan/10
      hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
      hover:-translate-y-0.5
      active:translate-y-0
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
      <span className="relative z-10 font-semibold">{children}</span>
    </button>
  );
};

export default CTAButton;
