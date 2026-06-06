import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Proza_Libre } from 'next/font/google';
import '../styles/globals.css';
import '../styles/themes.css';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/Providers';
import { ThemeProvider } from '@/lib/theme-provider';
import { WebVitals, PerformanceMonitor } from '@/components/WebVitals';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from '@/components/JsonLd';
import { SkipNav } from '@/components/accessibility/SkipNav';
import { FocusManager } from '@/components/accessibility/FocusManager';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LuxuryCursor } from '@/components/ui/LuxuryCursor';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { ContactPopupProvider } from '@/components/contact/ContactPopupContext';
import ComparisonWidget from '@/components/comparison/ComparisonWidget';
import { OnWebChat } from '@/components/OnWebChat';
import { siteConfig } from '@/lib/seo-config';

// Ultra-Premium serif for headings - The "Gucci" standard
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Refined sans-serif for body text - Humanist and legible
const proza = Proza_Libre({
  subsets: ['latin'],
  variable: '--font-proza',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800'],
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
    default: 'Automated Pallet Strapping Machine India | Strap in 40s | ErgoPack',
    template: '%s',
  },
  description:
    'ErgoPack India supplies high-speed mobile pallet strapping machines that secure a pallet in under 40 seconds — a 66% cut versus manual strapping. Machine-calibrated tension up to 2500N eliminates transit damage and shipment rejections while slashing labor and material costs.',
  keywords: [
    'ErgoPack',
    'automated pallet strapping machine India',
    'mobile pallet strapping machine',
    'pallet strapping machine price India',
    'high tension pallet strapping machine',
    'semi automatic pallet strapping machine',
    'reduce transit damage',
    'pallet strapping machine ROI',
    'friction weld strapping',
    'PET strapping machine',
    'ChainLance technology',
    'Made in Germany pallet strapping',
    'sealless pallet strapping',
    'battery operated pallet strapping machine',
  ],
  authors: [{ name: 'ErgoPack India' }],
  creator: 'ErgoPack India',
  publisher: 'ErgoPack India',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'ErgoPack India',
    title: 'Automated Pallet Strapping Machines India | ErgoPack',
    description:
      'Strap pallets in under 40 seconds with mobile, high-tension ErgoPack machines. Eliminate transit damage, cut labor, and reach ROI in months.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ErgoPack India automated mobile pallet strapping machine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automated Pallet Strapping Machines India | ErgoPack',
    description:
      'Strap pallets in under 40 seconds with mobile, high-tension ErgoPack machines. Eliminate transit damage and cut labor costs.',
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${proza.variable}`} suppressHydrationWarning>
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
        <LocalBusinessSchema />
      </head>
      <body className="bg-primary text-primary antialiased font-sans transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ErrorBoundary>
            {/* Accessibility: Skip to main content */}
            <SkipNav />

            {/* Focus management for route changes */}
            <FocusManager />

            {/* Web Vitals and Performance Monitoring */}
            <WebVitals />
            <PerformanceMonitor />

            {/* Premium Luxury Cursor - Removed for normal mouse behavior */}
            {/* <LuxuryCursor /> */}

            <Providers>
              <ComparisonProvider>
                <ContactPopupProvider>
                  {children}
                  <ComparisonWidget />
                  <OnWebChat />
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
                </ContactPopupProvider>
              </ComparisonProvider>
            </Providers>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
