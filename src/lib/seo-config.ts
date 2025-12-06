/**
 * Centralized SEO Configuration for ErgopackIndia
 *
 * This module provides comprehensive SEO settings, keyword management,
 * and schema configurations for the pallet strapping industry.
 */

// =============================================================================
// SITE METADATA
// =============================================================================

export const siteConfig = {
  name: 'ErgoPack India',
  tagline: 'Verifiable Load Integrity',
  description:
    'ErgoPack India delivers Made in Germany precision for catastrophic shipment risk mitigation. Premium pallet strapping solutions for pharmaceutical, automotive, and electronics industries.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com',
  locale: 'en_IN',

  // Business information
  business: {
    legalName: 'ErgoPack India Pvt. Ltd.',
    foundingYear: 2010,
    phone: '+91-XXX-XXX-XXXX', // TODO: Update with actual phone
    email: 'contact@ergopack-india.com',
    address: {
      streetAddress: '', // TODO: Update with actual address
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '',
      addressCountry: 'IN',
    },
  },

  // Social media profiles
  socialProfiles: {
    linkedin: 'https://www.linkedin.com/company/ergopack-india',
    twitter: 'https://twitter.com/ergopackindia',
    youtube: 'https://www.youtube.com/@ergopackindia',
    facebook: 'https://www.facebook.com/ergopackindia',
  },
} as const;

// =============================================================================
// INDUSTRY-SPECIFIC KEYWORDS
// =============================================================================

export const industryKeywords = {
  // Primary keywords (high search volume, high intent)
  primary: [
    'pallet strapping machine',
    'pallet strapping solution',
    'automated strapping system',
    'industrial strapping machine India',
    'load securing equipment',
    'pallet wrapping machine',
  ],

  // Secondary keywords (medium volume, specific intent)
  secondary: [
    'labor cost reduction strapping',
    'ergonomic strapping tool',
    'battery powered strapping tool',
    'mobile strapping system',
    'warehouse strapping solution',
    'supply chain packaging',
  ],

  // Long-tail keywords (specific, high-conversion)
  longTail: [
    'reduce labor cost in packaging India',
    'advanced pallet strapping machinery',
    'German precision strapping equipment',
    'pharmaceutical pallet securing',
    'automotive parts strapping solution',
    'electronics shipment protection',
    'zero failure logistics India',
    'load integrity verification system',
    'Made in Germany strapping machine India',
    'pallet strapping for export shipments',
  ],

  // Industry-specific keywords
  industries: {
    pharmaceutical: [
      'pharmaceutical pallet strapping',
      'medicine packaging security',
      'pharma supply chain packaging',
      'GMP compliant strapping',
    ],
    automotive: [
      'automotive parts strapping',
      'car parts packaging solution',
      'auto component shipping security',
      'JIT delivery packaging',
    ],
    electronics: [
      'electronics pallet protection',
      'sensitive cargo strapping',
      'ESD safe packaging',
      'fragile goods strapping',
    ],
    fmcg: [
      'FMCG pallet strapping',
      'consumer goods packaging',
      'retail distribution strapping',
      'fast moving goods securing',
    ],
  },

  // Location-based keywords
  locations: [
    'pallet strapping machine Mumbai',
    'strapping solution Delhi',
    'industrial strapping Bangalore',
    'packaging equipment Chennai',
    'load securing Pune',
    'strapping machine Gujarat',
  ],
} as const;

// =============================================================================
// PAGE-SPECIFIC SEO CONFIGURATIONS
// =============================================================================

export type PageSEO = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  noIndex?: boolean;
};

