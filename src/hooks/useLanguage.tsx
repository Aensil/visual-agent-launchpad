import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  availableLanguages: Language[];
}

const availableLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get from localStorage or browser preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vuen-language');
      if (saved) return saved;

      const browserLang = navigator.language.split('-')[0];
      if (availableLanguages.some(l => l.code === browserLang)) {
        return browserLang;
      }
    }
    return 'en';
  });

  const setLanguage = useCallback((code: string) => {
    setCurrentLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vuen-language', code);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, availableLanguages }}>
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
    };
  }

  return context;
};
