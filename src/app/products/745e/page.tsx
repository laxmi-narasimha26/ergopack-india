import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack745E } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 745E - Mobile & Ergonomic Pallet Strapping System | Economy Line',
  description: 'ErgoPack 745E Economy Line mobile pallet strapping system with 400-4500N tension power, 30-255cm width flexibility, 350 strapping cycles. AGR certified ergonomic design for medium/heavy-duty applications.',
  keywords: [
    'ErgoPack 745E',
    'mobile pallet strapping',
    'economy line strapping',
    'pallet strapping machine',
    '4500N tension',
    'ergonomic strapping',
    'AGR certified',
    'heavy-duty strapping',
  ],
  openGraph: {
    title: 'ErgoPack 745E - Economy Line Mobile Pallet Strapping System',
    description: 'Professional mobile pallet strapping with 400-4500N tension power and 350 cycles per charge. AGR certified ergonomic design.',
    images: ['/images/products/745E/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 745E - Mobile Pallet Strapping System',
    description: 'Economy Line mobile strapping with 4500N max tension and AGR certified ergonomic design.',
    images: ['/images/products/745E/1.png'],
  },
};

export default function ErgoPack745EPage() {
  return <PremiumProductPage product={ergoPack745E} />;
}