export const pageSEOConfig: Record<string, PageSEO> = {
  // Homepage
  home: {
    title: 'ErgoPack India | Premium Pallet Strapping Solutions | Made in Germany',
    description:
      "India's leading supplier of German-engineered pallet strapping machines. Reduce labor costs by 40%, eliminate shipment damage, and secure your supply chain with ErgoPack.",
    keywords: [...industryKeywords.primary, 'ErgoPack India', 'Made in Germany strapping'],
    ogImage: '/images/og/homepage.jpg',
  },

  // Products overview
  products: {
    title: 'Pallet Strapping Machines | Full Product Range | ErgoPack India',
    description:
      'Explore our complete range of pallet strapping machines - from mobile units to high-speed automated systems. Find the perfect solution for your industry.',
    keywords: [
      'pallet strapping machines',
      'strapping machine range',
      'industrial strapping products',
      'ErgoPack product catalog',
    ],
  },

  // Xpert Line
  xpertLine: {
    title: 'Xpert Line | Premium Automated Strapping Systems | ErgoPack India',
    description:
      'Xpert Line offers the highest performance strapping with advanced automation, IoT connectivity, and precision German engineering for demanding industrial applications.',
    keywords: [
      'Xpert strapping machine',
      'premium strapping system',
      'automated pallet strapping',
      'high performance strapping',
    ],
  },

  // Economy Line
  economyLine: {
    title: 'Economy Line | Cost-Effective Strapping Solutions | ErgoPack India',
    description:
      'Economy Line delivers German quality at accessible prices. Perfect for SMEs looking to upgrade from manual strapping to efficient semi-automated systems.',
    keywords: [
      'affordable strapping machine',
      'budget strapping solution',
      'SME packaging equipment',
      'cost effective strapping',
    ],
  },

  // Individual products
  '745e': {
    title: 'ErgoPack 745E | Heavy-Duty Electric Strapping | Economy Line',
    description:
      'The 745E is our most popular heavy-duty electric strapping machine. Perfect for high-volume operations requiring reliable, consistent strap tension.',
    keywords: ['745E strapping', 'heavy duty strapping machine', 'electric pallet strapper'],
  },

  '745x': {
    title: 'ErgoPack 745X | Premium Heavy-Duty Strapping | Xpert Line',
    description:
      'The 745X Xpert delivers ultimate performance with IoT connectivity, predictive maintenance, and industry-leading strap tension for the most demanding applications.',
    keywords: ['745X strapping', 'premium strapping machine', 'IoT strapping system'],
  },

  '726e': {
    title: 'ErgoPack 726E | Light-Duty Electric Strapping | Economy Line',
    description:
      'Compact and versatile, the 726E is ideal for light to medium-duty applications. Easy to operate with excellent strap cycle times.',
    keywords: ['726E strapping', 'light duty strapping', 'compact strapping machine'],
  },

  '726x': {
    title: 'ErgoPack 726X | Premium Light-Duty Strapping | Xpert Line',
    description:
      'The 726X combines compact design with Xpert-level performance. Smart features and enhanced durability for versatile applications.',
    keywords: ['726X strapping', 'premium compact strapper', 'versatile strapping'],
  },

  '713e': {
    title: 'ErgoPack 713E | Ultra-Light Strapping | Economy Line',
    description:
      'The most portable strapping solution in our lineup. The 713E is perfect for mobile operations and light-duty securing needs.',
    keywords: ['713E strapping', 'portable strapping tool', 'ultra light strapper'],
  },

  '713x': {
    title: 'ErgoPack 713X | Premium Portable Strapping | Xpert Line',
    description:
      'Xpert performance in the most portable form. The 713X offers advanced features in a lightweight, ergonomic design.',
    keywords: ['713X strapping', 'premium portable strapper', 'mobile strapping'],
  },

  go: {
    title: 'ErgoPack GO | Mobile Strapping System | Warehouse Flexibility',
    description:
      'Take strapping anywhere in your facility with ErgoPack GO. The ultimate mobile solution for flexible warehouse operations.',
    keywords: [
      'ErgoPack GO',
      'mobile strapping',
      'warehouse strapping',
      'portable pallet strapper',
    ],
  },

  re: {
    title: 'ErgoPack RE | Rechargeable Strapping | Battery-Powered Mobility',
    description:
      'Cordless freedom with the ErgoPack RE. Battery-powered strapping for locations without power access.',
    keywords: ['ErgoPack RE', 'battery strapping', 'cordless strapper', 'rechargeable strapping'],
  },

  // Other pages
  industries: {
    title: 'Industries We Serve | Pharmaceutical, Automotive, Electronics | ErgoPack',
    description:
      'ErgoPack solutions for every industry. Specialized pallet strapping for pharmaceutical, automotive, electronics, FMCG, and logistics sectors.',
    keywords: [
      'pharmaceutical strapping',
      'automotive packaging',
      'electronics shipping',
      'industry strapping solutions',
    ],
  },

  contact: {
    title: 'Contact ErgoPack India | Get a Quote | Expert Consultation',
    description:
      'Contact our team for a personalized consultation. Get expert advice on the right strapping solution for your needs and request a competitive quote.',
    keywords: ['contact ErgoPack', 'strapping quote', 'packaging consultation'],
  },

  about: {
    title: 'About ErgoPack India | German Engineering, Local Expertise',
    description:
      'Learn about ErgoPack India - bringing world-class German strapping technology to Indian industries since 2010.',
    keywords: ['about ErgoPack', 'company history', 'German strapping India'],
  },

  blog: {
    title: 'Strapping Insights Blog | Industry Tips & Product Updates | ErgoPack',
    description:
      'Expert insights on pallet strapping, packaging optimization, and supply chain efficiency. Stay updated with the latest from ErgoPack.',
    keywords: ['strapping blog', 'packaging tips', 'supply chain insights'],
  },

  compare: {
    title: 'Compare Strapping Machines | Find Your Perfect Match | ErgoPack',
    description:
      'Compare ErgoPack strapping machines side-by-side. Find the perfect strapping solution based on your specific requirements.',
    keywords: ['compare strapping machines', 'strapping comparison', 'find strapping machine'],
  },
} as const;

