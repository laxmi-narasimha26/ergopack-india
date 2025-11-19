import EliteProductPageTemplate from '@/components/elite/EliteProductPageTemplate';
import productsData from '@/../../products-data.json';

export const metadata = {
  title: 'ErgoPack 700E - Economy Battery-Powered Strapping | Elite Series',
  description: 'Battery-Powered Automated Strapping with Multi-Material Compatibility. Lead-fleece battery, 350 cycles per charge, 40 m/min chain speed.',
};

export default function EliteProduct700EPage() {
  const productData = productsData.products['700E'];

  return <EliteProductPageTemplate productData={productData} />;
}
