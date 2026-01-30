'use client';

import React, { useState } from 'react'; // Added import React
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-flex items-center ml-1 cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-[#C8102E] transition-colors" />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64"
          >
            <div className="bg-neutral-800 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md">
              <div className="text-xs text-neutral-300 leading-relaxed font-normal normal-case tracking-normal text-left">
                {content}
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-4 border-t-neutral-800 border-l-transparent border-r-transparent border-b-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
