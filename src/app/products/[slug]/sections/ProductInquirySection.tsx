'use client';

import { MessageSquare } from 'lucide-react';
import ProductInquiryForm from '@/components/forms/ProductInquiryForm';

interface ProductInquirySectionProps {
  productName: string;
  productModel: string;
}

export function ProductInquirySection({ productName, productModel }: ProductInquirySectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-950 to-neutral-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interested in the {productModel}?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24-48 hours with
              pricing, demos, and answers to your questions.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 md:p-10">
            <ProductInquiryForm productName={productName} productModel={productModel} />
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Response within 24-48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>On-site demo available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
