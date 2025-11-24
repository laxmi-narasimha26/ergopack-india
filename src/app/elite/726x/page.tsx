import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 726X Li - Premium Light-Duty X-pert | Elite Series',
  description:
    'Professional Mobile Pallet Strapping System with Lithium-Ion for Light-Duty Applications. 1200 cycles, 66 m/min speed, Siemens Touchscreen.',
};

export default function EliteProduct726XPage() {
  const productData = productsData.products['726X'];

  return <EliteProductPageTemplate productData={productData} />;
}
