'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      const body = JSON.stringify({
        event: 'web-vitals',
        event_category: 'Web Vitals',
        event_action: metric.name,
        event_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });

      // Send to Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Send to custom endpoint if available
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/vitals', body);
      }
    }
  });

  return null;
}

// Client-side performance monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Long Tasks
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Long Task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
              });
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // LongTask API not supported
      }

      // Monitor Resource Loading
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;
            // Log slow resources
            if (resourceEntry.duration > 1000 && process.env.NODE_ENV === 'development') {
              console.warn('Slow resource:', {
                name: resourceEntry.name,
                duration: resourceEntry.duration,
                type: resourceEntry.initiatorType,
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource Timing API not supported
      }
    }
  }, []);

  return null;
}
