import type { Metadata } from 'next';
import './presentation.css';

export const metadata: Metadata = {
  title: 'Product Presentation | ErgoPack India - German Engineering Excellence',
  description:
    'Experience the future of pallet strapping. Explore the ErgoPack 700, GO, and 726X Li - German-engineered solutions for India\'s leading manufacturers.',
  keywords: [
    'ErgoPack presentation',
    'Pallet strapping India',
    'German engineering',
    'Industrial automation',
    'Lithium-Ion strapping',
    'Mobile strapping system',
  ],
  openGraph: {
    title: 'ErgoPack Product Presentation',
    description: 'German Engineering. Indian Excellence.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="presentation-page bg-black text-white min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
