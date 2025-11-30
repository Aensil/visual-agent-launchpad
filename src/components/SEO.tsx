import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  domains,
  seoConfig,
  openGraphConfig,
  twitterConfig,
  structuredData,
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

  // Determine image URL based on page
  const ogImage = openGraphConfig.image;

  // Build structured data array
  const structuredDataArray = [
    structuredData.organization,
    structuredData.softwareApplication,
  ];

  return (
    <Helmet>
      {/* Basic HTML Attributes */}
      <html lang={language} />

      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Vuen AI" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={openGraphConfig.type} />
      <meta property="og:site_name" content={openGraphConfig.siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={page === 'home' ? openGraphConfig.title : pageTitle} />
      <meta property="og:description" content={page === 'home' ? openGraphConfig.description : pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={openGraphConfig.imageAlt} />
      <meta property="og:image:width" content={openGraphConfig.imageWidth} />
      <meta property="og:image:height" content={openGraphConfig.imageHeight} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterConfig.card} />
      <meta name="twitter:site" content={twitterConfig.site} />
      <meta name="twitter:creator" content={twitterConfig.creator} />
      <meta name="twitter:title" content={page === 'home' ? twitterConfig.title : pageTitle} />
      <meta name="twitter:description" content={page === 'home' ? twitterConfig.description : pageDescription} />
      <meta name="twitter:image" content={twitterConfig.image} />
      <meta name="twitter:image:alt" content={twitterConfig.imageAlt} />

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
