import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import {
  Shield,
  FileCheck,
  Award,
  CheckCircle,
  ArrowRight,
  ClipboardCheck,
  AlertTriangle,
  TrendingDown,
  Building,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EHS Compliance | OSH Code 2020 Compliant Equipment | ErgoPack India',
  description:
    'Meet EHS compliance requirements with ErgoPack ergonomic strapping. OSH Code 2020 compliant, OSHA standards, documented safety improvements. Reduce workplace injury liability.',
  keywords: [
    'EHS compliance India',
    'OSH Code 2020 equipment',
    'OSHA compliant strapping',
    'workplace safety compliance',
    'ergonomic equipment certification',
    'occupational health safety',
    'factory safety audit',
    'industrial safety India',
    'worker injury prevention compliance',
    'EHS audit documentation',
  ],
  openGraph: {
    title: 'EHS Compliance Solutions | ErgoPack India',
    description:
      'Proactive safety investment that satisfies auditors and protects workers. Documentation included.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/ehs-compliance',
  },
};

const complianceStandards = [
  {
    title: 'OSH Code 2020',
    description: "India's Occupational Safety, Health and Working Conditions Code",
    status: 'Compliant',
    icon: FileCheck,
  },
  {
    title: 'OSHA Standards',
    description: 'International occupational safety standards benchmark',
    status: 'Aligned',
    icon: Shield,
  },
  {
    title: 'ISO 45001',
    description: 'Occupational health and safety management systems',
    status: 'Support',
    icon: Award,
  },
  {
    title: 'Factory Act 1948',
    description: 'Indian factory worker safety regulations',
    status: 'Compliant',
    icon: Building,
  },
];

const auditBenefits = [
  {
    icon: ClipboardCheck,
    title: 'Documented Improvements',
    description:
      'Receive comprehensive before/after metrics that demonstrate proactive safety investment to auditors.',
  },
  {
    icon: TrendingDown,
    title: 'Reduced Liability',
    description:
      'Documented 90% reduction in back injuries protects against workplace injury claims and lawsuits.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Mitigation',
    description:
      'Address ergonomic hazards identified in risk assessments with proven engineering controls.',
  },
  {
    icon: Award,
    title: 'Safety Recognition',
    description:
      'Qualify for safety awards, lower insurance premiums, and preferred vendor status with clients.',
  },
];

const faqItems = [
  {
    question: 'Does ErgoPack help satisfy OSH Code 2020 requirements?',
    answer:
      "Yes. The OSH Code 2020 requires employers to provide a safe working environment and take measures to prevent occupational injuries. ErgoPack's zero-bending technology directly addresses ergonomic hazards and provides documented proof of safety investment.",
  },
  {
    question: 'What documentation does ErgoPack provide for EHS audits?',
    answer:
      'We provide installation certificates, operator training records, ergonomic improvement metrics, and compliance statements that can be presented during safety audits.',
  },
  {
    question: 'Can ErgoPack help reduce our insurance premiums?',
    answer:
      "Many facilities see reduced workers' compensation insurance premiums after installing ErgoPack systems, due to documented reduction in workplace injuries. We can provide case studies for your insurance provider.",
  },
  {
    question: 'How does ErgoPack address manual handling regulations?',
    answer:
      'ErgoPack eliminates hazardous manual handling associated with traditional strapping—no bending, no heavy lifting, no awkward postures. This directly addresses manual handling risk assessment findings.',
  },
];

const riskFactors = [
  { factor: 'Repetitive Bending', traditional: 'High Risk', ergoPack: 'Eliminated' },
  { factor: 'Awkward Postures', traditional: 'Frequent', ergoPack: 'None Required' },
  { factor: 'Physical Fatigue', traditional: 'Severe by EOD', ergoPack: 'Minimal' },
  { factor: 'Back Injury Risk', traditional: 'Very High', ergoPack: 'Near Zero' },
  { factor: 'Compliance Status', traditional: 'At Risk', ergoPack: 'Compliant' },
];

export default function EHSCompliancePage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd type="faq" data={{ items: faqItems }} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8">
              EHS Compliance Ready
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Pass Your EHS Audit With{' '}
              <span className="text-blue-400">Documented Safety Improvements</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Demonstrate proactive safety investment with ErgoPack. OSH Code 2020 compliant,
              OSHA-aligned, with comprehensive audit documentation included.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Request Compliance Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:border-white/50 text-white font-semibold rounded-lg transition-colors"
              >
                View Certified Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Standards & Compliance
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              ErgoPack systems are designed to meet and exceed workplace safety regulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <standard.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{standard.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{standard.description}</p>
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">
                  {standard.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Assessment Comparison */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Risk Assessment: Traditional vs ErgoPack
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              How ErgoPack transforms your ergonomic risk profile
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
              <div className="grid grid-cols-3 bg-gray-800 p-4">
                <div className="text-gray-400 font-medium">Risk Factor</div>
                <div className="text-red-400 font-medium text-center">Traditional Strapping</div>
                <div className="text-green-400 font-medium text-center">With ErgoPack</div>
              </div>
              {riskFactors.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 p-4 border-t border-gray-700 hover:bg-gray-800/50"
                >
                  <div className="text-white">{item.factor}</div>
                  <div className="text-red-400 text-center">{item.traditional}</div>
                  <div className="text-green-400 text-center">{item.ergoPack}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audit Benefits */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Benefits for Your EHS Program
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {auditBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Included */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-medium mb-4 block">AUDIT READY</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Comprehensive Documentation Included
              </h2>
              <p className="text-gray-300 mb-8">
                Every ErgoPack installation comes with complete documentation to support your EHS
                program and satisfy auditor requirements.
              </p>

              <div className="space-y-4">
                {[
                  'Installation and commissioning certificate',
                  'Operator training completion records',
                  'Ergonomic improvement metrics report',
                  'Before/after risk assessment comparison',
                  'Maintenance and inspection logs',
                  'Compliance statement for OSH Code 2020',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-blue-400" />
                Sample Audit Report Metrics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Ergonomic Risk Reduction</span>
                    <span className="text-green-400">90%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Manual Handling Compliance</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Worker Training Complete</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Equipment Maintenance Current</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Compliance FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Prepare for Your Next EHS Audit
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Get a free compliance assessment and see how ErgoPack can strengthen your safety program
            while improving productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Compliance Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/ergonomics"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn About Ergonomics
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
