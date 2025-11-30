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
      bg-gradient-to-br from-[#00ff9f] to-[#ff2d92]
      text-white
      shadow-[0_0_20px_rgba(0,224,255,0.15)]
      hover:from-[#ff2d92] hover:to-[#ff6b35]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      px-6 py-3
      bg-white/15 backdrop-blur-[20px]
      text-[#f0f4ff]
      border border-white/[0.16]
      hover:bg-white/20 hover:border-[#00e0ff] hover:text-[#00e0ff]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    danger: `
      px-6 py-3
      bg-[rgba(255,59,48,0.15)]
      text-[#ff3b30]
      border border-[rgba(255,59,48,0.15)]
      hover:bg-[#ff3b30] hover:text-white
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
