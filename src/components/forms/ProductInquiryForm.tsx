'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  CheckCircle2,
  Loader2,
  Send,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';

// Validation schema
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().min(10, 'Please enter a valid mobile number').max(15),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  designation: z.string().max(100).optional(),
  requirement: z.string().min(10, 'Please describe your requirement (min 10 characters)').max(2000),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  preferredContactMethod: z.enum(['phone', 'email', 'whatsapp']).optional(),
  preferredContactTime: z.string().optional(),
});

type InquiryFormFields = z.infer<typeof inquirySchema>;

interface UploadedFile {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

interface ProductInquiryFormProps {
  productName: string;
  productModel: string;
  productCategory?: string;
  className?: string;
}

export default function ProductInquiryForm({
  productName,
  productModel,
  productCategory = '',
  className = '',
}: ProductInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormFields>({
    resolver: zodResolver(inquirySchema),
    mode: 'onBlur',
    defaultValues: {
      urgency: 'medium',
      preferredContactMethod: 'phone',
    },
  });

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Max 5 files
    if (uploadedFiles.length + files.length > 5) {
      toast.error('Maximum 5 files allowed');
      return;
    }

    setIsUploading(true);

    for (const file of Array.from(files)) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum 5MB allowed.`);
        continue;
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type.`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setUploadedFiles((prev) => [...prev, result.file]);
          toast.success(`${file.name} uploaded successfully`);
        } else {
          toast.error(result.error || `Failed to upload ${file.name}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Get file icon
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-blue-400" />;
    }
    return <FileText className="w-5 h-5 text-amber-400" />;
  };

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
          productCategory,
          attachments: uploadedFiles,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success('Inquiry submitted successfully! We will contact you soon.', {
          duration: 5000,
        });
        reset();
        setUploadedFiles([]);

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
        {/* Name & Designation Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
                errors.name ? 'border-red-500' : 'border-neutral-700'
              } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Designation <span className="text-slate-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Procurement Manager"
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              {...register('designation')}
            />
          </div>
        </div>

        {/* Mobile & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
                errors.mobile ? 'border-red-500' : 'border-neutral-700'
              } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
              {...register('mobile')}
            />
            {errors.mobile && <p className="mt-1 text-sm text-red-400">{errors.mobile.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="your.email@company.com"
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
                errors.email ? 'border-red-500' : 'border-neutral-700'
              } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Name <span className="text-slate-500">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            {...register('company')}
          />
        </div>

        {/* Urgency & Preferred Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Urgency Level</label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              {...register('urgency')}
            >
              <option value="low">Low - Just exploring</option>
              <option value="medium">Medium - Planning to buy</option>
              <option value="high">High - Need soon</option>
              <option value="urgent">Urgent - Need immediately</option>
            </select>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Preferred Contact Method
            </label>
            <div className="flex gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-neutral-900 border border-neutral-700 cursor-pointer hover:border-amber-500/50 transition-all has-[:checked]:border-amber-500 has-[:checked]:bg-amber-500/10">
                <input
                  type="radio"
                  value="phone"
                  {...register('preferredContactMethod')}
                  className="sr-only"
                />
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">Phone</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-neutral-900 border border-neutral-700 cursor-pointer hover:border-amber-500/50 transition-all has-[:checked]:border-amber-500 has-[:checked]:bg-amber-500/10">
                <input
                  type="radio"
                  value="email"
                  {...register('preferredContactMethod')}
                  className="sr-only"
                />
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">Email</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-neutral-900 border border-neutral-700 cursor-pointer hover:border-amber-500/50 transition-all has-[:checked]:border-amber-500 has-[:checked]:bg-amber-500/10">
                <input
                  type="radio"
                  value="whatsapp"
                  {...register('preferredContactMethod')}
                  className="sr-only"
                />
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">WhatsApp</span>
              </label>
            </div>
          </div>
        </div>

        {/* Requirement */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Your Requirement <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Please describe your strapping requirements, volume, any specific challenges you're facing..."
            className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
              errors.requirement ? 'border-red-500' : 'border-neutral-700'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none`}
            {...register('requirement')}
          />
          {errors.requirement && (
            <p className="mt-1 text-sm text-red-400">{errors.requirement.message}</p>
          )}
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Attachments <span className="text-slate-500">(Optional - Max 5 files, 5MB each)</span>
          </label>

          {/* Upload Button */}
          <div
            className="border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center hover:border-amber-500/50 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-2" />
                <p className="text-slate-400">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-slate-400">Click or drag files here</p>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG, GIF, WebP, PDF up to 5MB</p>
              </div>
            )}
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-700"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.fileType)}
                    <div>
                      <p className="text-sm text-white truncate max-w-[200px]">{file.fileName}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(file.fileSize)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Honeypot fields (hidden from users, catches bots) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="text" name="fax" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
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
