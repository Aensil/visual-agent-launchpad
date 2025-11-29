import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useMemo, useCallback } from 'react';

// Type for translation keys
export type TranslationKey = string;

// Type for translation parameters
export interface TranslationParams {
  [key: string]: string | number | boolean;
}

export const useTranslation = () => {
  const { t, i18n, ready } = useI18nTranslation();

  // Memoized translation function with type safety
  const translate = useCallback((
    key: TranslationKey, 
    params?: TranslationParams
  ): string => {
    if (!ready) return key; // Fallback to key if not ready
    
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation failed for key: ${key}`, error);
      return key; // Fallback to key on error
    }
  }, [t, ready]);

  // Memoized translation function for objects (like arrays)
  const translateObject = useCallback((
    key: TranslationKey
  ): unknown => {
    if (!ready) return [];
    
    try {
      return t(key, { returnObjects: true });
    } catch (error) {
      console.warn(`Object translation failed for key: ${key}`, error);
      return [];
    }
  }, [t, ready]);

  // Memoized translation function with fallback
  const translateWithFallback = useCallback((
    key: TranslationKey, 
    fallback: string,
    params?: TranslationParams
  ): string => {
    if (!ready) return fallback;
    
    try {
      const translation = t(key, params);
      return translation === key ? fallback : translation;
    } catch (error) {
      console.warn(`Translation with fallback failed for key: ${key}`, error);
      return fallback;
    }
  }, [t, ready]);

  // Check if a translation key exists
  const hasTranslation = useCallback((key: TranslationKey): boolean => {
    if (!ready) return false;
    
    try {
      const translation = t(key);
      return translation !== key;
    } catch {
      return false;
    }
  }, [t, ready]);

  return {
    t: translate,
    tObject: translateObject,
    tFallback: translateWithFallback,
    hasTranslation,
    ready,
    i18n
  };
};
