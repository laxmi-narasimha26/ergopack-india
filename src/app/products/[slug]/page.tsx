import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { BreadcrumbSchema } from '@/components/JsonLd';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack726E,
  ergoPack726X,
  ergoPackGO,
  ComprehensiveProduct,
} from '@/data/comprehensive-products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

type LinePageSlug = 'x-pert-line' | 'economy-line';
type SeriesPageSlug = '700-series' | '726-series' | 'go-series';

type ResolvedRoute =
  | { type: 'redirect'; destination: string }
  | { type: 'line'; canonicalSlug: LinePageSlug }
  | { type: 'series'; canonicalSlug: SeriesPageSlug }
  | { type: 'product'; canonicalSlug: string; product: ComprehensiveProduct };

const productLookup: Record<string, ComprehensiveProduct> = {
  '700': ergoPack700,
  '700e': ergoPack700E,
  '700x': ergoPack700X,
  '726e': ergoPack726E,
  '726x': ergoPack726X,
  go: ergoPackGO,
};

const linePageMeta = {
  'x-pert-line': {
    title: 'X-pert Line Automated Pallet Strapping Machines | Up to 2500N | ErgoPack',
    description:
      'The ErgoPack X-pert Line straps pallets in under 40 seconds with touchscreen control and machine-calibrated tension up to 2500N — eliminating transit damage on heavy and export loads.',
    keywords: [
      'X-pert Line pallet strapping machine',
      'automated pallet strapping machine',
      'high tension pallet strapping machine',
      'ErgoPack 726X',
      'lithium ion pallet strapping machine',
    ],
    image: ergoPack726X.images.hero,
    breadcrumbName: 'X-pert Line',
  },
  'economy-line': {
    title: 'E-conomy Line Mobile Pallet Strapping Machines | ErgoPack India',
    description:
      'The ErgoPack E-conomy Line replaces the slow manual broomstick method with ChainLance routing — strap pallets in seconds with battery or manual-crank models that cut labor without the cost of full integration.',
    keywords: [
      'economy line pallet strapping machine',
      'manual pallet strapping machine',
      'mobile pallet strapping machine India',
      'battery operated pallet strapping machine',
      'ErgoPack economy line',
    ],
    image: ergoPack700.images.hero,
    breadcrumbName: 'Economy Line',
  },
} as const;

const seriesPageMeta = {
  '700-series': {
    title: 'ErgoPack 700 Series Pallet Strapping Machines | ErgoPack India',
    description:
      'Compare manual-crank, battery, and X-pert variants in the ErgoPack 700 series — high-speed ChainLance pallet routing that cuts strapping time and labor across mixed warehouse operations.',
    keywords: [
      'ErgoPack 700 series',
      '700 pallet strapping machine',
      'manual pallet strapping machine',
    ],
    image: ergoPack700X.images.hero,
    breadcrumbName: '700 Series',
  },
  '726-series': {
    title: 'ErgoPack 726 Series Pallet Strapping Machines | ErgoPack India',
    description:
      'Explore the ErgoPack 726 series for medium-to-heavy load securing with up to 2500N tension, friction-weld sealing, and high daily throughput for Indian dispatch floors.',
    keywords: [
      'ErgoPack 726 series',
      '726 pallet strapping machine',
      'medium duty pallet strapping',
    ],
    image: ergoPack726X.images.hero,
    breadcrumbName: '726 Series',
  },
  'go-series': {
    title: 'ErgoPack GO Mobile Pallet Strapping System | ErgoPack India',
    description:
      'The ErgoPack GO brings electronic ChainLance routing to high-speed warehouse dispatch and 3PL — one operator straps pallets in under 45 seconds using your existing sealing tools.',
    keywords: [
      'ErgoPack GO',
      'mobile pallet strapping machine India',
      'electronic ChainLance pallet strapping',
    ],
    image: ergoPackGO.images.hero,
    breadcrumbName: 'GO Series',
  },
} as const;

function getCanonicalProductSlug(product: ComprehensiveProduct): string {
  return product.id.toLowerCase();
}

function getLineLabel(product: ComprehensiveProduct): string {
  if (product.id === 'GO') return 'GO';
  if (product.id === '700') return 'Manual';
  return product.line === 'xpert' ? 'X-pert Line' : 'Economy Line';
}

function getPrimaryProductKeyword(product: ComprehensiveProduct): string {
  if (product.id === 'GO') return 'mobile pallet strapping machine';
  if (product.id === '700') return 'manual-crank pallet strapping machine';
  return product.id.includes('X')
    ? 'automated pallet strapping machine'
    : 'battery pallet strapping machine';
}

function getProductMetaDescription(product: ComprehensiveProduct): string {
  const strapRange = product.specifications.strapWidth || 'mixed strap widths';
  const powerProfile = product.battery
    ? `${product.battery.type} power with up to ${product.battery.strappingCycles} cycles per charge`
    : 'manual hand-crank operation with zero charging downtime';
  const workflow =
    product.id === 'GO'
      ? 'high-speed warehouse dispatch and 3PL throughput'
      : product.id === '700'
        ? 'off-grid pallet routing and remote dispatch points'
        : 'high-tension load securing, zero transit damage, and faster dispatch';

  return `${product.name} is a ${getPrimaryProductKeyword(product)} for ${workflow}. Strap pallets in seconds with the patented ChainLance routing the strap under the pallet, ${strapRange} strap support, and ${powerProfile} — engineered to cut labor and eliminate shipment rejections in Indian facilities.`;
}

