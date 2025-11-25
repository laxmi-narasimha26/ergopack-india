'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
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

export default function TestimonialsPage() {
  return (
    <MainLayout>
      <main className="min-h-screen bg-black text-white pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-ergopack text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
                Voice of the Customer
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6">
                Trusted by Industry Leaders
              </h1>
              <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
                Discover why the world's most demanding industries choose ErgoPack for their
                strapping solutions.
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-ergopack/30 transition-colors duration-500 group"
              >
                <Quote className="w-10 h-10 text-ergopack/20 mb-6 group-hover:text-ergopack transition-colors duration-500" />
                <p className="text-xl font-serif text-gray-200 mb-8 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex flex-col">
                  <span className="text-white font-medium tracking-wide">{item.author}</span>
                  <span className="text-ergopack text-sm uppercase tracking-wider mt-1">
                    {item.company}
                  </span>
                  <span className="text-white/40 text-xs mt-1">{item.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
