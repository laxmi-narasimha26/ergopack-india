'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Package, Factory, FileText, Mail, Search } from 'lucide-react';

const navItems = [
  { href: '/products', label: 'Products', icon: Package },
  { href: '/testimonials', label: 'Testimonials', icon: FileText },
  { href: '/about', label: 'About Us', icon: Factory },
  { href: '/support', label: 'Support', icon: Search },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function PremiumNavigation({ initialHidden = false }: { initialHidden?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Threshold for switching from icons to text header
      const scrolled = window.scrollY > 400; // Matches ScrollHeader transition
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On homepage before scroll: Transparent bg, Icons only
  // On homepage after scroll: Dark bg, Text links
  // On other pages: Dark bg, Text links (always)

  const showIcons = isHomePage && !isScrolled;
  const showText = !isHomePage || isScrolled;

  const backgroundColor = showText ? 'rgba(249, 249, 247, 0.95)' : 'transparent'; // Premium light shade
  const headerPadding = showText ? 'py-4' : 'py-6';
  const textColor = showText ? 'text-dark-950' : 'text-white';
  const borderColor = showText ? 'border-dark-950/10' : 'border-white/10';

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] border-b ${borderColor} ${headerPadding} ${showText ? 'backdrop-blur-md shadow-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Left: Logo Area */}
        <div className="w-1/3 flex items-center">
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="group relative z-50">
                  <div className="text-2xl font-serif font-medium tracking-widest uppercase">
                    <span className={textColor}>ErgoPack India</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex justify-center hidden md:flex">
          <AnimatePresence mode="wait">
            {showIcons ? (
              <motion.div
                key="icons"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-16"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="p-3 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                      <item.icon
                        className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-10"
              >
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="group relative py-2">
                    <span
                      className={`text-xs uppercase tracking-[0.2em] font-medium ${textColor} hover:text-ergopack transition-colors duration-300 whitespace-nowrap`}
                    >
                      {item.label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ergopack group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Right: Actions */}
        <div className="w-1/3 flex justify-end items-center gap-6">
          <Link href="/contact" className="hidden md:block">
            <button
              className={`px-6 py-2 text-xs font-medium uppercase tracking-widest border transition-all duration-300 rounded-sm ${showText ? 'text-dark-950 border-dark-950/30 hover:bg-ergopack hover:text-white hover:border-ergopack' : 'text-white border-white/30 hover:bg-ergopack hover:border-ergopack'} ${showIcons ? 'bg-white/10 backdrop-blur-sm' : ''}`}
            >
              Request Demo
            </button>
          </Link>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1} />
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
            className="md:hidden bg-dark-950 border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm uppercase tracking-[0.2em] font-medium text-white hover:text-ergopack transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-sm uppercase tracking-[0.2em] font-medium text-white pt-4 border-t border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
