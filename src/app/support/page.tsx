'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  FileText,
  Video,
  Users,
  Wrench,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';

const supportChannels = [
  {
    icon: Phone,
    title: '24/7 Phone Support',
    description: 'Speak with our experts anytime, anywhere',
    contact: '+91 1800-ERGOPACK',
    availability: 'Available 24/7',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get detailed assistance via email',
    contact: 'support@ergopack.in',
    availability: 'Response within 4 hours',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant messaging with our team',
    contact: 'Click chat icon below',
    availability: 'Mon-Sat, 9 AM - 9 PM',
  },
  {
    icon: Video,
    title: 'Video Call Support',
    description: 'Face-to-face technical assistance',
    contact: 'Schedule a call',
    availability: 'By appointment',
  },
];

const resources = [
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Comprehensive guides and manuals',
    items: ['User Manuals', 'Quick Start Guides', 'API Documentation', 'Safety Guidelines'],
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video instructions',
    items: ['Installation Guides', 'Maintenance Tips', 'Troubleshooting', 'Best Practices'],
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Expert technical assistance',
    items: ['Remote Diagnostics', 'On-Site Service', 'Spare Parts', 'Calibration Services'],
  },
  {
    icon: Users,
    title: 'Training Programs',
    description: 'Hands-on training for your team',
    items: ['Operator Training', 'Maintenance Training', 'Safety Certification', 'Advanced Workshops'],
  },
];

const faqs = [
  {
    question: 'What is the warranty period for ErgoPack machines?',
    answer:
      'All ErgoPack machines come with a comprehensive 3-year warranty covering parts and labor. Extended warranty options up to 10 years are available. Our warranty includes free preventive maintenance visits and 24/7 technical support.',
  },
  {
    question: 'How quickly can I get on-site support?',
    answer:
      'We guarantee on-site support within 24 hours across all major Indian cities. For metro areas, we typically respond within 4-6 hours. We have service centers in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and Ahmedabad.',
  },
  {
    question: 'Do you provide training for operators?',
    answer:
      'Yes! Every ErgoPack purchase includes complimentary operator training for up to 5 staff members. Training covers machine operation, safety protocols, basic maintenance, and troubleshooting. Advanced training programs are available for maintenance teams.',
  },
  {
    question: 'What preventive maintenance is recommended?',
    answer:
      'We recommend quarterly preventive maintenance checks. Our service team will inspect critical components, calibrate tension settings, update software, and replace wear parts as needed. We offer annual maintenance contracts with significant cost savings.',
  },
  {
    question: 'Are spare parts readily available?',
    answer:
      'Yes, we maintain extensive spare parts inventory at our regional warehouses. Common wear parts are shipped within 24 hours. Critical components are available for same-day delivery in major cities. We also offer predictive maintenance to replace parts before failure.',
  },
  {
    question: 'Can I upgrade my machine with new features?',
    answer:
      'Absolutely! Our modular design allows for easy upgrades. You can add IoT monitoring, upgrade control systems, or enhance strapping capacity. Contact our technical team to discuss upgrade options for your specific model.',
  },
];

const locations = [
  {
    city: 'Mumbai',
    address: '123 Industrial Estate, Andheri East',
    phone: '+91 22 1234 5678',
    email: 'mumbai@ergopack.in',
  },
  {
    city: 'Delhi',
    address: '456 Okhla Industrial Area, Phase 2',
    phone: '+91 11 2345 6789',
    email: 'delhi@ergopack.in',
  },
  {
    city: 'Bangalore',
    address: '789 Electronic City, Phase 1',
    phone: '+91 80 3456 7890',
    email: 'bangalore@ergopack.in',
  },
  {
    city: 'Chennai',
    address: '321 Ambattur Industrial Estate',
    phone: '+91 44 4567 8901',
    email: 'chennai@ergopack.in',
  },
];

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <>
      <PremiumLoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <MainLayout>
          <div className="bg-luxury-off-white">
            {/* Hero Section */}
            <HeroSection opacity={opacity} scale={scale} />

            {/* Support Channels */}
            <SupportChannelsSection />

            {/* Resources */}
            <ResourcesSection />

            {/* FAQs */}
            <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />

            {/* Locations */}
            <LocationsSection />

            {/* CTA Section */}
            <CTASection />
          </div>
        </MainLayout>
      )}
    </>
  );
}

