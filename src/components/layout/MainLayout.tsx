'use client';

import { ReactNode, useEffect } from 'react';
import PremiumNavigation from './PremiumNavigation';
import Footer from './Footer';
import EnhancedChatbot from '@/components/features/EnhancedChatbot';
import PageTransition from '@/components/effects/PageTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
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
      <PremiumNavigation />
      <PageTransition>
        <main className="flex-grow pt-20">{children}</main>
      </PageTransition>
      <Footer />
      <EnhancedChatbot />
    </div>
  );
}
