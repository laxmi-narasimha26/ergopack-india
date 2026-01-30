'use client';

import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';

const data = [
  { time: '0h', manual: 100, machine: 100 },
  { time: '1h', manual: 95, machine: 100 },
  { time: '2h', manual: 85, machine: 100 },
  { time: '3h', manual: 70, machine: 100 },
  { time: '4h', manual: 55, machine: 100 },
  { time: '5h', manual: 40, machine: 100 },
  { time: '6h', manual: 30, machine: 100 },
  { time: '7h', manual: 25, machine: 100 },
  { time: '8h', manual: 20, machine: 100 },
];

export default function ZeroFatigueGraph() {
  return (
    <section className="bg-white py-16 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Narrative Side */}
          <div>
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">
              PERFORMANCE LOGIC
            </div>
            <h3 className="text-3xl font-bold font-display text-neutral-900 mb-6">
              The "Zero Fatigue" Factor
            </h3>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Manual labor performance degrades by up to 80% over an 8-hour shift due to spinal
              compression and fatigue. ErgoPack maintains <strong>100% output consistency</strong>{' '}
              from the first pallet to the last.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="text-4xl font-bold text-red-600 mb-1">-66%</div>
                <div className="text-sm font-semibold text-neutral-900">Time Per Pallet</div>
                <div className="text-xs text-neutral-500 mt-1">120s → 40s</div>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="text-4xl font-bold text-green-600 mb-1">0%</div>
                <div className="text-sm font-semibold text-neutral-900">Physical Bending</div>
                <div className="text-xs text-neutral-500 mt-1">Patented ChainLance</div>
              </div>
            </div>
          </div>

          {/* Graph Side */}
          <div className="bg-neutral-900 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Chart Header */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <div className="text-white font-bold">Performance Curve</div>
                <div className="text-neutral-400 text-xs">8-Hour Shift Analysis</div>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-blue-200">ErgoPack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-red-200">Manual Labor</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMachine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="#525252"
                    tick={{ fill: '#a3a3a3', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 110]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171717',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#a3a3a3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="machine"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMachine)"
                  />
                  <Area
                    type="monotone"
                    dataKey="manual"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorManual)"
                  />
                  <ReferenceLine
                    x="4h"
                    stroke="#ffffff"
                    strokeDasharray="3 3"
                    label={{ position: 'top', value: 'Fatigue Onset', fill: 'white', fontSize: 10 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
