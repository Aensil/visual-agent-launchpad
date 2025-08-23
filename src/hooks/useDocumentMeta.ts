import { useEffect, useRef } from 'react';
import { useLanguage } from './useLanguage';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export const useDocumentMeta = () => {
  const { t, currentLanguage, ready } = useLanguage();
  const previousLanguage = useRef<string>('');

  useEffect(() => {
    if (!ready || previousLanguage.current === currentLanguage) return;

    try {
      // Update document language
      document.documentElement.lang = currentLanguage;
      
      // Define all meta tags to update
      const metaTags: MetaTag[] = [
        { name: 'description', content: t('meta.description') },
        { property: 'og:title', content: t('meta.title') },
        { property: 'og:description', content: t('meta.description') },
        { property: 'og:locale', content: currentLanguage === 'es' ? 'es_ES' : 'en_US' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:title', content: t('meta.title') },
        { name: 'twitter:description', content: t('meta.description') }
      ];

      // Update or create meta tags
      metaTags.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        let metaTag = document.querySelector(selector) as HTMLMetaElement;
        
        if (!metaTag) {
          metaTag = document.createElement('meta');
          if (name) metaTag.name = name;
          if (property) metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        
        metaTag.content = content;
      });

      // Update title
      document.title = t('meta.title');
      
      // Update previous language reference
      previousLanguage.current = currentLanguage;
      
      console.log(`Meta tags updated for language: ${currentLanguage}`);
    } catch (error) {
      console.error('Failed to update document meta tags:', error);
    }
  }, [currentLanguage, t, ready]);

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      // Reset to default language if needed
      if (previousLanguage.current !== 'en') {
        document.documentElement.lang = 'en';
      }
    };
  }, []);
};
