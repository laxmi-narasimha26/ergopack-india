'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

// Validation schema
const inquirySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    mobile: z.string().min(10, 'Please enter a valid mobile number').max(15),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().max(100).optional(),
    requirement: z.string().min(10, 'Please describe your requirement (min 10 characters)').max(2000),
});

type InquiryFormFields = z.infer<typeof inquirySchema>;

interface ProductInquiryFormProps {
    productName: string;
    productModel: string;
    className?: string;
}

export default function ProductInquiryForm({
    productName,
    productModel,
    className = '',
}: ProductInquiryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InquiryFormFields>({
        resolver: zodResolver(inquirySchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: InquiryFormFields) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/product-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    productName,
                    productModel,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                toast.success('Inquiry submitted successfully! We will contact you soon.', {
                    duration: 5000,
                });
                reset();

                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            } else {
                throw new Error(result.error || 'Failed to submit inquiry');
            }
        } catch (error) {
            console.error('Inquiry form error:', error);
            toast.error('Failed to submit inquiry. Please try again.', {
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Inquiry Submitted!</h3>
                <p className="max-w-md text-lg text-slate-300">
                    Thank you for your interest in the <span className="text-amber-400">{productModel}</span>.
                    Our team will contact you within 24-48 hours.
                </p>
            </div>
        );
    }

    return (
        <div className={className}>
            {/* Product Info Banner */}
            <div className="mb-6 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 p-4">
                <p className="text-sm text-amber-400 font-medium mb-1">Inquiring About</p>
                <p className="text-xl font-bold text-white">{productName}</p>
                <p className="text-sm text-slate-400">Model: {productModel}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${errors.name ? 'border-red-500' : 'border-neutral-700'
                            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${errors.mobile ? 'border-red-500' : 'border-neutral-700'
                            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                        {...register('mobile')}
                    />
                    {errors.mobile && (
                        <p className="mt-1 text-sm text-red-400">{errors.mobile.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="your.email@company.com"
                        className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-neutral-700'
                            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                </div>

                {/* Company (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company Name <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your company name"
                        className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${errors.company ? 'border-red-500' : 'border-neutral-700'
                            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                        {...register('company')}
                    />
                    {errors.company && (
                        <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
                    )}
                </div>

                {/* Requirement */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Your Requirement <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Please describe your strapping requirements, volume, any specific challenges you're facing..."
                        className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${errors.requirement ? 'border-red-500' : 'border-neutral-700'
                            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none`}
                        {...register('requirement')}
                    />
                    {errors.requirement && (
                        <p className="mt-1 text-sm text-red-400">{errors.requirement.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Submit Inquiry
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                    By submitting, you agree to be contacted by our sales team regarding this product.
                </p>
            </form>
        </div>
    );
}
