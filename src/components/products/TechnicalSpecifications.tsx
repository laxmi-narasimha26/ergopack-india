'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SpecItem {
  label: string;
  value: string | number;
  unit?: string;
}

interface TechnicalSpecificationsProps {
  specs: {
    system: SpecItem[];
    performance: SpecItem[];
    power: SpecItem[];
  };
}

export const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = ({ specs }) => {
  const allSpecs = [
    { category: 'System Architecture', items: specs.system },
    { category: 'Performance Metrics', items: specs.performance },
    { category: 'Power & Autonomy', items: specs.power },
  ];

  return (
    <section className="py-24 bg-background relative border-t border-secondary">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-artisan-sans tracking-widest-artisan uppercase text-primary mb-4 block font-semibold">
            The Blueprint
          </span>
          <h2 className="text-4xl lg:text-5xl font-artisan-serif text-foreground mb-6">
            Technical Excellence
          </h2>
          <p className="text-muted-foreground font-artisan-sans leading-relaxed">
            Every dimension, every component, every specification is calculated for maximum
            efficiency and durability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-primary/10">
          {allSpecs.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.6 }}
              className="border-r border-b border-primary/10 p-6 lg:p-8 hover:bg-secondary/20 transition-colors duration-500 group"
            >
              <h3 className="text-xl font-artisan-serif text-foreground mb-6 group-hover:text-primary transition-colors">
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 group/item">
                    <span className="text-sm text-muted-foreground font-artisan-sans uppercase tracking-wide group-hover/item:text-foreground transition-colors">
                      {item.label}
                    </span>
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-medium text-foreground font-artisan-sans block break-words">
                        {item.value}
                      </span>
                      {item.unit && (
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">
                          {item.unit}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <p className="text-xs text-muted-foreground/60 italic font-artisan-serif tracking-wide">
            * Technical specifications subject to change. Measurements in mm unless otherwise
            stated.
          </p>
        </div>
      </div>
    </section>
  );
};
