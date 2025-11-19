import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack726X } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 726X Li - Premium Mobile Complete System | X-pert Line',
  description: 'ErgoPack 726X Li X-pert Line with sealing head, tool-lift, AND line-laser ALL INCLUDED. Premium Lithium-Ion with 1200 cycles, 66m/min speed, and Siemens touchscreen control.',
  keywords: [
    'ErgoPack 726X',
    'sealing head included',
    'tool-lift included',
    'line-laser included',
    'Siemens touchscreen',
    '1200 cycles',
    'premium mobile strapping',
    'lithium-ion',
  ],
  openGraph: {
    title: 'ErgoPack 726X Li - Premium Mobile Complete System',
    description: 'X-pert Line with sealing head + tool-lift + line-laser ALL INCLUDED. Siemens touchscreen and 1200 cycles for premium mobile operations.',
    images: ['/images/products/726X/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 726X Li - Premium Mobile Complete System',
    description: 'Complete X-pert package with sealing head, tool-lift, and line-laser ALL INCLUDED.',
    images: ['/images/products/726X/1.png'],
  },
};

export default function ErgoPack726XPage() {
  return <PremiumProductPage product={ergoPack726X} />;
}
