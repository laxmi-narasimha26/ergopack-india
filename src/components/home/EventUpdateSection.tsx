'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Award,
  ArrowRight,
  X,
  ZoomIn,
  Mail,
  ExternalLink,
  Clock,
} from 'lucide-react';

export default function EventUpdateSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    // Event date: May 28, 2026 10:00:00 AM (India Standard Time UTC+5:30)
    // Create UTC date for May 28, 2026, at 04:30 AM UTC (which corresponds to 10:00 AM IST)
    const eventDate = new Date('2026-05-28T10:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-16 lg:px-24 bg-neutral-950 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header/Label */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-500/30 mb-4"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-semibold">
              Live Event Update
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight max-w-4xl"
          >
            Meet Us at <span className="text-red-500">LogiMAT India 2026</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-neutral-400 text-lg md:text-xl max-w-2xl"
          >
            BENZ Packaging is exhibiting ErgoPack's high-speed automated pallet strapping systems in
            Chennai. See a pallet secured in under 40 seconds — with up to 2500N of
            machine-calibrated tension — live.
          </motion.p>
        </div>

        {/* Card Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block - Information & Countdown (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-600/5 to-transparent rounded-bl-3xl pointer-events-none" />

            <div>
              {/* Event Meta Details */}
              <div className="space-y-6 mb-8">
                {/* Partnership Flag */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-red-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 block">
                      Exhibitor
                    </span>
                    <span className="text-white font-medium text-sm">
                      BENZ Packaging (Official Partner)
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 mt-1">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      Event Dates
                    </h4>
                    <p className="text-white text-lg font-medium">May 28 – 30, 2026</p>
                    <p className="text-xs text-neutral-400 mt-0.5">10:00 AM – 06:00 PM</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      Venue
                    </h4>
                    <p className="text-white text-lg font-medium">Chennai Trade Centre</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Nandambakkam, Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Booth Code */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 mt-1">
                    <div className="text-lg font-bold font-mono tracking-tight leading-none">
                      C85A
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      Booth Number
                    </h4>
                    <p className="text-white text-lg font-medium">Booth C85A</p>
                    <p className="text-xs text-red-400 mt-0.5">Premium Stall Location</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown / Live Indicator */}
            <div className="mt-8 border-t border-white/5 pt-8">
              {!timeLeft.isLive ? (
                <div>
                  <h5 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4 font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    Counting Down to Event
                  </h5>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hrs', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center"
                      >
                        <span className="block text-2xl md:text-3xl font-bold font-mono text-white leading-none">
                          {String(item.value).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1.5 block font-medium">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2 animate-pulse">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <h5 className="text-lg font-bold text-white uppercase tracking-wider">
                    LogiMAT is Live!
                  </h5>
                  <p className="text-sm text-red-200">
                    Visit us today at Chennai Trade Centre, Booth C85A.
                  </p>
                </div>
              )}
            </div>

            {/* Quick CTAs */}
            <div className="mt-8">
              <Link href="/contact" className="w-full">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 px-5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 active:scale-[0.98]">
                  Book Meeting
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Block - Interactive Flyer Display (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div
              className="relative group cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/20 hover:border-red-500/30 transition-all duration-500 shadow-2xl"
              onClick={() => setIsOpen(true)}
            >
              {/* Overlay with instructions */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="bg-black/60 p-2.5 rounded-full backdrop-blur-md border border-white/10 text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Official LogiMAT India Flyer</h4>
                  <p className="text-sm text-neutral-300">
                    Click to view full-resolution invitation flyer
                  </p>
                </div>
              </div>

              {/* Flyer Image Container */}
              <div className="relative w-full aspect-[2.7/1] sm:aspect-[2.8/1] md:aspect-[3/1] lg:aspect-[2.65/1] overflow-hidden">
                <Image
                  src="/images/email-footer.png"
                  alt="LogiMAT India 2026 Invitation Flyer - Protection Meets Precision"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  quality={90}
                />
              </div>
            </div>

            {/* Directions & Maps helper */}
            <div className="mt-4 flex items-center justify-between px-3">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Invitation publicly hosted
              </span>
              <a
                href="https://maps.google.com/?q=Chennai+Trade+Centre+Nandambakkam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-medium"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Zoom View Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-55 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-7xl w-full max-h-[85vh] aspect-[3/1] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the flyer
            >
              <Image
                src="/images/email-footer.png"
                alt="LogiMAT India 2026 Flyer - Complete Industrial Packaging & Pallet Strapping Automation"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
