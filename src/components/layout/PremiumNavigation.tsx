'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Package, Factory, FileText, Mail, Search } from 'lucide-react';

const navItems = [
  { href: '/products', label: 'Products', icon: Package },
  { href: '/industries', label: 'Industries', icon: Factory },
  { href: '/blog', label: 'Insights', icon: FileText },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function PremiumNavigation({ initialHidden = false }: { initialHidden?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setShowText(window.scrollY > 150); // Show text links after scrolling past logo animation
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background color opacity based on scroll
  const backgroundColor = isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent';
  const textColor = isScrolled ? 'text-luxury-dark-gray' : 'text-white';
  const iconColor = isScrolled ? 'text-luxury-dark-gray' : 'text-white';
  const borderColor = isScrolled ? 'border-luxury-dark-gray' : 'border-white';

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b border-transparent ${isScrolled ? 'backdrop-blur-md shadow-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Left: Logo Area (Handled by ScrollHeader) */}
        <div className="w-1/3">{/* Placeholder to balance layout */}</div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex justify-center hidden md:flex">
          <div className="flex items-center gap-12">
            <AnimatePresence mode="wait">
              {showText ? (
                // Text Links State
                <motion.div
                  key="text-nav"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="flex items-center gap-12"
                >
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.href} className="group relative py-2">
                      <span
                        className={`text-xs uppercase tracking-[0.2em] font-medium ${textColor} hover:text-crimson-500 transition-colors duration-300`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 w-0 h-[1px] ${isScrolled ? 'bg-luxury-dark-gray' : 'bg-white'} group-hover:w-full transition-all duration-300 ease-out`}
                      />
                    </Link>
                  ))}
                </motion.div>
              ) : (
                // Icons State
                <motion.div
                  key="icon-nav"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="flex items-center gap-16"
                >
                  {navItems.map((item, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 ${isScrolled ? 'bg-black/5 border-black/10 group-hover:bg-black/10' : 'bg-white/10 border-white/20 group-hover:bg-white/20'}`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${iconColor} group-hover:scale-110 transition-transform duration-500`}
                          strokeWidth={1}
                        />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-widest ${isScrolled ? 'text-luxury-dark-gray/60' : 'text-white/80'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 whitespace-nowrap`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="w-1/3 flex justify-end items-center gap-8">
          <Link href="/contact" className="group relative hidden md:block">
            <span className={`text-xs uppercase tracking-[0.2em] font-medium ${textColor}`}>
              Contact
            </span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-[1px] ${isScrolled ? 'bg-luxury-dark-gray' : 'bg-white'} group-hover:w-full transition-all duration-300 ease-out`}
            />
          </Link>

          <button
            className={`p-2 rounded-full transition-colors duration-300 ${isScrolled ? 'hover:bg-black/5' : 'hover:bg-white/10'}`}
          >
            <Search className={`w-5 h-5 ${iconColor}`} strokeWidth={1} />
          </button>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${iconColor}`} strokeWidth={1} />
            ) : (
              <Menu className={`w-6 h-6 ${iconColor}`} strokeWidth={1} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm uppercase tracking-[0.2em] font-medium text-luxury-dark-gray"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-sm uppercase tracking-[0.2em] font-medium text-luxury-dark-gray pt-4 border-t border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
