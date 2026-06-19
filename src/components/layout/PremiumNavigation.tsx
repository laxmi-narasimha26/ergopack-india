'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const showSolutionsTab = false;

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/factory-floor-automation', label: 'Automation' },
  { href: '/industries-served', label: 'Industries' },
  { href: '/solutions', label: 'Solutions', hidden: !showSolutionsTab },
  { href: '/roi-calculator', label: 'ROI Calculator' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const visibleNavItems = navItems.filter((item) => !item.hidden);

export default function PremiumNavigation({
  initialHidden: _initialHidden = false,
}: {
  initialHidden?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const showText = true;

  const backgroundColor = showText ? 'rgba(249, 249, 247, 0.95)' : 'transparent'; // Premium light shade
  const headerPadding = showText ? 'py-4' : 'py-6';
  const textColor = showText ? 'text-gray-900' : 'text-white';
  const borderColor = showText ? 'border-gray-900/10' : 'border-white/10';

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] border-b ${borderColor} ${headerPadding} ${showText ? 'backdrop-blur-md shadow-sm' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 lg:gap-10 lg:px-8 xl:gap-14">
        {/* Left: Logo Area */}
        <div className="flex w-[320px] shrink-0 items-center pr-6 lg:pr-10 xl:w-[380px] xl:pr-14">
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="group relative z-50 inline-flex items-center">
                  <div className="pt-1 font-serif text-base font-medium uppercase leading-none tracking-[0.12em] whitespace-nowrap lg:text-[1.4rem] xl:text-[1.72rem] xl:tracking-[0.16em]">
                    <span className={textColor}>ErgoPack India</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Navigation — only at xl where all items fit */}
        <nav className="hidden min-w-0 flex-1 justify-center px-2 xl:flex xl:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-center gap-5 xl:gap-8"
            >
              {visibleNavItems.map((item) => (
                <Link key={item.label} href={item.href} className="group relative py-2">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.1em] xl:text-[11px] xl:tracking-[0.14em] ${textColor} hover:text-ergopack transition-colors duration-300 whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ergopack group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </nav>

        {/* Right: Actions */}
        <div className="ml-auto flex shrink-0 items-center justify-end gap-3 xl:gap-4">
          <Link href="/products/build-your-own" className="hidden xl:block">
            <button
              className={`px-3 py-2 text-[10px] xl:text-xs font-medium uppercase tracking-[0.1em] xl:tracking-widest whitespace-nowrap border transition-all duration-300 rounded-sm ${showText ? 'text-ergopack border-ergopack hover:bg-ergopack hover:text-white' : 'text-white border-white/30 hover:bg-ergopack hover:border-ergopack'}`}
            >
              Build Your Own
            </button>
          </Link>
          <Link href="/contact" className="hidden md:block">
            <button
              className={`px-5 py-2 text-xs font-medium uppercase tracking-widest whitespace-nowrap border transition-all duration-300 rounded-sm ${showText ? 'text-white bg-ergopack border-ergopack hover:bg-red-700 hover:border-red-700' : 'text-white border-white/30 hover:bg-ergopack hover:border-ergopack'}`}
            >
              Request Demo
            </button>
          </Link>

          <button
            aria-label="Toggle menu"
            className={`xl:hidden p-2 ${showText ? 'text-gray-900' : 'text-white'}`}
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
            className="overflow-hidden border-t border-stone-200 bg-[#f9f9f7] xl:hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-medium uppercase tracking-[0.2em] text-stone-900 transition-colors hover:text-ergopack"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/products/build-your-own"
                className="block border-t border-stone-200 pt-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-900 transition-colors hover:text-ergopack"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Build Your Own
              </Link>
              <Link
                href="/contact"
                className="block pt-4 text-sm font-medium uppercase tracking-[0.2em] text-ergopack"
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
