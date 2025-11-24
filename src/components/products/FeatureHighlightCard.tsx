'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface FeatureHighlightCardProps {
  icon?: LucideIcon;
  image?: string;
  video?: string;
  title: string;
  description: string;
  index: number;
  theme?: 'dark' | 'light';
}

export const FeatureHighlightCard: React.FC<FeatureHighlightCardProps> = ({
  icon: Icon,
  image,
  video,
  title,
  description,
  index,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative border rounded-3xl overflow-hidden p-8 transition-all duration-300 hover:shadow-2xl ${bgClass}`}
    >
      {/* Media Section */}
      {video ? (
        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      ) : image ? (
        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      ) : Icon ? (
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${isDark ? 'bg-crimson-500/10' : 'bg-gray-100'}`}
        >
          <Icon className={`w-8 h-8 ${isDark ? 'text-crimson-400' : 'text-gray-900'}`} />
        </div>
      ) : null}

      {/* Text Content */}
      <h3 className={`text-2xl font-serif font-bold mb-4 ${textClass}`}>{title}</h3>

      <p className={`text-base leading-relaxed ${subtextClass}`}>{description}</p>
    </motion.div>
  );
};
