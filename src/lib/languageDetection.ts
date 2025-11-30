import { languageConfig } from '@/config/site';

const { storageKey, supported, countryLanguageMap, ipApi } = languageConfig;

export type SupportedLanguage = typeof supported[number];
export type DetectionSource = 'localStorage' | 'browser' | 'ip' | 'default';

export interface DetectionResult {
  language: SupportedLanguage;
  source: DetectionSource;
}

/**
 * Check localStorage for stored language preference
 */
export function getStoredLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && supported.includes(stored as SupportedLanguage)) {
      return stored as SupportedLanguage;
    }
  } catch {
    // localStorage may be blocked
  }

  return null;
}

/**
 * Get language from browser settings (navigator.language)
 */
export function getBrowserLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null;

  try {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (supported.includes(browserLang as SupportedLanguage)) {
      return browserLang as SupportedLanguage;
    }
  } catch {
    // navigator may not be available
  }

  return null;
}

/**
 * Map country code to supported language
 */
export function mapCountryToLanguage(countryCode: string): SupportedLanguage {
  const upperCode = countryCode.toUpperCase() as keyof typeof countryLanguageMap;
  const mappedLang = countryLanguageMap[upperCode];
  return mappedLang && supported.includes(mappedLang as SupportedLanguage)
    ? (mappedLang as SupportedLanguage)
    : 'en';
}

/**
 * Fetch language based on IP geolocation
 * Only called when browser language is not in supported list
 */
export async function getIpLanguage(): Promise<SupportedLanguage | null> {
  if (!ipApi.enabled || typeof window === 'undefined') return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ipApi.timeout);

  try {
    const response = await fetch(ipApi.endpoint, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (data.country_code) {
      return mapCountryToLanguage(data.country_code);
    }
  } catch {
    clearTimeout(timeoutId);
    // Silently fail - IP detection is optional enhancement
  }

  return null;
}

/**
 * Store language preference in localStorage
 */
export function storeLanguage(language: SupportedLanguage): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(storageKey, language);
  } catch {
    // localStorage may be blocked
  }
}

/**
 * Full detection chain with priority:
 * 1. localStorage (user's explicit choice) - INSTANT
 * 2. navigator.language (browser preference) - INSTANT
 * 3. IP Geolocation API (only when browser lang not supported) - ASYNC
 * 4. Default: 'en' - FALLBACK
 */
export async function detectLanguage(): Promise<DetectionResult> {
  // 1. Check localStorage first (user's explicit choice)
  const stored = getStoredLanguage();
  if (stored) {
    return { language: stored, source: 'localStorage' };
  }

  // 2. Check browser language (primary detection method)
  const browser = getBrowserLanguage();
  if (browser) {
    return { language: browser, source: 'browser' };
  }

  // 3. Try IP geolocation (only when browser language not supported)
  const ipLang = await getIpLanguage();
  if (ipLang) {
    // Store IP-detected language so we don't call API again
    storeLanguage(ipLang);
    return { language: ipLang, source: 'ip' };
  }

  // 4. Default fallback
  return { language: 'en', source: 'default' };
}

/**
 * Synchronous initial detection (for instant render)
 * Only uses localStorage and browser detection
 */
export function detectLanguageSync(): DetectionResult {
  const stored = getStoredLanguage();
  if (stored) {
    return { language: stored, source: 'localStorage' };
  }

  const browser = getBrowserLanguage();
  if (browser) {
    return { language: browser, source: 'browser' };
  }

  return { language: 'en', source: 'default' };
}

/**
 * Check if async IP detection is needed
 * Returns true only if we have no stored preference AND browser language is not supported
 */
export function needsAsyncDetection(): boolean {
  return !getStoredLanguage() && !getBrowserLanguage();
}
