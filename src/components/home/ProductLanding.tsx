'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight,
  Globe,
  ShieldCheck,
  Clock,
  TrendingUp,
  CheckCircle2,
  Battery,
  Cpu,
  Layers,
  Zap,
  Award,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  THE THREE MACHINES WE SELL — all facts taken directly from products-data.json
// ─────────────────────────────────────────────────────────────────────────────
const LINES = [
  // ── 726X ──────────────────────────────────────────────────────────────────
  // Li-ion • Siemens touchscreen • Line Laser • 66 m/min ChainLance
  // Pallet: 40–270 cm wide, 10–230 cm tall | Tension: 400–2,500N | 13–16mm PP/PET
  // Battery: 36.3V Li-ion, 5 kg, 3.5 h charge, 1,200 cycles
  {
    id: 'xpert',
    name: 'X-Pert Line',
    model: '726X',
    tagline: 'DIGITAL INTELLIGENCE',
    badge: '726X · Li-ion · 1,200 Cycles',
    color: '#C8102E',
    heroImage: '/images/xpert-hero-banner.png',
    productImage: '/images/products/726x.png',
    heroHeadline: 'INTELLIGENCE. SPEED.\nPRECISION.',
    heroSub: 'ErgoPack 726X',
    heroTagline:
      '66 m/min ChainLance. 1,200 strap cycles per charge. Siemens touchscreen with Line Laser. The machine that knows what it is doing.',
    // Core differentiator: the ONLY machine with Li-ion, touchscreen, laser, and 66 m/min speed.
    description:
      'The 726X is the only machine in our range that pairs a Lithium-ion battery system with a Siemens touchscreen and Line Laser. At 66 m/min, its ChainLance routes straps 65% faster than lead-battery models — and at 3.5 hours charge time versus 8–10 hours, the machine spends more time working than waiting. Set tension digitally. Position with the laser. Read cycle data on-screen. For operations where consistency and uptime are measured in money lost.',
    href: '/products/x-pert-line',
    enquiryHref: '/contact',
    specs: [
      { label: 'ChainLance speed', value: '66 m/min' },
      { label: 'Li-ion cycles / charge', value: '1,200' },
      { label: 'Battery charge time', value: '3.5 hours' },
      { label: 'Max tension (426X)', value: '2,500N' },
    ],
    features: [
      'Siemens touchscreen — set tension digitally, read cycle counts on-screen',
      'Line Laser Type 2 — positions the machine against the pallet with precision',
      '66 m/min ChainLance — routes the strap 65% faster than lead-battery E-series',
      'Lithium-ion battery: 1,200 cycles per 3.5-hour charge (vs 350 cycles / 8–10 hours on lead)',
      'Handles pallets 40–270 cm wide and 10–230 cm tall on 13–16 mm PP or PET strap',
    ],
    accentDark: true,
  },

  // ── GO ────────────────────────────────────────────────────────────────────
  // 24V lead-fleece • Sledge 85 • Floor-level routing • Joystick
  // Pallet: 30–240 cm wide, 80–190 cm tall | Chain: 5 m | 40 m/min
  // Battery: 24V, 12.3 kg lead-fleece, 8–10 h charge, 350 cycles
  // NOT available: Line Laser, Triplex-Tool-Lift, Safety Cutter
  {
    id: 'go',
    name: 'GO Line',
    model: 'GO',
    tagline: 'ECONOMY PORTABLE',
    badge: 'GO · Lead-Fleece · Joystick · Multi-Material',
    color: '#D97706',
    heroImage: '/images/go-hero-banner.png',
    productImage: '/images/products/GO.png',
    heroHeadline: 'ELECTRIC. VERSATILE.\nPORTABLE.',
    heroSub: 'ErgoPack GO',
    heroTagline:
      'Battery-powered strapping without the Li-ion premium. Joystick control, 350 cycles per charge, and the widest material range in the lineup — PP, PET, Paper, Cord and Composite.',
    // Core differentiator: Economy Portable — the electric option between manual 700 and premium 726X.
    // Battery: 24V lead-fleece (proven, no Li-ion transport restrictions, field-serviceable).
    // Joystick control vs touchscreen — simpler, tougher for demanding environments.
    // Multi-material: PP/PET/Paper/Cord/Composite. 726X is PP/PET ONLY.
    // 40 m/min ChainLance. 5m chain. Pallet: 30–240cm wide, 80–190cm tall.
    // NO Line Laser, NO Triplex-Tool-Lift — this is the accessible electric option.
    description:
      'The ErgoPack GO is the economy portable in the range — battery-powered, joystick-operated, and built for operations that need electric strapping without the cost or complexity of Lithium-ion. Its 24V lead-fleece battery delivers 350 cycles per charge and is fully field-serviceable. Uniquely, the GO accepts PP, PET, Paper, Cord and Composite strap — while the 726X is limited to PP and PET. A joystick runs the full cycle. No touchscreen, no laser, no excess.',
    href: '/products/go',
    enquiryHref: '/contact',
    specs: [
      { label: 'Battery', value: '24V Lead-Fleece' },
      { label: 'Cycles / charge', value: '350' },
      { label: 'Strap materials', value: 'PP · PET · Paper · Cord · Composite' },
      { label: 'ChainLance speed', value: '40 m/min' },
    ],
    features: [
      '24V lead-fleece battery: 350 cycles per charge, field-serviceable, no Li-ion restrictions',
      'Joystick control — complete strap cycle from standing position, no touchscreen required',
      'Accepts PP, PET, Paper, Cord and Composite strap — 726X handles PP and PET only',
      'Handles pallets 30–240 cm wide and 80–190 cm tall',
      'Economy portable: the electric step between the manual 700 and the Li-ion 726X',
    ],
    accentDark: true,
  },

  // ── 700 ───────────────────────────────────────────────────────────────────
  // MANUAL HAND-CRANK — zero battery, zero motor, zero power dependency
  // Weight: 64.4 kg (lightest in range) | Pallet: 30–255 cm wide, 10–230 cm tall
  // Sealing head: OPTIONAL (sold separately) | Materials: PP/PET/Paper/Cord/Composite
  // Operation: Manual Hand Crank | No electrical certification needed
  {
    id: 'economy',
    name: 'E-conomy Line',
    model: '700',
    tagline: 'ZERO POWER DEPENDENCY',
    badge: '700 · Hand-Crank · No Battery Required',
    color: '#4A7C59',
    heroImage: '/images/economy-hero-banner.png',
    productImage: '/images/products/700.png',
    heroHeadline: 'NO POWER. NO BATTERY.\nNO LIMITS.',
    heroSub: 'ErgoPack 700',
    heroTagline:
      'The 700 is a pure hand-crank machine. No battery to charge. No motor to service. The ChainLance routes the strap by handle — anywhere, anytime, on any material.',
    // Core differentiator: COMPLETELY MANUAL. No electrical components.
    // Works in areas with no power. No battery maintenance. No charging downtime.
    // Lightest machine at 64.4 kg. Widest strap material range.
    // Sealing head is optional/separate — can use any compatible tool.
    description:
      "The ErgoPack 700 is a hand-crank machine. There is no battery, no motor, and no charging cycle — the ChainLance is driven entirely by the operator's handle. This makes it the right choice for sites without consistent power access, operations wanting zero electrical maintenance, and facilities that need the widest strap material flexibility — PP, PET, Paper, Cord and Composite all work with the optional sealing head. At 64.4 kg, it is also the lightest machine in the ErgoPack range.",
    href: '/products/economy-line',
    enquiryHref: '/contact',
    specs: [
      { label: 'Operation', value: 'Hand-Crank' },
      { label: 'Battery / Motor', value: 'None' },
      { label: 'Machine weight', value: '64.4 kg' },
      { label: 'Strap materials', value: 'PP · PET · Paper · Cord · Composite' },
    ],
    features: [
      'Purely manual — hand-crank drives the ChainLance, no power source needed',
      'Zero battery: no charging downtime, no battery replacement, no motor servicing',
      'Lightest machine in the range at 64.4 kg',
      'Handles pallets 30–255 cm wide and 10–230 cm tall',
      'Accepts PP, PET, Paper, Cord and Composite strap via optional sealing head',
    ],
    accentDark: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING VARIANT PILL
// ─────────────────────────────────────────────────────────────────────────────
function FloatingVariantPill() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
      const sections = LINES.map((l) => ({
        id: l.id,
        el: document.getElementById(`section-${l.id}`),
      }));
      const viewMid = window.scrollY + window.innerHeight * 0.5;
      for (const s of [...sections].reverse()) {
        if (s.el && s.el.offsetTop <= viewMid) {
          setActiveId(s.id);
          return;
        }
      }
      setActiveId(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-8 left-1/2 z-[200] flex items-stretch overflow-hidden"
          style={{
            borderRadius: '100px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          {LINES.map((line, idx) => {
            const isActive = activeId === line.id;
            return (
              <button
                key={line.id}
                onClick={() => scrollTo(line.id)}
                className="relative flex items-center gap-2.5 px-6 py-3.5 transition-all duration-300 group"
                style={{
                  backgroundColor: isActive ? line.color : 'rgba(12,12,12,0.93)',
                  borderRight: idx < LINES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? '#fff' : line.color,
                    boxShadow: isActive ? 'none' : `0 0 6px ${line.color}99`,
                  }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-300"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}
                >
                  {line.model}
                </span>
                {!isActive && (
                  <span
                    className="absolute bottom-0 left-6 right-6 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: line.color }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  HERO SECTION — full-bleed cinematic background, text left, image right
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % LINES.length), 8000);
    return () => clearInterval(t);
  }, []);

  const slide = LINES[activeIdx];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id + '-bg'}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Cinematic banner — right 62%, contained, no crop */}
          <div className="absolute inset-y-0 right-0 w-[62%]">
            <Image
              src={slide.heroImage}
              alt={slide.heroSub}
              fill
              priority
              quality={95}
              className="object-contain object-right-bottom"
              sizes="62vw"
            />
          </div>
          {/* Black left fill */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-black" />
          {/* Smooth gradient feather */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #000000 28%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.08) 68%, transparent 80%)',
            }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35" />
          {/* Line color accent glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at 78% 55%, ${slide.color}18 0%, transparent 52%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-[72px] pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-text'}
            className="max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              <div className="h-px w-8" style={{ backgroundColor: slide.color }} />
              <span
                className="text-[10px] uppercase tracking-[0.32em] font-semibold"
                style={{ color: slide.color }}
              >
                {slide.tagline}
              </span>
            </motion.div>

            <motion.h1
              className="font-serif font-bold text-white leading-[0.9] tracking-tight mb-4 whitespace-pre-line"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.8rem)' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
            >
              {slide.heroHeadline}
            </motion.h1>

            <motion.div
              className="text-lg md:text-xl font-serif text-white/65 mb-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              {slide.heroSub}
            </motion.div>

            <motion.p
              className="text-sm text-white/42 mb-10 max-w-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.6 }}
            >
              {slide.heroTagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.55 }}
            >
              <Link href={slide.href}>
                <button className="px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 hover:border-white/60 hover:bg-white/8 transition-all duration-300 rounded-sm">
                  Learn More
                </button>
              </Link>
              <Link href={slide.enquiryHref}>
                <button
                  className="px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white rounded-sm hover:opacity-88 transition-all duration-300"
                  style={{ backgroundColor: slide.color }}
                >
                  Make an Enquiry
                </button>
              </Link>
            </motion.div>

            {/* Slide tabs */}
            <motion.div
              className="flex gap-7 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.55 }}
            >
              {LINES.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => setActiveIdx(i)}
                  className="flex items-center gap-2.5 group"
                >
                  <span
                    className="h-[2px] transition-all duration-500"
                    style={{
                      width: i === activeIdx ? '28px' : '14px',
                      backgroundColor: i === activeIdx ? l.color : 'rgba(255,255,255,0.18)',
                    }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-widest font-medium transition-colors duration-300"
                    style={{
                      color: i === activeIdx ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {l.model}
                  </span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/8 bg-black/60 backdrop-blur-lg">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: '+65%', label: 'Throughput Increase', Icon: TrendingUp },
            { stat: 'Zero', label: 'Operator Fatigue', Icon: CheckCircle2 },
            { stat: '< 40s', label: 'Strap Cycle Time', Icon: Clock },
            { stat: 'The #1', label: 'Upgrade for Indian Floors', Icon: Award },
          ].map(({ stat, label, Icon }) => (
            <div key={stat} className="flex items-center gap-3">
              <Icon
                className="w-4 h-4 shrink-0"
                style={{ color: slide.color, opacity: 0.75 }}
                strokeWidth={1.5}
              />
              <div>
                <div className="text-white font-serif text-base leading-none">{stat}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-20 right-10 hidden md:flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-white/22 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/22" />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  VARIANT CARDS — three dark cards, one per machine
// ─────────────────────────────────────────────────────────────────────────────
function VariantLinePicker() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-20 pb-12 text-center">
        <motion.p
          className="text-[10px] uppercase tracking-[0.35em] text-[#C8102E] font-semibold mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Three Machines
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Same ChainLance routing.
          <br />
          <span className="italic font-light text-gray-400">
            Three entirely different machines.
          </span>
        </motion.h2>
        <motion.p
          className="text-base text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The 726X, GO and 700 each solve a different problem on the dispatch floor. The right
          machine depends on your pallet setup, power availability, and how you measure
          productivity.
        </motion.p>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {LINES.map((line, idx) => (
          <motion.div
            key={line.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #141414 100%)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.7 }}
            onMouseEnter={() => setHovered(line.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: line.color }} />

            <div className="px-5 pt-5 flex items-center justify-between">
              <span
                className="inline-flex px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold rounded-full"
                style={{
                  backgroundColor: line.color + '20',
                  color: line.color,
                  border: `1px solid ${line.color}40`,
                }}
              >
                {line.badge}
              </span>
            </div>

            {/* Product image */}
            <div className="relative h-56 mx-auto flex items-center justify-center px-8 py-4">
              <motion.div
                className="relative w-full h-full"
                animate={hovered === line.id ? { scale: 1.06, y: -6 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={line.productImage}
                  alt={line.model}
                  fill
                  quality={90}
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))' }}
                />
              </motion.div>
            </div>

            <div className="mx-5 h-px" style={{ backgroundColor: line.color + '30' }} />

            <div className="p-5 pb-6">
              <div
                className="text-[9px] uppercase tracking-[0.25em] font-semibold mb-1"
                style={{ color: line.color }}
              >
                {line.tagline}
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-1">{line.model}</h3>
              <p className="text-xs text-white/35 mb-3">{line.name}</p>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                {/* First sentence only — enough to position the machine */}
                {line.description.split('. ')[0] + '.'}
              </p>

              <ul className="space-y-1.5 mb-6">
                {line.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/40">
                    <span
                      className="w-1 h-1 rounded-full shrink-0 mt-1.5"
                      style={{ backgroundColor: line.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={line.href}>
                <button
                  className="w-full py-3 text-[11px] uppercase tracking-[0.14em] font-semibold border rounded-lg transition-all duration-300"
                  style={{ borderColor: line.color + '50', color: line.color }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget;
                    b.style.backgroundColor = line.color;
                    b.style.color = '#fff';
                    b.style.borderColor = line.color;
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget;
                    b.style.backgroundColor = 'transparent';
                    b.style.color = line.color;
                    b.style.borderColor = line.color + '50';
                  }}
                >
                  Discover {line.model} →
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  VIDEO SECTION — auto-playing machine demos
// ─────────────────────────────────────────────────────────────────────────────
function VideoSection() {
  const videos = [
    {
      src: '/videos/726E.mp4', // Best available demo of ChainLance routing mechanism
      label: '726X X-Pert Line',
      caption: 'ChainLance routes the strap automatically — Siemens touchscreen controls tension',
      color: '#C8102E',
    },
    {
      src: '/videos/go.mp4',
      label: 'ErgoPack GO',
      caption: 'Sledge 85 routes at floor level — no strap table, joystick operation',
      color: '#D97706',
    },
    {
      src: '/videos/700.mp4',
      label: 'ErgoPack 700',
      caption: 'Hand-crank ChainLance — no battery, no motor, operates anywhere',
      color: '#4A7C59',
    },
  ];

  return (
    <section className="bg-[#080808] py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="text-center mb-14">
          <motion.p
            className="text-[10px] uppercase tracking-[0.35em] text-[#C8102E] font-semibold mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            See Each Machine Work
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-semibold text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Three machines. One mechanism.
          </motion.h2>
          <motion.p
            className="text-base text-white/40 max-w-xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The ChainLance strap-routing mechanism is at the core of all three machines — driven by
            Li-ion motor (726X), lead-battery motor (GO), or your own hands (700).
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {videos.map((v, idx) => (
            <motion.div
              key={v.src}
              className="relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{ backgroundColor: v.color }}
              />
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                <div
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
                  style={{ color: v.color }}
                >
                  {v.label}
                </div>
                <p className="text-white/70 text-sm">{v.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  INDIVIDUAL PRODUCT SPOTLIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ProductSpotlight({
  line,
  flip = false,
}: {
  line: (typeof LINES)[number];
  flip?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const isDark = line.accentDark;

  return (
    <section
      id={`section-${line.id}`}
      ref={ref}
      className={`relative w-full min-h-screen flex items-center overflow-hidden ${isDark ? 'bg-[#080808]' : 'bg-gray-50'}`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${flip ? '30%' : '70%'} 50%, ${line.color}10 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
        {/* Text */}
        <motion.div
          className={flip ? 'lg:order-2' : ''}
          initial={{ opacity: 0, x: flip ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="text-[9px] uppercase tracking-[0.35em] font-semibold mb-3"
            style={{ color: line.color }}
          >
            {line.tagline}
          </div>
          <div
            className={`text-5xl md:text-7xl font-serif font-bold leading-[0.88] mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {line.model}
          </div>
          <div
            className={`text-xl font-serif font-light mb-6 ${isDark ? 'text-white/40' : 'text-gray-400'}`}
          >
            {line.name}
          </div>
          <p
            className={`text-base leading-relaxed mb-10 max-w-lg ${isDark ? 'text-white/55' : 'text-gray-600'}`}
          >
            {line.description}
          </p>

          {/* Spec grid */}
          <div className="grid grid-cols-2 gap-5 mb-10">
            {line.specs.map((s) => (
              <div
                key={s.label}
                className="pl-4 border-l-2"
                style={{ borderLeftColor: line.color + '55' }}
              >
                <div
                  className={`text-base font-serif font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {s.value}
                </div>
                <div
                  className={`text-[10px] uppercase tracking-widest mt-0.5 ${isDark ? 'text-white/35' : 'text-gray-400'}`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature list */}
          <ul className="space-y-2.5 mb-10">
            {line.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-3 text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}
              >
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: line.color }}
                  strokeWidth={2}
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link href={line.enquiryHref}>
              <button
                className="px-7 py-3.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-white rounded-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: line.color }}
              >
                Make an Enquiry
              </button>
            </Link>
            <Link href={line.href}>
              <button
                className={`flex items-center gap-2 px-7 py-3.5 text-[11px] uppercase tracking-[0.14em] font-semibold border rounded-sm transition-all ${isDark ? 'border-white/20 text-white hover:border-white/50 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:border-gray-600'}`}
              >
                Technical Specs <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className={`flex items-center justify-center relative ${flip ? 'lg:order-1' : ''}`}
          style={{ y: imgY }}
        >
          <div
            className="absolute w-80 h-80 rounded-full opacity-12 pointer-events-none"
            style={{ backgroundColor: line.color, filter: 'blur(60px)' }}
          />
          <motion.div
            className="relative z-10 w-full max-w-[460px] aspect-square"
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={line.productImage}
              alt={line.model}
              fill
              quality={95}
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PHILOSOPHY BANNER
// ─────────────────────────────────────────────────────────────────────────────
function PhilosophyBanner() {
  return (
    <section className="relative py-36 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0">
        <Image
          src="/images/main-hero-banner.png"
          alt="ErgoPack in operation"
          fill
          className="object-cover opacity-18"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-[#080808]" />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] uppercase tracking-[0.45em] text-[#C8102E] font-semibold mb-7">
            Engineered in Germany · Supported in India
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white leading-[1] mb-8 max-w-5xl mx-auto">
            Whether you need Li-ion speed,
            <br />
            <span className="italic font-light text-white/40">or zero power dependency.</span>
          </h2>
          <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-12">
            The 726X, GO and 700 cover every configuration of the dispatch floor — from fully
            digital automated strapping to hand-crank operation with no power source at all. Three
            machines. Every operation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/about">
              <button className="px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold border border-white/25 text-white hover:bg-white/8 hover:border-white/50 transition-all duration-300 rounded-sm">
                Our Story
              </button>
            </Link>
            <Link href="/roi-calculator">
              <button className="px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold bg-[#C8102E] text-white hover:bg-red-700 transition-all duration-300 rounded-sm">
                Calculate Your ROI
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  BENEFITS SECTION — grounded in what these three machines actually offer
// ─────────────────────────────────────────────────────────────────────────────
function BenefitsSection() {
  const benefits = [
    {
      Icon: Clock,
      title: 'Strap a pallet in under 40 seconds',
      desc: 'The ChainLance routes the strap under and around the pallet automatically. No bending, no threading — one cycle from a standing position.',
      color: '#C8102E',
    },
    {
      Icon: ShieldCheck,
      title: 'Consistent tension, every strap',
      desc: 'Hand-tensioning varies with operator fatigue. The 726X and GO apply machine-calibrated force. The 700 uses a hand crank with a mechanical sealing head — same repeatable result, different power source.',
      color: '#D97706',
    },
    {
      Icon: Layers,
      title: 'Any pallet width, 30 to 270 cm',
      desc: 'The ChainLance adjusts continuously. Narrow parcels, standard EUR pallets, and wide industrial loads all run on the same machine, same shift.',
      color: '#4A7C59',
    },
    {
      Icon: Battery,
      title: 'Power options for every site',
      desc: 'The 726X runs on Li-ion for high-cycle operations. The GO uses proven lead-fleece for portable strapping. The 700 needs no power at all — ideal for remote or restricted environments.',
      color: '#C8102E',
    },
    {
      Icon: Cpu,
      title: 'ISO and AGR certified',
      desc: 'Every machine carries ISO 12100:2010, EU Declaration of Conformity and AGR back-safety certification. Documented compliance, not a marketing claim.',
      color: '#D97706',
    },
    {
      Icon: Zap,
      title: 'India-based service and spares',
      desc: 'Local support. India-held spare parts stock. Fast response without waiting for international shipment. Your machine stays working.',
      color: '#4A7C59',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="text-center mb-16">
          <motion.p
            className="text-[10px] uppercase tracking-[0.35em] text-[#C8102E] font-semibold mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why ErgoPack
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-semibold text-gray-900"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built around the operator.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {benefits.map(({ Icon, title, desc, color }, idx) => (
            <motion.div
              key={title}
              className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color + '12' }}
              >
                <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-28 bg-[#C8102E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-5 leading-tight">
            726X, GO, or 700?
            <br />
            Not sure which one fits?
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto">
            Tell us your pallet dimensions, strap material, and power availability. We will tell you
            which machine is the right match — no obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <button className="px-10 py-4 text-sm uppercase tracking-widest font-semibold bg-white text-[#C8102E] hover:bg-gray-100 transition-all duration-300 rounded-sm">
                Get a Machine Match
              </button>
            </Link>
            <Link href="/compare?auto=true">
              <button className="px-10 py-4 text-sm uppercase tracking-widest font-semibold border border-white/35 text-white hover:bg-white/12 hover:border-white transition-all duration-300 rounded-sm">
                Compare All Three
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductLanding() {
  return (
    <div className="w-full">
      <FloatingVariantPill />
      <HeroSection />
      <VariantLinePicker />
      <VideoSection />
      {LINES.map((line, idx) => (
        <ProductSpotlight key={line.id} line={line} flip={idx % 2 === 1} />
      ))}
      <PhilosophyBanner />
      <BenefitsSection />
      <FinalCTA />
    </div>
  );
}
