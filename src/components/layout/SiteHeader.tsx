'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const productLines = [
  {
    id: 'xpert',
    label: 'X-Pert Line',
    tagline: 'Li-ion · Digital · 66 m/min',
    color: '#C8102E',
    description:
      'Siemens touchscreen + Line Laser. Li-ion: 1,200 cycles per 3.5-hour charge. ChainLance at 66 m/min.',
    href: '/products/x-pert-line',
    models: [
      {
        name: '726X',
        desc: 'The machine we sell. 13–16 mm PP/PET. Up to 2,500N. Touchscreen + Laser.',
        href: '/products/x-pert-line/726x',
      },
    ],
  },
  {
    id: 'go',
    label: 'GO Line',
    tagline: 'Economy Portable',
    color: '#D97706',
    description:
      'Electric strapping powered by 24V lead-fleece battery. 350 cycles per charge. Joystick control.',
    href: '/products/go',
    models: [
      {
        name: 'ErgoPack GO',
        desc: 'Battery-powered. Pallets 80–190 cm tall. Joystick. PP/PET/Paper/Cord/Composite.',
        href: '/products/go',
      },
    ],
  },
  {
    id: 'economy',
    label: 'E-conomy Line',
    tagline: 'Hand-Crank · No Battery · Any Material',
    color: '#4A7C59',
    description:
      'Pure hand-crank operation. No battery, no motor, no power needed. 64.4 kg. Widest material range.',
    href: '/products/economy-line',
    models: [
      {
        name: '700',
        desc: 'The machine we sell. Manual hand-crank. PP, PET, Paper, Cord, Composite. 64.4 kg.',
        href: '/products/economy-line/700',
      },
    ],
  },
];

const navLinks = [
  { href: '/factory-floor-automation', label: 'Automation' },
  { href: '/industries-served', label: 'Industries' },
  { href: '/roi-calculator', label: 'ROI Calculator' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

interface SiteHeaderProps {
  /** Pixels to push the fixed header down by (e.g. for an announcement bar above it). */
  offset?: number;
}

export default function SiteHeader({ offset = 0 }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  // Always light/opaque header
  const isLight = true;
  // Text is white on dark hero, dark on light bg
  const navTextBase = 'text-gray-700 hover:text-gray-900';
  const navTextActive = 'text-[#C8102E]';
  const logoText = 'text-gray-900';
  const burgerColor = 'text-gray-900';

  return (
    <header
      className="fixed left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/80 transition-[top] duration-200"
      style={{ top: offset }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center h-[72px] gap-4 xl:gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div
              className={`font-serif tracking-[0.1em] uppercase text-lg sm:text-xl font-semibold whitespace-nowrap transition-colors duration-300 ${logoText}`}
            >
              ErgoPack<span className="text-[#C8102E]"> India</span>
            </div>
          </Link>

          {/* Desktop Nav — only at xl where it actually fits */}
          <nav className="hidden xl:flex items-center flex-1 justify-center gap-0.5">
            {/* Products Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-colors duration-200 rounded-sm ${navTextBase}`}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'products' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-colors duration-200 rounded-sm ${
                    pathname === item.href ? navTextActive : navTextBase
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden xl:flex items-center gap-3 ml-auto shrink-0">
            <Link href="/contact">
              <button
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap border transition-all duration-300 rounded-sm ${
                  isLight
                    ? 'border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10'
                }`}
              >
                Get a Demo
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-4 py-2 text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap bg-[#C8102E] text-white hover:bg-red-700 transition-all duration-300 rounded-sm">
                Request Quote
              </button>
            </Link>
          </div>

          {/* Tablet (md–lg): single primary CTA + burger, no cramped full nav */}
          <div className="hidden md:flex xl:hidden items-center gap-3 ml-auto shrink-0">
            <Link href="/contact">
              <button className="px-4 py-2 text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap bg-[#C8102E] text-white hover:bg-red-700 transition-all duration-300 rounded-sm">
                Request Quote
              </button>
            </Link>
          </div>

          {/* Burger — everything below xl */}
          <button
            aria-label="Toggle menu"
            className={`xl:hidden ml-auto md:ml-0 p-2 ${burgerColor}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MEGA MENU DROPDOWN */}
      <AnimatePresence>
        {activeMenu === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1440px] mx-auto px-10 py-10">
              <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                {productLines.map((line) => (
                  <div key={line.id} className="px-10 first:pl-0 last:pr-0 group">
                    {/* Line header */}
                    <div className="mb-5">
                      <div
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1"
                        style={{ color: line.color }}
                      >
                        {line.tagline}
                      </div>
                      <Link
                        href={line.href}
                        className="text-2xl font-serif font-semibold text-gray-900 hover:text-[#C8102E] transition-colors block"
                        onClick={() => setActiveMenu(null)}
                      >
                        {line.label}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {line.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mb-5" />

                    {/* Models */}
                    <div className="space-y-3">
                      {line.models.map((model) => (
                        <Link
                          key={model.name}
                          href={model.href}
                          className="flex items-start gap-3 group/item hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          <div
                            className="w-1 h-1 rounded-full mt-2.5 shrink-0 transition-transform group-hover/item:scale-150"
                            style={{ backgroundColor: line.color }}
                          />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover/item:text-[#C8102E] transition-colors">
                              ErgoPack {model.name}
                            </div>
                            <div className="text-xs text-gray-500">{model.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={line.href}
                      className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
                      style={{ color: line.color }}
                      onClick={() => setActiveMenu(null)}
                    >
                      Discover {line.label}
                      <span className="text-base leading-none">→</span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  German Engineered · Trusted in 55+ Countries
                </span>
                <div className="flex items-center gap-6">
                  <Link
                    href="/compare?auto=true"
                    className="text-xs text-gray-600 hover:text-gray-900 uppercase tracking-wider transition-colors"
                    onClick={() => setActiveMenu(null)}
                  >
                    Compare All Models →
                  </Link>
                  <Link
                    href="/products"
                    className="text-xs text-[#C8102E] hover:text-red-700 uppercase tracking-wider font-semibold transition-colors"
                    onClick={() => setActiveMenu(null)}
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border-t border-gray-200 xl:hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {/* Products accordion */}
              <button
                className="w-full flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-[0.12em] text-gray-900"
                onClick={() => setMobileProduct(mobileProduct === 'products' ? null : 'products')}
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileProduct === 'products' ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {mobileProduct === 'products' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-4 pb-2">
                      {productLines.map((line) => (
                        <div key={line.id}>
                          <div
                            className="text-[10px] uppercase tracking-widest mb-1"
                            style={{ color: line.color }}
                          >
                            {line.tagline}
                          </div>
                          <Link
                            href={line.href}
                            className="block text-base font-serif font-semibold text-gray-900 mb-2"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {line.label}
                          </Link>
                          {line.models.map((m) => (
                            <Link
                              key={m.name}
                              href={m.href}
                              className="block text-sm text-gray-600 py-1 pl-3 border-l-2 border-gray-200 mb-1"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              ErgoPack {m.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <div className="py-3 text-sm font-medium uppercase tracking-[0.12em] text-gray-700 border-t border-gray-100">
                    {item.label}
                  </div>
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full py-3 text-sm font-semibold uppercase tracking-widest bg-[#C8102E] text-white rounded-sm">
                    Request Quote
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