function resolveRoute(slug: string): ResolvedRoute | null {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug === 'xpert-line') {
    return { type: 'redirect', destination: '/products/x-pert-line' };
  }

  if (normalizedSlug === 'go-line') {
    return { type: 'redirect', destination: '/products/go' };
  }

  if (normalizedSlug in linePageMeta) {
    return { type: 'line', canonicalSlug: normalizedSlug as LinePageSlug };
  }

  if (normalizedSlug in seriesPageMeta) {
    return { type: 'series', canonicalSlug: normalizedSlug as SeriesPageSlug };
  }

  const product = productLookup[normalizedSlug];
  if (!product) {
    return null;
  }

  return {
    type: 'product',
    canonicalSlug: getCanonicalProductSlug(product),
    product,
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolved = resolveRoute(params.slug);

  if (!resolved) {
    return {
      title: 'Product Not Found | ErgoPack India',
      description: 'The requested product could not be found.',
    };
  }

  if (resolved.type === 'redirect') {
    return {
      alternates: {
        canonical: resolved.destination,
      },
    };
  }

  if (resolved.type === 'line') {
    const linePage = linePageMeta[resolved.canonicalSlug];

    return {
      title: linePage.title,
      description: linePage.description,
      keywords: [...linePage.keywords],
      alternates: {
        canonical: `/products/${resolved.canonicalSlug}`,
      },
      openGraph: {
        title: linePage.title,
        description: linePage.description,
        type: 'website',
        locale: 'en_IN',
        images: [linePage.image],
      },
    };
  }

  if (resolved.type === 'series') {
    const seriesPage = seriesPageMeta[resolved.canonicalSlug];

    return {
      title: seriesPage.title,
      description: seriesPage.description,
      keywords: [...seriesPage.keywords],
      alternates: {
        canonical: `/products/${resolved.canonicalSlug}`,
      },
      openGraph: {
        title: seriesPage.title,
        description: seriesPage.description,
        type: 'website',
        locale: 'en_IN',
        images: [seriesPage.image],
      },
    };
  }

  const { product, canonicalSlug } = resolved;
  const isXpert = product.id.includes('X');
  const lineType = isXpert
    ? 'X-pert Line Premium'
    : product.id === 'GO'
      ? 'GO Series'
      : 'Economy Line';
  const description = getProductMetaDescription(product);
  const titleKeyword = getPrimaryProductKeyword(product);

  return {
    title: `${product.name} ${titleKeyword} | ${lineType} | ErgoPack India`,
    description,
    keywords: [
      product.name,
      titleKeyword,
      `${product.specifications.model} pallet strapping machine`,
      'pallet strapping machine',
      'automated pallet strapping machine India',
      'mobile pallet strapping machine',
      'high tension pallet strapping machine',
      'reduce transit damage',
      'friction weld strapping',
      'ChainLance technology',
      'pallet strapping machine price India',
      ...(product.applications || []).slice(0, 3),
    ],
    openGraph: {
      title: `${product.name} ${titleKeyword} | ErgoPack India`,
      description,
      type: 'website',
      locale: 'en_IN',
      images: [product.images.hero],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} ${titleKeyword} | ErgoPack India`,
      description,
      images: [product.images.hero],
    },
    alternates: {
      canonical: `/products/${canonicalSlug}`,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolved = resolveRoute(params.slug);

  if (!resolved) {
    notFound();
  }

  if (resolved.type === 'redirect') {
    redirect(resolved.destination);
  }

  if (resolved.type === 'line') {
    const linePage = linePageMeta[resolved.canonicalSlug];

    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: 'Home', item: '/' },
            { name: 'Products', item: '/products' },
            { name: linePage.breadcrumbName, item: `/products/${resolved.canonicalSlug}` },
          ]}
        />
        <ProductDetailClient params={{ slug: resolved.canonicalSlug }} />
      </>
    );
  }

  if (resolved.type === 'series') {
    const seriesPage = seriesPageMeta[resolved.canonicalSlug];

    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: 'Home', item: '/' },
            { name: 'Products', item: '/products' },
            { name: seriesPage.breadcrumbName, item: `/products/${resolved.canonicalSlug}` },
          ]}
        />
        <ProductDetailClient params={{ slug: resolved.canonicalSlug }} />
      </>
    );
  }

  const { product, canonicalSlug } = resolved;
  const linePath =
    product.id === 'GO'
      ? '/products'
      : product.line === 'xpert'
        ? '/products/x-pert-line'
        : '/products/economy-line';
  const lineName = getLineLabel(product);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Products', item: '/products' },
          { name: lineName, item: linePath },
          { name: product.name, item: `/products/${canonicalSlug}` },
        ]}
      />
      <ProductDetailClient params={{ slug: canonicalSlug }} />
    </>
  );
}
