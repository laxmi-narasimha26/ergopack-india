'use client';

import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/forms/ContactForm';
import { useFadeIn, useSlideInLeft, useSlideInRight } from '@/lib/hooks/useScrollAnimation';
import { Lock, CheckCircle2, Mail, Phone, MapPin, Clock, Shield, Award, Zap } from 'lucide-react';
// Note: Metadata export removed for client component compatibility

// Hero Section
function HeroSection() {
  const titleRef = useFadeIn({ start: 'top 80%' });

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ergopack/50 bg-ergopack/10 px-4 py-2">
            <Lock className="h-4 w-4 text-ergopack" />
            <span className="text-sm font-semibold text-ergopack">Exclusive Access</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
            Request Your
            <br />
            <span className="bg-gradient-to-r from-ergopack to-red-600 bg-clip-text text-transparent">
              Exclusive Invitation
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Join industry leaders who have transformed their cargo securing operations. Complete the
            form below to request a confidential briefing and personalized demonstration.
          </p>
        </div>
      </div>
    </section>
  );
}

// Main Content Section
function MainContentSection() {
  const leftRef = useSlideInLeft({ start: 'top 70%' });
  const rightRef = useSlideInRight({ start: 'top 70%' });

  const whatsIncluded = [
    {
      icon: CheckCircle2,
      title: 'Personalized Consultation',
      description: 'One-on-one session with our cargo securing specialists',
    },
    {
      icon: Zap,
      title: 'Live Demonstration',
      description: 'See the X-pert Line and E-conomy Line in action',
    },
    {
      icon: Award,
      title: 'Custom Assessment',
      description: 'Evaluation of your specific requirements and challenges',
    },
    {
      icon: Shield,
      title: 'ROI Analysis',
      description: 'Detailed cost-benefit analysis for your operation',
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sales@ergopack.in',
      link: 'mailto:sales@ergopack.in',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 123 456 7890',
      link: 'tel:+911234567890',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Mumbai, India',
      link: null,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon-Fri: 9AM - 6PM IST',
      link: null,
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left Column - Information */}
          <div ref={leftRef} className="lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              {/* What's Included Card */}
              <Card className="border-slate-800 bg-slate-900/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-white">What's Included</h2>
                <div className="space-y-4">
                  {whatsIncluded.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ergopack/20">
                          <item.icon className="h-5 w-5 text-ergopack" />
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Contact Information Card */}
              <Card className="border-slate-800 bg-slate-900/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        <item.icon className="h-5 w-5 text-ergopack" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400">{item.title}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-white hover:text-ergopack transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Trust Signals */}
              <Card className="border-ergopack/30 bg-gradient-to-br from-ergopack/5 to-slate-900 p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-ergopack" />
                    <p className="text-sm text-slate-300">
                      Your information is secure and confidential
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-ergopack" />
                    <p className="text-sm text-slate-300">Response within 24-48 hours</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-ergopack" />
                    <p className="text-sm text-slate-300">Trusted by industry leaders worldwide</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={rightRef} className="lg:col-span-3">
            <Card className="border-slate-800 bg-slate-900/50 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold text-white">Get Started</h2>
                <p className="text-lg text-slate-300">
                  Fill out the form below and our team will reach out to schedule your personalized
                  consultation and demonstration.
                </p>
              </div>

              <ContactForm variant="default" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

  const reasons = [
    {
      icon: Shield,
      title: 'Industry Expertise',
      description:
        'Over a decade of experience in cargo securing across pharmaceuticals, automotive, and electronics sectors.',
    },
    {
      icon: Zap,
      title: 'Proven Results',
      description: '99.99% reliability rate with 10M+ loads secured and zero compliance failures.',
    },
    {
      icon: Award,
      title: 'Premium Technology',
      description:
        'Patent-pending ChainLance system with Siemens control integration and IoT monitoring.',
    },
    {
      icon: CheckCircle2,
      title: 'Complete Support',
      description:
        '24/7 technical support, expert installation, comprehensive training, and ongoing optimization.',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ergopack">
              Why ErgoPack
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Join Industry Leaders
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Companies worldwide trust ErgoPack to protect their most valuable cargo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-ergopack/50 h-full">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-ergopack to-red-700">
                    <reason.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">{reason.title}</h3>
                  <p className="leading-relaxed text-slate-300">{reason.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

  const faqs = [
    {
      question: 'How long does the consultation process take?',
      answer:
        "The initial consultation typically takes 60-90 minutes. During this time, we'll discuss your requirements, demonstrate our systems, and provide a preliminary assessment.",
    },
    {
      question: 'Is there any cost for the consultation?',
      answer:
        'No, the initial consultation and product demonstration are completely complimentary. We want to ensure our solutions are the right fit for your needs before any commitment.',
    },
    {
      question: 'Can you provide on-site demonstrations?',
      answer:
        'Yes, we offer both virtual and on-site demonstrations. For on-site visits, we can bring our equipment to your facility or arrange a visit to our demonstration center.',
    },
    {
      question: 'What industries do you serve?',
      answer:
        'We specialize in pharmaceuticals, automotive, and electronics industries, but our solutions work across any sector requiring professional cargo securing.',
    },
    {
      question: 'How quickly can we implement a solution?',
      answer:
        'Implementation timelines vary based on your requirements and scale. Typically, from initial consultation to full deployment, the process takes 4-8 weeks.',
    },
    {
      question: 'Do you offer training and support?',
      answer:
        'Absolutely. We provide comprehensive on-site training, detailed documentation, and 24/7 technical support to ensure your team gets maximum value from our systems.',
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ergopack">
              Common Questions
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Have questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-ergopack/30">
                  <h3 className="mb-3 text-lg font-bold text-white">{faq.question}</h3>
                  <p className="leading-relaxed text-slate-300">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="border-slate-800 bg-slate-900/50 p-8">
              <p className="mb-4 text-lg text-slate-300">Still have questions?</p>
              <p className="text-slate-400">
                Contact us directly at{' '}
                <a
                  href="mailto:sales@ergopack.in"
                  className="font-semibold text-ergopack hover:underline"
                >
                  sales@ergopack.in
                </a>{' '}
                or call{' '}
                <a href="tel:+911234567890" className="font-semibold text-ergopack hover:underline">
                  +91 123 456 7890
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ContactPage() {
  return (
    <MainLayout>
      <div className="bg-slate-950">
        <HeroSection />
        <MainContentSection />
        <WhyChooseSection />
        <FAQSection />
      </div>
    </MainLayout>
  );
}
