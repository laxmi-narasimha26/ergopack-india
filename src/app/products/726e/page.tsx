import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack726E } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 726E - Mobile Complete Strapping & Sealing System | Economy Line',
  description: 'ErgoPack 726E Economy Line mobile system with sealing head and tool-lift included. Complete strapping and sealing solution with 350 cycles, 40m/min speed, PP and PET compatibility.',
  keywords: [
    'ErgoPack 726E',
    'sealing head included',
    'tool-lift included',
    'mobile strapping system',
    'complete strapping solution',
    'PP PET sealing',
    '350 cycles',
    'AGR certified',
  ],
  openGraph: {
    title: 'ErgoPack 726E - Mobile Complete Strapping & Sealing System',
    description: 'Economy Line mobile system with sealing head and tool-lift included for professional pallet strapping and sealing.',
    images: ['/images/products/726E/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 726E - Mobile Strapping & Sealing',
    description: 'Complete mobile solution with sealing head and tool-lift included for professional packaging.',
    images: ['/images/products/726E/1.png'],
  },
};

export default function ErgoPack726EPage() {
  return <PremiumProductPage product={ergoPack726E} />;
}
