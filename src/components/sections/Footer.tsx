
import React from 'react';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { icon: Mail, href: "mailto:enoc.silva@vuen.ai", label: t('footer.social.email') },
    { icon: Instagram, href: "https://www.instagram.com/vuen.ai/", label: t('footer.social.instagram') },
    { icon: Twitter, href: "https://x.com/vuen_ai", label: t('footer.social.twitter') },
    { icon: Linkedin, href: "https://www.linkedin.com/company/vuen-ai", label: t('footer.social.linkedin') }
  ];

  return (
    <footer className="relative py-12 px-4 bg-black border-t border-gray-800 z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <img 
          src="/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png" 
          alt="VUEN AI Logo" 
          className="w-12 h-12 mb-4"
        />
        
        {/* Social Links */}
        <div className="flex items-center gap-6 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-electric-cyan transition-colors duration-300 group"
              aria-label={social.label}
            >
              <social.icon 
                size={24} 
                className="group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          ))}
        </div>
        
        {/* Additional Social Links */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="https://www.threads.com/@vuen.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-electric-cyan transition-colors duration-300 text-sm"
          >
            {t('footer.social.threads')}
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="https://www.tiktok.com/@vuen.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-electric-cyan transition-colors duration-300 text-sm"
          >
            {t('footer.social.tiktok')}
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} VUEN AI. All rights reserved.</p>
        <p className="text-xs text-gray-500">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
};

export default Footer;
