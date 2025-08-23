import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslationPerformance } from '@/hooks/useTranslationPerformance';
import { Globe, Check, AlertCircle } from 'lucide-react';
import { LANGUAGE_NAMES } from '@/i18n/config';

const LanguageSwitcher: React.FC = () => {
  const { toggleLanguage, currentLanguage, ready } = useLanguage();
  const { startLanguageChange, endLanguageChange } = useTranslationPerformance();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageToggle = useCallback(async () => {
    if (!ready || isLoading) return;
    
    setError(null);
    setIsLoading(true);
    startLanguageChange();
    
    try {
      await toggleLanguage();
      endLanguageChange();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to toggle language:', error);
    } finally {
      setIsLoading(false);
    }
  }, [toggleLanguage, ready, isLoading, startLanguageChange, endLanguageChange]);

  // Don't render until i18n is ready
  if (!ready) return null;

  const nextLanguage = currentLanguage === 'en' ? 'es' : 'en';
  const currentLanguageName = LANGUAGE_NAMES[currentLanguage];
  const nextLanguageName = LANGUAGE_NAMES[nextLanguage];

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Error Display */}
      {error && (
        <div className="mb-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Language Switcher Button */}
      <button
        onClick={handleLanguageToggle}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-4 py-2 
          bg-black/20 backdrop-blur-md border border-white/20 
          rounded-full text-white 
          hover:bg-white/10 hover:scale-105
          transition-all duration-300 
          shadow-lg
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-electric-cyan/50
        `}
        aria-label={`Switch from ${currentLanguageName} to ${nextLanguageName}`}
        title={`Current: ${currentLanguageName} - Click to switch to ${nextLanguageName}`}
      >
        <Globe 
          size={20} 
          className={`transition-transform duration-300 text-electric-cyan ${
            isLoading ? 'animate-spin' : 'group-hover:rotate-12'
          }`}
        />
        
        <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-neural-indigo">
          {nextLanguage.toUpperCase()}
        </span>
        
        {isLoading && (
          <Check 
            size={16} 
            className="text-electric-cyan animate-pulse" 
          />
        )}
        
        {/* Hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/20 to-neural-indigo/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
