import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Shield, Heart, TrendingUp, CheckCircle, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pallet Strapping Without Bending Down | Faster, Fatigue-Free | ErgoPack India',
  description:
    "Strap pallets from one standing position in under 40 seconds. ErgoPack's ChainLance eliminates walking and bending — keeping packaging speed at hour eight identical to hour one, with fatigue-related errors removed.",
  keywords: [
    'industrial pallet strapper without bending down',
    'no bending no walking strapping',
    'standing pallet strapping system',
    'ChainLance technology',
    'reduce worker fatigue packaging line',
    'consistent dispatch throughput',
    'mobile pallet strapping machine India',
    'worker fatigue reduction equipment',
  ],
  openGraph: {
    title: 'Pallet Strapping Without Bending — Faster, Fatigue-Free | ErgoPack India',
    description:
      'Strap pallets from one position in under 40 seconds. Eliminate bending and walking so throughput stays constant across the whole shift.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/ergonomics',
  },
};

const benefits = [
  {
    icon: TrendingUp,
    title: '66% Faster Cycle Time',
    description:
      'Strap a pallet in under 40 seconds versus 120+ seconds manual. No walking around the pallet — one operator does the work of three.',
    stat: '40 sec',
    statLabel: 'Per pallet vs 120s manual',
  },
  {
    icon: Clock,
    title: 'Constant Shift Throughput',
    description:
      'Because the machine does the physical work, dispatch speed at hour eight matches hour one — eliminating the afternoon slowdown that costs you pallets.',
    stat: '0',
    statLabel: 'Fatigue-related slowdown',
  },
  {
    icon: Heart,
    title: 'Fewer Fatigue Errors',
    description:
      'Reducing physical strain by ~80% removes the tired-operator mistakes that cause loose straps, re-work, and rejected loads.',
    stat: '~80%',
    statLabel: 'Less operator fatigue',
  },
  {
    icon: Shield,
    title: 'Zero Bending (Byproduct)',
    description:
      'Eliminating 50,000+ annual bending movements also removes the leading cause of warehouse back injuries and supports OSH Code 2020 audits.',
    stat: '0',
    statLabel: 'Bends required per pallet',
  },
];

const problems = [
  {
    problem: 'Manual double-strapping takes 120+ seconds with two operators',
    solution: 'One operator straps in under 40 seconds with ChainLance',
  },
  {
    problem: 'Walking around each pallet wastes thousands of man-hours a year',
    solution: 'Strap from one position — 25,000 fewer trips per year (100 pallets/day)',
  },
  {
    problem: 'Afternoon fatigue slows dispatch and causes loose-strap re-work',
    solution: 'Machine does the labor — hour-eight speed matches hour-one',
  },
  {
    problem: 'Two-man strapping teams inflate payroll',
    solution: 'A single operator achieves the throughput of three',
  },
  {
    problem: '50,000+ annual bends drive back injuries and EHS audit flags',
    solution: 'Zero bending — a built-in byproduct of the efficiency gain',
  },
];

const faqItems = [
  {
    question: 'How does ErgoPack eliminate bending?',
    answer:
      'Our patented ChainLance technology threads the strap beneath the pallet and brings it up to waist height automatically. Workers never need to bend down or reach under the pallet.',
  },
  {
    question: 'Is ErgoPack suitable for all pallet sizes?',
    answer:
      'Yes, ErgoPack systems accommodate standard pallet sizes from 800mm to 1200mm. Custom solutions are available for non-standard pallets.',
  },
  {
    question: 'How quickly can we see ergonomic improvements?',
    answer:
      'Improvements are immediate from day one. Workers notice reduced fatigue within the first week, and injury statistics typically improve within the first quarter.',
  },
  {
    question: 'Does ErgoPack help with EHS compliance audits?',
    answer:
      'Absolutely. We provide documentation of ergonomic improvements, before/after metrics, and compliance certificates that satisfy OSH Code 2020 and international standards.',
  },
];

export default function ErgonomicsPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd type="faq" data={{ items: faqItems }} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-8">
              Strap From One Position — No Bending, No Walking
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Pallet Strapping Without Bending Down —{' '}
              <span className="text-green-400">Faster, Fatigue-Free Throughput</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              ErgoPack's ChainLance routes the strap under the pallet and back to the operator, who
              never walks around the load or bends down. The result is a strapping cycle under 40
              seconds — and because fatigue is removed, hour eight of the shift runs as fast as hour
              one, with no fatigue-related strapping errors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Request Ergonomic Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:border-white/50 text-white font-semibold rounded-lg transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-800 py-8 border-y border-gray-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">66%</div>
              <div className="text-gray-400 text-sm">Less Cycle Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">40s</div>
              <div className="text-gray-400 text-sm">Per Pallet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">10,000+</div>
              <div className="text-gray-400 text-sm">Systems Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">40+</div>
              <div className="text-gray-400 text-sm">Years of Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              The Hidden Cost of Manual Strapping
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Walking around pallets and bending to thread straps wastes thousands of man-hours a
              year and slows your dispatch floor. ErgoPack removes the wasted motion entirely.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {problems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-stretch mb-4 rounded-lg overflow-hidden"
              >
                <div className="flex-1 bg-red-900/20 border-l-4 border-red-500 p-6">
                  <div className="text-red-400 text-sm font-medium mb-1">PROBLEM</div>
                  <div className="text-white">{item.problem}</div>
                </div>
                <div className="flex-1 bg-green-900/20 border-l-4 border-green-500 p-6">
                  <div className="text-green-400 text-sm font-medium mb-1">ERGOPACK SOLUTION</div>
                  <div className="text-white">{item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Measurable Throughput Benefits
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real results from real facilities — faster cycles, steady all-shift throughput, fewer
              fatigue errors, with the ergonomic and EHS gains following automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-green-500/50 transition-colors"
              >
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-green-400 mb-2">{benefit.stat}</div>
                <div className="text-sm text-gray-500 mb-4">{benefit.statLabel}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ChainLance Technology Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-400 font-medium mb-4 block">PATENTED TECHNOLOGY</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                ChainLance: The Science Behind Zero Bending
              </h2>
              <p className="text-gray-300 mb-8">
                Our patented ChainLance mechanism threads the strap beneath the pallet
                automatically. The strap is then elevated to waist height, allowing workers to
                complete the entire strapping process while standing upright.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-medium">Automatic Strap Threading</div>
                    <div className="text-gray-400 text-sm">
                      ChainLance threads strap beneath pallet without manual intervention
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-medium">Waist-Height Operation</div>
                    <div className="text-gray-400 text-sm">
                      All controls and strap handling at comfortable working height
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-medium">Single Position Strapping</div>
                    <div className="text-gray-400 text-sm">
                      No walking around pallets—strap multiple sides from one spot
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Before vs After ErgoPack</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Bends per Shift</span>
                    <span className="text-gray-400">Traditional: 100+ → ErgoPack: 0</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Steps per Pallet</span>
                    <span className="text-gray-400">Traditional: 20+ → ErgoPack: 0</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Time per Pallet</span>
                    <span className="text-gray-400">Traditional: 2 min → ErgoPack: 40 sec</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Worker Fatigue</span>
                    <span className="text-gray-400">Reduced by 80%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Cut Your Strapping Time by 66%?
          </h2>
          <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
            Book a free on-site capacity audit. Our team will measure your current cycle time and
            calculate the labor hours and payback you'll gain — fatigue reduction included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Free Capacity Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