// =============================================================================
// STRUCTURED DATA TEMPLATES
// =============================================================================

export const schemaTemplates = {
  // FAQ items for pallet strapping
  faqItems: [
    {
      question: 'What is pallet strapping and why is it important?',
      answer:
        'Pallet strapping is the process of securing goods on pallets using plastic or steel straps to prevent shifting during transport. It is critical for preventing cargo damage, ensuring worker safety, and maintaining supply chain integrity.',
    },
    {
      question: 'How much can I save by switching to automated strapping?',
      answer:
        'Most companies see 30-50% reduction in labor costs after switching to automated strapping. Additional savings come from reduced product damage, fewer insurance claims, and improved operational efficiency.',
    },
    {
      question: 'What industries benefit most from ErgoPack strapping solutions?',
      answer:
        'ErgoPack solutions are used across pharmaceutical, automotive, electronics, FMCG, and logistics industries. Any business shipping palletized goods can benefit from improved load security and reduced labor costs.',
    },
    {
      question: 'What is the difference between Xpert Line and Economy Line?',
      answer:
        'Xpert Line offers premium features like IoT connectivity, predictive maintenance, and advanced tension control. Economy Line provides reliable German engineering at accessible prices for cost-conscious operations.',
    },
    {
      question: 'Do ErgoPack machines require special maintenance?',
      answer:
        'ErgoPack machines are designed for low maintenance with easily replaceable wear parts. We provide comprehensive training and spare parts availability across India.',
    },
    {
      question: 'Can I get a demonstration before purchasing?',
      answer:
        'Yes! We offer on-site demonstrations and trial periods. Contact us to schedule a demonstration at your facility with your actual products.',
    },
    {
      question: 'What warranty do ErgoPack machines come with?',
      answer:
        'All ErgoPack machines come with a comprehensive warranty covering manufacturing defects. Extended warranty packages are available for additional peace of mind.',
    },
    {
      question: 'How long does it take to train operators?',
      answer:
        'Most operators become proficient within 1-2 hours. Our machines are designed with intuitive controls and we provide comprehensive training as part of every purchase.',
    },
  ],

  // Product review template
  productReview: {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '4.8',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'ErgoPack India',
    },
  },

  // Aggregate rating template
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get page-specific SEO metadata
 */
export function getPageSEO(pageKey: string): PageSEO {
  return (
    pageSEOConfig[pageKey] || {
      title: `${pageKey} | ErgoPack India`,
      description: siteConfig.description,
      keywords: industryKeywords.primary,
    }
  );
}

/**
 * Generate full keyword string from arrays
 */
export function generateKeywordString(keywords: string[]): string {
  return keywords.join(', ');
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get all keywords for a page including industry keywords
 */
export function getAllPageKeywords(pageKey: string): string[] {
  const pageSeo = getPageSEO(pageKey);
  return [...pageSeo.keywords, ...industryKeywords.secondary.slice(0, 3), siteConfig.name];
}
