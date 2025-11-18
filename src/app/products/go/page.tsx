import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack GO - Economy Portable Mobile Strapping System | Flexible Solution',
  description: 'ErgoPack GO portable mobile strapping system with 40 m/min speed, 350 cycles, standard tool-lift, joystick control. Multi-material compatibility for flexible operations.',
  keywords: [
    'ErgoPack GO',
    'portable strapping',
    'mobile economy',
    'flexible strapping',
    'joystick control',
    'multi-material',
    '350 cycles',
    'cost-effective mobile',
  ],
  openGraph: {
    title: 'ErgoPack GO - Economy Portable Mobile Strapping System',
    description: 'Portable mobile strapping with multi-material compatibility and flexible operation.',
    images: ['/images/products/GO/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack GO - Portable Mobile Strapping',
    description: 'Economy portable solution with multi-material support and flexible deployment.',
    images: ['/images/products/GO/hero.jpg'],
  },
};

export default function ErgoPackGOPage() {
  const productData = productsData.products['GO'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/GO/hero.jpg"
      applicationImages={[
        '/images/products/GO/application-1.jpg',
        '/images/products/GO/application-2.jpg',
        '/images/products/GO/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=RE,GO"
    />
  );
}
