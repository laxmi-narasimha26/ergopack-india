'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, DollarSign, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

const productsDropdown = {
  xpert: [
    { href: '/products/745x', label: '745X Li', desc: 'Heavy-Duty Premium' },
    { href: '/products/726x', label: '726X Li', desc: 'Light-Duty Premium' },
    { href: '/products/713x', label: '713X Li', desc: 'Ultra-Light Premium' },
    { href: '/products/700x', label: '700X Li', desc: 'Basic Premium' },
    { href: '/products/re', label: 'RE Mobile', desc: 'Mobile Retracting' },
  ],
  economy: [
    { href: '/products/745e', label: '745E', desc: 'Heavy-Duty Value' },
    { href: '/products/726e', label: '726E', desc: 'Light-Duty Value' },
    { href: '/products/713e', label: '713E', desc: 'Ultra-Light Value' },
    { href: '/products/700e', label: '700E', desc: 'Basic Value' },
    { href: '/products/700', label: '700 Manual', desc: 'Manual Operation' },
    { href: '/products/go', label: 'GO Portable', desc: 'Economy Portable' },
  ],
  compare: [
    { href: '/products/compare-all', label: 'Compare All Models', desc: 'Side-by-side' },
    { href: '/products/find-your-model', label: 'Find Your Model', desc: 'Model finder' },
  ],
};

const navLinks = [
  { href: '/products', label: 'Products', hasDropdown: true },
  { href: '/products/compare', label: 'Compare' },
  { href: '/elite', label: 'Elite Experience' },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Insights' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsProductsOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsProductsOpen(false)}
              >
                {link.hasDropdown ? (
                  <>
                    <button
                      className={cn(
                        'relative text-sm font-medium transition-colors duration-300 group flex items-center gap-1',
                        pathname.startsWith('/products')
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-300',
                          isProductsOpen && 'rotate-180'
                        )}
                      />
                      <span
                        className={cn(
                          'absolute -bottom-1 left-0 h-px transition-all duration-300 bg-red-600',
                          pathname.startsWith('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                        )}
                      />
                    </button>

                    {/* Products Mega Dropdown */}
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-8 z-50"
                        >
                          <div className="grid grid-cols-3 gap-8">
                            {/* X-pert Line */}
                            <div>
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-red-200">
                                <Zap className="h-5 w-5 text-red-600" />
                                <h3 className="font-bold text-gray-900">X-pert Line</h3>
                              </div>
                              <div className="space-y-2">
                                {productsDropdown.xpert.map((product) => (
                                  <Link
                                    key={product.href}
                                    href={product.href}
                                    className="block group"
                                  >
                                    <div className="px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                      <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                        {product.label}
                                      </div>
                                      <div className="text-xs text-gray-500">{product.desc}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Economy Line */}
                            <div>
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <DollarSign className="h-5 w-5 text-gray-700" />
                                <h3 className="font-bold text-gray-900">Economy Line</h3>
                              </div>
                              <div className="space-y-2">
                                {productsDropdown.economy.map((product) => (
                                  <Link
                                    key={product.href}
                                    href={product.href}
                                    className="block group"
                                  >
                                    <div className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                        {product.label}
                                      </div>
                                      <div className="text-xs text-gray-500">{product.desc}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <Package className="h-5 w-5 text-gray-700" />
                                <h3 className="font-bold text-gray-900">Quick Links</h3>
                              </div>
                              <div className="space-y-2">
                                <Link href="/products" className="block group">
                                  <div className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                      All Products
                                    </div>
                                    <div className="text-xs text-gray-500">View all 11 models</div>
                                  </div>
                                </Link>
                                {productsDropdown.compare.map((item) => (
                                  <Link key={item.href} href={item.href} className="block group">
                                    <div className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                        {item.label}
                                      </div>
                                      <div className="text-xs text-gray-500">{item.desc}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'relative text-sm font-medium transition-colors duration-300 group',
                      pathname === link.href ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
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
                )}
              </div>
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="lg:hidden overflow-hidden bg-white border-t border-gray-200 mt-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="pt-6 pb-4 space-y-4">
                {/* Products Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="space-y-2"
                >
                  <Link href="/products" className="block py-2 text-lg font-bold text-gray-900">
                    All Products
                  </Link>

                  <div className="pl-4 space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-red-600 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        X-pert Line
                      </p>
                      {productsDropdown.xpert.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="block py-1.5 pl-6 text-sm text-gray-700 hover:text-red-600"
                        >
                          {product.label}
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Economy Line
                      </p>
                      {productsDropdown.economy.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="block py-1.5 pl-6 text-sm text-gray-700 hover:text-red-600"
                        >
                          {product.label}
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      {productsDropdown.compare.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-1.5 pl-6 text-sm font-medium text-gray-700 hover:text-red-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Other Links */}
                {navLinks.slice(1).map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-2 text-lg font-medium transition-colors',
                        pathname === link.href ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
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
