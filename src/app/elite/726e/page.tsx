import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 726E - Light-Duty Economy | Elite Series',
  description: 'Mobile and Ergonomic Pallet Strapping System for Light-Duty Applications. 400-2500N tension, 13-16mm strap width, 350 cycles per charge.',
};

export default function EliteProduct726EPage() {
  const productData = productsData.products['726E'];

  return <EliteProductPageTemplate productData={productData} />;
}
