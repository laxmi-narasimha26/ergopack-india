'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Sound Effects Toggle
 *
 * Global toggle for all sound effects
 * Stores preference in localStorage
 */
export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Load preference from localStorage
    const saved = localStorage.getItem('ergopack-sound-enabled');
    setSoundEnabled(saved === 'true');
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('ergopack-sound-enabled', String(newState));

    // Dispatch custom event for other components to listen
    window.dispatchEvent(
      new CustomEvent('sound-toggle', { detail: { enabled: newState } })
    );

    // Play a test sound if enabled
    if (newState) {
      playSound('toggle');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
      className={`fixed bottom-36 left-12 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
        soundEnabled
          ? 'bg-[#C8102E] text-white shadow-2xl shadow-[#C8102E]/50'
          : 'bg-gray-800 text-gray-500'
      }`}
      title={soundEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
    >
      {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}

      {/* Indicator Ring */}
      {soundEnabled && (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-[#C8102E]"
        />
      )}
    </motion.button>
  );
}

/**
 * Play Sound Effect
 *
 * Utility function to play sounds (if enabled)
 */
export function playSound(soundId: string) {
  const enabled = localStorage.getItem('ergopack-sound-enabled') === 'true';
  if (!enabled) return;

  // Sound effects mapping (URLs would be actual sound files)
  const sounds: Record<string, string> = {
    toggle: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzfPaiTcIGWi77+egTw==',
    click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzfPaiTcIGWi77+egTw==',
    whoosh: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzfPaiTcIGWi77+egTw==',
  };

  const audio = new Audio(sounds[soundId] || sounds.click);
  audio.volume = 0.3;
  audio.play().catch(() => {
    // Ignore errors (user might not have interacted yet)
  });
}
