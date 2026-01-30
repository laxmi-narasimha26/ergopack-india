'use client';

import { motion } from 'framer-motion';
import {
  BatteryWarning,
  AlertTriangle,
  CheckCircle,
  Zap,
  Activity,
  Battery,
  BatteryFull,
  BatteryLow,
} from 'lucide-react';

export default function ProcessEvolution() {
  return (
    <section className="py-20 bg-white overflow-hidden border-b border-neutral-100">
      <div className="container mx-auto px-4">
        {/* Header - now part of the flow */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4 fill-current" />
            <span>THE CORE PROBLEM & SOLUTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-6 leading-tight">
            From 5 Strenuous Steps <br />
            <span className="text-neutral-400">to</span> 3 Simple Moves.
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Stop paying the "hidden tax" of manual labor fatigue. Compare the workflow step-by-step.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent transform -translate-x-1/2" />

          {/* LEFT: Manual Method */}
          <div className="bg-red-50/50 rounded-3xl p-8 lg:p-12 border border-red-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-black">
                  X
                </span>
                Manual Method
              </h3>
              <div className="text-red-600 text-sm font-bold bg-red-100 px-3 py-1 rounded-full">
                120s / Pallet
              </div>
            </div>

            {/* Steps Sequence */}
            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-red-200 border-l-2 border-dashed border-red-300" />

              {[
                {
                  step: 1,
                  title: 'Bend & Feed',
                  desc: 'Critical spinal compression risk (L4-L5)',
                  icon: AlertTriangle,
                },
                {
                  step: 2,
                  title: 'Walk Around',
                  desc: 'Wasted time & motion fatigue',
                  icon: Activity,
                },
                {
                  step: 3,
                  title: 'Stretch & Throw',
                  desc: 'Shoulder strain hazard',
                  icon: Activity,
                },
                {
                  step: 4,
                  title: 'Pull & Tension',
                  desc: 'Inconsistent load security',
                  icon: AlertTriangle,
                },
                { step: 5, title: 'Crimp & Cut', desc: 'Repetitive wrist stress', icon: Activity },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12">
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-red-200 text-red-500 flex items-center justify-center text-xs font-bold shadow-sm z-10">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-neutral-900 text-lg">{item.title}</h4>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Energy Bar Visualization */}
            <div className="mt-12 p-6 bg-white rounded-xl border border-red-100 shadow-sm">
              <div className="flex justify-between text-sm font-bold text-neutral-500 mb-2">
                <span>Operator Energy (8hr Shift)</span>
                <span className="text-red-500">CRITICAL DROP</span>
              </div>
              <div className="h-4 bg-neutral-100 rounded-full overflow-hidden flex">
                <div className="w-[20%] h-full bg-red-500 animate-pulse" />
                <div className="w-[80%] h-full bg-transparent" />
              </div>
              <div className="mt-2 text-xs text-neutral-400 italic">
                *Fatigue leads to inconsistent tension and injury risk after 4 hours.
              </div>
            </div>
          </div>

          {/* RIGHT: ErgoPack Method */}
          <div className="bg-blue-50/50 rounded-3xl p-8 lg:p-12 border border-blue-100 relative overflow-hidden">
            {/* Highlight Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black">
                  ✓
                </span>
                ErgoPack Process
              </h3>
              <div className="text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full">
                40s / Pallet
              </div>
            </div>

            {/* Steps Sequence */}
            <div className="space-y-8 relative z-10">
              {/* Connecting Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-blue-200" />

              {[
                {
                  step: 1,
                  title: 'Position & Feed',
                  desc: 'Zero Bending. Worker stays upright.',
                  icon: CheckCircle,
                },
                {
                  step: 2,
                  title: 'Retrieve & Insert',
                  desc: 'ChainLance passes strap through pallet automatically.',
                  icon: CheckCircle,
                },
                {
                  step: 3,
                  title: 'Tension & Seal',
                  desc: 'Perfect tension via joystick/touchscreen.',
                  icon: CheckCircle,
                },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12 py-2">
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md z-10 ring-4 ring-blue-50">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-neutral-900 text-xl">{item.title}</h4>
                  <p className="text-neutral-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Energy Bar Visualization */}
            <div className="mt-12 p-6 bg-white rounded-xl border border-blue-100 shadow-sm relative z-10">
              <div className="flex justify-between text-sm font-bold text-neutral-500 mb-2">
                <span>Operator Energy (8hr Shift)</span>
                <span className="text-green-600">CONSISTENT</span>
              </div>
              <div className="h-4 bg-neutral-100 rounded-full overflow-hidden flex">
                <div className="w-[95%] h-full bg-green-500" />
                <div className="w-[5%] h-full bg-transparent" />
              </div>
              <div className="mt-2 text-xs text-neutral-400 italic">
                *Machine takes the load. Operator stays fresh for quality control.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
