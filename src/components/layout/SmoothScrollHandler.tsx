'use client';

import { useEffect } from 'react';

export default function SmoothScrollHandler() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      e.preventDefault();
      const targetId = anchor.getAttribute('href')?.slice(1);
      if (!targetId) {
        return;
      }

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
}
