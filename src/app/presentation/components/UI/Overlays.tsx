'use client';

import { motion } from 'framer-motion';

// =====================================================
// UI OVERLAYS (MINIMALIST REALISM)
// =====================================================
// simplified overlays that don't compete with the 3D realism
// Just clean glassmorphism and clear typography

export const SectionIndicator = ({ current, total }: { current: number; total: number }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col gap-4 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 transition-all duration-300 rounded-full ${
              i === current ? 'h-8 bg-[#C8102E]' : 'h-1 bg-gray-400'
            }`}
            layout
          />
        ))}
      </div>
    </div>
  );
};

export const Overlays = () => {
  // Mostly handled by page.tsx inline now for tighter orchestration
  // keeping this file for potential global UI elements like menus/share
  return null;
};
