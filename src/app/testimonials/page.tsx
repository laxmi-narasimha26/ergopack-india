'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, Building2, MapPin, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    title: 'Logistics Director',
    company: 'Tata Steel',
    location: 'Jamshedpur, India',
    rating: 5,
    quote:
      'ErgoPack transformed our cargo operations. The X-pert Line reduced our load failures to virtually zero. The precision engineering is unmatched—this is what German excellence looks like.',
    stat: '99.9%',
    statLabel: 'Reliability Increase',
    image: '/testimonials/tata-steel.jpg',
  },
  {
    name: 'Priya Sharma',
    title: 'Operations Manager',
    company: 'Mahindra Logistics',
    location: 'Mumbai, India',
    rating: 5,
    quote:
      'Switching to ErgoPack was the best decision we made. The E-conomy Line delivers professional-grade performance at an exceptional value. Our team loves how intuitive it is.',
    stat: '45%',
    statLabel: 'Time Savings',
    image: '/testimonials/mahindra.jpg',
  },
  {
    name: 'Vikram Patel',
    title: 'Supply Chain Head',
    company: 'Reliance Industries',
    location: 'Ahmedabad, India',
    rating: 5,
    quote:
      'The ChainLance mechanism is revolutionary. We handle thousands of loads daily, and ErgoPack ensures every single one is secured with precision. The IoT monitoring gives us complete visibility.',
    stat: '10M+',
    statLabel: 'Loads Secured',
    image: '/testimonials/reliance.jpg',
  },
  {
    name: 'Anil Reddy',
    title: 'Fleet Manager',
    company: 'Delhivery',
    location: 'Bangalore, India',
    rating: 5,
    quote:
      'ErgoPack\'s customer support is exceptional. From installation to training, they were with us every step. The machines are built like tanks—zero downtime in 18 months.',
    stat: '24/7',
    statLabel: 'Support Excellence',
    image: '/testimonials/delhivery.jpg',
  },
  {
    name: 'Meera Iyer',
    title: 'Warehouse Director',
    company: 'Amazon India',
    location: 'Hyderabad, India',
    rating: 5,
    quote:
      'Speed and reliability define our operations. ErgoPack delivers both. The 45-second strapping cycle keeps our throughput high, and the quality is consistently excellent.',
    stat: '45s',
    statLabel: 'Avg. Cycle Time',
    image: '/testimonials/amazon.jpg',
  },
  {
    name: 'Suresh Menon',
    title: 'Procurement Head',
    company: 'Flipkart',
    location: 'Chennai, India',
    rating: 5,
    quote:
      'We evaluated multiple brands before choosing ErgoPack. The build quality, German engineering, and local support made it an easy choice. ROI was achieved in under 8 months.',
    stat: '8mo',
    statLabel: 'ROI Achievement',
    image: '/testimonials/flipkart.jpg',
  },
];

const stats = [
  { value: '500+', label: 'Happy Clients', icon: Building2 },
  { value: '99.9%', label: 'Satisfaction Rate', icon: Star },
  { value: '24/7', label: 'Support Available', icon: Award },
  { value: '10M+', label: 'Loads Secured', icon: TrendingUp },
];

export default function TestimonialsPage() {
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

            {/* Stats Section */}
            <StatsSection />

            {/* Testimonials Grid */}
            <TestimonialsGrid />

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
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
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
          <Star className="h-4 w-4 text-crimson-400 fill-crimson-400" />
          <span className="text-sm font-medium text-crimson-400 tracking-wide">
            Trusted by India's Elite
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          What Our Clients
          <br />
          <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
            Are Saying
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl sm:text-2xl text-platinum-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Join hundreds of industry leaders who trust ErgoPack to secure their most valuable cargo
        </motion.p>
      </motion.div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-24 bg-white border-b border-platinum-200">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
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
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-crimson-50 border border-crimson-500/20 mb-4">
                <stat.icon className="h-8 w-8 text-crimson-600" />
              </div>
              <div className="text-4xl font-serif font-bold text-luxury-dark-gray mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-platinum-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Grid
function TestimonialsGrid() {
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
            Client Success Stories
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Excellence in
            <br />
            <span className="italic text-crimson-600">Every Review</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Premium3DCard glowColor="rgba(155, 28, 28, 0.2)">
                <div className="premium-card p-10 h-full flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-crimson-500 fill-crimson-500"
                      />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="h-12 w-12 text-crimson-500/20 mb-6" />

                  {/* Quote */}
                  <p className="text-lg text-platinum-700 font-light leading-relaxed mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Stat Highlight */}
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-crimson-50 to-transparent border border-crimson-500/20">
                    <div className="text-4xl font-serif font-bold text-crimson-600 mb-1">
                      {testimonial.stat}
                    </div>
                    <div className="text-sm text-platinum-600 font-medium">
                      {testimonial.statLabel}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-start gap-4 pt-6 border-t border-platinum-200">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson-500 to-crimson-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-serif text-lg font-semibold text-luxury-dark-gray mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-platinum-600 mb-1">
                        {testimonial.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-platinum-500">
                        <Building2 className="h-3 w-3" />
                        <span>{testimonial.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-platinum-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
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
            Join India's
            <br />
            <span className="italic text-crimson-500">Elite Operations</span>
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-300 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
            Experience the same precision engineering trusted by industry leaders across India
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="/contact">
              <button className="btn-premium text-lg px-12 py-6">
                <span className="relative z-10">Request Invitation</span>
              </button>
            </a>
            <a href="/products/xpert-line">
              <button className="btn-premium-secondary text-lg px-12 py-6">
                Explore Products
              </button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-platinum-400">
            {['Free Consultation', 'On-Site Demo', '24/7 Support'].map((item, i) => (
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
