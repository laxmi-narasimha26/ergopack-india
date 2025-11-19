'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const navLinks = [
  {
    label: 'Products',
    submenu: [
      { href: '/products/xpert-line', label: 'X-pert Line', desc: 'Premium Series' },
      { href: '/products/economy-line', label: 'E-conomy Line', desc: 'Professional Series' },
      { href: '/products/compare-machines', label: 'Compare', desc: 'Find Your Perfect Fit' },
    ],
  },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export default function PremiumNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled
            ? 'bg-luxury-white/80 backdrop-blur-2xl border-b border-platinum-200/50 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Premium Treatment */}
            <Link href="/" className="relative z-50 group">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Logo Icon */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-600 flex items-center justify-center shadow-lg shadow-crimson-500/30">
                    <span className="text-white font-serif font-bold text-xl">E</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-crimson-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-luxury-dark-gray tracking-tight">
                    ErgoPack
                  </span>
                  <span className="text-xs font-medium text-platinum-500 tracking-[0.2em] uppercase">
                    India
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link, index) => {
                const isActive = link.href
                  ? pathname === link.href
                  : link.submenu?.some((sub) => pathname === sub.href);

                if (link.submenu) {
                  return (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'text-crimson-600' : 'text-platinum-700 hover:text-crimson-600'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.08, ease: 'easeOut' }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72"
                          >
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-platinum-200/50 shadow-2xl shadow-black/10 p-3 overflow-hidden">
                              {/* Glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/5 to-transparent pointer-events-none" />

                              {link.submenu.map((item, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={item.href}
                                  className="relative block group"
                                >
                                  <motion.div
                                    whileHover={{ x: 4 }}
                                    className="px-4 py-3 rounded-xl hover:bg-crimson-50/50 transition-colors duration-300"
                                  >
                                    <div className="text-sm font-medium text-luxury-dark-gray group-hover:text-crimson-600 transition-colors">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-platinum-500 mt-0.5">
                                      {item.desc}
                                    </div>
                                  </motion.div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={link.href!}
                    className={`relative text-sm font-medium transition-colors duration-300 group ${
                      isActive ? 'text-crimson-600' : 'text-platinum-700 hover:text-crimson-600'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-crimson-600 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button - Magnetic Effect */}
            <div className="hidden lg:block">
              <MagneticButton href="/contact">
                <button className="btn-premium">
                  <span className="relative z-10">Request Invitation</span>
                </button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-50 p-2 text-luxury-dark-gray"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-luxury-space-black/95 backdrop-blur-xl z-[90] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-luxury-white z-[95] lg:hidden overflow-y-auto"
            >
              <div className="p-8 pt-28">
                {/* Mobile Nav Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => {
                    if (link.submenu) {
                      return (
                        <div key={index} className="space-y-2">
                          <div className="px-4 py-3 font-serif text-lg font-semibold text-platinum-500">
                            {link.label}
                          </div>
                          {link.submenu.map((item, subIndex) => (
                            <Link
                              key={subIndex}
                              href={item.href}
                              className="block"
                            >
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: subIndex * 0.1 }}
                                className="px-4 py-3 rounded-xl hover:bg-crimson-50 transition-colors"
                              >
                                <div className="text-sm font-medium text-luxury-dark-gray">
                                  {item.label}
                                </div>
                                <div className="text-xs text-platinum-500 mt-0.5">
                                  {item.desc}
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <Link key={index} href={link.href!} className="block">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-4 rounded-xl hover:bg-crimson-50 transition-colors"
                        >
                          <span className="font-serif text-lg font-semibold text-luxury-dark-gray">
                            {link.label}
                          </span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link href="/contact" className="block">
                    <button className="btn-premium w-full">
                      <span className="relative z-10">Request Invitation</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
