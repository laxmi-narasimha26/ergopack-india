import type { Metadata, Viewport } from 'next';
import './presentation.css';

export const metadata: Metadata = {
  title: 'Product Presentation | ErgoPack India - Pallet Strapping Solutions',
  description:
    'Explore ErgoPack mobile pallet strapping systems: Model 700 (Manual), GO (Economy), and 726X Li (Premium Lithium-Ion). German engineering for Indian industry.',
  keywords: [
    'ErgoPack India',
    'Pallet strapping',
    'Mobile strapping system',
    'Industrial strapping',
    'German engineering',
    'Lithium-Ion strapping',
    'Manual strapping tool',
    'Product presentation',
  ],
  openGraph: {
    title: 'ErgoPack Product Presentation',
    description: 'Discover our mobile pallet strapping solutions',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-black text-white min-h-screen">
      {children}
    </main>
  );
}
