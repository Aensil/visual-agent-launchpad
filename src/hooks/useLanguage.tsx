import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
  detectLanguageSync,
  detectLanguage,
  needsAsyncDetection,
  storeLanguage,
  type SupportedLanguage,
  type DetectionSource,
} from '@/lib/languageDetection';

interface Language {
  code: string;
  name: string;
}

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (code: string) => void;
  availableLanguages: Language[];
  isDetecting: boolean;
  detectionSource: DetectionSource | null;
}

const availableLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Synchronous initial detection for instant render
  const initialDetection = detectLanguageSync();

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(initialDetection.language);
  const [detectionSource, setDetectionSource] = useState<DetectionSource | null>(initialDetection.source);
  const [isDetecting, setIsDetecting] = useState(() => needsAsyncDetection());

  // Async IP detection (only runs if browser language not supported)
  useEffect(() => {
    if (!isDetecting) return;

    let cancelled = false;

    (async () => {
      const result = await detectLanguage();

      if (cancelled) return;

      setCurrentLanguage(result.language);
      setDetectionSource(result.source);
      setIsDetecting(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [isDetecting]);

  // RTL support for Arabic
  useEffect(() => {
    const isRTL = currentLanguage === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = useCallback((code: string) => {
    const validCode = availableLanguages.some(l => l.code === code) ? code as SupportedLanguage : 'en';
    setCurrentLanguage(validCode);
    setDetectionSource('localStorage');
    storeLanguage(validCode);
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      availableLanguages,
      isDetecting,
      detectionSource,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  // Return a default context if used outside provider
  if (context === undefined) {
    return {
      currentLanguage: 'en',
      setLanguage: () => {},
      availableLanguages,
      isDetecting: false,
      detectionSource: 'default',
    };
  }

  return context;
};
