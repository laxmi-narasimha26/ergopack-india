import React from 'react';

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
}

interface WebsiteSchema {
  url: string;
  name: string;
  description: string;
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface ProductSchema {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: {
    '@type': string;
    availability: string;
    priceCurrency?: string;
    price?: string;
  };
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface JsonLdProps {
  type: 'organization' | 'website' | 'product' | 'breadcrumb' | 'article';
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = {};

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
        },
        description: data.description,
        ...(data.contactPoint && {
          contactPoint: {
            '@type': 'ContactPoint',
            ...data.contactPoint,
          },
        }),
        ...(data.sameAs && { sameAs: data.sameAs }),
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
        ...(data.potentialAction && {
          potentialAction: {
            '@type': 'SearchAction',
            ...data.potentialAction,
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
        ...(data.image && {
          image: data.image,
        }),
        ...(data.brand && {
          brand: {
            '@type': 'Brand',
            name: data.brand,
          },
        }),
        ...(data.offers && {
          offers: {
            '@type': 'Offer',
            ...data.offers,
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
          '@type': data.author?.type || 'Person',
          name: data.author?.name,
        },
        publisher: {
          '@type': 'Organization',
          name: data.publisher?.name,
          logo: {
            '@type': 'ImageObject',
            url: data.publisher?.logo,
          },
        },
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

// Pre-configured schemas for common pages
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="organization"
      data={{
        name: 'ErgoPack India',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description:
          'Made in Germany precision for catastrophic shipment risk mitigation and brand protection at the final, critical checkpoint of your supply chain.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-XXX-XXX-XXXX',
          contactType: 'Customer Service',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
        sameAs: [
          // Add social media URLs
          // 'https://www.linkedin.com/company/ergopack-india',
          // 'https://twitter.com/ergopackindia',
        ],
      }}
    />
  );
}

export function WebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';

  return (
    <JsonLd
      type="website"
      data={{
        url: baseUrl,
        name: 'ErgoPack India',
        description: "The C-Suite's Control System for Zero-Failure Logistics",
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
