import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 713E - Ultra-Light-Duty Economy | Elite Series',
  description: 'Mobile and Ergonomic Pallet Strapping System for Ultra-Light-Duty Applications. 150-1200N tension, 9-13mm strap width.',
};

export default function EliteProduct713EPage() {
  const productData = productsData.products['713E'];

  return <EliteProductPageTemplate productData={productData} />;
}
