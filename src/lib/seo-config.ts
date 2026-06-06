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
  tagline: 'High-Speed Automated Pallet Strapping — Strap Pallets in Under 40 Seconds',
  description:
    'ErgoPack India supplies high-speed mobile pallet strapping machines that secure a pallet in under 40 seconds — a 66% cut in strapping time versus manual methods. Machine-calibrated tension up to 2500N eliminates transit damage and shipment rejections, slashing labor and material costs for Indian manufacturing and export operations.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com',
  locale: 'en_IN',

  // Business information
  business: {
    legalName: 'ErgoPack India (Benz Packaging Solutions Pvt. Ltd.)',
    foundingYear: 2010,
    phone: '+91 9899144488',
    email: 'marketing@benz-packaging.com',
    address: {
      streetAddress: 'Plot No. 4, Sector 37, IMT Manesar',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.3588,
      longitude: 76.934,
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
  // Primary keywords (high search volume, high intent) — efficiency / ROI led
  primary: [
    'automated pallet strapping machine India',
    'mobile pallet strapping machine',
    'pallet strapping machine',
    'semi automatic pallet strapping machine',
    'high tension pallet strapping machine',
    'industrial pallet strapping machine India',
    'pallet strapping machine price India',
    'battery operated pallet strapping machine',
  ],

  // Secondary keywords (medium volume, specific intent)
  secondary: [
    'reduce pallet strapping time',
    'automated vs manual pallet strapping cost',
    'pallet strapping machine ROI',
    'reduce transit damage pallet',
    'sealless pallet strapping machine',
    'friction weld strapping',
    'PET strapping machine',
    'heavy duty pallet strapping machine',
    'labor cost reduction packaging',
    'reduce shipment rejections',
  ],

  // Long-tail keywords (specific, high-conversion)
  longTail: [
    'automated pallet strapping machine India price',
    'how to reduce pallet strapping time',
    'manual vs automatic pallet strapping cost comparison',
    'alternative to broomstick strapping method',
    'pallet strapping vs stretch wrapping cost',
    'best pallet strapping machine for heavy loads',
    'PET vs steel strapping for exports',
    'friction weld vs metal clip strapping',
    'pallet strapping machine hsn code',
    'pallet strapping machine gst rate india',
    'high tension pallet strapping machine Pune',
    'pallet strapping machine Chennai',
    'mobile pallet strapping machine vs stationary arch',
    'reduce cargo damage during transit India',
    'pallet strapping machine for automotive parts export',
    'corrugated box bundles strapping machine',
    'ChainLance technology pallet strapping',
    'strap pallet in 40 seconds',
    'reduce labor dependency packaging line',
    'Made in Germany pallet strapping machine India',
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

  // Location-based keywords (Chennai/Pune prioritised — key export & auto hubs)
  locations: [
    'pallet strapping machine Chennai',
    'pallet strapping machine Pune',
    'pallet strapping machine Mumbai',
    'pallet strapping machine Delhi NCR',
    'pallet strapping machine Bangalore',
    'pallet strapping machine Gujarat',
    'heavy machinery export packaging Chennai',
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
    title: 'Automated Pallet Strapping Machine India | Strap in 40s | ErgoPack',
    description:
      'Cut pallet strapping time from 120s to under 40s with ErgoPack mobile machines. Machine-calibrated tension up to 2500N eliminates transit damage and shipment rejections. Compare the 726X, GO, and 700 for Indian manufacturing and export.',
    keywords: [
      ...industryKeywords.primary,
      'strap pallet in 40 seconds',
      'reduce transit damage',
      'pallet strapping machine ROI',
      'ErgoPack India',
    ],
    ogImage: '/images/og/homepage.jpg',
  },

  // Products overview
  products: {
    title: 'Mobile Pallet Strapping Machines India | ErgoPack 726X, GO, 700',
    description:
      'High-speed mobile pallet strapping machines that secure a pallet in under 40 seconds. Compare the ErgoPack 726X (up to 2500N, friction-weld sealing), the electronic GO, and the manual-crank 700.',
    keywords: [
      'mobile pallet strapping machine India',
      'automated pallet strapping machine',
      'high tension pallet strapping machine',
      'ErgoPack 726X GO 700',
    ],
  },

  // Xpert Line
  xpertLine: {
    title: 'X-pert Line | Premium Pallet Strapping | ErgoPack',
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
    title: 'ErgoPack 726X | Automated Pallet Strapping Machine | Up to 2500N',
    description:
      'The ErgoPack 726X straps a pallet in under 40 seconds with electronically controlled tension from 400N to 2500N and sealless friction-weld sealing — eliminating transit damage on heavy and export loads. 12–16mm PP/PET.',
    keywords: [
      'ErgoPack 726X price India',
      'automated pallet strapping machine',
      'high tension strapping machine 2500N',
      '16mm PET strapping machine',
    ],
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
    title: 'ErgoPack GO | Mobile Pallet Strapping Machine | Electronic ChainLance',
    description:
      'The ErgoPack GO uses an electronic joystick-driven ChainLance to route the strap under and around the pallet in seconds — one operator does the work of three. Strap pallets in under 45 seconds; use your own sealing tools.',
    keywords: [
      'ErgoPack GO',
      'mobile pallet strapping machine India',
      'electronic ChainLance pallet strapping',
      'battery operated pallet strapping machine',
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
    title: 'Pallet Strapping Blog | ErgoPack India',
    description:
      'Expert insights on pallet strapping, ergonomic handling, automatic pallet strapping, workspace efficiency, and warehouse automation.',
    keywords: [
      'pallet strapping blog',
      'automatic pallet strapping',
      'workspace efficiency',
      'warehouse automation insights',
    ],
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
  // FAQ items for pallet strapping — efficiency / ROI / transit / compliance led (AEO)
  faqItems: [
    {
      question: 'How much time does an automated pallet strapping machine save?',
      answer:
        'The ErgoPack automated ChainLance system reduces pallet strapping time from a manual average of about 120 seconds down to under 40 seconds per pallet — a 66% reduction in cycle time. A single operator achieves the throughput of a two- to three-person manual strapping team, roughly doubling end-of-line dispatch capacity.',
    },
    {
      question: 'How does automated pallet strapping reduce transit damage?',
      answer:
        'Automated machines apply consistent, machine-calibrated tension — from 150N up to 2500N on the ErgoPack 726X — directly to the load, joining it to the pallet base as a single rigid unit. This eliminates the load shifting caused by inconsistent manual tensioning and hand-applied stretch film, which is the primary cause of in-transit damage and shipment rejections.',
    },
    {
      question: 'Is pallet strapping more cost-effective than stretch wrapping?',
      answer:
        'Yes. Manual stretch wrapping takes 5–10 minutes per pallet and consumes up to 50% more film due to inconsistent hand tensioning, while automated strapping secures the load in under a minute using a precise amount of PET or PP strap. Combined with labor savings, most facilities reach ROI within 6 to 18 months.',
    },
    {
      question: 'What is the HSN code and GST rate for pallet strapping machines in India?',
      answer:
        'Pallet strapping machines, including ErgoPack mobile systems, are classified under HSN code 84224000 (packing or wrapping machinery) and are subject to an 18% GST rate in India. Spare parts are generally classified under HSN 84229090.',
    },
    {
      question: 'What is the difference between the ErgoPack 726X, GO, and 700?',
      answer:
        'The 726X is a fully integrated system with an electronic joystick drive, touchscreen and built-in friction-weld sealing head (400N–2500N). The GO uses the same electronic ChainLance drive but ships without a sealing head, so you keep your existing battery or pneumatic tools. The 700 routes the strap via a manual hand crank — no battery — for off-grid, 24/7 operation.',
    },
    {
      question: 'What is friction weld sealing and why is it better than metal clips?',
      answer:
        'Friction weld sealing rapidly vibrates two overlapping ends of a PP or PET strap so the polymer chains fuse into a single, sealless joint with up to 90% joint efficiency. Metal clips rely on manual crimping (~60% efficiency), can rust and snap under shock load, and are a recurring consumable cost — which friction welding eliminates entirely.',
    },
    {
      question: 'How quickly does an ErgoPack system pay for itself?',
      answer:
        'For mid-to-high-volume Indian facilities the break-even point typically falls between 6 and 18 months, driven by a 66% reduction in strapping labor time, elimination of recurring metal-seal costs, and a sharp drop in transit-damage and shipment-rejection claims.',
    },
    {
      question: 'Can ErgoPack machines handle heavy and oversized pallets?',
      answer:
        'Yes. The ChainLance system handles pallets up to 2.4 metres wide and 2.3 metres high, and the 726X applies up to 2500N of tension for dense, non-compressible loads such as automotive parts and machinery — making it suitable for heavy industrial and export freight.',
    },
    {
      question: 'Why choose a mobile pallet strapping machine over a stationary arch system?',
      answer:
        'A mobile ErgoPack system is rolled directly to the pallet, so you avoid the forklift traffic, 3-phase power, conveyors and floor-bolting that stationary arch machines require. You get inline-class automation speed without the capital expenditure and fixed factory-floor footprint.',
    },
    {
      question: 'How much labor can automated strapping save on the packaging floor?',
      answer:
        'At 100 pallets per day, manual strapping forces operators to make around 25,000 trips around pallets per year. ErgoPack reduces that to zero — the operator stands in one position while the machine routes the strap — freeing thousands of labor hours annually for higher-value tasks.',
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
