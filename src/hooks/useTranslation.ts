import { useCallback } from 'react';
import { useLanguage } from './useLanguage';
import { getTranslation, getTranslationArray, type Language } from '@/i18n';

export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const t = useCallback(
    (key: string): string => {
      return getTranslation(currentLanguage as Language, key);
    },
    [currentLanguage]
  );

  const tArray = useCallback(
    <T>(key: string): T[] => {
      return getTranslationArray<T>(currentLanguage as Language, key);
    },
    [currentLanguage]
  );

  return { t, tArray, language: currentLanguage };
}
