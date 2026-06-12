'use client';

/**
 * LeadForm — a compact, reusable enquiry form that drops onto any page
 * (blog posts, resource pages, product pages). Posts to the existing
 * /api/contact endpoint, which saves to MongoDB and emails
 * marketing@benz-packaging.com with spam protection + rate limiting.
 *
 * Keeps the fields the sales team needs (name, company, email, industry)
 * but in a tight two-column layout so it never dominates the page.
 */

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface LeadFormProps {
  /** Headline above the form */
  heading?: string;
  /** Supporting line under the heading */
  subheading?: string;
  /** Pre-fills the message so the sales team knows which page/topic converted */
  sourceLabel?: string;
  /** Visual theme — 'light' for white sections, 'dark' for dark sections */
  theme?: 'light' | 'dark';
  className?: string;
}

const INDUSTRIES = [
  { value: 'automotive', label: 'Automotive & Heavy Parts' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'other', label: 'FMCG / Logistics / Other' },
];

export default function LeadForm({
  heading = 'Get a machine recommendation',
  subheading = 'Tell us your pallet setup and we’ll match the right ErgoPack — and send pricing. No obligation.',
  sourceLabel,
  theme = 'light',
  className = '',
}: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'automotive',
    message: '',
  });
  // Honeypot — bots fill this, humans never see it
  const [website, setWebsite] = useState('');

  const dark = theme === 'dark';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Minimal client validation to match the API's requirements
    if (values.name.trim().length < 2 || values.company.trim().length < 2) {
      toast.error('Please enter your name and company.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: values.name.trim(),
        company: values.company.trim(),
        // The API requires a job title (min 2 chars); default it when the
        // compact form doesn't ask, so the submission is never rejected.
        jobTitle: 'Not specified',
        email: values.email.trim(),
        industry: values.industry,
        phone: values.phone.trim() || undefined,
        message: [sourceLabel ? `[Source: ${sourceLabel}]` : '', values.message.trim()]
          .filter(Boolean)
          .join(' — ')
          .slice(0, 1000),
        website, // honeypot
      };

      const res = await axios.post('/api/contact', payload);
      if (res.data?.success) {
        setSuccess(true);
        toast.success('Thank you — our team will be in touch shortly.');
      } else {
        toast.error(res.data?.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        'We couldn’t submit your request. Please email marketing@benz-packaging.com.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        className={`rounded-2xl border p-8 text-center ${
          dark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-neutral-50'
        } ${className}`}
      >
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[#C8102E]" strokeWidth={1.5} />
        <p className={`font-serif text-xl font-semibold ${dark ? 'text-white' : 'text-neutral-950'}`}>
          Request received.
        </p>
        <p className={`mt-2 text-sm ${dark ? 'text-white/55' : 'text-neutral-600'}`}>
          Our team will reach out with a recommendation and pricing. For anything urgent, call{' '}
          <a href="tel:+919899144488" className="font-semibold text-[#C8102E]">
            +91 98991 44488
          </a>
          .
        </p>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const inputBase = `w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/15 ${
    dark
      ? 'border-white/15 bg-white/[0.04] text-white placeholder:text-white/35'
      : 'border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400'
  }`;

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${
        dark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-sm'
      } ${className}`}
    >
      <h3 className={`font-serif text-2xl font-bold ${dark ? 'text-white' : 'text-neutral-950'}`}>
        {heading}
      </h3>
      {subheading && (
        <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/55' : 'text-neutral-600'}`}>
          {subheading}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>
        {/* Honeypot — visually hidden, not display:none (bots skip display:none) */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this field empty
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name *"
            autoComplete="name"
            className={inputBase}
            required
          />
          <input
            name="company"
            value={values.company}
            onChange={handleChange}
            placeholder="Company *"
            autoComplete="organization"
            className={inputBase}
            required
          />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Work email *"
            autoComplete="email"
            className={inputBase}
            required
          />
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            autoComplete="tel"
            className={inputBase}
          />
        </div>

        <select name="industry" value={values.industry} onChange={handleChange} className={inputBase}>
          {INDUSTRIES.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Pallet size, strap material, daily volume… (optional)"
          rows={3}
          className={inputBase}
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            'Request a recommendation'
          )}
        </button>

        <p className={`text-center text-xs ${dark ? 'text-white/35' : 'text-neutral-400'}`}>
          We reply within one business day. Your details are never shared.
        </p>
      </form>
    </div>
  );
}
