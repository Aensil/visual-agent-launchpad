import en from './translations/en.json';
import zh from './translations/zh.json';
import hi from './translations/hi.json';
import es from './translations/es.json';
import ar from './translations/ar.json';
import fr from './translations/fr.json';

export type Language = 'en' | 'zh' | 'hi' | 'es' | 'ar' | 'fr';

const translations: Record<Language, typeof en> = {
  en,
  zh,
  hi,
  es,
  ar,
  fr,
};

/**
 * Get a translation by key path (e.g., 'hero.headline1')
 * Falls back to English if key not found in target language
 */
export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
      break;
    }
  }

  // Fallback to English if key not found in target language
  if (value === undefined) {
    value = translations.en;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Get an array of translations (e.g., for testimonials.items)
 */
export function getTranslationArray<T>(lang: Language, key: string): T[] {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
      break;
    }
  }

  // Fallback to English
  if (!Array.isArray(value)) {
    value = translations.en;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = [];
        break;
      }
    }
  }

  return Array.isArray(value) ? value as T[] : [];
}

export { translations };
