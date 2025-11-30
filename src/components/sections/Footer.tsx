import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 bg-void border-t border-glass-border relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              {/* Orb logo mark */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-orb-breathe" />
              <span className="text-2xl font-bold text-text-primary">VUEN</span>
            </div>
            <p className="text-text-muted text-sm">
              Visual Data Agent for leaders who are done babysitting dashboards.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-8">
            <a
              href="#pricing-section"
              className="text-text-secondary hover:text-primary-cyan transition-colors text-sm"
            >
              Pricing
            </a>
            <a
              href="#waitlist-section"
              className="text-text-secondary hover:text-primary-cyan transition-colors text-sm"
            >
              Join Waitlist
            </a>
            <a
              href="mailto:hello@vuen.ai"
              className="text-text-secondary hover:text-primary-cyan transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-glass-border mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>&copy; {currentYear} VUEN AI. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-text-secondary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary-cyan/30 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
