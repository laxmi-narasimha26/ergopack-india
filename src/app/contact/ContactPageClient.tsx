'use client';

import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { useContactPopup } from '@/components/contact/ContactPopupContext';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPageClient() {
  const { openContactPopup } = useContactPopup();

  return (
    <MainLayout>
      <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6 text-gray-900">Let's Start a Conversation</h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Whether you have a question about our products, need a demo, or want to discuss your
                specific cargo securing challenges, we're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C8102E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600 mb-1">Mon-Fri from 9am to 6pm</p>
                    <a
                      href="tel:+919899144488"
                      className="text-lg font-semibold text-[#C8102E] hover:underline"
                    >
                      +91 9899144488
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C8102E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-1">We'll respond within 24 hours</p>
                    <a
                      href="mailto:sales@ergopack-india.com"
                      className="text-lg font-semibold text-[#C8102E] hover:underline"
                    >
                      sales@ergopack-india.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C8102E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      Gurgaon, Haryana, India
                      <br />
                      Serving clients nationwide
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-10 border border-gray-100 shadow-sm text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to optimize your packaging?
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get a personalized demonstration and see how ErgoPack can improve safety and
                efficiency in your facility.
              </p>

              <button
                onClick={openContactPopup}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-[#C8102E] rounded-lg hover:bg-[#A00D24] shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </button>

              <p className="mt-6 text-sm text-gray-500">
                No commitment required. Free consultation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
