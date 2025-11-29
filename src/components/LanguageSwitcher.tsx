import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';
import { LANGUAGE_NAMES } from '@/i18n/config';

const LanguageSwitcher: React.FC = () => {
  const { toggleLanguage, currentLanguage, ready } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageToggle = useCallback(async () => {
    if (!ready || isLoading) return;

    setIsLoading(true);
    try {
      await toggleLanguage();
    } catch (error) {
      console.error('Failed to toggle language:', error);
    } finally {
      setIsLoading(false);
    }
  }, [toggleLanguage, ready, isLoading]);

  if (!ready) return null;

  const nextLanguage = currentLanguage === 'en' ? 'es' : 'en';
  const currentLanguageName = LANGUAGE_NAMES[currentLanguage];
  const nextLanguageName = LANGUAGE_NAMES[nextLanguage];

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={handleLanguageToggle}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-4 py-2
          bg-black/50 backdrop-blur-md border border-white/20
          rounded-full text-white
          hover:bg-white/10
          transition-all duration-300
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label={`Switch from ${currentLanguageName} to ${nextLanguageName}`}
        title={`Current: ${currentLanguageName} - Click to switch to ${nextLanguageName}`}
      >
        <Globe
          size={20}
          className={`text-electric-cyan ${isLoading ? 'animate-spin' : ''}`}
        />
        <span className="text-sm font-medium text-white">
          {nextLanguage.toUpperCase()}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
