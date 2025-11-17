import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'X-pert Line', href: '/products/xpert-line' },
    { label: 'E-conomy Line', href: '/products/economy-line' },
    { label: 'Compare Products', href: '/products/compare' },
  ],
  industries: [
    { label: 'Pharmaceuticals', href: '/industries#pharmaceuticals' },
    { label: 'Automotive', href: '/industries#automotive' },
    { label: 'Electronics', href: '/industries#electronics' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog & Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-bold">
                <span className="text-white">ErgoPack</span>
                <span className="text-accent-500">India</span>
              </div>
            </Link>
            <p className="text-dark-300 mb-6 leading-relaxed">
              Verifiable Load Integrity. The C-Suite's Control System for
              Zero-Failure Logistics.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@ergopack-india.com"
                className="flex items-center text-dark-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                contact@ergopack-india.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center text-dark-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 123 456 7890
              </a>
              <div className="flex items-start text-dark-300">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-dark-400 text-sm">
              © {new Date().getFullYear()} ErgoPack India. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-dark-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dark-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
