import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack RE - Mobile Retracting Premium System | Elite Series',
  description: 'Mobile & Ergonomic Retracting Pallet Strapping System. Lithium-Ion, 1200 cycles, includes Rewinder, Siemens Touchscreen, Line Laser.',
};

export default function EliteProductREPage() {
  const productData = productsData.products['RE'];

  return <EliteProductPageTemplate productData={productData} />;
}
