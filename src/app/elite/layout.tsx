import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ergopack Elite - Ultra-Premium Automated Strapping Infrastructure',
  description:
    'Experience operational excellence with Ergopack Elite. German precision engineering delivering 900 straps/hour with 0.1mm tolerance. Join India\'s category-leading manufacturers in the Elite Network.',
  keywords: [
    'automated strapping',
    'packaging automation',
    'ergopack elite',
    'industrial automation',
    'german engineering',
    'strapping machine',
    'packaging equipment',
    'industry 4.0',
    'precision engineering',
    'operational excellence',
  ],
  authors: [{ name: 'Ergopack India' }],
  openGraph: {
    title: 'Ergopack Elite - Ultra-Premium Automated Strapping Infrastructure',
    description: 'German precision engineering. 900 straps/hour. 0.1mm tolerance. Transform your packaging operation.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ergopack India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ergopack Elite - Premium Automated Strapping',
    description: 'German precision engineering. 900 straps/hour. Transform your packaging operation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EliteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
