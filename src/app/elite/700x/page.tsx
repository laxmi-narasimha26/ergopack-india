import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 700X Li - Premium Lithium-Ion Strapping | Elite Series',
  description:
    'Premium Lithium-Ion Powered Strapping with Universal Material Compatibility. 1200 cycles per charge, 66 m/min chain speed, Siemens Touchscreen.',
};

export default function EliteProduct700XPage() {
  const productData = productsData.products['700X'];

  return <EliteProductPageTemplate productData={productData} />;
}
