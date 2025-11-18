import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 745E - Mobile & Ergonomic Pallet Strapping System | Economy Line',
  description: 'ErgoPack 745E Economy Line mobile pallet strapping system with 400-4500N tension power, 30-255cm width flexibility, 350 strapping cycles. AGR certified ergonomic design for medium/heavy-duty applications.',
  keywords: [
    'ErgoPack 745E',
    'mobile pallet strapping',
    'economy line strapping',
    'pallet strapping machine',
    '4500N tension',
    'ergonomic strapping',
    'AGR certified',
    'heavy-duty strapping',
  ],
  openGraph: {
    title: 'ErgoPack 745E - Economy Line Mobile Pallet Strapping System',
    description: 'Professional mobile pallet strapping with 400-4500N tension power and 350 cycles per charge. AGR certified ergonomic design.',
    images: ['/images/products/745E/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 745E - Mobile Pallet Strapping System',
    description: 'Economy Line mobile strapping with 4500N max tension and AGR certified ergonomic design.',
    images: ['/images/products/745E/hero.jpg'],
  },
};

export default function ErgoPack745EPage() {
  const productData = productsData.products['745E'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/745E/hero.jpg"
      applicationImages={[
        '/images/products/745E/application-1.jpg',
        '/images/products/745E/application-2.jpg',
        '/images/products/745E/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=745E,745X"
    />
  );
}
