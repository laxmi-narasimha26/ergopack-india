'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Wrench, Clock, Truck, FileText } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function SupportPage() {
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
                ErgoPack Care
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6">
                Uncompromising Support
              </h1>
              <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
                Our commitment to you doesn't end at delivery. We ensure your operations run
                smoothly with our comprehensive support ecosystem.
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                icon: FileText,
                title: 'Ticket System',
                description:
                  'Report a malfunction or request maintenance easily via our online ticket system. Our technicians will respond promptly.',
                action: 'Open Ticket',
              },
              {
                icon: Truck,
                title: 'Loaner Units',
                description:
                  'Minimize downtime. We offer loaner systems or modules for the duration of any repair or maintenance work.',
                action: 'Request Loaner',
              },
              {
                icon: Wrench,
                title: 'Expert Repair',
                description:
                  'Your system is checked and repaired at our certified service center in Lauingen, ensuring factory-standard quality.',
                action: 'Service Info',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-ergopack/30 transition-colors duration-500 flex flex-col items-start"
              >
                <div className="p-4 rounded-full bg-white/5 mb-6 text-ergopack">
                  <service.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <MagneticButton className="text-sm uppercase tracking-widest text-white border-b border-ergopack pb-1 hover:text-ergopack transition-colors">
                  {service.action}
                </MagneticButton>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 p-12 rounded-sm">
            <h3 className="text-2xl font-serif mb-4">Need Immediate Assistance?</h3>
            <p className="text-white/60 mb-8">
              Our support team is available to help you with any technical queries.
            </p>
            <MagneticButton className="bg-ergopack text-white px-8 py-3 rounded-sm uppercase tracking-widest text-sm font-medium hover:bg-red-700 transition-colors">
              Contact Support
            </MagneticButton>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
