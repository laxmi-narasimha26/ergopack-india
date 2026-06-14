import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'All Machines (726X, GO, 700)', href: '/products' },
    { label: 'Buy / Price in India', href: '/buy-pallet-strapping-machine-india' },
    { label: 'Compare Products', href: '/compare?auto=true' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
  ],
  industries: [
    { label: 'All Industries We Serve', href: '/industries-served' },
    { label: 'Automotive & Heavy', href: '/blog/automotive-parts-export-packaging' },
    { label: 'Pharma & Cold Chain', href: '/blog/pharmaceutical-pallet-packaging-gdp' },
    { label: 'Ceramics, Stone & Glass', href: '/blog/ceramic-tiles-export-packaging' },
    { label: 'Agri, Food & Textiles', href: '/blog/rice-agricultural-export-packaging' },
  ],
  resources: [
    { label: 'Price & Buying Guide', href: '/resources/pallet-strapping-machine-price-india' },
    { label: 'ROI & Cost Comparison', href: '/resources/pallet-strapping-roi-cost-comparison' },
    { label: 'Best for Heavy Loads', href: '/resources/best-pallet-strapping-machine-heavy-loads' },
    { label: 'PP vs PET vs Steel', href: '/resources/pet-vs-steel-strapping' },
    { label: 'Reduce Transit Damage', href: '/resources/reduce-pallet-transit-damage' },
    { label: 'All Resources & Guides', href: '/resources' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Manufacturing Hubs', href: '/locations' },
    { label: 'Blog & Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-luxury-off-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-medium tracking-widest uppercase text-gray-900 hover:text-gray-700 transition-colors">
                ErgoPack India
              </span>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              High-speed mobile pallet strapping machines that secure a pallet in under 40 seconds —
              cutting labor, eliminating transit damage, and delivering fast ROI for Indian
              manufacturing and export.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:marketing@benz-packaging.com"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                marketing@benz-packaging.com
              </a>
              <a
                href="tel:+919899144488"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 98991 44488
              </a>
              <div className="flex items-start text-gray-600">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">A Trademark of ErgoPack Deutschland GmbH</div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
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
