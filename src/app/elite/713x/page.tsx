import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 713X Li - Premium Ultra-Light X-pert | Elite Series',
  description:
    'Professional Mobile Pallet Strapping System with Lithium-Ion for Ultra-Light-Duty Applications. 1200 cycles, Siemens Touchscreen, Line Laser.',
};

export default function EliteProduct713XPage() {
  const productData = productsData.products['713X'];

  return <EliteProductPageTemplate productData={productData} />;
}
