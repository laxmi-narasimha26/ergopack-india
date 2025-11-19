import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack745X } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 745X Li - Premium Mobile Pallet Strapping System | X-pert Line',
  description: 'ErgoPack 745X Li X-pert Line with Lithium-Ion technology, 66 m/min chain speed, 1200 strapping cycles, Siemens touchscreen, and line laser. Professional heavy-duty pallet strapping.',
  keywords: [
    'ErgoPack 745X',
    'lithium-ion strapping',
    'X-pert line',
    'premium pallet strapping',
    '66 m/min',
    'Siemens touchscreen',
    'line laser',
    '1200 cycles',
    'professional strapping',
  ],
  openGraph: {
    title: 'ErgoPack 745X Li - X-pert Line Lithium-Ion Strapping System',
    description: 'Premium mobile strapping with Li-Ion technology, 66 m/min speed, 1200 cycles, and Siemens touchscreen control.',
    images: ['/images/products/745X/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 745X Li - Premium Pallet Strapping',
    description: '65% faster, 3.4x more cycles. Lithium-Ion powered professional strapping system.',
    images: ['/images/products/745X/1.png'],
  },
};

export default function ErgoPack745XPage() {
  return <PremiumProductPage product={ergoPack745X} />;
}
