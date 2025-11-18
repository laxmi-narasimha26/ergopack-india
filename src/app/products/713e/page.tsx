import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 713E - Ultra-Light-Duty Mobile Strapping System | Economy Line',
  description: 'ErgoPack 713E Economy Line for ultra-light-duty applications with 150-1200N tension, 9-13mm strap width. Ideal for delicate packaging with AGR certified ergonomic design.',
  keywords: [
    'ErgoPack 713E',
    'ultra-light strapping',
    'delicate packaging',
    'economy strapping',
    '1200N tension',
    'narrow strap',
    'AGR certified',
  ],
  openGraph: {
    title: 'ErgoPack 713E - Economy Line Ultra-Light-Duty Strapping',
    description: 'Ultra-light-duty mobile strapping with 150-1200N tension for delicate packaging applications.',
    images: ['/images/products/713E/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 713E - Ultra-Light Strapping Solution',
    description: 'Perfect for delicate packaging with precise tension control and ergonomic design.',
    images: ['/images/products/713E/hero.jpg'],
  },
};

export default function ErgoPack713EPage() {
  const productData = productsData.products['713E'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/713E/hero.jpg"
      applicationImages={[
        '/images/products/713E/application-1.jpg',
        '/images/products/713E/application-2.jpg',
        '/images/products/713E/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=713E,713X"
    />
  );
}
