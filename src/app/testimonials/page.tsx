'use client';

import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Users, Factory, CheckCircle } from 'lucide-react';
import VideoPosterLink from '@/components/media/VideoPosterLink';

// Video testimonials from local files
const videoTestimonials = [
  {
    id: 1,
    video: '/videos/testimonials/220120_ebm-papst-air_en_entscheider_01.mp4',
    poster: '/videos/posters/220120_ebm-papst-air_en_entscheider_01.jpg',
    company: 'ebm-papst',
    industry: 'Electronics & Air Technology',
    category: 'Operations Manager',
    thumbnail: null,
  },
  {
    id: 2,
    video: '/videos/testimonials/220120elbe-flugzeugwerke_en_entscheider_v01.mp4',
    poster: '/videos/posters/220120elbe-flugzeugwerke_en_entscheider_v01.jpg',
    company: 'Elbe Flugzeugwerke',
    industry: 'Aviation & Aerospace',
    category: 'Operations Manager',
    thumbnail: null,
  },
  {
    id: 3,
    video: '/videos/testimonials/221014_testimonial-dietrich-aldinger_en_01.mp4',
    poster: '/videos/posters/221014_testimonial-dietrich-aldinger_en_01.jpg',
    company: 'Dietrich Aldinger',
    industry: 'Manufacturing',
    category: 'Users',
    thumbnail: null,
  },
  {
    id: 4,
    video: '/videos/testimonials/magura-eng.mp4',
    poster: '/videos/posters/magura-eng.jpg',
    company: 'MAGURA',
    industry: 'Bicycle Components',
    category: 'Metal and Electronics',
    thumbnail: null,
  },
  {
    id: 5,
    video: '/videos/testimonials/regiolux_eng.mp4',
    poster: '/videos/posters/regiolux_eng.jpg',
    company: 'Regiolux',
    industry: 'Lighting Systems',
    category: 'Metal and Electronics',
    thumbnail: null,
  },
  {
    id: 6,
    video: '/videos/testimonials/sachsennetze-eng.mp4',
    poster: '/videos/posters/sachsennetze-eng.jpg',
    company: 'SachsenNetze',
    industry: 'Energy & Utilities',
    category: 'Users',
    thumbnail: null,
  },
  {
    id: 7,
    video: '/videos/testimonials/zimmer-medizinsysteme_eng_v02.mp4',
    poster: '/videos/posters/zimmer-medizinsysteme_eng_v02.jpg',
    company: 'Zimmer MedizinSysteme',
    industry: 'Medical Technology',
    category: 'Metal and Electronics',
    thumbnail: null,
  },
];

// Stats from official ErgoPack website
const stats = [
  { value: '14,868', label: 'Customers', icon: Users },
  { value: '22,303', label: 'Sold Machines', icon: Factory },
  { value: '89,210', label: 'Satisfied Users', icon: CheckCircle },
];

// Text testimonials
const textTestimonials = [
  {
    quote:
      'The ErgoPack system has completely transformed our packaging line. The ergonomic benefits were immediate, and the efficiency gains have been remarkable.',
    author: 'Logistics Manager',
    company: 'Automotive Industry Leader',
    location: 'Pune, India',
  },
  {
    quote:
      'German engineering at its finest. The build quality is exceptional, and the support from ErgoPack India has been world-class.',
    author: 'Operations Director',
    company: 'Global Manufacturing Corp',
    location: 'Chennai, India',
  },
  {
    quote:
      "We prioritized employee safety, and ErgoPack delivered. No more bending, no more back pain. It's an investment in our people.",
    author: 'EHS Head',
    company: 'Pharmaceutical Giant',
    location: 'Hyderabad, India',
  },
  {
    quote:
      'Reliability is key for our 24/7 operations. ErgoPack systems have run flawlessly, and the battery life is impressive.',
    author: 'Warehouse Supervisor',
    company: 'E-commerce Logistics',
    location: 'Delhi NCR, India',
  },
];

function VideoCard({ testimonial }: { testimonial: (typeof videoTestimonials)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-[#C8102E]/50 transition-all duration-300"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <VideoPosterLink
          videoSrc={testimonial.video}
          posterSrc={testimonial.poster}
          title={`${testimonial.company} testimonial`}
          className="w-full h-full"
          imageClassName="object-cover"
          sizes="(max-width: 1024px) 100vw, 420px"
          linkLabel="Watch video"
          linkClassName="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-semibold uppercase tracking-wider transition group-hover:bg-black/40"
        />
      </div>

      {/* Company Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{testimonial.company}</h3>
        <p className="text-[#C8102E] text-sm font-medium mb-2">{testimonial.industry}</p>
        <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full">
          {testimonial.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <MainLayout>
      <main className="min-h-screen bg-black text-white pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C8102E] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
                Testimonials
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Satisfied customers
                <br />
                <span className="text-[#C8102E]">are what makes us happy</span>
              </h1>
              <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
                Our customers are the focus of what we are doing. The quality of our efforts is
                therefore only measured by the satisfaction of our customers.
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl"
              >
                <stat.icon className="w-8 h-8 text-[#C8102E] mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Video Testimonials Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Video <span className="text-[#C8102E]">Testimonials</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {videoTestimonials.map((testimonial) => (
                <VideoCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
