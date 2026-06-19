'use client';

import { ReactNode, useEffect } from 'react';
import PremiumNavigation from './PremiumNavigation';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

import { ScrollProgress } from '@/components/ui/ScrollProgress';

interface MainLayoutProps {
  children: ReactNode;
  hideLogoInitially?: boolean;
  noPadding?: boolean;
  /** Opt back into the legacy PremiumNavigation header. Default is the unified SiteHeader. */
  useLegacyNav?: boolean;
  /** @deprecated SiteHeader is now the default everywhere; this prop is ignored. */
  useSiteHeader?: boolean;
  /** @deprecated SiteHeader is now the default everywhere; this prop is ignored. */
  useMercedesNav?: boolean;
}

export default function MainLayout({
  children,
  hideLogoInitially = false,
  noPadding = false,
  useLegacyNav = false,
}: MainLayoutProps) {
  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.slice(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Use the unified SiteHeader everywhere by default (same as the homepage).
  // A page can still opt back into the legacy PremiumNavigation by passing
  // useLegacyNav, but the default across the site is now the homepage header.
  const showSiteHeader = !useLegacyNav;

  return (
    <div className="min-h-screen flex flex-col bg-luxury-white">
      <ScrollProgress />
      {showSiteHeader ? (
        <SiteHeader />
      ) : (
        <PremiumNavigation initialHidden={hideLogoInitially} />
      )}
      <main className={`flex-grow ${noPadding ? '' : 'pt-20'}`}>{children}</main>
      <Footer />
    </div>
  );
}
