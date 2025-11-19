'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import MagneticCursor from '@/components/ui/MagneticCursor';
import ParticleBackground from '@/components/effects/ParticleBackground';
import ROICalculator from '@/components/features/ROICalculator';
import ProductConfigurator3D from '@/components/features/ProductConfigurator3D';
import Virtual360Showroom from '@/components/features/Virtual360Showroom';
import QuoteBuilder from '@/components/features/QuoteBuilder';
import ThemeSwitcher from '@/components/features/ThemeSwitcher';
import EnhancedChatbot from '@/components/features/EnhancedChatbot';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  BarChart3,
  Box,
  MessageSquare,
  Palette,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Eye,
  Settings,
} from 'lucide-react';

const features = [
  {
    id: 'roi-calculator',
    title: 'AI-Powered ROI Calculator',
    description: 'Real-time cost savings calculation with interactive data visualization',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: '3d-configurator',
    title: '3D Product Configurator',
    description: 'Interactive 3D model with AR preview and real-time customization',
    icon: Box,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: '360-showroom',
    title: 'Virtual 360° Showroom',
    description: 'Immersive product exploration with interactive hotspots',
    icon: Eye,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'quote-builder',
    title: 'Smart Quote Builder',
    description: 'Step-by-step configuration with saved drafts and PDF export',
    icon: Settings,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'ai-chatbot',
    title: 'Predictive AI Chatbot',
    description: 'Context-aware assistance with smart suggestions and instant responses',
    icon: MessageSquare,
    color: 'from-indigo-500 to-violet-600',
  },
];

export default function PremiumFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [enableCursor, setEnableCursor] = useState(true);

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-slate-950 overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground particleCount={80} color="#f59e0b" speed={0.3} />

        {/* Magnetic Cursor */}
        {enableCursor && <MagneticCursor enabled={true} />}

        {/* Theme Switcher */}
        <div className="fixed top-24 right-8 z-40">
          <ThemeSwitcher />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold mb-8">
                <Sparkles className="h-5 w-5" />
                <span>Premium Features Showcase</span>
                <Star className="h-5 w-5" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Experience the Future of
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Industrial Solutions
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Cutting-edge technology meets premium user experience. Explore our innovative
                features designed to revolutionize how you interact with industrial equipment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 text-lg shadow-2xl shadow-amber-500/50"
                  onClick={() => setActiveFeature('roi-calculator')}
                >
                  <Zap className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Explore Features
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800 px-10 py-5 text-lg"
                  onClick={() => setEnableCursor(!enableCursor)}
                >
                  <Cpu className="mr-2 h-5 w-5" />
                  Toggle Cursor {enableCursor ? 'OFF' : 'ON'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Premium Interactive Features
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Each feature is meticulously crafted to provide an unparalleled user experience
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={`bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all duration-300 p-8 h-full cursor-pointer group magnetic-target ${
                        activeFeature === feature.id ? 'ring-2 ring-amber-500 border-amber-500' : ''
                      }`}
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold group-hover:gap-4 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Additional Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <Layers className="h-8 w-8 text-amber-400" />
                    <h3 className="text-2xl font-bold text-white">And More...</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      'Particle effects & WebGL backgrounds',
                      'Smooth page transitions',
                      'Magnetic cursor interactions',
                      'Advanced micro-animations',
                      'Responsive design everywhere',
                      'Dark/Light theme support',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-400">
                    Every interaction is designed to delight and engage users
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Feature Showcase */}
            {activeFeature && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                <Card className="bg-slate-900/80 backdrop-blur-md border-amber-500/50 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                      <h3 className="text-3xl font-bold text-white">
                        {features.find((f) => f.id === activeFeature)?.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-slate-400 hover:text-white"
                      onClick={() => setActiveFeature(null)}
                    >
                      Close
                    </Button>
                  </div>

                  <Suspense fallback={<LoadingSpinner />}>
                    {activeFeature === 'roi-calculator' && <ROICalculator />}
                    {activeFeature === '3d-configurator' && <ProductConfigurator3D />}
                    {activeFeature === '360-showroom' && <Virtual360Showroom />}
                    {activeFeature === 'quote-builder' && <QuoteBuilder />}
                    {activeFeature === 'ai-chatbot' && (
                      <div className="text-center py-20">
                        <MessageSquare className="h-20 w-20 text-amber-500 mx-auto mb-6" />
                        <h4 className="text-2xl font-bold text-white mb-4">
                          AI Chatbot is Always Active!
                        </h4>
                        <p className="text-slate-300 mb-8">
                          Look for the chat button in the bottom-right corner to interact with our
                          AI-powered assistant
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400">
                          <Sparkles className="h-5 w-5 animate-pulse" />
                          <span>Click the chat icon to start</span>
                        </div>
                      </div>
                    )}
                  </Suspense>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Interactive Features', value: '10+', icon: Zap },
                { label: 'Lines of Premium Code', value: '5000+', icon: Cpu },
                { label: 'Smooth Animations', value: '100+', icon: Sparkles },
                { label: 'User Delight Score', value: '99%', icon: TrendingUp },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Card className="bg-slate-900/50 border-slate-800 p-6 hover:border-amber-500/50 transition-all">
                      <Icon className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                      <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Experience Premium?
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  These features are just the beginning. Explore our full platform to discover
                  how we're revolutionizing industrial equipment interaction.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    variant="primary"
                    className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-6 text-lg shadow-2xl shadow-amber-500/50"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800 px-12 py-6 text-lg"
                  >
                    View Documentation
                  </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800">
                  <p className="text-slate-400 text-sm">
                    Built with Next.js, TypeScript, Three.js, Framer Motion, and cutting-edge web technologies
                  </p>
                </div>
              </motion.div>
            </Card>
          </div>
        </section>

        {/* Enhanced Chatbot */}
        <EnhancedChatbot />
      </div>
    </MainLayout>
  );
}
