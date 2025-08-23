import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './useLanguage';

interface PerformanceMetrics {
  languageChanges: number;
  averageChangeTime: number;
  lastChangeTime: number;
  totalChangeTime: number;
}

export const useTranslationPerformance = () => {
  const { currentLanguage } = useLanguage();
  const metrics = useRef<PerformanceMetrics>({
    languageChanges: 0,
    averageChangeTime: 0,
    lastChangeTime: 0,
    totalChangeTime: 0
  });
  const changeStartTime = useRef<number>(0);

  const startLanguageChange = useCallback(() => {
    changeStartTime.current = performance.now();
  }, []);

  const endLanguageChange = useCallback(() => {
    const changeTime = performance.now() - changeStartTime.current;
    const currentMetrics = metrics.current;
    
    currentMetrics.languageChanges++;
    currentMetrics.lastChangeTime = changeTime;
    currentMetrics.totalChangeTime += changeTime;
    currentMetrics.averageChangeTime = currentMetrics.totalChangeTime / currentMetrics.languageChanges;
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Language change performance:`, {
        changeTime: `${changeTime.toFixed(2)}ms`,
        average: `${currentMetrics.averageChangeTime.toFixed(2)}ms`,
        total: currentMetrics.languageChanges
      });
    }
  }, []);

  // Monitor language changes
  useEffect(() => {
    if (metrics.current.languageChanges > 0) {
      endLanguageChange();
    }
  }, [currentLanguage, endLanguageChange]);

  const getPerformanceReport = useCallback(() => {
    return {
      ...metrics.current,
      currentLanguage,
      performanceScore: metrics.current.averageChangeTime < 100 ? 'Excellent' : 
                       metrics.current.averageChangeTime < 200 ? 'Good' : 
                       metrics.current.averageChangeTime < 500 ? 'Fair' : 'Poor'
    };
  }, [currentLanguage]);

  return {
    startLanguageChange,
    endLanguageChange,
    getPerformanceReport,
    metrics: metrics.current
  };
};
