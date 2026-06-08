'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, PackageX, TrendingDown, ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  THE STAKES — the manifesto beat.
//  Placed immediately after the hero. Reframes the category from "a machine that
//  wraps straps" to "the discipline of guaranteed load security". Speaks directly
//  to the dominant emotion in Indian B2B procurement: loss aversion — the fear of
//  the rejected container, the crushed load, the line that slows. Never names a
//  competitor. The line "you're not strapping — you're hoping" does the work.
// ─────────────────────────────────────────────────────────────────────────────
export function StakesSection() {
  const failures = [
    {
      Icon: PackageX,
      stat: 'One rejected container',
      line: 'costs more than the machine that would have prevented it.',
      detail:
        'A load that shifts in transit comes back as a claim, a re-ship and a customer who now reads your name twice before re-ordering.',
    },
    {
      Icon: TrendingDown,
      stat: 'Strap #1 holds. Strap #400 doesn’t.',
      line: 'Hand tension fades with the shift. The load pays for it.',
      detail:
        'Human strength is not a calibration. By the afternoon, the same operator straps looser — and the weakest pallet in the batch is the one that fails.',
    },
    {
      Icon: AlertTriangle,
      stat: 'Two minutes a pallet',
      line: 'is a queue at the dock and a truck that leaves late.',
      detail:
        'At 100 pallets a day, the manual method walks your team 25,000 laps around freight a year — pure motion, zero output.',
    },
  ];

  return (
    <section className="relative bg-[#080808] py-28 overflow-hidden">
      {/* subtle red field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(200,16,46,0.10) 0%, transparent 55%)',
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16">
        {/* The line */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] font-semibold mb-8">
            The Truth Nobody On The Floor Says Out Loud
          </p>
          <h2 className="font-serif font-bold text-white leading-[1.04] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.6vw, 4rem)' }}
          >
            If you’re not strapping with ErgoPack,
            <br />
            <span className="italic font-light text-white/45">you’re not strapping.</span>{' '}
            <span style={{ color: '#C8102E' }}>You’re hoping.</span>
          </h2>
          <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto mt-8 leading-relaxed">
            Every pallet that leaves your floor is a promise to the customer at the other end.
            Manual strapping keeps that promise on a good day. Engineered tension keeps it on every
            day — the 1,400th pallet exactly like the first.
          </p>
        </motion.div>

        {/* Three failure cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {failures.map(({ Icon, stat, line, detail }, idx) => (
            <motion.div
              key={stat}
              className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-7 overflow-hidden group"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.12, duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8102E]/50 to-transparent" />
              <Icon className="w-6 h-6 text-[#C8102E] mb-6" strokeWidth={1.5} />
              <div className="font-serif text-xl font-semibold text-white leading-snug mb-2">
                {stat}
              </div>
              <div className="text-white/70 text-sm font-medium mb-4">{line}</div>
              <p className="text-white/35 text-[13px] leading-relaxed">{detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Resolution line */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p className="text-white/55 text-base md:text-lg">
            ErgoPack replaces hope with a number you can set, repeat, and prove —{' '}
            <span className="text-white font-medium">up to 2,500N, on every strap.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  THE ORIGINAL STANDARD — the quiet copy-killer.
//  Defines what "automated strapping" actually requires, as neutral engineering
//  fact. By the end the reader holds a checklist every look-alike fails — in their
//  own head. We never name a copy. We never say "fake". We define the category and
//  let the definition do the exposing. This is the Heinz move applied: become the
//  reference everyone else is measured against.
// ─────────────────────────────────────────────────────────────────────────────
export function OriginalStandardSection() {
  const criteria = [
    {
      n: '01',
      title: 'The strap must route itself',
      copy: 'A real automated strapper carries the band under and around the pallet on its own — the patented free-floating ChainLance. A frame that still needs a person to push a strap under the load is a cart, not automation.',
    },
    {
      n: '02',
      title: 'Tension must be a number, not a guess',
      copy: 'Set it, and it holds — strap #1 and strap #1,400, identical. If the force drifts as the motor warms or the battery drains, the loads on the afternoon truck are not the loads you signed off in the morning.',
    },
    {
      n: '03',
      title: 'The joint must be fused, not crimped',
      copy: 'A molecular friction weld holds up to 90% of the strap’s own strength with zero hardware. A metal clip holds about 60% — and is a recurring cost you buy by the thousand and a failure point under shock.',
    },
    {
      n: '04',
      title: 'It must keep moving when the floor is dirty',
      copy: 'A glass-fibre soft-slide chain clears a 47 mm gap through dust, grit and splintered pallets without buckling. Rigid or exposed feed tracks jam — and a jammed machine at peak dispatch is the most expensive machine in the building.',
    },
  ];

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 md:px-16">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] font-semibold mb-6">
            The Original Standard
          </p>
          <h2 className="font-serif font-semibold text-gray-900 leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.4rem)' }}
          >
            Many machines are built to{' '}
            <span className="italic font-light text-gray-400">look</span> like an automated strapper.
          </h2>
          <p className="text-base md:text-lg text-gray-500 mt-6 leading-relaxed">
            A replica frame is easy. The engineering inside it is not. Before you approve any
            automated strapping system — ours or anyone’s — hold it to these four standards. This is
            simply what the word <span className="text-gray-800 font-medium">“automated”</span> has
            to mean on a working dispatch floor.
          </p>
        </motion.div>

        {/* Four criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {criteria.map(({ n, title, copy }, idx) => (
            <motion.div
              key={n}
              className="flex gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.1, duration: 0.65 }}
            >
              <div className="font-serif text-3xl font-bold text-[#C8102E]/22 leading-none pt-1 shrink-0">
                {n}
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2.5">{title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{copy}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The close — the quiet kill */}
        <motion.div
          className="mt-20 rounded-2xl bg-[#080808] px-8 py-12 md:px-14 md:py-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 120%, rgba(200,16,46,0.18) 0%, transparent 60%)',
            }}
          />
          <p className="relative z-10 font-serif text-2xl md:text-4xl font-semibold text-white leading-snug max-w-3xl mx-auto">
            ErgoPack meets all four. By design — because we wrote them.
          </p>
          <p className="relative z-10 text-white/45 text-sm md:text-base mt-5 max-w-xl mx-auto">
            This is the original mobile ChainLance system, engineered in Germany and supported in
            India by Benz Packaging — genuine parts, operator training, and service that answers
            when the line is down.
          </p>
          <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold bg-[#C8102E] text-white rounded-sm hover:bg-red-700 transition-all duration-300">
                Request an On-Site Audit <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link href="/resources">
              <button className="px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold border border-white/25 text-white rounded-sm hover:bg-white/8 hover:border-white/50 transition-all duration-300">
                See the Engineering
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
