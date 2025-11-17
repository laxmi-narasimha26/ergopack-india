import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/Providers';
import { WebVitals, PerformanceMonitor } from '@/components/WebVitals';
import { OrganizationSchema, WebsiteSchema } from '@/components/JsonLd';
import { SkipNav } from '@/components/accessibility/SkipNav';
import { FocusManager } from '@/components/accessibility/FocusManager';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LuxuryCursor } from '@/components/ui/LuxuryCursor';

// Premium serif font for headings - inspired by Rolex, Cartier
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'serif'],
});

// Refined sans-serif for body text - inspired by Prada, Burberry
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'ErgoPack India | Verifiable Load Integrity',
    template: '%s | ErgoPack India',
  },
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
  alternates: {
    canonical: '/',
  },
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ErgoPack India',
  },
  applicationName: 'ErgoPack India',
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        <ErrorBoundary>
          {/* Accessibility: Skip to main content */}
          <SkipNav />

          {/* Focus management for route changes */}
          <FocusManager />

          {/* Web Vitals and Performance Monitoring */}
          <WebVitals />
          <PerformanceMonitor />

          {/* Premium Luxury Cursor */}
          <LuxuryCursor />

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
        </ErrorBoundary>
      </body>
    </html>
  );
}
