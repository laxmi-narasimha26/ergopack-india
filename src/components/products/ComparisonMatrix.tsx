'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Minus,
  Battery,
  Zap,
  Gauge,
  Clock,
  TrendingUp,
  DollarSign,
  Award,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface ProductData {
  model: string;
  fullName: string;
  line: string;
  description: string;
  applicationType: string;
  system: {
    weight: number;
    weightUnit: string;
  };
  flexibility: {
    palletWidth: { min: number; max: number; unit: string };
    palletHeight: { min: number; max: number; unit: string };
  };
  performance: {
    chainSpeed?: number;
    chainSpeedUnit?: string;
    operationType?: string;
  };
  sealingHead: {
    tensionPower?: { min: number; max: number; unit: string };
    strapWidth?: { min: number; max: number; unit: string };
    strapMaterials: string[];
  };
  battery: {
    type: string;
    strappingCycles?: number;
    loadingTime?: { min: number; max: number; unit: string } | number;
    loadingTimeUnit?: string;
  };
  includedFeatures?: string[];
  optionalAccessories?: string[];
  certifications: string[];
}

interface ComparisonMatrixProps {
  products: ProductData[];
  highlightDifferences?: boolean;
}

export default function ComparisonMatrix({ products, highlightDifferences = true }: ComparisonMatrixProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'performance', 'battery']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Comparison helper - returns 'better', 'worse', or 'equal'
  const compareValues = (value1: number, value2: number, higherIsBetter = true): 'better' | 'worse' | 'equal' => {
    if (value1 === value2) return 'equal';
    if (higherIsBetter) {
      return value1 > value2 ? 'better' : 'worse';
    }
    return value1 < value2 ? 'better' : 'worse';
  };

  // Get comparison icon
  const getComparisonIcon = (comparison: 'better' | 'worse' | 'equal') => {
    switch (comparison) {
      case 'better':
        return <ArrowUp className="h-4 w-4 text-green-400" />;
      case 'worse':
        return <ArrowDown className="h-4 w-4 text-orange-400" />;
      default:
        return <Minus className="h-4 w-4 text-platinum-400" />;
    }
  };

  // Get value color based on comparison
  const getValueColor = (comparison: 'better' | 'worse' | 'equal') => {
    switch (comparison) {
      case 'better':
        return 'text-green-400 font-bold';
      case 'worse':
        return 'text-orange-300';
      default:
        return 'text-white';
    }
  };

  // Check if value exists in all products
  const allHaveValue = (key: string, subkey?: string): boolean => {
    return products.every((p) => {
      if (subkey) {
        return p[key as keyof ProductData]?.[subkey as any] !== undefined;
      }
      return p[key as keyof ProductData] !== undefined;
    });
  };

  // Section component
  const ComparisonSection = ({ title, icon: Icon, sectionKey, children }: any) => {
    const isExpanded = expandedSections.has(sectionKey);

    return (
      <div className="mb-6 premium-card-dark overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full p-6 flex items-center justify-between hover:bg-platinum-800/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-crimson-500/10">
              <Icon className="h-5 w-5 text-crimson-400" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-white">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-platinum-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-platinum-400" />
          )}
        </button>

        {isExpanded && <div className="p-6 pt-0">{children}</div>}
      </div>
    );
  };

  // Row component
  const ComparisonRow = ({ label, values, comparisons, unit = '', icon: Icon }: any) => {
    return (
      <div className="grid gap-4 py-4 border-b border-platinum-800 last:border-b-0" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
        <div className="flex items-center gap-2 text-platinum-300">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="font-medium">{label}</span>
        </div>
        {values.map((value: any, index: number) => (
          <div key={index} className="flex items-center justify-center gap-2">
            {comparisons && comparisons[index] && highlightDifferences && getComparisonIcon(comparisons[index])}
            <span className={comparisons && comparisons[index] && highlightDifferences ? getValueColor(comparisons[index]) : 'text-white'}>
              {value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Yes/No row
  const BooleanRow = ({ label, values, icon: Icon }: any) => {
    return (
      <div className="grid gap-4 py-4 border-b border-platinum-800 last:border-b-0" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
        <div className="flex items-center gap-2 text-platinum-300">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="font-medium">{label}</span>
        </div>
        {values.map((value: boolean, index: number) => (
          <div key={index} className="flex items-center justify-center gap-2">
            {value ? (
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-5 w-5" />
                <span className="font-medium">Yes</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-platinum-500">
                <X className="h-5 w-5" />
                <span>No</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Product Headers */}
      <div className="sticky top-20 z-10 bg-luxury-dark-gray/95 backdrop-blur-lg p-6 rounded-2xl mb-8 shadow-2xl">
        <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div></div>
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card-dark p-6 text-center"
            >
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  product.line.includes('X-pert') ? 'bg-crimson-500/20 text-crimson-400' : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {product.line}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{product.fullName}</h3>
              <p className="text-sm text-platinum-400 mb-4">{product.applicationType}</p>
              <Link href={`/products/${product.model.toLowerCase().replace(' ', '')}`}>
                <button className="btn-sm-premium">View Details</button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <ComparisonSection title="Overview" icon={Info} sectionKey="overview">
        <ComparisonRow
          label="Product Line"
          values={products.map((p) => p.line)}
          comparisons={null}
        />
        <ComparisonRow
          label="Application Type"
          values={products.map((p) => p.applicationType)}
          comparisons={null}
        />
        <ComparisonRow
          label="System Weight"
          values={products.map((p) => p.system.weight)}
          comparisons={products.map((p, i) =>
            i === 0 ? 'equal' : compareValues(p.system.weight, products[0].system.weight, false)
          )}
          unit=" kg"
          icon={Gauge}
        />
      </ComparisonSection>

      {/* Performance Section */}
      <ComparisonSection title="Performance" icon={TrendingUp} sectionKey="performance">
        {allHaveValue('performance', 'chainSpeed') && (
          <ComparisonRow
            label="Chain Speed"
            values={products.map((p) => p.performance.chainSpeed || 'N/A')}
            comparisons={products.map((p, i) =>
              i === 0 || !p.performance.chainSpeed
                ? 'equal'
                : compareValues(p.performance.chainSpeed, products[0].performance.chainSpeed || 0, true)
            )}
            unit=" m/min"
            icon={Zap}
          />
        )}

        {allHaveValue('sealingHead', 'tensionPower') && (
          <ComparisonRow
            label="Max Tension Power"
            values={products.map((p) => p.sealingHead.tensionPower?.max || 'N/A')}
            comparisons={products.map((p, i) =>
              i === 0 || !p.sealingHead.tensionPower
                ? 'equal'
                : compareValues(
                    p.sealingHead.tensionPower.max,
                    products[0].sealingHead.tensionPower?.max || 0,
                    true
                  )
            )}
            unit="N"
            icon={Gauge}
          />
        )}

        <ComparisonRow
          label="Pallet Width Range"
          values={products.map((p) => `${p.flexibility.palletWidth.min}-${p.flexibility.palletWidth.max}`)}
          comparisons={products.map((p, i) =>
            i === 0
              ? 'equal'
              : compareValues(p.flexibility.palletWidth.max, products[0].flexibility.palletWidth.max, true)
          )}
          unit=" cm"
        />

        <ComparisonRow
          label="Pallet Height Range"
          values={products.map((p) => `${p.flexibility.palletHeight.min}-${p.flexibility.palletHeight.max}`)}
          comparisons={products.map((p, i) =>
            i === 0
              ? 'equal'
              : compareValues(p.flexibility.palletHeight.max, products[0].flexibility.palletHeight.max, true)
          )}
          unit=" cm"
        />
      </ComparisonSection>

      {/* Battery & Power Section */}
      <ComparisonSection title="Battery & Power" icon={Battery} sectionKey="battery">
        <ComparisonRow
          label="Battery Type"
          values={products.map((p) => p.battery.type)}
          comparisons={null}
        />

        {allHaveValue('battery', 'strappingCycles') && (
          <ComparisonRow
            label="Strapping Cycles"
            values={products.map((p) => p.battery.strappingCycles || 'N/A')}
            comparisons={products.map((p, i) =>
              i === 0 || !p.battery.strappingCycles
                ? 'equal'
                : compareValues(p.battery.strappingCycles, products[0].battery.strappingCycles || 0, true)
            )}
            unit=" cycles"
            icon={Battery}
          />
        )}

        {allHaveValue('battery', 'loadingTime') && (
          <ComparisonRow
            label="Charging Time"
            values={products.map((p) => {
              if (!p.battery.loadingTime) return 'N/A';
              if (typeof p.battery.loadingTime === 'number') {
                return `${p.battery.loadingTime} ${p.battery.loadingTimeUnit || 'hours'}`;
              }
              return `${p.battery.loadingTime.min}-${p.battery.loadingTime.max} ${p.battery.loadingTime.unit}`;
            })}
            comparisons={products.map((p, i) => {
              if (i === 0 || !p.battery.loadingTime || !products[0].battery.loadingTime) return 'equal';
              const time1 = typeof p.battery.loadingTime === 'number' ? p.battery.loadingTime : p.battery.loadingTime.max;
              const time2 = typeof products[0].battery.loadingTime === 'number' ? products[0].battery.loadingTime : products[0].battery.loadingTime.max;
              return compareValues(time1, time2, false);
            })}
            icon={Clock}
          />
        )}
      </ComparisonSection>

      {/* Features Section */}
      <ComparisonSection title="Included Features" icon={Award} sectionKey="features">
        <BooleanRow
          label="Siemens Touchscreen"
          values={products.map((p) => p.includedFeatures?.some((f) => f.includes('Siemens')) || false)}
          icon={Check}
        />
        <BooleanRow
          label="Line Laser"
          values={products.map((p) => p.includedFeatures?.some((f) => f.includes('Laser')) || false)}
          icon={Check}
        />
        <BooleanRow
          label="Tool-Lift Included"
          values={products.map((p) => p.includedFeatures?.some((f) => f.includes('Tool-Lift')) || false)}
          icon={Check}
        />
      </ComparisonSection>

      {/* Certifications Section */}
      <ComparisonSection title="Certifications" icon={Award} sectionKey="certifications">
        <BooleanRow
          label="ISO 12100:2010"
          values={products.map((p) => p.certifications.includes('ISO 12100:2010'))}
          icon={Award}
        />
        <BooleanRow
          label="EU Declaration of Conformity"
          values={products.map((p) => p.certifications.includes('EU Declaration of Conformity'))}
          icon={Award}
        />
        <BooleanRow
          label="AGR Certified"
          values={products.map((p) => p.certifications.includes('AGR Certified'))}
          icon={Award}
        />
      </ComparisonSection>

      {/* Value Analysis */}
      <div className="premium-card-dark p-8 mt-8">
        <h3 className="text-2xl font-serif font-semibold text-white mb-6 flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-amber-400" />
          Value Analysis - Which One Should You Choose?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const isXpert = product.line.includes('X-pert');
            const keyBenefits = [];

            // Determine key benefits
            if (product.battery.strappingCycles && product.battery.strappingCycles >= 1000) {
              keyBenefits.push('3x more cycles per charge');
            }
            if (product.performance.chainSpeed && product.performance.chainSpeed >= 60) {
              keyBenefits.push('65% faster operation');
            }
            if (product.includedFeatures?.some((f) => f.includes('Siemens'))) {
              keyBenefits.push('Advanced touchscreen control');
            }
            if (!isXpert) {
              keyBenefits.push('Cost-effective solution');
              keyBenefits.push('Proven reliability');
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${
                  isXpert ? 'border-crimson-500/30 bg-crimson-500/5' : 'border-amber-500/30 bg-amber-500/5'
                }`}
              >
                <h4 className="text-lg font-serif font-semibold text-white mb-3">{product.fullName}</h4>
                <p className="text-sm text-platinum-400 mb-4">
                  {isXpert
                    ? 'Best for high-volume operations requiring maximum efficiency'
                    : 'Best for cost-conscious operations with standard volume'}
                </p>
                <ul className="space-y-2">
                  {keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isXpert ? 'text-crimson-400' : 'text-amber-400'}`} />
                      <span className="text-platinum-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 p-8 premium-card-dark">
        <h3 className="text-2xl font-serif font-semibold text-white mb-4">Still Not Sure Which One to Choose?</h3>
        <p className="text-platinum-400 mb-6 max-w-2xl mx-auto">
          Our experts can help you select the perfect strapping system for your specific needs and budget.
        </p>
        <Link href="/contact">
          <button className="btn-premium">
            Get Expert Recommendation
          </button>
        </Link>
      </div>
    </div>
  );
}
