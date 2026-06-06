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
  /** Machine-readable spec pairs (e.g. Tension Force, Strap Width, Cycle Time) for GEO extraction */
  additionalProperty?: Array<{ name: string; value: string }>;
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
  | 'service'
  | 'video';

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
        ...(Array.isArray(data.additionalProperty) &&
          data.additionalProperty.length > 0 && {
            additionalProperty: data.additionalProperty.map(
              (prop: { name: string; value: string }) => ({
                '@type': 'PropertyValue',
                name: prop.name,
                value: prop.value,
              })
            ),
          }),
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
      // Google limits FAQ *rich-result display* in classic SERPs, but FAQPage
      // schema remains valid and is heavily used by AI answer engines (ChatGPT,
      // Perplexity, Google AI Overviews) for extraction. Emitting it is core to
      // the AEO/GEO strategy.
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (data.items || []).map((item: FAQItem) => ({
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
        ...(data.url && {
          url: data.url.startsWith('http') ? data.url : `${baseUrl}${data.url}`,
        }),
        ...(data.image && {
          image: data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
        }),
        provider: {
          '@type': 'Organization',
          name: 'ErgoPack India',
          url: baseUrl,
        },
        areaServed:
          Array.isArray(data.areaServed) && data.areaServed.length > 0
            ? data.areaServed.map((place: string) => ({
                '@type': 'Place',
                name: place,
              }))
            : {
                '@type': 'Country',
                name: 'India',
              },
        ...(data.serviceType && { serviceType: data.serviceType }),
      };
      break;

    case 'video': {
      const toAbsolute = (url: string) => (url.startsWith('http') ? url : `${baseUrl}${url}`);
      const thumbs = (Array.isArray(data.thumbnailUrl) ? data.thumbnailUrl : [data.thumbnailUrl])
        .filter(Boolean)
        .map(toAbsolute);
      schema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: data.name,
        description: data.description,
        thumbnailUrl: thumbs,
        uploadDate: data.uploadDate,
        ...(data.duration && { duration: data.duration }),
        ...(data.contentUrl && { contentUrl: toAbsolute(data.contentUrl) }),
        ...(data.embedUrl && { embedUrl: toAbsolute(data.embedUrl) }),
        publisher: {
          '@type': 'Organization',
          name: 'ErgoPack India',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
      };
      break;
    }
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
          contactType: 'Sales',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
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
        geo: siteConfig.business.geo,
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
  const hasEligibleRichResultData =
    Boolean(product.offers?.price) || Boolean(product.aggregateRating);

  // B2B inquiry pages without a public price or visible ratings should not emit
  // Product rich result markup. That creates invalid Search Console items.
  if (!hasEligibleRichResultData) {
    return null;
  }

  return (
    <JsonLd
      type="product"
      data={{
        ...product,
        brand: product.brand || 'ErgoPack',
        image: product.image
          ? product.image.startsWith('http')
            ? product.image
            : `${baseUrl}${product.image}`
          : undefined,
        aggregateRating: product.aggregateRating,
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
 * Video Schema - For ChainLance demos and 3D tours (captures video search + GEO)
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return (
    <JsonLd
      type="video"
      data={{ name, description, thumbnailUrl, uploadDate, duration, contentUrl, embedUrl }}
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
  areaServed,
}: {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return (
    <JsonLd
      type="service"
      data={{
        name,
        description,
        serviceType,
        areaServed,
      }}
    />
  );
}
