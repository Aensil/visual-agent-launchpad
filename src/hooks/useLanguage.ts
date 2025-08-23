import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/i18n/config';

export const useLanguage = () => {
  const { t, i18n, ready } = useTranslation();
  
  // Memoized language state
  const currentLanguage = useMemo(() => i18n.language as SupportedLanguage, [i18n.language]);
  const isSpanish = useMemo(() => currentLanguage === 'es', [currentLanguage]);
  const isEnglish = useMemo(() => currentLanguage === 'en', [currentLanguage]);
  
  // Optimized language change function
  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    try {
      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`Unsupported language: ${lang}, falling back to ${DEFAULT_LANGUAGE}`);
        lang = DEFAULT_LANGUAGE;
      }
      
      await i18n.changeLanguage(lang);
      console.log(`Language changed to: ${lang}`);
    } catch (error) {
      console.error('Failed to change language:', error);
      // Fallback to default language
      await i18n.changeLanguage(DEFAULT_LANGUAGE);
    }
  }, [i18n]);
  
  // Optimized toggle function
  const toggleLanguage = useCallback(async () => {
    const newLang: SupportedLanguage = currentLanguage === 'en' ? 'es' : 'en';
    await changeLanguage(newLang);
  }, [currentLanguage, changeLanguage]);
  
  // Get next language in sequence
  const getNextLanguage = useCallback((): SupportedLanguage => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    return SUPPORTED_LANGUAGES[nextIndex];
  }, [currentLanguage]);
  
  // Check if language is supported
  const isLanguageSupported = useCallback((lang: string): lang is SupportedLanguage => {
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
  }, []);
  
  return {
    t,
    i18n,
    ready,
    currentLanguage,
    isSpanish,
    isEnglish,
    changeLanguage,
    toggleLanguage,
    getNextLanguage,
    isLanguageSupported,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
};
