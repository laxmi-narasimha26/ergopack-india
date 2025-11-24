'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { Award, Shield, Zap, TrendingUp } from 'lucide-react';

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  delay?: number;
}

function CapabilityCard({ icon, title, description, stat, delay = 0 }: CapabilityCardProps) {
  return (
    <ScrollReveal delay={delay} direction="up">
      <motion.div
        className="group relative p-8 rounded-2xl glass border-premium hover:border-gold/30 transition-all duration-500"
        whileHover={{ y: -8, scale: 1.02 }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 
                     group-hover:bg-gold/20 transition-colors"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gold">{icon}</div>
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-secondary leading-relaxed mb-4">{description}</p>

        {/* Stat */}
        {stat && (
          <div className="pt-4 border-t border-premium">
            <span className="text-3xl font-bold text-gold block">{stat.value}</span>
            <span className="text-xs uppercase tracking-wider text-secondary">{stat.label}</span>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 rounded-2xl glow-gold opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none"
        />
      </motion.div>
    </ScrollReveal>
  );
}

interface CapabilityShowcaseSectionProps {
  model: string;
  capabilities: {
    title: string;
    description: string;
    stat?: { value: string; label: string };
  }[];
}

export function CapabilityShowcaseSection({ model, capabilities }: CapabilityShowcaseSectionProps) {
  // Icon mapping based on capability title keywords
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (
      lowerTitle.includes('speed') ||
      lowerTitle.includes('fast') ||
      lowerTitle.includes('efficiency')
    ) {
      return <Zap className="w-8 h-8" />;
    }
    if (
      lowerTitle.includes('ergonomic') ||
      lowerTitle.includes('safety') ||
      lowerTitle.includes('protection')
    ) {
      return <Shield className="w-8 h-8" />;
    }
    if (
      lowerTitle.includes('precision') ||
      lowerTitle.includes('quality') ||
      lowerTitle.includes('excellence')
    ) {
      return <Award className="w-8 h-8" />;
    }
    if (
      lowerTitle.includes('roi') ||
      lowerTitle.includes('value') ||
      lowerTitle.includes('productivity')
    ) {
      return <TrendingUp className="w-8 h-8" />;
    }
    return <Award className="w-8 h-8" />;
  };

  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal delay={0.1} direction="fade">
            <span
              className="inline-block px-4 py-2 rounded-full glass border-premium text-xs uppercase 
                           tracking-[0.2em] text-gold mb-6"
            >
              What Makes It Exceptional
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Model {model}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                Excels At
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Engineered for excellence in every detail. Discover the capabilities that set this
              model apart.
            </p>
          </ScrollReveal>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              icon={getIcon(capability.title)}
              title={capability.title}
              description={capability.description}
              stat={capability.stat}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
