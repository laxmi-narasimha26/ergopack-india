'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ProductSection = ({
  title,
  subtitle,
  description,
  videoSource,
  imagePath,
  theme = 'dark',
  align = 'center',
  link,
}: {
  title: string;
  subtitle: string;
  description: string;
  videoSource?: string;
  imagePath?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center' | 'right';
  link: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const videoY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const videoScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

  const textColor = theme === 'dark' ? 'text-white' : 'text-luxury-black';
  const subTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const buttonBorder =
    theme === 'dark' ? 'border-white/30 hover:border-white' : 'border-black/30 hover:border-black';
  const buttonText = theme === 'dark' ? 'text-white' : 'text-black';

  // Luxury backgrounds
  const bgClass =
    theme === 'dark'
      ? 'bg-gradient-to-b from-zinc-900 via-black to-zinc-900'
      : 'bg-gradient-to-b from-white via-gray-50 to-white';

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden flex items-center justify-center ${bgClass}`}
    >
      {/* Optional Background Image for extra texture (low opacity) */}
      {imagePath && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src={imagePath} alt="Background Texture" fill className="object-cover" />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'}`} />
        </div>
      )}

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        <motion.div
          style={{ opacity }}
          className={`flex flex-col justify-center h-full ${align === 'center' ? 'items-center text-center lg:items-start lg:text-left' : align === 'left' ? 'items-start text-left' : 'items-end text-right lg:order-2'}`}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-medium tracking-[0.2em] uppercase mb-4 text-artisan-gold"
          >
            {subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-5xl md:text-7xl lg:text-9xl font-serif font-light mb-8 ${textColor}`}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl md:text-2xl max-w-xl font-light leading-relaxed mb-12 ${subTextColor}`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href={link}
              className={`group flex items-center gap-3 px-8 py-4 rounded-full border ${buttonBorder} ${buttonText} transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-fit`}
            >
              <span className="text-lg tracking-wide uppercase">Discover {title}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {videoSource && (
          <motion.div
            style={{ y: videoY, opacity, scale: videoScale }}
            className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl ${align === 'right' ? 'lg:order-1' : ''}`}
          >
            <div
              className={`absolute inset-0 z-10 pointer-events-none ${theme === 'dark' ? 'shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]' : 'shadow-[inset_0_0_100px_rgba(255,255,255,0.2)]'}`}
            />

            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transform scale-105"
            >
              <source src={videoSource} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none z-20" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function AppleStyleProductShowcase() {
  return (
    <div className="w-full">
      {/* X-Pert Line - Restored as standard section */}
      <ProductSection
        title="X-Pert Line"
        subtitle="The Ultimate Professional"
        description="Engineered for those who demand perfection. Advanced lithium-ion power, touchscreen precision, and uncompromising performance."
        videoSource="/videos/demo.mp4"
        imagePath="/images/backgrounds/xpert_bg.png"
        theme="dark"
        align="right"
        link="/products/x-pert-line"
      />

      {/* E-conomy Line */}
      <ProductSection
        title="E-conomy Line"
        subtitle="Essential Performance"
        description="The perfect balance of efficiency and reliability. Proven German engineering for your daily strapping needs."
        videoSource="/videos/726E.mp4"
        imagePath="/images/backgrounds/economy_bg.png"
        theme="light"
        align="right"
        link="/products/economy-line"
      />

      {/* Go Line */}
      <ProductSection
        title="Go Line"
        subtitle="Mobile Freedom"
        description="Strapping anywhere, anytime. The most compact and versatile solution for agile operations."
        videoSource="/videos/ErgoPack_RE.mp4"
        imagePath="/images/backgrounds/go_bg.png"
        theme="dark"
        align="left"
        link="/products/go-line"
      />
    </div>
  );
}
