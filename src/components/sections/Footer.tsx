import React from 'react';
import { navigation, socialLinks, domains, contact } from '@/config/site';

// Social media icons as inline SVGs for better performance
const SocialIcon: React.FC<{ type: keyof typeof socialLinks }> = ({ type }) => {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    threads: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.131 1.37-2.784.812-.55 1.921-.87 3.3-.955 1.124-.07 2.165.018 3.108.262-.043-1.043-.242-1.838-.596-2.385-.466-.718-1.258-1.084-2.349-1.084h-.037c-.834.005-1.523.283-2.05.826l-1.456-1.455c.852-.87 2.01-1.347 3.453-1.422h.112c1.703 0 3.048.549 3.998 1.634.806.921 1.245 2.184 1.305 3.752.535.199 1.02.444 1.446.733 1.159.787 1.998 1.818 2.497 3.063.776 1.938.702 4.776-1.56 6.99-1.884 1.846-4.227 2.715-7.38 2.739zm-.063-6.256c-.882.052-1.559.26-2.012.619-.373.295-.532.634-.515.981.019.378.217.726.574.981.396.283.938.436 1.57.436.114 0 .23-.006.348-.018.973-.077 1.736-.446 2.265-1.095.408-.5.677-1.158.8-1.96-1.01-.163-2.024-.211-3.03-.153v.209z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  };

  return icons[type] || null;
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 bg-void border-t border-glass-border relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Orb logo mark */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-cyan via-deep-indigo to-accent-magenta opacity-80 animate-orb-breathe" />
              <span className="text-2xl font-bold text-text-primary">VUEN</span>
            </div>
            <p className="text-text-muted text-sm mb-6 max-w-xs">
              Visual Data Agent for leaders who are done babysitting dashboards.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {Object.entries(socialLinks).map(([key, { url, label }]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-muted hover:text-primary-cyan transition-colors p-2 rounded-lg hover:bg-glass-bg"
                >
                  <SocialIcon type={key as keyof typeof socialLinks} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.footer.product.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-text-muted hover:text-primary-cyan transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.footer.company.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-text-muted hover:text-primary-cyan transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.footer.legal.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-text-muted hover:text-primary-cyan transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demo Links Row */}
        <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-glass-border">
          {navigation.footer.demos.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-glass-bg border border-glass-border text-text-secondary hover:text-primary-cyan hover:border-primary-cyan/30 transition-all text-sm"
            >
              {label}
              {external && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </a>
          ))}
          <a
            href={domains.app}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-cyan/10 border border-primary-cyan/30 text-primary-cyan hover:bg-primary-cyan/20 transition-all text-sm font-medium"
          >
            Sign in to App
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>&copy; {currentYear} Vuen AI. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${contact.generalEmail}`}
              className="hover:text-primary-cyan transition-colors"
            >
              {contact.generalEmail}
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
