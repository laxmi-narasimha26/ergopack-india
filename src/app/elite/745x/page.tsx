import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 745X Li - Premium Heavy-Duty X-pert | Elite Series',
  description:
    'Professional Mobile Pallet Strapping System with Advanced Lithium-Ion Technology. 1200 cycles, 66 m/min speed, Siemens Touchscreen, Line Laser.',
};

export default function EliteProduct745XPage() {
  const productData = productsData.products['745X'];

  return <EliteProductPageTemplate productData={productData} />;
}
