import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack 713X Li - Premium Ultra-Light Strapping System | X-pert Line',
  description: 'ErgoPack 713X Li X-pert Line with Lithium-Ion power, 66 m/min speed, 1200 cycles, Siemens touchscreen. Premium ultra-light-duty strapping for delicate applications.',
  keywords: [
    'ErgoPack 713X',
    'lithium ultra-light',
    'X-pert 713',
    'premium delicate strapping',
    'Siemens touchscreen',
    '1200 cycles',
    'precision strapping',
  ],
  openGraph: {
    title: 'ErgoPack 713X Li - X-pert Line Ultra-Light Strapping System',
    description: 'Premium ultra-light strapping with Li-Ion technology and Siemens touchscreen for delicate packaging.',
    images: ['/images/products/713X/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 713X Li - Premium Ultra-Light Strapping',
    description: 'X-pert performance for ultra-light-duty applications with precision control.',
    images: ['/images/products/713X/hero.jpg'],
  },
};

export default function ErgoPack713XPage() {
  const productData = productsData.products['713X'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/713X/hero.jpg"
      applicationImages={[
        '/images/products/713X/application-1.jpg',
        '/images/products/713X/application-2.jpg',
        '/images/products/713X/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=713E,713X"
    />
  );
}
