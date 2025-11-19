'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineStep {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: '0.0s',
    title: 'Package Detection',
    description: 'Sensors detect package entry',
    icon: '👁️',
  },
  {
    time: '0.3s',
    title: 'Positioning',
    description: 'Conveyor centers package perfectly',
    icon: '📍',
  },
  {
    time: '0.6s',
    title: 'Strap Feed',
    description: 'Strap material feeds around perimeter',
    icon: '🔄',
  },
  {
    time: '1.2s',
    title: 'Tensioning',
    description: 'Servo applies exact force',
    icon: '⚡',
  },
  {
    time: '1.5s',
    title: 'Sealing',
    description: 'Ultrasonic seal creates bond',
    icon: '🔥',
  },
  {
    time: '1.8s',
    title: 'Complete',
    description: 'Package exits secured',
    icon: '✓',
  },
];

/**
 * Process Timeline Visualization
 *
 * Animated timeline showing the strapping process
 * with precise timing information
 */
export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  return (
    <div ref={containerRef} className="relative py-32 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-theme-primary text-center mb-20"
        >
          PROCESS TIMELINE
        </motion.h3>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-theme-secondary">
            {/* Progress Line */}
            <motion.div
              style={{ height: `${timelineProgress}%` }}
              className="w-full bg-gradient-to-b from-[#C8102E] to-[#FFB81C]"
            />
          </div>

          {/* Timeline Steps */}
          {TIMELINE_STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  isLeft ? 'justify-end pr-[calc(50%+40px)]' : 'justify-start pl-[calc(50%+40px)]'
                }`}
              >
                {/* Content Card */}
                <div
                  className={`max-w-sm bg-gradient-to-br from-[#1A0000] to-black border-2 border-[#4A0000] rounded-lg p-6 hover:border-[#C8102E] transition-all duration-300 ${
                    !isLeft ? 'text-left' : 'text-right'
                  }`}
                >
                  {/* Time */}
                  <div className="text-[#FFB81C] font-mono font-bold text-2xl mb-2">
                    {step.time}
                  </div>

                  {/* Title */}
                  <h4 className="text-theme-primary font-bold text-xl mb-2">{step.title}</h4>

                  {/* Description */}
                  <p className="text-theme-secondary text-sm">{step.description}</p>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-[#C8102E]/50 border-4 border-black"
                  >
                    {step.icon}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Time Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-[#1A0000] via-black to-[#1A0000] border-2 border-[#C8102E] rounded-lg p-8"
        >
          <div className="text-6xl font-black text-[#FFB81C] mb-2">1.8s</div>
          <div className="text-xl text-theme-primary font-semibold mb-1">Total Cycle Time</div>
          <div className="text-sm text-theme-secondary">From entry to exit</div>
        </motion.div>
      </div>
    </div>
  );
}
