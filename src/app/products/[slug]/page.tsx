import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack700XLFP,
  ergoPack713E,
  ergoPack713X,
  ergoPack713XLFP,
  ergoPack726E,
  ergoPack726X,
  ergoPack726XLFP,
  ergoPack745E,
  ergoPack745X,
  ergoPack745XLFP,
  ergoPackGO,
  ComprehensiveProduct,
} from '@/data/comprehensive-products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Helper function to get product data (shared with client)
function getProductData(slug: string): ComprehensiveProduct | undefined {
  const normalizedSlug = slug.toLowerCase();

  // LFP Series
  if (normalizedSlug.includes('700xlfp') || normalizedSlug.includes('700x-lfp'))
    return ergoPack700XLFP;
  if (normalizedSlug.includes('713xlfp') || normalizedSlug.includes('713x-lfp'))
    return ergoPack713XLFP;
  if (normalizedSlug.includes('726xlfp') || normalizedSlug.includes('726x-lfp'))
    return ergoPack726XLFP;
  if (normalizedSlug.includes('745xlfp') || normalizedSlug.includes('745x-lfp'))
    return ergoPack745XLFP;

  // 700 Series
  if (normalizedSlug.includes('700x') || normalizedSlug.includes('x-pert')) return ergoPack700X;
  if (normalizedSlug.includes('700e') || normalizedSlug.includes('economy')) return ergoPack700E;
  if (normalizedSlug === '700' || normalizedSlug.includes('manual')) return ergoPack700;

  // 713 Series
  if (normalizedSlug.includes('713x')) return ergoPack713X;
  if (normalizedSlug.includes('713e') || normalizedSlug.includes('713')) return ergoPack713E;

  // 726 Series
  if (normalizedSlug.includes('726x')) return ergoPack726X;
  if (normalizedSlug.includes('726e') || normalizedSlug.includes('726')) return ergoPack726E;

  // 745 Series
  if (normalizedSlug.includes('745x')) return ergoPack745X;
  if (normalizedSlug.includes('745e') || normalizedSlug.includes('745')) return ergoPack745E;

  // GO
  if (normalizedSlug.includes('go')) return ergoPackGO;

  return undefined;
}

// Dynamic metadata generation for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  const product = getProductData(slug);

  if (!product) {
    return {
      title: 'Product Not Found | ErgoPack India',
      description: 'The requested product could not be found.',
    };
  }

  const isXpert = product.id.includes('X');
  const lineType = isXpert ? 'X-pert Line Premium' : 'Economy Line';

  return {
    title: `${product.name} | Ergonomic Pallet Strapping | ${lineType} | ErgoPack India`,
    description: `${product.tagline}. Zero-bending ChainLance technology, German precision engineering. ${product.description.slice(0, 120)}...`,
    keywords: [
      product.name,
      `${product.specifications.model} strapping machine`,
      'ergonomic pallet strapping',
      'zero bending strapping',
      'ChainLance technology',
      'Made in Germany strapping',
      'back injury prevention',
      'pallet strapping machine India',
      `${isXpert ? 'premium' : 'affordable'} strapping`,
      ...(product.applications || []).slice(0, 3),
    ],
    openGraph: {
      title: `${product.name} | ${lineType} Pallet Strapping`,
      description: product.tagline,
      type: 'website',
      locale: 'en_IN',
      images: [product.images.hero],
    },
    alternates: {
      canonical: `/products/${slug.toLowerCase()}`,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetailClient params={params} />;
}
