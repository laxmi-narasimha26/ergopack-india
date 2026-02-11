import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center ml-1 cursor-help group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <HelpCircle className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#C8102E] transition-colors" />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop to close on click outside */}
            <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="
                fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-xs z-50
                lg:absolute lg:left-1/2 lg:top-auto lg:bottom-full lg:translate-x-[-50%] lg:translate-y-0 lg:mb-2 lg:w-64
              "
            >
              <div className="bg-neutral-800 border border-white/10 rounded-xl p-4 sm:p-3 shadow-2xl backdrop-blur-md">
                <div className="text-sm sm:text-xs text-neutral-200 sm:text-neutral-300 leading-relaxed font-normal normal-case tracking-normal text-left">
                  {content}
                </div>
                {/* Arrow - hidden on mobile, visible on desktop */}
                <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-4 border-t-neutral-800 border-l-transparent border-r-transparent border-b-transparent" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
