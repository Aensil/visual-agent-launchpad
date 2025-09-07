import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  language?: 'en' | 'es';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = "https://vuen.ai/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png",
  url = "https://vuen.ai",
  type = "website",
  language = "en"
}) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('meta.title');
  const defaultDescription = t('meta.description');
  const defaultKeywords = "AI, voice interface, visual agents, no-code, real estate, VUEN AI, artificial intelligence, voice commands, interface builder";
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image;
  const finalUrl = url;
  const finalType = type;
  const finalLanguage = language;

  // Structured data for the page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": finalType === "product" ? "Product" : "WebPage",
    "name": finalTitle,
    "description": finalDescription,
    "url": finalUrl,
    "image": finalImage,
    "inLanguage": finalLanguage === "es" ? "es-ES" : "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "VUEN AI",
      "url": "https://vuen.ai"
    },
    "about": {
      "@type": "Organization",
      "name": "VUEN AI",
      "url": "https://vuen.ai",
      "logo": "https://vuen.ai/lovable-uploads/e01af8db-8735-42de-adf8-38bb57beb961.png"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="VUEN AI" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={finalLanguage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="VUEN AI" />
      <meta property="og:locale" content={finalLanguage === "es" ? "es_ES" : "en_US"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vuen_ai" />
      <meta name="twitter:creator" content="@vuen_ai" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Language Alternates for i18n */}
      <link rel="alternate" hrefLang="en" href="https://vuen.ai/?lang=en" />
      <link rel="alternate" hrefLang="es" href="https://vuen.ai/?lang=es" />
      <link rel="alternate" hrefLang="x-default" href="https://vuen.ai" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://real-estate.vuen.ai" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//real-estate.vuen.ai" />
    </Helmet>
  );
};

export default SEO;
