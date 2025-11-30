import React, { useState, useEffect } from 'react';
import { domains } from '@/config/site';
import { useTranslation } from '@/hooks/useTranslation';
import Logo from '@/assets/Logo_Vuen_AI_white.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.product'), href: '#product' },
  ];

  return (
    <header
      className={`
        fixed left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled
          ? 'top-0 pt-3 pb-3 bg-void/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'top-2 pt-4 pb-4 bg-transparent'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center group"
        >
          <img
            src={Logo}
            alt="Vuen AI"
            className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="
                relative px-4 py-2 text-sm font-medium text-white/70
                hover:text-white transition-colors duration-300
                group
              "
            >
              {label}
              <span
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-0 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-magenta
                  group-hover:w-full transition-all duration-300 ease-out
                "
              />
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={domains.app}
            className="
              px-4 py-2 text-sm font-medium text-white/80
              hover:text-white transition-colors duration-300
            "
          >
            {t('common.logIn')}
          </a>
          <a
            href={domains.app}
            className="
              relative px-5 py-2.5 text-sm font-semibold text-white
              rounded-full overflow-hidden
              bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              bg-[length:200%_100%] bg-left
              hover:bg-right
              transition-all duration-500 ease-out
              hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]
              hover:scale-105
              active:scale-100
              group
            "
          >
            <span className="relative z-10">{t('common.startFree')}</span>
            <div
              className="
                absolute inset-0 bg-gradient-to-r from-accent-magenta via-deep-indigo to-primary-cyan
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transform transition-all duration-300
                ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
            />
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transition-all duration-300
                ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}
              `}
            />
            <span
              className={`
                w-full h-0.5 bg-white rounded-full transform transition-all duration-300
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden absolute top-full left-0 right-0
          bg-void/95 backdrop-blur-2xl border-b border-white/[0.06]
          transition-all duration-500 ease-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-lg font-medium text-white/80 hover:text-white active:bg-white/5 transition-colors py-3 min-h-[44px] flex items-center rounded-lg px-2 -mx-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-white/10">
            <a
              href={domains.app}
              className="text-center py-3.5 min-h-[48px] flex items-center justify-center text-white/80 font-medium rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              {t('common.logIn')}
            </a>
            <a
              href={domains.app}
              className="
                text-center py-3.5 min-h-[48px] flex items-center justify-center px-6 font-semibold text-white
                rounded-full
                bg-gradient-to-r from-primary-cyan via-deep-indigo to-accent-magenta
              "
            >
              {t('common.startFree')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
