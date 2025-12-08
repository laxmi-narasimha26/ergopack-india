'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// =====================================================
// DATA STRUCTURE FOR ERGOPACK SERIES
// =====================================================
const PRODUCT_DATA = {
    '726X': {
        title: "ErgoPack 726X",
        subtitle: "The Flagship | Electronic Drive & Sealing",
        specs: [
            { label: "Strap Width", value: "12 - 16 mm" },
            { label: "Strap Thickness", value: "0.5 - 1.0 mm" },
            { label: "Tension Force", value: "400 - 2500 N" },
            { label: "Sealing Type", value: "Friction Weld" },
            { label: "Battery", value: "24V Li-Ion" },
            { label: "Weight", value: "120 kg" },
            { label: "Height", value: "1350 mm" }
        ],
        features: ["Joystick Control", "Touch Display", "Tool-Lift", "Laser Positioning"]
    },
    '700': {
        title: "ErgoPack 700",
        subtitle: "The Classic | Manual Drive",
        specs: [
            { label: "Strap Width", value: "12 - 16 mm" },
            { label: "Strap Thickness", value: "0.5 - 0.8 mm" },
            { label: "Tension Force", value: "Manual" },
            { label: "Sealing Type", value: "Manual / Battery Tool" },
            { label: "Battery", value: "N/A" },
            { label: "Weight", value: "95 kg" },
            { label: "Height", value: "1200 mm" }
        ],
        features: ["Manual Crank", "Robust Frame", "Cost Effective"]
    },
    'GO': {
        title: "ErgoPack GO",
        subtitle: "Compact & Agile",
        specs: [
            { label: "Strap Width", value: "9 - 13 mm" },
            { label: "Strap Thickness", value: "0.4 - 0.7 mm" },
            { label: "Tension Force", value: "150 - 1200 N" },
            { label: "Sealing Type", value: "Friction Weld" },
            { label: "Battery", value: "18V Li-Ion" },
            { label: "Weight", value: "85 kg" },
            { label: "Height", value: "1100 mm" }
        ],
        features: ["Compact Design", "Lightweight", "Battery Powered"]
    }
};

interface TechnicalDatasheetProps {
    active: boolean;
    currentModel: '700' | '726X' | 'GO';
    onModelChange: (model: '700' | '726X' | 'GO') => void;
}

export function TechnicalDatasheet({ active, currentModel, onModelChange }: TechnicalDatasheetProps) {
    const data = PRODUCT_DATA[currentModel];

    if (!active) return null;

    return (
        <div className="absolute inset-x-0 bottom-0 top-20 z-30 pointer-events-none flex items-center justify-between px-8 lg:px-20">

            {/* LEFT PANEL: MODEL SELECTOR & HIGHLIGHTS */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="pointer-events-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 max-w-sm w-full"
            >
                <div className="flex space-x-2 mb-6 p-1 bg-gray-100 rounded-lg">
                    {(['700', '726X', 'GO'] as const).map((model) => (
                        <button
                            key={model}
                            onClick={() => onModelChange(model)}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${currentModel === model
                                    ? 'bg-[#C8102E] text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {model}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={currentModel} // Crossfade content
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">{data.title}</h2>
                    <p className="text-[#C8102E] font-bold text-sm uppercase mb-6">{data.subtitle}</p>

                    <div className="space-y-3">
                        {data.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>


            {/* RIGHT PANEL: TECHNICAL DATASHEET TABLE */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="pointer-events-auto bg-black/90 text-white backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 max-w-sm w-full"
            >
                <motion.div
                    key={currentModel + "_specs"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Technical Data</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            {data.specs.map((spec, i) => (
                                <tr key={i} className="border-b border-gray-800/50">
                                    <td className="py-3 text-gray-400 font-mono">{spec.label}</td>
                                    <td className="py-3 text-right font-bold text-white">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-xs text-gray-500">ENGINEERED IN GERMANY</span>
                        <div className="h-2 w-20 bg-gradient-to-r from-yellow-500 via-red-500 to-black rounded-full" />
                    </div>
                </motion.div>
            </motion.div>

        </div>
    );
}
