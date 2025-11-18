import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 726X Li - Premium Light-Duty Pallet Strapping | X-pert Line',
  description: 'ErgoPack 726X Li X-pert Line with Lithium-Ion battery, 66 m/min speed, 1200 cycles, Siemens touchscreen, and line laser for professional light-duty strapping applications.',
  keywords: [
    'ErgoPack 726X',
    'lithium-ion light-duty',
    'X-pert line 726',
    'premium light strapping',
    'Siemens control',
    '1200 cycles',
    'line laser strapping',
  ],
  openGraph: {
    title: 'ErgoPack 726X Li - X-pert Line Light-Duty Strapping System',
    description: 'Premium light-duty strapping with Li-Ion technology, 66 m/min speed, and advanced Siemens touchscreen control.',
    images: ['/images/products/726X/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 726X Li - Premium Light-Duty Strapping',
    description: 'X-pert Line performance for light-duty applications with lithium-ion power.',
    images: ['/images/products/726X/hero.jpg'],
  },
};

export default function ErgoPack726XPage() {
  const productData = productsData.products['726X'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/726X/hero.jpg"
      applicationImages={[
        '/images/products/726X/application-1.jpg',
        '/images/products/726X/application-2.jpg',
        '/images/products/726X/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=726E,726X"
    />
  );
}
