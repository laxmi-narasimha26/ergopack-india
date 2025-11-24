'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Zap, Battery, Clock, Activity } from 'lucide-react';

interface BatteryPerformanceProps {
  cycles: number | string;
  loadingTime: string;
  voltage: number | string;
  type: string;
}

export const BatteryPerformance: React.FC<BatteryPerformanceProps> = ({
  cycles,
  loadingTime,
  voltage,
  type,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayCycles, setDisplayCycles] = useState(0);

  // Parse numeric cycles for animation
  const numericCycles =
    typeof cycles === 'number' ? cycles : parseInt(cycles.toString().replace(/\D/g, '')) || 0;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');

      // Count up animation
      let start = 0;
      const end = numericCycles;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth count up
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setDisplayCycles(Math.floor(start + (end - start) * easeOutQuart));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, controls, numericCycles]);

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Indicator */}
          <div className="w-full lg:w-1/2 flex justify-center" ref={ref}>
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl" />

              {/* Progress Ring SVG */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted/20"
                />
                {/* Progress Indicator */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  variants={circleVariants}
                  initial="hidden"
                  animate={controls}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Zap className="w-8 h-8 text-green-500 mb-2 mx-auto" />
                  <span className="text-5xl font-bold font-artisan-sans tracking-tighter">
                    {displayCycles}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2 block">
                    Cycles / Charge
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content & Stats */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-artisan-serif font-bold mb-4">
                Power that Lasts.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Engineered for endurance. The high-performance {type} battery system ensures your
                operation never stops, delivering consistent power throughout the entire shift.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Charging Time Card */}
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Charging Time</span>
                </div>
                <div className="text-2xl font-bold">{loadingTime}</div>
              </div>

              {/* Voltage Card */}
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Voltage</span>
                </div>
                <div className="text-2xl font-bold">{voltage}V</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Battery className="w-4 h-4" />
              <span>Intelligent Battery Management System included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
