'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import VideoPosterLink from '@/components/media/VideoPosterLink';

const testimonialVideos = [
  {
    id: 1,
    video: '/videos/testimonials/220120_ebm-papst-air_en_entscheider_01.mp4',
    poster: '/videos/posters/220120_ebm-papst-air_en_entscheider_01.jpg',
    company: 'ebm-papst',
    industry: 'Electronics & Air Technology',
  },
  {
    id: 2,
    video: '/videos/testimonials/magura-eng.mp4',
    poster: '/videos/posters/magura-eng.jpg',
    company: 'MAGURA',
    industry: 'Bicycle Components',
  },
  {
    id: 3,
    video: '/videos/testimonials/regiolux_eng.mp4',
    poster: '/videos/posters/regiolux_eng.jpg',
    company: 'Regiolux',
    industry: 'Lighting Systems',
  },
  {
    id: 4,
    video: '/videos/testimonials/zimmer-medizinsysteme_eng_v02.mp4',
    poster: '/videos/posters/zimmer-medizinsysteme_eng_v02.jpg',
    company: 'Zimmer MedizinSysteme',
    industry: 'Medical Technology',
  },
];

function VideoCard({ testimonial }: { testimonial: (typeof testimonialVideos)[0] }) {
  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-[#C8102E]/50 transition-all duration-300 flex-shrink-0 w-[320px] md:w-[380px]">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <VideoPosterLink
          videoSrc={testimonial.video}
          posterSrc={testimonial.poster}
          title={`${testimonial.company} testimonial`}
          className="w-full h-full"
          imageClassName="object-cover"
          sizes="(max-width: 1024px) 100vw, 380px"
          linkLabel="Watch video"
          linkClassName="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-[10px] font-semibold uppercase tracking-wider transition group-hover:bg-black/40"
        />
      </div>

      {/* Company Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{testimonial.company}</h3>
        <p className="text-[#C8102E] text-sm">{testimonial.industry}</p>
      </div>
    </div>
  );
}

export default function TestimonialsFooterSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C8102E] text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-[#C8102E]">Industry Leaders</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            See what our customers have to say about their ErgoPack experience
          </p>
        </motion.div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center hover:bg-[#A00D24] transition-colors shadow-lg -ml-6 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center hover:bg-[#A00D24] transition-colors shadow-lg -mr-6 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialVideos.map((testimonial) => (
              <div key={testimonial.id} className="snap-start">
                <VideoCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8102E] text-white font-medium rounded-lg hover:bg-[#A00D24] transition-colors"
          >
            View All Testimonials
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
