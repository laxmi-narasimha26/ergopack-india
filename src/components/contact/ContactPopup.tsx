'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  company: z.string().min(2, 'Company is required').max(100),
  jobTitle: z.string().min(2, 'Required').max(100),
  email: z.string().email('Valid email required'),
  industry: z
    .string()
    .min(1, 'Please select an industry')
    .refine((val) => val !== '', 'Please select an industry'),
  phone: z.string().optional(),
  message: z.string().max(500).optional(),
});

type ContactFormFields = z.infer<typeof contactSchema>;

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      industry: '',
      jobTitle: 'Not specified',
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (data: ContactFormFields) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/contact', data);
      if (response.data.success) {
        setIsSuccess(true);
        toast.success('Thank you! We will contact you soon.');
        reset();
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-white/20">
              {/* Header - Clean Premium Style */}
              <div className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Get in <span className="text-[#C8102E]">Touch</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 font-medium">
                    We'll respond within 24 hours
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-gray-50 p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      Thank you for your interest. Our team will contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                        Full Name <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3.5 rounded-xl border ${
                          errors.name
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-gray-200 bg-gray-50/50'
                        } text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                        Company Name <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ErgoPack India Pvt Ltd"
                        className={`w-full px-4 py-3.5 rounded-xl border ${
                          errors.company
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-gray-200 bg-gray-50/50'
                        } text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200`}
                        {...register('company')}
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                          Email <span className="text-[#C8102E]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3.5 rounded-xl border ${
                            errors.email
                              ? 'border-red-500 bg-red-50/50'
                              : 'border-gray-200 bg-gray-50/50'
                          } text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200`}
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98991 44488"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200"
                          {...register('phone')}
                        />
                      </div>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                        Industry <span className="text-[#C8102E]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className={`w-full px-4 py-3.5 rounded-xl border ${
                            errors.industry
                              ? 'border-red-500 bg-red-50/50'
                              : 'border-gray-200 bg-gray-50/50'
                          } text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200 appearance-none`}
                          {...register('industry')}
                        >
                          <option value="" disabled>
                            Select your industry
                          </option>
                          <option value="pharmaceuticals">Pharmaceuticals</option>
                          <option value="automotive">Automotive</option>
                          <option value="electronics">Electronics</option>
                          <option value="logistics">Logistics & Warehousing</option>
                          <option value="manufacturing">General Manufacturing</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 4.5L6 8L9.5 4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.industry && (
                        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                        Message
                      </label>
                      <textarea
                        placeholder="How can we help you?"
                        rows={3}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#C8102E]/10 focus:border-[#C8102E] outline-none transition-all duration-200 resize-none"
                        {...register('message')}
                      />
                    </div>

                    <input type="hidden" {...register('jobTitle')} />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C8102E] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#A00D24] shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 transform active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      Your informational is safe with us. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
