import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 700 - Manual Hand-Crank Strapping System | Elite Series',
  description: 'Manual Hand-Crank Strapping Tool - Mobile and ergonomic pallet strapping with no battery required. Multi-material compatibility.',
};

export default function EliteProduct700Page() {
  const productData = productsData.products['700'];

  return <EliteProductPageTemplate productData={productData} />;
}
