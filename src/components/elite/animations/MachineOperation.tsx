'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  PackageEntryIcon,
  StrapFeedingIcon,
  PrecisionTensionIcon,
  HeatSealingIcon,
  CompleteIcon,
  TimerIcon,
  SpeedIcon,
  StrengthIcon,
  EnergyIcon,
} from '@/components/elite/ui/PremiumIcons';

interface OperationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const OPERATION_STEPS: OperationStep[] = [
  {
    id: 1,
    title: 'Package Entry',
    description: 'Package enters the strapping zone via precision conveyor system',
    icon: PackageEntryIcon,
    color: '#FFB81C',
  },
  {
    id: 2,
    title: 'Strap Feeding',
    description: 'Strap material automatically feeds around package perimeter',
    icon: StrapFeedingIcon,
    color: '#00D9FF',
  },
  {
    id: 3,
    title: 'Precision Tensioning',
    description: 'Servo motor applies exact tension - 0.1mm tolerance',
    icon: PrecisionTensionIcon,
    color: '#FFB81C',
  },
  {
    id: 4,
    title: 'Heat Sealing',
    description: 'Ultrasonic sealing creates permanent bond in 0.3 seconds',
    icon: HeatSealingIcon,
    color: '#C8102E',
  },
  {
    id: 5,
    title: 'Package Exit',
    description: 'Secured package exits - ready for shipping',
    icon: CompleteIcon,
    color: '#00FF88',
  },
];

/**
 * Machine Operation Animation
 *
 * Animated visualization showing the 5-step strapping process
 * with scroll-triggered progression
 */
export default function MachineOperation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Map scroll to step progression - Fixed to show all 5 steps
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Enhanced mapping for better step progression
      if (latest < 0.15) {
        setActiveStep(0);
      } else if (latest < 0.35) {
        setActiveStep(1);
      } else if (latest < 0.55) {
        setActiveStep(2);
      } else if (latest < 0.75) {
        setActiveStep(3);
      } else {
        setActiveStep(4);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-theme-primary text-center mb-20"
        >
          HOW IT WORKS
        </motion.h3>

        {/* Visual Animation Area */}
        <div className="relative h-[600px] mb-20 bg-gradient-to-br from-[#1A0000] to-black rounded-2xl border border-[#4A0000] overflow-hidden">
          {/* Animated Machine Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Conveyor Belt */}
            <div className="absolute bottom-1/3 left-0 right-0 h-20 bg-gradient-to-r from-theme-secondary via-gray-700 to-theme-secondary">
              <motion.div
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="h-full w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>

            {/* Package (moves through stages) */}
            <motion.div
              animate={{
                x: ['-200%', '-100%', '0%', '100%', '200%'][activeStep] + '%',
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="w-40 h-40 bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg shadow-2xl flex items-center justify-center">
                <span className="text-6xl">📦</span>

                {/* Strap Animation (appears in steps 2-4) */}
                {activeStep >= 1 && activeStep <= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 border-4 border-[#C8102E] rounded-lg"
                    style={{
                      opacity: activeStep >= 2 ? 1 : 0.5,
                    }}
                  />
                )}

                {/* Seal Indicator (step 4) */}
                {activeStep >= 3 && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-2 right-2 w-8 h-8 bg-[#C8102E] rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Strapping Head (fixed position) */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: activeStep === 1 || activeStep === 2 ? 1.1 : 1,
                }}
                className="w-32 h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-[#C8102E] shadow-xl"
              >
                {/* Strap Feed Animation */}
                {activeStep === 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 bg-[#C8102E] mx-auto"
                  />
                )}

                {/* Tensioning Indicator */}
                {activeStep === 2 && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-[#FFB81C] rounded-lg"
                  />
                )}

                {/* Heat Effect */}
                {activeStep === 3 && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-radial from-orange-500/50 to-transparent rounded-lg"
                  />
                )}
              </motion.div>
            </div>

            {/* Particle Effects */}
            {activeStep === 3 && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: '50%',
                      y: '30%',
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.random() - 0.5) * 40}%`,
                      y: `${30 + (Math.random() - 0.5) * 40}%`,
                      opacity: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Current Step Indicator */}
          <div className="absolute top-8 left-8 bg-theme-primary/60 backdrop-blur-md px-6 py-3 rounded-full border border-[#C8102E]">
            <span className="text-[#FFB81C] font-mono text-sm font-bold">
              STEP {activeStep + 1}/5
            </span>
          </div>
        </div>

        {/* Step Details */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {OPERATION_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-6 rounded-lg border-2 transition-all duration-500 ${
                activeStep === index
                  ? 'bg-gradient-to-br from-[#1A0000] to-black border-[#C8102E] scale-105 shadow-2xl shadow-[#C8102E]/20'
                  : 'bg-theme-primary/40 border-[#4A0000]'
              }`}
            >
              {/* Step Number */}
              <div
                className={`absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                  activeStep >= index
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-theme-secondary text-theme-secondary'
                }`}
              >
                {step.id}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <step.icon
                  size={48}
                  color={activeStep === index ? step.color : '#666666'}
                  className="transition-all duration-500"
                />
              </div>

              {/* Title */}
              <h4 className="text-theme-primary font-bold text-lg mb-2 text-center">
                {step.title}
              </h4>

              {/* Description */}
              <p className="text-theme-secondary text-sm text-center leading-relaxed">
                {step.description}
              </p>

              {/* Progress Indicator */}
              {activeStep === index && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#C8102E] to-[#FFB81C]"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { label: 'Cycle Time', value: '<2 sec', Icon: TimerIcon },
            { label: 'Strap Speed', value: '900/hr', Icon: SpeedIcon },
            { label: 'Seal Strength', value: '>500N', Icon: StrengthIcon },
            { label: 'Energy Usage', value: '0.8kW', Icon: EnergyIcon },
          ].map((spec, idx) => (
            <div key={idx} className="bg-theme-primary/40 border border-[#4A0000] p-6 rounded-lg">
              <div className="flex justify-center mb-3">
                <spec.Icon size={36} color="#FFB81C" />
              </div>
              <div className="text-2xl font-bold text-[#FFB81C] mb-1">{spec.value}</div>
              <div className="text-sm text-theme-secondary uppercase tracking-wider">{spec.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
