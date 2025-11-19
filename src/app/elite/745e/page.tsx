import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 745E - Medium/Heavy-Duty Economy | Elite Series',
  description: 'Mobile and Ergonomic Pallet Strapping System for Medium/Heavy-Duty Applications. 400-4500N tension, 16-19mm strap width, 350 cycles.',
};

export default function EliteProduct745EPage() {
  const productData = productsData.products['745E'];

  return <EliteProductPageTemplate productData={productData} />;
}
