import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en/translations.json';
import esTranslations from '../locales/es/translations.json';

// Type for supported languages
export type SupportedLanguage = 'en' | 'es';

// Supported languages configuration
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es'];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Language names for display
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español'
};

// Initialize i18n with better configuration
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: enTranslations },
          es: { translation: esTranslations }
        },
        fallbackLng: DEFAULT_LANGUAGE,
        debug: process.env.NODE_ENV === 'development',
        interpolation: { 
          escapeValue: false 
        },
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
          checkWhitelist: true
        },
        react: {
          useSuspense: false
        }
      });
    
    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Fallback to default language
    i18n.changeLanguage(DEFAULT_LANGUAGE);
  }
};

// Initialize immediately
initI18n();

export default i18n;
