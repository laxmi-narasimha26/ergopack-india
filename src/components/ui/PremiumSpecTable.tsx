'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpecItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

interface SpecSection {
  title: string;
  items: SpecItem[];
}

interface PremiumSpecTableProps {
  sections: SpecSection[];
  className?: string;
}

export default function PremiumSpecTable({ sections, className }: PremiumSpecTableProps) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="mb-12 last:mb-0"
        >
          <h3 className="text-lg font-light tracking-[0.2em] text-gold-400 mb-6 uppercase border-b border-white/10 pb-2">
            {section.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {section.items.map((item, itemIndex) => (
              <div
                key={item.label}
                className={cn(
                  'flex justify-between items-baseline group border-b border-white/5 pb-2 transition-colors duration-300',
                  item.highlight ? 'border-gold-500/30' : 'hover:border-white/20'
                )}
              >
                <span className="text-white/60 font-light text-sm tracking-wide group-hover:text-white/80 transition-colors">
                  {item.label}
                </span>
                <span
                  className={cn(
                    'font-mono text-base tracking-tight',
                    item.highlight ? 'text-gold-400' : 'text-white/90'
                  )}
                >
                  {item.value}
                  {item.unit && <span className="text-white/40 ml-1 text-xs">{item.unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
