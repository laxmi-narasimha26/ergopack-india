import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 726E - Light-Duty Mobile Pallet Strapping System | Economy Line',
  description: 'ErgoPack 726E Economy Line for light-duty applications with 400-2500N tension, 13-16mm strap width, 350 cycles per charge. Cost-effective ergonomic pallet strapping solution.',
  keywords: [
    'ErgoPack 726E',
    'light-duty strapping',
    'economy strapping',
    'mobile pallet strapping',
    '2500N tension',
    'cost-effective strapping',
    'AGR certified',
  ],
  openGraph: {
    title: 'ErgoPack 726E - Economy Line Light-Duty Strapping System',
    description: 'Light-duty mobile pallet strapping with 400-2500N tension power. Perfect for lighter packaging applications.',
    images: ['/images/products/726E/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 726E - Light-Duty Pallet Strapping',
    description: 'Economical light-duty strapping solution with AGR certified ergonomic design.',
    images: ['/images/products/726E/hero.jpg'],
  },
};

export default function ErgoPack726EPage() {
  const productData = productsData.products['726E'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/726E/hero.jpg"
      applicationImages={[
        '/images/products/726E/application-1.jpg',
        '/images/products/726E/application-2.jpg',
        '/images/products/726E/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=726E,726X"
    />
  );
}
