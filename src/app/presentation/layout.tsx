import type { Metadata, Viewport } from 'next';
import './presentation.css';

export const metadata: Metadata = {
  title: 'Product Presentation | ErgoPack India - Experience German Engineering',
  description:
    'Immerse yourself in the future of pallet strapping. Experience the ErgoPack 700, GO, and 726X Li in stunning 3D - German-engineered solutions for India\'s manufacturing elite.',
  keywords: [
    'ErgoPack 3D presentation',
    'Pallet strapping India',
    'German engineering',
    'Industrial automation',
    'Lithium-Ion strapping',
    'Mobile strapping system',
    '3D product showcase',
    'Interactive experience',
  ],
  openGraph: {
    title: 'ErgoPack Product Presentation - 3D Experience',
    description: 'German Engineering. Indian Excellence. Experience it in 3D.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-presentation.jpg',
        width: 1200,
        height: 630,
        alt: 'ErgoPack 3D Presentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 3D Product Presentation',
    description: 'Experience the future of pallet strapping in stunning 3D',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preload critical assets */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Main content wrapper */}
      <main className="presentation-page bg-black text-white min-h-screen overflow-x-hidden selection:bg-[#FFB81C] selection:text-black">
        {children}
      </main>
    </>
  );
}
