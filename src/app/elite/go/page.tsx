import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack GO - Economy Portable System | Elite Series',
  description: 'Mobile & Ergonomic Portable Pallet Strapping System. Lead-fleece battery, 350 cycles, includes Tool-Lift, Sledge 85, Joystick Control.',
};

export default function EliteProductGOPage() {
  const productData = productsData.products['GO'];

  return <EliteProductPageTemplate productData={productData} />;
}
