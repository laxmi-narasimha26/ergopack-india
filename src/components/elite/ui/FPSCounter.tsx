'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FPS Counter & Performance Monitor
 *
 * Displays:
 * - Current FPS
 * - Average FPS
 * - Performance rating
 * - Toggle visibility with 'P' key
 */
export default function FPSCounter() {
  const [fps, setFps] = useState(60);
  const [avgFps, setAvgFps] = useState(60);
  const [isVisible, setIsVisible] = useState(false);
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const calculateFPS = () => {
      const currentTime = performance.now();
      const delta = currentTime - lastTime;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta);
        setFps(currentFps);

        setFpsHistory((prev) => {
          const newHistory = [...prev, currentFps].slice(-30);
          const avg = Math.round(newHistory.reduce((a, b) => a + b, 0) / newHistory.length);
          setAvgFps(avg);
          return newHistory;
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      frameCount++;
      animationFrameId = requestAnimationFrame(calculateFPS);
    };

    animationFrameId = requestAnimationFrame(calculateFPS);

    // Toggle with 'P' key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const getPerformanceRating = (fps: number) => {
    if (fps >= 55) return { text: 'EXCELLENT', color: '#00FF88' };
    if (fps >= 40) return { text: 'GOOD', color: '#FFB81C' };
    if (fps >= 25) return { text: 'FAIR', color: '#FFA500' };
    return { text: 'POOR', color: '#FF4444' };
  };

  const rating = getPerformanceRating(avgFps);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-24 right-8 z-50 bg-black/90 backdrop-blur-md border border-[#4A0000] rounded-lg p-4 font-mono text-xs"
        >
          {/* Title */}
          <div className="text-gray-500 mb-3 text-[10px] uppercase tracking-wider">
            Performance Monitor
          </div>

          {/* Current FPS */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-white text-3xl font-bold">{fps}</span>
            <span className="text-gray-500">FPS</span>
          </div>

          {/* Average FPS */}
          <div className="flex justify-between items-center mb-3 text-[10px]">
            <span className="text-gray-600">AVG:</span>
            <span className="text-white font-bold">{avgFps} FPS</span>
          </div>

          {/* Performance Rating */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 text-[10px]">RATING:</span>
            <span
              className="font-bold text-[10px] px-2 py-0.5 rounded"
              style={{ backgroundColor: rating.color + '33', color: rating.color }}
            >
              {rating.text}
            </span>
          </div>

          {/* FPS Graph */}
          <div className="h-8 flex items-end gap-[2px] mb-2">
            {fpsHistory.map((f, i) => (
              <div
                key={i}
                className="flex-1 rounded-t transition-all duration-200"
                style={{
                  height: `${(f / 60) * 100}%`,
                  backgroundColor:
                    f >= 55 ? '#00FF88' : f >= 40 ? '#FFB81C' : f >= 25 ? '#FFA500' : '#FF4444',
                  opacity: 0.3 + (i / fpsHistory.length) * 0.7,
                }}
              />
            ))}
          </div>

          {/* Close Hint */}
          <div className="text-gray-700 text-[9px] text-center mt-2 border-t border-gray-800 pt-2">
            Press <kbd className="px-1 bg-gray-800 rounded">P</kbd> to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
