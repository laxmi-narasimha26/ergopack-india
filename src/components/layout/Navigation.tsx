'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

const navLinks = [
  { href: '/products', label: 'Products' },
  {
    href: '/products/xpert-line',
    label: 'X-pert Line',
    submenu: [
      { href: '/products/745x', label: '745X Li' },
      { href: '/products/726x', label: '726X Li' },
      { href: '/products/713x', label: '713X Li' },
      { href: '/products/700x', label: '700X Li' },
      { href: '/products/re', label: 'RE Mobile' },
    ]
  },
  {
    href: '/products/economy-line',
    label: 'E-conomy Line',
    submenu: [
      { href: '/products/745e', label: '745E' },
      { href: '/products/726e', label: '726E' },
      { href: '/products/713e', label: '713E' },
      { href: '/products/700e', label: '700E' },
      { href: '/products/700', label: '700 Manual' },
      { href: '/products/go', label: 'GO Portable' },
    ]
  },
  {
    href: '/products/find-your-model',
    label: 'Find Your Model',
    highlight: true,
  },
  {
    href: '/products/compare-all',
    label: 'Compare All',
    submenu: [
      { href: '/products/compare-machines', label: 'Quick Compare' },
      { href: '/products/compare', label: 'Line Comparison' },
    ]
  },
  { href: '/elite', label: 'Elite Experience' },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Insights' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm'
          : 'bg-white/95 py-6'
      )}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-gray-900">ErgoPack</span>
              <span className="text-red-600">India</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-300 group',
                  pathname === link.href
                    ? 'text-red-600'
                    : 'text-gray-700 hover:text-red-600'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px transition-all duration-300 bg-red-600',
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Request Invitation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-gray-900"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-200 mt-4"
            >
              <div className="pt-6 pb-4 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-2 text-lg font-medium transition-colors',
                        pathname === link.href
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4"
                >
                  <Link href="/contact">
                    <Button variant="primary" size="md" className="w-full">
                      Request Invitation
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
