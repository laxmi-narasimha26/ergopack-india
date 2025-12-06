import React from 'react';
import { siteConfig, schemaTemplates } from '@/lib/seo-config';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductData {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  brand?: string;
  category?: string;
  offers?: {
    availability?: string;
    priceCurrency?: string;
    price?: string;
    priceValidUntil?: string;
  };
  aggregateRating?: {
    ratingValue: string | number;
    reviewCount: string | number;
  };
}

interface ArticleData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    type?: string;
    name: string;
  };
  publisher?: {
    name: string;
    logo: string;
  };
}

type SchemaType =
  | 'organization'
  | 'website'
  | 'product'
  | 'breadcrumb'
  | 'article'
  | 'faq'
  | 'localBusiness'
  | 'service';

interface JsonLdProps {
  type: SchemaType;
  data: any;
}

// =============================================================================
// MAIN JSON-LD COMPONENT
// =============================================================================

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, any> = {};
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  switch (type) {
    case 'organization':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${data.url}#organization`,
        name: data.name,
        url: data.url,
        logo: {
          '@type': 'ImageObject',
          url: data.logo,
          width: 600,
          height: 60,
        },
        description: data.description,
        ...(data.contactPoint && {
          contactPoint: {
            '@type': 'ContactPoint',
            ...data.contactPoint,
          },
        }),
        ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
        ...(data.address && {
          address: {
            '@type': 'PostalAddress',
            ...data.address,
          },
        }),
      };
      break;

    case 'website':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${data.url}#website`,
        url: data.url,
        name: data.name,
        description: data.description,
        publisher: {
          '@id': `${data.url}#organization`,
        },
        inLanguage: 'en-IN',
        ...(data.potentialAction && {
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                data.potentialAction.target?.urlTemplate ||
                `${data.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      };
      break;

    case 'product':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        ...(data.image && { image: data.image }),
        ...(data.sku && { sku: data.sku }),
        ...(data.category && { category: data.category }),
        brand: {
          '@type': 'Brand',
          name: data.brand || 'ErgoPack',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'ErgoPack GmbH',
          url: 'https://www.ergopack.de',
        },
        ...(data.offers && {
          offers: {
            '@type': 'Offer',
            availability: data.offers.availability || 'https://schema.org/InStock',
            priceCurrency: data.offers.priceCurrency || 'INR',
            ...(data.offers.price && { price: data.offers.price }),
            ...(data.offers.priceValidUntil && { priceValidUntil: data.offers.priceValidUntil }),
            seller: {
              '@type': 'Organization',
              name: 'ErgoPack India',
            },
          },
        }),
        ...(data.aggregateRating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.aggregateRating.ratingValue,
            reviewCount: data.aggregateRating.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }),
      };
      break;

    case 'breadcrumb':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: BreadcrumbItem, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      };
      break;

    case 'article':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.headline,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: {
          '@type': data.author?.type || 'Organization',
          name: data.author?.name || 'ErgoPack India',
        },
        publisher: {
          '@type': 'Organization',
          name: data.publisher?.name || 'ErgoPack India',
          logo: {
            '@type': 'ImageObject',
            url: data.publisher?.logo || `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url || baseUrl,
        },
      };
      break;

    case 'faq':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.items.map((item: FAQItem) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
      break;

    case 'localBusiness':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${data.url}#localbusiness`,
        name: data.name,
        description: data.description,
        url: data.url,
        telephone: data.telephone,
        email: data.email,
        image: data.image || `${data.url}/logo.png`,
        priceRange: data.priceRange || '₹₹₹',
        ...(data.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address.streetAddress,
            addressLocality: data.address.addressLocality,
            addressRegion: data.address.addressRegion,
            postalCode: data.address.postalCode,
            addressCountry: data.address.addressCountry,
          },
        }),
        ...(data.geo && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.geo.latitude,
            longitude: data.geo.longitude,
          },
        }),
        ...(data.openingHours && {
          openingHoursSpecification: data.openingHours.map((hours: any) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hours.dayOfWeek,
            opens: hours.opens,
            closes: hours.closes,
          })),
        }),
        ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
      };
      break;

    case 'service':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'ErgoPack India',
          url: baseUrl,
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        ...(data.serviceType && { serviceType: data.serviceType }),
        ...(data.offers && {
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
          },
        }),
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// PRE-CONFIGURED SCHEMA COMPONENTS
// =============================================================================

/**
 * Organization Schema - Main business identity
 */
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="organization"
      data={{
        name: siteConfig.name,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: siteConfig.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.business.phone,
          contactType: 'Customer Service',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
          contactOption: 'TollFree',
        },
        address: siteConfig.business.address,
        sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
      }}
    />
  );
}

/**
 * Website Schema - Site-wide search action
 */
export function WebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="website"
      data={{
        url: baseUrl,
        name: siteConfig.name,
        description: siteConfig.tagline,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

/**
 * LocalBusiness Schema - For local SEO in India
 */
export function LocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="localBusiness"
      data={{
        name: siteConfig.business.legalName,
        description: siteConfig.description,
        url: baseUrl,
        telephone: siteConfig.business.phone,
        email: siteConfig.business.email,
        image: `${baseUrl}/logo.png`,
        priceRange: '₹₹₹',
        address: siteConfig.business.address,
        openingHours: [
          {
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            dayOfWeek: 'Saturday',
            opens: '10:00',
            closes: '14:00',
          },
        ],
        sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
      }}
    />
  );
}

/**
 * FAQ Schema - For homepage and product pages
 */
export function FAQSchema({ items }: { items?: FAQItem[] }) {
  const faqItems = items || schemaTemplates.faqItems;

  return <JsonLd type="faq" data={{ items: faqItems }} />;
}

/**
 * Product Schema - For individual product pages
 */
export function ProductSchema({ product }: { product: ProductData }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="product"
      data={{
        ...product,
        brand: product.brand || 'ErgoPack',
        image: product.image ? `${baseUrl}${product.image}` : undefined,
        aggregateRating: product.aggregateRating || schemaTemplates.aggregateRating,
      }}
    />
  );
}

/**
 * Breadcrumb Schema - For navigation structure
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  const fullItems = items.map((item) => ({
    ...item,
    item: item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`,
  }));

  return <JsonLd type="breadcrumb" data={{ items: fullItems }} />;
}

/**
 * Article Schema - For blog posts
 */
export function ArticleSchema({ article }: { article: ArticleData }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="article"
      data={{
        ...article,
        publisher: {
          name: 'ErgoPack India',
          logo: `${baseUrl}/logo.png`,
        },
        url: baseUrl,
      }}
    />
  );
}

/**
 * Service Schema - For service offerings
 */
export function ServiceSchema({
  name,
  description,
  serviceType,
}: {
  name: string;
  description: string;
  serviceType?: string;
}) {
  return (
    <JsonLd
      type="service"
      data={{
        name,
        description,
        serviceType,
        offers: true,
      }}
    />
  );
}
