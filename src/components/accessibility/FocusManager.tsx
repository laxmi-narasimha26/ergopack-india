'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Manages focus on route changes for better accessibility
 * Announces route changes to screen readers
 */
export function FocusManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset focus to body on route change
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Announce page change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';

    const pageName = getPageName(pathname);
    announcement.textContent = `Navigated to ${pageName}`;

    document.body.appendChild(announcement);

    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [pathname]);

  return null;
}

function getPageName(pathname: string): string {
  if (pathname === '/') return 'home page';

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') + ' page';
}

/**
 * Hook to trap focus within a component (useful for modals, dialogs)
 */
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger close event
        container.dispatchEvent(new CustomEvent('close'));
      }
    };

    container.addEventListener('keydown', handleTabKey as any);
    container.addEventListener('keydown', handleEscapeKey as any);

    // Focus first element when trap activates
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey as any);
      container.removeEventListener('keydown', handleEscapeKey as any);
    };
  }, [isActive, containerRef]);
}
