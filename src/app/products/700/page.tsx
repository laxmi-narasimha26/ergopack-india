import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 700 - Manual Hand-Crank Pallet Strapping System | Economy Line',
  description: 'ErgoPack 700 manual hand-crank strapping system. No battery required, multi-material compatibility (PP, PET, Paper, Cord, Composite). AGR certified ergonomic design.',
  keywords: [
    'ErgoPack 700',
    'manual strapping',
    'hand-crank strapping',
    'no battery',
    'multi-material strapping',
    'economical solution',
    'AGR certified',
  ],
  openGraph: {
    title: 'ErgoPack 700 - Manual Hand-Crank Strapping System',
    description: 'Manual operation strapping system with multi-material compatibility. No battery needed.',
    images: ['/images/products/700/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 700 - Manual Pallet Strapping',
    description: 'Cost-effective manual strapping solution with ergonomic hand-crank operation.',
    images: ['/images/products/700/hero.jpg'],
  },
};

export default function ErgoPack700Page() {
  const productData = productsData.products['700'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/700/hero.jpg"
      applicationImages={[
        '/images/products/700/application-1.jpg',
        '/images/products/700/application-2.jpg',
        '/images/products/700/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=700,700E,700X"
    />
  );
}
