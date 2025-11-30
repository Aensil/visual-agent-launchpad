import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  language?: string;
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({
  language = 'en',
  title = 'VUEN AI - Visual Data Agent | Talk to Your Data',
  description = 'Stop wasting meetings waiting for dashboards. VUEN AI turns you into the person who asks a question out loud and gets the answer on screen in seconds.',
}) => {
  const siteUrl = 'https://vuen.ai';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VUEN AI',
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '3500',
      priceCurrency: 'USD',
    },
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Theme color for browser UI */}
      <meta name="theme-color" content="#05070F" />
      <meta name="msapplication-TileColor" content="#05070F" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default SEO;
