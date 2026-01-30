'use client';

import Image from 'next/image';

/**
 * ValuePropositionHero
 *
 * A clean, static infographic that shows:
 * 1. "From 120s Liability to 40s Asset" with visual comparison
 * 2. The Zero Fatigue Factor graph
 * 3. 100% safety stats
 *
 * NO animations. Lightweight. Immediate understanding.
 */
export default function ValuePropositionHero() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* ═══════════════════════════════════════════════════════════════
            MAIN HEADLINE
        ═══════════════════════════════════════════════════════════════ */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-12 md:mb-16 leading-tight">
          From a <span className="text-[#C8102E]">120-Second Liability</span> to a{' '}
          <span className="text-[#1a365d]">40-Second Asset</span>
        </h2>

        {/* ═══════════════════════════════════════════════════════════════
            EFFICIENCY GAINS - Before/After with Arrow
        ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center text-lg md:text-xl font-bold text-neutral-700 mb-8">
            Efficiency Gains
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-10">
            {/* BEFORE: 120s Manual */}
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-black text-neutral-400">
                120s
              </span>
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative">
                <Image
                  src="/images/manual-worker.png"
                  alt="Manual worker bending over pallet"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback illustration */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-xl">
                  <svg
                    className="w-16 h-16 text-neutral-400"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="32" cy="14" r="8" />
                    <path d="M32 22 L32 38 L24 54 M32 38 L40 54 M20 32 L32 28 L44 32" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ARROW with 66% Badge */}
            <div className="flex-shrink-0 my-4 md:my-0">
              <div className="relative flex items-center">
                <div className="bg-[#C8102E] text-white font-bold text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 rounded-l-full whitespace-nowrap">
                  66% TIME
                  <br />
                  REDUCTION
                </div>
                <div className="w-0 h-0 border-t-[20px] md:border-t-[28px] border-t-transparent border-b-[20px] md:border-b-[28px] border-b-transparent border-l-[16px] md:border-l-[24px] border-l-[#C8102E]" />
              </div>
            </div>

            {/* AFTER: 40s ErgoPack */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative">
                <Image
                  src="/images/products/700x.png"
                  alt="ErgoPack system - zero bending"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1a365d]">
                40s
              </span>
            </div>
          </div>

          {/* Labor Redeployment Note */}
          <p className="text-center text-neutral-600 mt-6 md:mt-8 text-sm md:text-base">
            <span className="font-bold text-neutral-800">Labor Redeployment:</span> Saved hours can
            be reallocated to higher-value tasks
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM GRID: Zero Fatigue + Safety Stats
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Zero Fatigue Factor */}
          <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
              The Zero Fatigue Factor
            </h3>

            {/* Simple Graph */}
            <div className="relative h-40 md:h-48 bg-white rounded-lg border border-neutral-100 p-4 mb-4">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                {/* Y-Axis */}
                <line x1="30" y1="10" x2="30" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                <text x="5" y="20" fontSize="8" fill="#9ca3af">
                  High
                </text>
                <text x="5" y="100" fontSize="8" fill="#9ca3af">
                  Low
                </text>

                {/* X-Axis */}
                <line x1="30" y1="100" x2="290" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                <text x="30" y="115" fontSize="8" fill="#9ca3af">
                  0
                </text>
                <text x="160" y="115" fontSize="8" fill="#9ca3af">
                  Hours in Shift
                </text>
                <text x="280" y="115" fontSize="8" fill="#9ca3af">
                  8
                </text>

                {/* Machine Performance (FLAT RED LINE - HIGH) */}
                <line x1="30" y1="20" x2="280" y2="20" stroke="#C8102E" strokeWidth="3" />
                <text x="285" y="18" fontSize="7" fill="#C8102E" fontWeight="600">
                  Machine
                </text>
                <text x="285" y="26" fontSize="7" fill="#C8102E" fontWeight="600">
                  Performance
                </text>

                {/* Manual Labor (DECLINING DASHED LINE) */}
                <path
                  d="M30 25 Q100 35, 150 55 T220 80 T280 95"
                  stroke="#1a365d"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,3"
                />
                <text x="285" y="90" fontSize="7" fill="#1a365d">
                  Manual Labor
                </text>
                <text x="285" y="98" fontSize="7" fill="#1a365d">
                  Performance
                </text>
              </svg>
            </div>

            <p className="text-neutral-600 text-sm">
              ErgoPack delivers the same perfect tension on the first pallet of the day and the
              last.
              <span className="font-semibold text-neutral-800">
                {' '}
                No fatigue, no variation, no compromise.
              </span>
            </p>
          </div>

          {/* RIGHT: Employee Safety & Well-being */}
          <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
              Employee Safety & Well-being
            </h3>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Stat 1: 100% Bending Elimination */}
              <div className="text-center">
                <div className="relative inline-block mb-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#C8102E]">
                    100%
                  </span>
                  {/* X mark */}
                  <svg
                    className="absolute -top-1 -right-3 w-6 h-6 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8102E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </svg>
                </div>
                <h4 className="font-bold text-neutral-900 text-sm md:text-base mb-1">
                  Bending Elimination
                </h4>
                <p className="text-xs text-neutral-600">
                  The patented chain-lance system removes the need for operators to bend.
                </p>
              </div>

              {/* Stat 2: 100% Walking Eliminated */}
              <div className="text-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a365d] block mb-2">
                  100%
                </span>
                <h4 className="font-bold text-neutral-900 text-sm md:text-base mb-1">
                  Walking Around Pallet Eliminated
                </h4>
                <p className="text-xs text-neutral-600">
                  Reduces time, effort, and trip hazards in a busy environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
