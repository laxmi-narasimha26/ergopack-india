'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const manualSteps = [
  { id: 1, title: 'Bend & Feed', image: '/images/infographic/steps/step1-bend-feed-v4.png' },
  { id: 2, title: 'Walk Around', image: '/images/infographic/steps/step2-walk-around-v4.png' },
  {
    id: 3,
    title: 'Stretch & Throw',
    image: '/images/infographic/steps/step3-stretch-throw-v4.png',
  },
  { id: 4, title: 'Tension & Pull', image: '/images/infographic/steps/step4-tension-pull-v4.png' },
  { id: 5, title: 'Crimp & Cut', image: '/images/infographic/steps/step5-crimp-cut-v4.png' },
];

const ergoSteps = [
  {
    id: 1,
    title: 'Position & Feed',
    subtitle: '(Zero Bending)',
    image: '/images/infographic/ergopack-steps/step1-position-feed.png',
  },
  {
    id: 2,
    title: 'Retrieve & Insert',
    subtitle: '(Effortless)',
    image: '/images/infographic/ergopack-steps/step2-retrieve-insert.png',
  },
  {
    id: 3,
    title: 'Tension & Seal',
    subtitle: '(Perfect Tension)',
    image: '/images/infographic/ergopack-steps/step3-tension-seal.png',
  },
];

export default function ComparisonInfographic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const manualStepsTop = manualSteps.slice(0, 3);
  const manualStepsBottom = manualSteps.slice(3);

  return (
    <section
      ref={containerRef}
      className="min-h-screen h-auto md:min-h-[78vh] bg-white text-neutral-900 flex flex-col py-2 px-2 md:px-4 overflow-hidden"
    >
      <div className="max-w-[96rem] mx-auto w-full h-full flex flex-col">
        {/* Main Headline - TOP - Compact */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-neutral-900"
        >
          From <span className="text-red-500">5 Strenuous Steps</span> to{' '}
          <span className="text-green-500">3 Simple Moves</span>.
        </motion.h2>

        {/* MIDDLE - Two Column Layout - Wider & Controlled Height */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 md:gap-4 h-auto md:h-[48vh] lg:h-[46vh] w-full max-w-[99%] mx-auto">
          {/* LEFT: MANUAL METHOD (Red/Dark) */}
          <div className="flex-1 bg-neutral-800/50 rounded-2xl border border-white/5 p-2.5 md:p-3 flex flex-col h-full overflow-hidden relative group">
            {/* Header */}
            <div className="flex justify-between items-center mb-1.5 flex-shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-neutral-200">Manual Method</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#C8102E] rounded-full" />
                ))}
              </div>
            </div>

            {/* 5 Steps Grid - 3 Top, 2 Bottom with Larger Tiles */}
            <div className="flex flex-col justify-center flex-1 min-h-0 w-full px-2 gap-2.5">
              <div className="grid grid-cols-3 gap-4 items-center">
                {manualStepsTop.map((step) => (
                  <div key={step.id} className="flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-square max-h-[15vh] md:max-h-[16vh] lg:max-h-[17vh] mb-1.5">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 28vw, 220px"
                      />
                    </div>
                    <p className="text-[11px] md:text-xs lg:text-sm text-center text-gray-300 font-bold leading-tight uppercase tracking-tight">
                      {step.id}. {step.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 items-center px-6">
                {manualStepsBottom.map((step) => (
                  <div key={step.id} className="flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-square max-h-[15vh] md:max-h-[16vh] lg:max-h-[17vh] mb-1.5">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 34vw, 240px"
                      />
                    </div>
                    <p className="text-[11px] md:text-xs lg:text-sm text-center text-gray-300 font-bold leading-tight uppercase tracking-tight">
                      {step.id}. {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Stats */}
            <div className="mt-1.5 pt-1.5 border-t border-white/10 flex justify-between items-end flex-shrink-0">
              <div>
                <h4 className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Liability
                </h4>
                <p className="text-[#C8102E] font-black text-sm md:text-lg leading-tight">
                  HIGH RISK & FATIGUE
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-4xl font-black text-[#C8102E] leading-none">
                  120-240<span className="text-lg md:text-2xl">s</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ERGOPACK PROCESS (Green/Light) */}
          <div className="flex-1 bg-white rounded-2xl text-neutral-900 p-2.5 md:p-3 flex flex-col h-full overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                The ErgoPack Process
              </h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                ))}
              </div>
            </div>

            {/* 3 Step Grid */}
            <div className="flex-1 min-h-0 flex flex-col justify-between px-3 pt-1 gap-2">
              <div className="grid grid-cols-3 gap-4 items-start">
                {ergoSteps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center h-full justify-start">
                    <div className="relative w-full aspect-[4/3] max-h-[16vh] min-h-[10vh] mb-1.5 group">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 28vw, 250px"
                      />
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-gray-800 text-center flex-shrink-0 leading-tight">
                      {step.id}. {step.title}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold text-center flex-shrink-0 uppercase">
                      {step.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center text-[11px] md:text-xs text-neutral-600 leading-relaxed px-2">
                Three upright moves deliver consistent tension without bending or walking. Operators
                stay in position, keeping pace while eliminating back strain.
              </p>
            </div>

            {/* Footer Stats */}
            <div className="mt-1.5 pt-1.5 border-t border-neutral-100 flex justify-between items-end flex-shrink-0">
              <div>
                <h4 className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Asset
                </h4>
                <p className="text-emerald-600 font-black text-sm md:text-lg leading-tight">
                  ZERO BACK STRAIN
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-4xl font-black text-emerald-500 leading-none">
                  40<span className="text-lg md:text-2xl">s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Footer - BOTTOM - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-2"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-1">
            67% Less Time. 90% Less Physical Strain.
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-xs md:text-sm lg:text-base leading-relaxed">
            By eliminating bending and walking around the pallet, ErgoPack significantly reduces the
            physical toll on employees, preventing chronic back injuries while boosting
            productivity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
