import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack700E } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 700E - Multi-Material Battery Strapping System | Economy Line',
  description: 'ErgoPack 700E Economy Line battery-powered multi-material strapping (PP, PET, Paper, Cord, Composite). 40 m/min speed, 350 cycles. Versatile packaging solution.',
  keywords: [
    'ErgoPack 700E',
    'multi-material strapping',
    'battery strapping',
    'paper strap',
    'composite strap',
    'versatile strapping',
    '350 cycles',
  ],
  openGraph: {
    title: 'ErgoPack 700E - Economy Multi-Material Strapping System',
    description: 'Battery-powered multi-material strapping for PP, PET, Paper, Cord, and Composite materials.',
    images: ['/images/products/700E/18.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 700E - Multi-Material Strapping',
    description: 'Versatile strapping solution for all material types with battery automation.',
    images: ['/images/products/700E/18.png'],
  },
};

export default function ErgoPack700EPage() {
  return <PremiumProductPage product={ergoPack700E} />;
}
