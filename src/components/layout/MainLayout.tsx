'use client';

import { ReactNode, useEffect } from 'react';
import PremiumNavigation from './PremiumNavigation';
import Footer from './Footer';
import EnhancedChatbot from '@/components/features/EnhancedChatbot';

import { ScrollProgress } from '@/components/ui/ScrollProgress';

interface MainLayoutProps {
  children: ReactNode;
  hideLogoInitially?: boolean;
  noPadding?: boolean;
}

export default function MainLayout({
  children,
  hideLogoInitially = false,
  noPadding = false,
}: MainLayoutProps) {
  // Smooth scroll behavior
  useEffect(() => {
    // Add smooth scroll polyfill for better cross-browser support
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

  return (
    <div className="min-h-screen flex flex-col bg-luxury-white">
      <ScrollProgress />
      <PremiumNavigation initialHidden={hideLogoInitially} />
      <main className={`flex-grow ${noPadding ? '' : 'pt-20'}`}>{children}</main>
      <Footer />
      <EnhancedChatbot />
    </div>
  );
}
