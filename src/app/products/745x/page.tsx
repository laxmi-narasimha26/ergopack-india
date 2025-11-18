import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 745X Li - Premium Mobile Pallet Strapping System | X-pert Line',
  description: 'ErgoPack 745X Li X-pert Line with Lithium-Ion technology, 66 m/min chain speed, 1200 strapping cycles, Siemens touchscreen, and line laser. Professional heavy-duty pallet strapping.',
  keywords: [
    'ErgoPack 745X',
    'lithium-ion strapping',
    'X-pert line',
    'premium pallet strapping',
    '66 m/min',
    'Siemens touchscreen',
    'line laser',
    '1200 cycles',
    'professional strapping',
  ],
  openGraph: {
    title: 'ErgoPack 745X Li - X-pert Line Lithium-Ion Strapping System',
    description: 'Premium mobile strapping with Li-Ion technology, 66 m/min speed, 1200 cycles, and Siemens touchscreen control.',
    images: ['/images/products/745X/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 745X Li - Premium Pallet Strapping',
    description: '65% faster, 3.4x more cycles. Lithium-Ion powered professional strapping system.',
    images: ['/images/products/745X/hero.jpg'],
  },
};

export default function ErgoPack745XPage() {
  const productData = productsData.products['745X'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/745X/hero.jpg"
      applicationImages={[
        '/images/products/745X/application-1.jpg',
        '/images/products/745X/application-2.jpg',
        '/images/products/745X/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=745E,745X"
    />
  );
}
