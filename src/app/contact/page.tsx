import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact ErgoPack India | Free Demo & Consultation | Get Quote',
  description:
    'Contact ErgoPack India for a free ergonomic assessment and product demonstration. Get expert consultation on reducing workplace injuries and boosting productivity. Call +91 9899144488.',
  keywords: [
    'contact ErgoPack India',
    'pallet strapping demo',
    'free ergonomic assessment',
    'strapping machine quote',
    'ErgoPack consultation',
    'workplace safety consultation',
    'industrial equipment inquiry',
    'strapping solution quote India',
  ],
  openGraph: {
    title: 'Contact ErgoPack India | Get Your Free Assessment',
    description:
      'Request a personalized demo. See how ErgoPack can eliminate back injuries in your facility.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
