import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ErgoPack India | Verifiable Load Integrity',
  description: "ErgoPack India delivers the 'Made in Germany' precision required to mitigate catastrophic shipment risk and protect your brand's reputation at the final, critical checkpoint of your supply chain.",
  keywords: [
    'ErgoPack',
    'Load Integrity',
    'Pallet Strapping',
    'Supply Chain',
    'Made in Germany',
    'Pharmaceutical Packaging',
    'Automotive Logistics',
    'Electronics Shipping',
  ],
  authors: [{ name: 'ErgoPack India' }],
  creator: 'ErgoPack India',
  publisher: 'ErgoPack India',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'ErgoPack India',
    title: 'ErgoPack India | Verifiable Load Integrity',
    description: "The C-Suite's Control System for Zero-Failure Logistics",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ErgoPack India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack India | Verifiable Load Integrity',
    description: "The C-Suite's Control System for Zero-Failure Logistics",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #e8e8e8',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#d32f2f',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
