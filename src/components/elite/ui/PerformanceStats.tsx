'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Real-time Performance Stats Overlay (Bottom-right)
 *
 * Features:
 * - Live machine statistics
 * - Engineering dashboard aesthetic
 * - Subtle animations
 * - Technical credibility
 */
export default function PerformanceStats() {
  const [stats, setStats] = useState({
    throughput: 847,
    uptime: 99.7,
    precision: 0.08,
    temperature: 24,
  });

  useEffect(() => {
    // Simulate real-time stat updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        throughput: Math.floor(Math.random() * 50) + 820,
        uptime: Math.min(99.9, prev.uptime + (Math.random() * 0.2 - 0.1)),
        precision: +(Math.random() * 0.05 + 0.05).toFixed(2),
        temperature: Math.floor(Math.random() * 3) + 23,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-12 right-12 z-50 font-mono text-xs text-theme-secondary"
    >
      <div className="space-y-2 glass-theme p-4 rounded border border-[#4A0000]">
        <StatRow label="Throughput" value={`${stats.throughput}/hr`} />
        <StatRow label="Uptime" value={`${stats.uptime.toFixed(1)}%`} />
        <StatRow label="Precision" value={`±${stats.precision}mm`} />
        <StatRow label="Temperature" value={`${stats.temperature}°C`} />
      </div>
    </motion.div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between gap-6"
    >
      <span className="text-theme-secondary">{label}:</span>
      <span className="text-theme-primary font-semibold">{value}</span>
    </motion.div>
  );
}
