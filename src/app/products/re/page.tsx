import { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata: Metadata = {
  title: 'ErgoPack RE - Premium Mobile Retracting Strapping System | Li-Ion Powered',
  description: 'ErgoPack RE premium mobile retracting system with Lithium-Ion battery, 66 m/min speed, 1200 cycles, Siemens touchscreen, line laser, rewinder. Complete professional solution.',
  keywords: [
    'ErgoPack RE',
    'mobile retracting',
    'premium strapping',
    'lithium-ion mobile',
    'rewinder system',
    'Siemens touchscreen',
    'professional strapping',
    '1200 cycles',
  ],
  openGraph: {
    title: 'ErgoPack RE - Premium Mobile Retracting Strapping System',
    description: 'Premium mobile retracting system with Li-Ion power, automatic rewinder, and Siemens control.',
    images: ['/images/products/RE/hero.jpg'],
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack RE - Premium Mobile Retracting',
    description: 'Professional mobile strapping with advanced retracting technology and Li-Ion power.',
    images: ['/images/products/RE/hero.jpg'],
  },
};

export default function ErgoPackREPage() {
  const productData = productsData.products['RE'];

  return (
    <ProductPageTemplate
      productData={productData}
      heroImage="/images/products/RE/hero.jpg"
      applicationImages={[
        '/images/products/RE/application-1.jpg',
        '/images/products/RE/application-2.jpg',
        '/images/products/RE/application-3.jpg',
      ]}
      comparisonLink="/products/compare-machines?models=RE,GO"
    />
  );
}
