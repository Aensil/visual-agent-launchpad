import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { SupportedLanguage } from '@/i18n/config';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  isSpanish: boolean;
  isEnglish: boolean;
  ready: boolean;
  changeLanguage: (lang: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
  getNextLanguage: () => SupportedLanguage;
  isLanguageSupported: (lang: string) => lang is SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const languageUtils = useLanguage();
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => languageUtils, [languageUtils]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
