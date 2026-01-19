'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Partner logos from partner-logos folder (user's updated transparent versions)
// Split into two rows for the two-strip display
const partnerLogosRow1 = [
  { name: 'Partner 1', src: '/images/partner-logos/07a31e80-d167-4db8-a98c-6794cea942cb.png' },
  { name: 'Partner 2', src: '/images/partner-logos/0cbcab78-a6b0-491e-ad91-4aa4d37d4271.png' },
  { name: 'Partner 3', src: '/images/partner-logos/0d98719b-6e4e-4230-aff5-51829bdf09e7.png' },
  { name: 'Partner 4', src: '/images/partner-logos/130bac5c-c702-451a-9f84-02fb33e3797a.png' },
  { name: 'Partner 5', src: '/images/partner-logos/22321ee0-e5bf-4f42-bd6f-f8b3c8d52d30.png' },
  { name: 'Partner 6', src: '/images/partner-logos/23e66f26-9d91-4983-b1a4-e477f85551cd.png' },
  { name: 'Partner 7', src: '/images/partner-logos/50a9754b-9c7d-4558-b817-91266c96c68a.png' },
  { name: 'Partner 8', src: '/images/partner-logos/6726697b-98e0-47a8-adc3-6fbff6bed415.png' },
  { name: 'Partner 9', src: '/images/partner-logos/7f936178-58e3-4c7b-89ae-789b509e9991.png' },
  { name: 'Partner 10', src: '/images/partner-logos/81d3d131-81e2-429e-aeef-ce2438f435d8.png' },
  { name: 'Partner 11', src: '/images/partner-logos/82bd1970-1cc8-4511-8419-661b013e5912.png' },
  { name: 'Partner 12', src: '/images/partner-logos/955d7838-f73a-4145-8740-e5cd6c971f24.png' },
  { name: 'Partner 13', src: '/images/partner-logos/a4d7fe9e-d735-4b57-8d13-6000dc8ed42c.png' },
];

const partnerLogosRow2 = [
  { name: 'Partner 14', src: '/images/partner-logos/ba05026f-1525-4c92-ae9c-3d0d1299f493.png' },
  { name: 'Partner 15', src: '/images/partner-logos/ce653962-8c1d-4951-beb6-4e69b19e8dae.png' },
  { name: 'Partner 16', src: '/images/partner-logos/ced44ea3-c150-4d76-aaaf-f690225a8339.png' },
  { name: 'Partner 17', src: '/images/partner-logos/cfaf8468-7e93-4144-a192-7f526f717c6f.png' },
  { name: 'Partner 18', src: '/images/partner-logos/d3d932bb-11d9-4220-93a1-9f890915e00e.png' },
  { name: 'Partner 19', src: '/images/partner-logos/d64c9cb3-55aa-48d1-8f1a-2249960c9e22.png' },
  { name: 'Partner 20', src: '/images/partner-logos/e265a7e8-4c41-4d77-bb35-895951764dc6.png' },
  { name: 'Partner 21', src: '/images/partner-logos/e2d949d0-de81-4c5d-af01-f66b12f24f17.png' },
  { name: 'Partner 22', src: '/images/partner-logos/e47b337e-7c67-407f-bd74-bbcb9606a8f8.png' },
  { name: 'Partner 23', src: '/images/partner-logos/f7f8758a-b6fe-4dfe-97c6-297730ced029.png' },
  { name: 'Partner 24', src: '/images/partner-logos/f84d987f-2dc3-436a-af21-08a051ee06b2.png' },
  { name: 'Partner 25', src: '/images/partner-logos/fc70b9d9-eb2b-4a7b-9d3b-e1303b8e6275.png' },
  { name: 'Partner 26', src: '/images/partner-logos/fd9cac44-5a69-4e86-b0b4-00d51c3d4238.png' },
];

export default function PartnersSection() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedRow1 = [...partnerLogosRow1, ...partnerLogosRow1];
  const duplicatedRow2 = [...partnerLogosRow2, ...partnerLogosRow2];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[#C8102E] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Trusted Worldwide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our <span className="text-[#C8102E]">Partners</span>
          </h2>
        </motion.div>
      </div>

      {/* First Row - Scrolling Left */}
      <div className="relative mb-8">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-20 items-center"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedRow1.map((logo, index) => (
            <div
              key={`row1-${logo.name}-${index}`}
              className="flex-shrink-0 h-20 w-44 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="176px" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Scrolling Right */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-20 items-center"
          animate={{
            x: ['-50%', '0%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedRow2.map((logo, index) => (
            <div
              key={`row2-${logo.name}-${index}`}
              className="flex-shrink-0 h-20 w-44 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="176px" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
