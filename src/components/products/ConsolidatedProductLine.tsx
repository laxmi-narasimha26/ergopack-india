'use client';

import Link from 'next/link';
import { ArrowRight, Play, Check } from 'lucide-react';
import Image from 'next/image';
import VideoPosterLink from '@/components/media/VideoPosterLink';

const products = [
  {
    id: 'xpert',
    title: 'X-Pert Line',
    badge: 'Premium',
    desc: 'The ultimate professional solution. Touchscreen precision, Li-Ion power, and 1200+ cycles.',
    image: '/images/products/700x.png',
    bgImage: '/images/backgrounds/xpert_bg.png',
    video: '/videos/demo.mp4',
    link: '/products/x-pert-line',
    theme: 'dark',
    features: ['Touchscreen Control', 'Li-Ion Battery', '66m/min Speed'],
  },
  {
    id: 'economy',
    title: 'Economy Line',
    badge: 'Standard',
    desc: 'Essential performance. Proven German engineering for reliable daily strapping.',
    image: '/images/products/700e.png',
    bgImage: '/images/backgrounds/economy_bg.png',
    video: '/videos/726E.mp4',
    link: '/products/economy-line',
    theme: 'light',
    features: ['Joystick Control', 'Lead-Crystal Power', '40m/min Speed'],
  },
  {
    id: 'go',
    title: 'ErgoPack GO',
    badge: 'Mobile',
    desc: 'Maximum agility. The compact solution for strapping anywhere, anytime.',
    image: '/images/products/GO.png',
    bgImage: '/images/backgrounds/go_bg.png',
    video: '/videos/ErgoPack_RE.mp4',
    link: '/products/go-line',
    theme: 'dark',
    features: ['Ultra Compact', 'Battery Powered', 'Any Pallet Size'],
  },
];

export default function ConsolidatedProductLine() {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display text-neutral-900 mb-4">
            Choose Your Solution
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            From the agile GO to the premium X-Pert, we have the perfect machine for your logistics
            volume.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full ${product.theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} border`}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-700">
                <Image src={product.bgImage} alt="" fill className="object-cover" />
                <div
                  className={`absolute inset-0 ${product.theme === 'dark' ? 'bg-gradient-to-t from-black via-black/80 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`}
                />
              </div>

              {/* Product Visual Area */}
              <div className="relative h-72 w-full mt-8 z-10 flex items-center justify-center">
                {/* Machine Image */}
                <div className="relative w-64 h-64 transform group-hover:scale-105 transition-transform duration-500 will-change-transform">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Video Play Button (Overlay) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <VideoPosterLink
                    videoSrc={product.video}
                    title={product.title}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all cursor-pointer ring-1 ring-white/50 shadow-2xl"
                    imageClassName="hidden"
                    linkLabel=""
                    linkClassName="absolute inset-0 flex items-center justify-center text-white"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 pt-4 flex-1 flex flex-col">
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${product.theme === 'dark' ? 'bg-white/10 text-white ring-1 ring-white/20' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'}`}
                  >
                    {product.badge}
                  </div>
                  <h3
                    className={`text-3xl font-bold mb-3 ${product.theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed mb-6 ${product.theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}
                  >
                    {product.desc}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-2 text-sm font-medium ${product.theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}
                      >
                        <Check
                          className={`w-4 h-4 ${product.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link
                    href={product.link}
                    className={`group/btn block w-full py-4 rounded-xl font-bold text-center transition-all ${product.theme === 'dark' ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Specifications
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