// Hero Section
function HeroSection({ opacity, scale }: { opacity: any; scale: any }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-luxury-space-black via-luxury-dark-gray to-luxury-space-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 py-32 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-crimson-500/30 bg-crimson-500/10 backdrop-blur-md"
        >
          <Headphones className="h-4 w-4 text-crimson-400" />
          <span className="text-sm font-medium text-crimson-400 tracking-wide">
            24/7 Available
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          We're Here to
          <br />
          <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
            Help You Succeed
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl sm:text-2xl text-platinum-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Expert support when you need it. Training when you want it. Resources always available.
        </motion.p>
      </motion.div>
    </section>
  );
}

// Support Channels Section
function SupportChannelsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Get in Touch
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Choose Your
            <br />
            <span className="italic text-crimson-600">Support Channel</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportChannels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Premium3DCard>
                <div className="premium-card p-8 h-full flex flex-col">
                  <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-crimson-50 border border-crimson-500/20 mb-6">
                    <channel.icon className="h-8 w-8 text-crimson-600" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-luxury-dark-gray mb-3">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-platinum-600 mb-4 flex-grow">
                    {channel.description}
                  </p>
                  <div className="pt-4 border-t border-platinum-200">
                    <p className="text-sm font-medium text-crimson-600 mb-1">
                      {channel.contact}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-platinum-500">
                      <Clock className="h-3 w-3" />
                      <span>{channel.availability}</span>
                    </div>
                  </div>
                </div>
              </Premium3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Resources Section
function ResourcesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-crimson-50/30">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Resources
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Everything You
            <br />
            <span className="italic text-crimson-600">Need to Know</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Premium3DCard glowColor="rgba(155, 28, 28, 0.2)">
                <div className="premium-card p-10">
                  <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-crimson-50 border border-crimson-500/20 mb-6">
                    <resource.icon className="h-10 w-10 text-crimson-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-luxury-dark-gray mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-platinum-600 mb-6">{resource.description}</p>
                  <ul className="space-y-3">
                    {resource.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-platinum-700">
                        <CheckCircle2 className="h-4 w-4 text-crimson-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Premium3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({
  openFAQ,
  setOpenFAQ,
}: {
  openFAQ: number | null;
  setOpenFAQ: (index: number | null) => void;
}) {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            FAQ
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Common
            <br />
            <span className="italic text-crimson-600">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="premium-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-crimson-50/50 transition-colors"
              >
                <span className="font-serif text-lg font-semibold text-luxury-dark-gray pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-crimson-600 flex-shrink-0 transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-platinum-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Locations Section
function LocationsSection() {
  return (
    <section className="py-32 bg-luxury-space-black text-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 mb-8 font-medium">
            Our Locations
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight">
            Service Centers
            <br />
            <span className="italic text-crimson-500">Across India</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="premium-card-dark p-8"
            >
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-crimson-500/10 border border-crimson-500/20 mb-6">
                <MapPin className="h-8 w-8 text-crimson-400" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">{location.city}</h3>
              <p className="text-sm text-platinum-400 mb-4">{location.address}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-platinum-300">
                  <Phone className="h-4 w-4 text-crimson-500" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-platinum-300">
                  <Mail className="h-4 w-4 text-crimson-500" />
                  <span>{location.email}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-48 bg-gradient-to-br from-crimson-50 via-white to-platinum-50 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-crimson-300 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray mb-12 leading-tight">
            Still Have
            <br />
            <span className="italic text-crimson-600">Questions?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-600 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
            Our support team is standing by to help you find the perfect solution
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/contact">
              <button className="btn-premium text-lg px-12 py-6">
                <span className="relative z-10">Contact Support</span>
              </button>
            </a>
            <a href="tel:+911800ERGOPACK">
              <button className="btn-premium-secondary text-lg px-12 py-6">
                Call Now
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
