import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="glass-panel px-3 py-2 flex items-center gap-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              px-2 py-1 text-sm font-medium rounded transition-all duration-200
              ${currentLanguage === lang.code
                ? 'text-primary-cyan bg-primary-cyan/10'
                : 'text-text-muted hover:text-text-primary'
              }
            `}
            aria-label={`Switch to ${lang.name}`}
            aria-pressed={currentLanguage === lang.code}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
