import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack700X } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 700X Li - Premium Lithium-Ion Strapping System | X-pert Line',
  description: 'ErgoPack 700X Li X-pert Line with advanced Lithium-Ion battery delivering 1200 cycles and 66m/min speed. Siemens touchscreen control, multi-material compatibility.',
  keywords: [
    'ErgoPack 700X',
    'lithium-ion strapping',
    'X-pert Line',
    'Siemens touchscreen',
    '1200 cycles',
    '66m/min speed',
    'premium strapping',
    'multi-material',
  ],
  openGraph: {
    title: 'ErgoPack 700X Li - Premium X-pert Line Strapping System',
    description: 'Advanced lithium-ion strapping with 1200 cycles, Siemens touchscreen, and 66m/min speed.',
    images: ['/images/products/700X/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 700X Li - Premium Lithium-Ion Strapping',
    description: 'X-pert Line premium performance with up to 1200 cycles per charge.',
    images: ['/images/products/700X/1.png'],
  },
};

export default function ErgoPack700XPage() {
  return <PremiumProductPage product={ergoPack700X} />;
}
