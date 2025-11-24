'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const productSeries = [
  { name: '700 Series', href: '/products/700' },
  { name: '713 Series', href: '/products/713e' },
  { name: '726 Series', href: '/products/726e' },
  { name: '745 Series', href: '/products/745e' },
  { name: 'GO Series', href: '/products/go' },
];

export const ProductNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
    >
      <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center min-w-max gap-8 md:gap-12">
          {productSeries.map((series) => {
            const isActive =
              pathname.includes(series.href) ||
              (series.name === '700 Series' && pathname.includes('700')) ||
              (series.name === '713 Series' && pathname.includes('713')) ||
              (series.name === '726 Series' && pathname.includes('726')) ||
              (series.name === '745 Series' && pathname.includes('745')) ||
              (series.name === 'GO Series' && pathname.includes('go'));

            return (
              <Link key={series.name} href={series.href} className="relative group">
                <span
                  className={`text-sm font-artisan-sans font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {series.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeSeries"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
