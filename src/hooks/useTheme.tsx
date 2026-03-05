import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
}

const STORAGE_KEY = 'vuen-theme-preference';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {}
  return 'system';
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? getSystemTheme() : preference;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(getStoredPreference);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(getStoredPreference()));

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Update meta theme-color for browser chrome
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#05070F' : '#EFF3FA');
    }
  }, [theme]);

  // Listen for system theme changes when preference is 'system'
  useEffect(() => {
    if (preference !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  const setPreference = useCallback((pref: ThemePreference) => {
    setPreferenceState(pref);
    setTheme(resolveTheme(pref));
    try {
      localStorage.setItem(STORAGE_KEY, pref);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: 'dark',
      preference: 'system',
      setPreference: () => {},
    };
  }
  return context;
};
