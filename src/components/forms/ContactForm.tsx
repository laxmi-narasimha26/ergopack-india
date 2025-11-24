'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { ContactFormData } from '@/types';
import { CheckCircle2 } from 'lucide-react';

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  jobTitle: z
    .string()
    .min(2, 'Job title must be at least 2 characters')
    .max(100, 'Job title must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  industry: z.string().min(1, 'Please select an industry'),
  phone: z.string().optional(),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
});

type ContactFormFields = z.infer<typeof contactSchema>;

interface ContactFormProps {
  variant?: 'default' | 'compact';
  onSuccess?: () => void;
  className?: string;
}

export default function ContactForm({
  variant = 'default',
  onSuccess,
  className = '',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormFields>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormFields) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/contact', data);

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Request submitted successfully! We'll be in touch soon.", {
          duration: 5000,
          icon: '✓',
        });
        reset();
        onSuccess?.();

        // Reset success state after animation
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error(response.data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Failed to submit request. Please try again.',
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = [
    { value: '', label: 'Select Industry', disabled: true },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'other', label: 'Other' },
  ];

  if (isSuccess && variant === 'default') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="mb-4 text-2xl font-bold text-white">Request Submitted!</h3>
        <p className="max-w-md text-lg text-slate-300">
          Thank you for your interest. Our team will review your request and contact you within
          24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div
        className={variant === 'compact' ? 'space-y-4' : 'grid grid-cols-1 gap-6 md:grid-cols-2'}
      >
        {/* Name */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            required
            error={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          />
        </div>

        {/* Company */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Input
            label="Company"
            type="text"
            placeholder="Acme Corporation"
            required
            error={!!errors.company}
            errorMessage={errors.company?.message}
            {...register('company')}
          />
        </div>

        {/* Job Title */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Input
            label="Job Title"
            type="text"
            placeholder="Chief Operations Officer"
            required
            error={!!errors.jobTitle}
            errorMessage={errors.jobTitle?.message}
            {...register('jobTitle')}
          />
        </div>

        {/* Email */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@acme.com"
            required
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Industry */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Select
            label="Industry"
            required
            options={industries}
            error={!!errors.industry}
            errorMessage={errors.industry?.message}
            {...register('industry')}
          />
        </div>

        {/* Phone */}
        <div className={variant === 'default' ? 'md:col-span-1' : ''}>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
            helperText="Optional"
            {...register('phone')}
          />
        </div>

        {/* Message */}
        <div className={variant === 'default' ? 'md:col-span-2' : ''}>
          <Textarea
            label="Message"
            placeholder="Tell us about your cargo securing challenges and requirements..."
            error={!!errors.message}
            errorMessage={errors.message?.message}
            helperText="Optional - Share specific requirements or questions"
            showCharCount
            maxLength={1000}
            rows={variant === 'compact' ? 3 : 5}
            {...register('message')}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className={variant === 'default' ? 'mt-8' : 'mt-6'}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30"
        >
          {isSubmitting ? 'Submitting...' : 'Request Invitation'}
        </Button>

        {variant === 'default' && (
          <p className="mt-4 text-center text-sm text-slate-400">
            By submitting this form, you agree to our privacy policy. We'll only use your
            information to respond to your inquiry.
          </p>
        )}
      </div>
    </form>
  );
}
