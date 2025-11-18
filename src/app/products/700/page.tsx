import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack700 } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 700 - Manual Hand-Crank Pallet Strapping System | Economy Line',
  description: 'ErgoPack 700 manual hand-crank strapping system. No battery required, multi-material compatibility (PP, PET, Paper, Cord, Composite). AGR certified ergonomic design.',
  keywords: [
    'ErgoPack 700',
    'manual strapping',
    'hand-crank strapping',
    'no battery',
    'multi-material strapping',
    'economical solution',
    'AGR certified',
  ],
  openGraph: {
    title: 'ErgoPack 700 - Manual Hand-Crank Strapping System',
    description: 'Manual operation strapping system with multi-material compatibility. No battery needed.',
    images: ['/images/products/700/2.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 700 - Manual Pallet Strapping',
    description: 'Cost-effective manual strapping solution with ergonomic hand-crank operation.',
    images: ['/images/products/700/2.jpg'],
  },
};

export default function ErgoPack700Page() {
  return <PremiumProductPage product={ergoPack700} />;
}
