'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Activity, HeartPulse, UserX } from 'lucide-react';
import Image from 'next/image';

export default function HumanCostSection() {
  return (
    <section className="py-24 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side (The 'Red Zone') */}
          <div className="relative">
            <div className="bg-neutral-100 rounded-3xl p-8 aspect-square relative overflow-hidden flex items-center justify-center">
              {/* Abstract Representation of Spinal Load */}
              <div className="relative w-full max-w-md">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10 border-2 border-dashed border-red-300 rounded-xl p-8 bg-white/50 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-red-600 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Ergonomic Risk Analysis</span>
                    </div>
                    <div className="text-xs font-mono text-neutral-500">ISO 11228-1</div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-700 font-medium">Bending Frequency</span>
                      <span className="text-red-600 font-bold">High Risk</span>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-700 font-medium">Spinal Compression</span>
                      <span className="text-red-600 font-bold">Critical</span>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-700 font-medium">Recovery Time</span>
                      <span className="text-red-600 font-bold">Inadequate</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 -top-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm transform rotate-12">
                  L4-L5 Impact
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-neutral-400 mt-4 italic">
              Manual strapping forces workers into injurious postures 60+ times per hour.
            </p>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-6">
              THE HIDDEN LIABILITY
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-6 leading-tight">
              The Hidden Human Cost of Manual Strapping
            </h2>
            <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
              Manual pallet strapping is a primary driver of{' '}
              <strong className="text-neutral-900">Musculoskeletal Disorders (MSDs)</strong>,
              undermining your "Zero Accident" goals and production continuity.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: 'Chronic Strain',
                  desc: 'Constant bending and kneeling cause cumulative injury to the spine, knees, and shoulders.',
                  icon: Activity,
                },
                {
                  title: 'Lost Time Incidents',
                  desc: 'Every MSD case disrupts production flow and increases insurance liability.',
                  icon: UserX,
                },
                {
                  title: 'Welfare Misalignment',
                  desc: 'Manual strapping contradicts modern commitments to employee well-being and safe workspaces.',
                  icon: HeartPulse,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-neutral-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
