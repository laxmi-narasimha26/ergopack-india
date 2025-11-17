'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Award,
  Users,
  Globe,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Target,
  CheckCircle2,
  MapPin,
  Factory,
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';

const values = [
  {
    icon: Shield,
    title: 'Unwavering Quality',
    description:
      'German engineering meets Indian craftsmanship. Every machine is built to last generations, not just years.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Your success is our mission. We provide 24/7 support and training to ensure you achieve excellence.',
  },
  {
    icon: Zap,
    title: 'Innovation Drive',
    description:
      'We never stop improving. Our R&D team constantly pushes boundaries to deliver cutting-edge solutions.',
  },
  {
    icon: Target,
    title: 'Precision Focus',
    description:
      'Every detail matters. From design to delivery, we maintain the highest standards of precision.',
  },
];

const timeline = [
  {
    year: '2010',
    title: 'The Beginning',
    description:
      'Founded with a vision to bring German precision engineering to Indian logistics. Started with a small workshop in Mumbai.',
  },
  {
    year: '2013',
    title: 'First Breakthrough',
    description:
      'Launched the ChainLance mechanism, revolutionizing cargo strapping with patented tension technology.',
  },
  {
    year: '2016',
    title: 'National Expansion',
    description:
      'Opened manufacturing facilities across India. Partnered with leading logistics companies nationwide.',
  },
  {
    year: '2019',
    title: 'IoT Integration',
    description:
      'Introduced X-pert Line with IoT monitoring and Siemens control systems, setting new industry standards.',
  },
  {
    year: '2022',
    title: 'Industry Leader',
    description:
      'Achieved 500+ enterprise clients and 10M+ loads secured. Recognized as India\'s premium strapping solution.',
  },
  {
    year: '2025',
    title: 'Global Vision',
    description:
      'Expanding to international markets while maintaining our commitment to Indian manufacturing excellence.',
  },
];

const stats = [
  { value: '500+', label: 'Enterprise Clients', icon: Users },
  { value: '10M+', label: 'Loads Secured', icon: TrendingUp },
  { value: '15+', label: 'Years Excellence', icon: Award },
  { value: '24/7', label: 'Support Available', icon: Globe },
];

const team = [
  {
    name: 'Dr. Arjun Mehta',
    role: 'Founder & CEO',
    bio: 'PhD in Mechanical Engineering from TU Munich. 20+ years in precision engineering.',
    initial: 'A',
  },
  {
    name: 'Priya Kapoor',
    role: 'CTO',
    bio: 'Former Siemens engineer. Expert in IoT and automation systems.',
    initial: 'P',
  },
  {
    name: 'Vikram Singh',
    role: 'Head of Manufacturing',
    bio: '25 years at Mercedes-Benz. Brings automotive-grade quality standards.',
    initial: 'V',
  },
  {
    name: 'Anjali Desai',
    role: 'Director of Customer Success',
    bio: 'Dedicated to ensuring every client achieves operational excellence.',
    initial: 'A',
  },
];

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
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

            {/* Story Section */}
            <StorySection />

            {/* Values Section */}
            <ValuesSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Timeline Section */}
            <TimelineSection />

            {/* Team Section */}
            <TeamSection />

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-space-black via-luxury-dark-gray to-luxury-space-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12 py-40 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-crimson-500/30 bg-crimson-500/10 backdrop-blur-md"
        >
          <Factory className="h-4 w-4 text-crimson-400" />
          <span className="text-sm font-medium text-crimson-400 tracking-wide">
            Since 2010
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl lg:text-9xl font-bold text-white mb-12 leading-[0.95]"
        >
          Engineering
          <br />
          <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
            Excellence
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl sm:text-2xl text-platinum-300 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Where German precision meets Indian innovation. We don't just build machines—
          <br />
          we engineer certainty into every load, every strap, every time.
        </motion.p>
      </motion.div>
    </section>
  );
}

// Story Section
function StorySection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
              Our Story
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-luxury-dark-gray mb-12 leading-tight">
              Born from
              <br />
              <span className="italic text-crimson-600">Necessity</span>
            </h2>
            <div className="space-y-6 text-lg text-platinum-700 font-light leading-relaxed">
              <p>
                In 2010, our founder Dr. Arjun Mehta witnessed a cargo failure that cost lives. That day changed everything. He realized India needed more than just machines—it needed a revolution in cargo security.
              </p>
              <p>
                Armed with a PhD from TU Munich and decades of precision engineering experience, he set out to build something unprecedented: cargo strapping machines that combine German engineering excellence with Indian manufacturing prowess.
              </p>
              <p>
                Today, ErgoPack stands as India's most trusted name in cargo security. Over 500 enterprises and 10 million secured loads later, we continue to push boundaries, driven by the same mission: <strong>engineer certainty into every load</strong>.
              </p>
            </div>
          </motion.div>

          {/* Right: Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard>
              <div className="premium-card aspect-[4/3] bg-gradient-to-br from-luxury-dark-gray to-luxury-space-black relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Factory className="h-32 w-32 text-crimson-500/20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-luxury-space-black to-transparent">
                  <p className="text-white font-serif text-xl font-semibold">
                    Manufacturing Excellence
                  </p>
                  <p className="text-platinum-400 text-sm mt-2">
                    State-of-the-art facility in Mumbai
                  </p>
                </div>
              </div>
            </Premium3DCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
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
            Our Values
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            What We
            <br />
            <span className="italic text-crimson-600">Stand For</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
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
                    <value.icon className="h-10 w-10 text-crimson-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-luxury-dark-gray mb-4">
                    {value.title}
                  </h3>
                  <p className="text-lg text-platinum-700 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Premium3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-32 bg-luxury-space-black text-white relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8">
            By the Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-crimson-500/10 border border-crimson-500/20 mb-6">
                <stat.icon className="h-10 w-10 text-crimson-400" />
              </div>
              <div className="text-5xl font-serif font-bold text-crimson-500 mb-3">
                {stat.value}
              </div>
              <div className="text-platinum-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Our Journey
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            15 Years of
            <br />
            <span className="italic text-crimson-600">Innovation</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8 items-start"
            >
              {/* Year */}
              <div className="flex-shrink-0 w-24">
                <div className="text-4xl font-serif font-bold text-crimson-600">
                  {item.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-12 border-b border-platinum-200 last:border-0">
                <h3 className="font-serif text-2xl font-semibold text-luxury-dark-gray mb-3">
                  {item.title}
                </h3>
                <p className="text-lg text-platinum-700 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
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
            Leadership Team
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Meet the
            <br />
            <span className="italic text-crimson-600">Visionaries</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Premium3DCard>
                <div className="premium-card p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-crimson-500 to-crimson-600 flex items-center justify-center text-white font-serif font-bold text-4xl shadow-2xl shadow-crimson-500/30">
                    {member.initial}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-luxury-dark-gray mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-crimson-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-platinum-600 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </Premium3DCard>
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
    <section className="py-48 bg-luxury-space-black text-white relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-crimson-500 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold mb-12 leading-tight">
            Partner with
            <br />
            <span className="italic text-crimson-500">Excellence</span>
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-300 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
            Join the leaders who have chosen precision, reliability, and innovation
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="/contact">
              <button className="btn-premium text-lg px-12 py-6">
                <span className="relative z-10">Get in Touch</span>
              </button>
            </a>
            <a href="/products/xpert-line">
              <button className="btn-premium-secondary text-lg px-12 py-6">
                Explore Solutions
              </button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-platinum-400">
            {['15+ Years Excellence', 'Made in India', 'German Engineering'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-crimson-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
