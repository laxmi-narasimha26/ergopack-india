'use client';

import Image from 'next/image';

/**
 * TransformationInfographic - FILLS VISIBLE VIEWPORT (minus navbar)
 * Uses calc(100vh - navbar height) for proper sizing
 */
export default function TransformationInfographic() {
  return (
    <section className="h-[calc(100vh-80px)] bg-white flex flex-col py-6 px-2 sm:px-4">
      <div className="max-w-[90vw] mx-auto w-full h-full flex flex-col justify-between">
        {/* HEADLINE - At the top */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
          From a <span className="text-[#C8102E]">120-Second Liability</span> to a{' '}
          <span className="text-[#1a365d]">40-Second Asset</span>
        </h2>

        {/* MIDDLE SECTION - Efficiency Gains */}
        <div>
          <h3 className="text-center text-base md:text-xl font-bold text-neutral-800 mb-4">
            Efficiency Gains
          </h3>

          {/* Before → Arrow → After */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16">
            {/* BEFORE: 120s Manual Worker */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-neutral-400 tracking-tighter">
                120s
              </span>
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 relative">
                <Image
                  src="/images/infographic/manual-worker.png"
                  alt="Worker bending over to manually strap a pallet"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* ARROW with 66% TIME REDUCTION */}
            <div className="flex-shrink-0 my-2 md:my-0">
              <div className="relative flex items-center">
                <div className="bg-[#C8102E] text-white font-bold text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-l-full whitespace-nowrap text-center leading-tight shadow-lg">
                  66% TIME
                  <br />
                  REDUCTION
                </div>
                <div className="w-0 h-0 border-t-[14px] sm:border-t-[20px] md:border-t-[28px] border-t-transparent border-b-[14px] sm:border-b-[20px] md:border-b-[28px] border-b-transparent border-l-[12px] sm:border-l-[16px] md:border-l-[24px] border-l-[#C8102E]" />
              </div>
            </div>

            {/* AFTER: 40s ErgoPack Operator */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 relative order-2 md:order-1">
                <Image
                  src="/images/infographic/ergopack-operator.png"
                  alt="Worker standing upright operating ErgoPack machine"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1a365d] tracking-tighter order-1 md:order-2">
                40s
              </span>
            </div>
          </div>

          {/* Labor Redeployment Note */}
          <p className="text-center text-neutral-600 mt-4 text-sm md:text-base lg:text-lg">
            <span className="font-bold text-neutral-800">Labor Redeployment:</span> Reassign saved
            hours to QA checks, outbound staging, or line replenishment to lift throughput without
            adding headcount.
          </p>
        </div>

        {/* BOTTOM SECTION - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
          {/* LEFT: The Zero Fatigue Factor */}
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-900 mb-2">
              The Zero Fatigue Factor
            </h3>

            {/* Graph */}
            <div className="relative bg-white border border-neutral-200 rounded-lg p-2 sm:p-3 mb-2">
              <svg viewBox="0 0 420 110" className="w-full h-auto">
                {/* Y-Axis */}
                <line x1="50" y1="12" x2="50" y2="85" stroke="#e5e7eb" strokeWidth="1" />
                <text x="10" y="18" fontSize="9" fill="#6b7280">
                  High
                </text>
                <text x="10" y="83" fontSize="9" fill="#6b7280">
                  Low
                </text>

                {/* X-Axis */}
                <line x1="50" y1="85" x2="390" y2="85" stroke="#e5e7eb" strokeWidth="1" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
                  <text
                    key={i}
                    x={50 + i * 40}
                    y="97"
                    fontSize="9"
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    {n}
                  </text>
                ))}
                <text x="220" y="108" fontSize="9" fill="#6b7280" textAnchor="middle">
                  Hours in Shift
                </text>

                {/* Machine Performance Line (FLAT) */}
                <line x1="50" y1="22" x2="370" y2="22" stroke="#C8102E" strokeWidth="2" />
                <text x="400" y="18" fontSize="8" fill="#C8102E" fontWeight="600" textAnchor="end">
                  Machine
                </text>
                <text x="400" y="28" fontSize="8" fill="#C8102E" fontWeight="600" textAnchor="end">
                  Performance
                </text>

                {/* Manual Labor Performance Line (DECLINING) */}
                <path
                  d="M50 25 Q120 36, 160 46 T240 62 T320 74 T370 80"
                  stroke="#1a365d"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 2"
                />
                <text x="400" y="74" fontSize="8" fill="#1a365d" textAnchor="end">
                  Manual
                </text>
                <text x="400" y="84" fontSize="8" fill="#1a365d" textAnchor="end">
                  Performance
                </text>
              </svg>
            </div>

            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              ErgoPack delivers the same perfect tension on the first pallet and the last.
              <span className="font-semibold text-neutral-900">
                {' '}
                No fatigue, no variation, no compromise.
              </span>
            </p>
          </div>

          {/* RIGHT: Employee Safety & Well-being */}
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-900 mb-2">
              Wasted Motion Eliminated
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Stat 1: 100% Bending Elimination */}
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-50 border border-red-100">
                  <Image
                    src="/images/infographic/no-bending-icon.png"
                    alt="No bending icon"
                    width={34}
                    height={34}
                    className="object-contain"
                  />
                </div>
                <div className="relative inline-block mb-1">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#C8102E]">
                    100
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C8102E]">
                    %
                  </span>
                  <svg
                    className="absolute -top-1 -right-2 w-4 h-4 md:w-5 md:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8102E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </svg>
                </div>
                <h4 className="font-bold text-neutral-900 text-xs md:text-sm lg:text-base mb-0.5">
                  Bending Elimination
                </h4>
                <p className="text-[10px] md:text-xs text-neutral-600 leading-relaxed">
                  The patented chain-lance system removes the need for operators to bend.
                </p>
              </div>

              {/* Stat 2: 100% Walking Eliminated */}
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
                  <Image
                    src="/images/infographic/no-walking-icon.png"
                    alt="No walking icon"
                    width={34}
                    height={34}
                    className="object-contain"
                  />
                </div>
                <div className="relative inline-block mb-1">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a365d]">
                    100
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1a365d]">
                    %
                  </span>
                </div>
                <h4 className="font-bold text-neutral-900 text-xs md:text-sm lg:text-base mb-0.5">
                  Walking Around Pallet Eliminated
                </h4>
                <p className="text-[10px] md:text-xs text-neutral-600 leading-relaxed">
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
