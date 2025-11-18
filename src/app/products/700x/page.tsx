import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 700X Li - Premium Multi-Material Strapping System | X-pert Line',
  description: 'ErgoPack 700X Li X-pert Line with Lithium-Ion power, 66 m/min speed, 1200 cycles, Siemens touchscreen. Universal material compatibility (PP, PET, Paper, Cord, Composite).',
  keywords: [
    'ErgoPack 700X',
    'lithium multi-material',
    'X-pert 700',
    'premium versatile strapping',
    'Siemens control',
    '1200 cycles',
    'universal compatibility',
  ],
  openGraph: {
    title: 'ErgoPack 700X Li - X-pert Multi-Material Strapping System',
    description: 'Premium multi-material strapping with Li-Ion technology and universal material compatibility.',
    images: ['/images/products/700X/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 700X Li - Premium Multi-Material',
    description: 'X-pert Line versatility with lithium-ion power for all strapping materials.',
    images: ['/images/products/700X/hero.jpg'],
  },
};

export default function ErgoPack700XPage() {
  const productData = productsData.products['700X'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/700X/hero.jpg"
      applicationImages={[
        '/images/products/700X/application-1.jpg',
        '/images/products/700X/application-2.jpg',
        '/images/products/700X/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=700,700E,700X"
    />
  );
}
