import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  domains,
  seoConfig,
  openGraphConfig,
  twitterConfig,
  structuredData,
  localeConfig,
  type PageKey,
} from '@/config/site';

interface SEOProps {
  language?: string;
  page?: PageKey;
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  language = 'en',
  page = 'home',
  title,
  description,
  path,
  noindex = false,
}) => {
  const pageConfig = seoConfig.pages[page] || seoConfig.pages.home;

  // Use provided values or fall back to page config
  const pageTitle = title || pageConfig.title;
  const pageDescription = description || pageConfig.description;
  const pagePath = path || pageConfig.path;
  const canonicalUrl = `${domains.main}${pagePath}`;

  // Get keywords if available on the page config
  const keywords = 'keywords' in pageConfig ? pageConfig.keywords : seoConfig.pages.home.keywords;

  // Determine image URL based on page
  const ogImage = openGraphConfig.image;

  // Build structured data array
  const structuredDataArray = [
    structuredData.organization,
    structuredData.softwareApplication,
  ];

  // Build alternate language URLs for hreflang
  const alternateUrls = localeConfig.supported.map(locale => ({
    locale,
    hreflang: localeConfig.hreflang[locale],
    url: locale === 'en' ? canonicalUrl : `${domains.main}/${locale}${pagePath}`,
  }));

  return (
    <Helmet>
      {/* Basic HTML Attributes */}
      <html lang={language} />

      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Vuen AI" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang for language alternates */}
      {alternateUrls.map(({ hreflang, url }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={openGraphConfig.type} />
      <meta property="og:site_name" content={openGraphConfig.siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={page === 'home' ? openGraphConfig.title : pageTitle} />
      <meta property="og:description" content={page === 'home' ? openGraphConfig.description : pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={openGraphConfig.imageAlt} />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:locale" content={language === 'es' ? 'es_CO' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterConfig.card} />
      <meta name="twitter:site" content={twitterConfig.site} />
      <meta name="twitter:creator" content={twitterConfig.creator} />
      <meta name="twitter:title" content={page === 'home' ? twitterConfig.title : pageTitle} />
      <meta name="twitter:description" content={page === 'home' ? twitterConfig.description : pageDescription} />
      <meta name="twitter:image" content={twitterConfig.image} />

      {/* Theme and App Colors */}
      <meta name="theme-color" content={seoConfig.default.themeColor} />
      <meta name="msapplication-TileColor" content={seoConfig.default.themeColor} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;
