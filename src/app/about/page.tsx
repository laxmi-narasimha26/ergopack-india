'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <MainLayout>
      <main className="min-h-screen bg-black text-white pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-ergopack text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
                Since 1998
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-medium mb-8">
                The Architects of <br />
                <span className="text-ergopack">Ergonomic Evolution</span>
              </h1>
              <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                From a visionary idea in Lauingen, Germany, to the global standard in pallet
                strapping. We didn't just improve the process; we reinvented it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] bg-white/5 rounded-sm overflow-hidden"
            >
              {/* Placeholder for a team or facility image */}
              <div className="absolute inset-0 flex items-center justify-center text-white/20 uppercase tracking-widest">
                German Headquarters
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif mb-6">Our Philosophy</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At ErgoPack, we believe that back pain should not be part of the job description.
                Our mission is simple yet profound: to enable workers to strap pallets standing
                upright, without bending, and without walking around the pallet.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This commitment to ergonomics is backed by German engineering precision. Every
                system we build is a testament to quality, durability, and the relentless pursuit of
                perfection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/10 py-20 bg-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: 'Founded', value: '1998' },
                { label: 'Countries', value: '55+' },
                { label: 'Systems Sold', value: '10,000+' },
                { label: 'Patents', value: 'Global' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-serif text-ergopack mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
