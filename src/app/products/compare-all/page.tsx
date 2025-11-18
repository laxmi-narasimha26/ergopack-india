'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useFadeIn } from '@/lib/hooks/useScrollAnimation';
import {
  CheckCircle2,
  XCircle,
  Minus,
  ArrowRight,
  Filter,
  Download,
  Share2,
  Zap,
  Battery,
  Gauge,
  Package,
  Settings,
  Cpu,
  TrendingUp,
  Award,
  ChevronDown,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import productsData from '../../../../products-data.json';

// Product type definitions
interface Product {
  model: string;
  fullName: string;
  line: string;
  generation: number;
  description: string;
  applicationType: string;
  system: {
    dimensions: { length: number; width: number; height: number; unit: string };
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
    standardChainLength: number;
    chainLengthUnit: string;
    operationType?: string;
  };
  sealingHead: any;
  battery: any;
  certifications: string[];
  includedFeatures?: string[];
  optionalAccessories?: string[];
}

export default function CompareAllProductsPage() {
  const products = productsData.products as Record<string, Product>;
  const productArray = Object.entries(products).map(([key, product]) => ({
    id: key,
    ...product,
  }));

  // Filter states
  const [filterLine, setFilterLine] = useState<string>('all');
  const [filterApplication, setFilterApplication] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showSpecs, setShowSpecs] = useState<string>('all');

  const titleRef = useFadeIn({ start: 'top 80%' });

  // Get unique lines and application types
  const lines = Array.from(new Set(productArray.map(p => p.line)));
  const applicationTypes = Array.from(new Set(productArray.map(p => p.applicationType)));

  // Filtered products
  const filteredProducts = useMemo(() => {
    return productArray.filter(p => {
      if (filterLine !== 'all' && p.line !== filterLine) return false;
      if (filterApplication !== 'all' && p.applicationType !== filterApplication) return false;
      return true;
    });
  }, [filterLine, filterApplication, productArray]);

  // Get line color
  const getLineColor = (line: string) => {
    if (line.includes('X-pert')) return 'amber';
    if (line.includes('Economy')) return 'blue';
    if (line.includes('RE')) return 'purple';
    if (line.includes('GO')) return 'green';
    return 'slate';
  };

  // Get battery badge
  const getBatteryBadge = (battery: any) => {
    if (battery.type === 'None - Manual Operation') return { text: 'Manual', color: 'gray' };
    if (battery.type === 'Lithium-Ion') return { text: 'Li-Ion', color: 'green' };
    if (battery.type?.includes('lead-fleece')) return { text: 'Lead-Fleece', color: 'blue' };
    return { text: 'Unknown', color: 'gray' };
  };

  return (
    <MainLayout>
      <div className="bg-slate-950 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div ref={titleRef} className="text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
                Complete Product Lineup
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
                Compare All
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  11 ErgoPack Models
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
                Comprehensive side-by-side comparison of every ErgoPack strapping system.
                Find the perfect solution for your specific application needs.
              </p>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-4xl mx-auto">
                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-3xl font-bold text-amber-500 mb-1">11</div>
                  <div className="text-sm text-slate-400">Total Models</div>
                </Card>
                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-3xl font-bold text-blue-500 mb-1">4</div>
                  <div className="text-sm text-slate-400">Product Lines</div>
                </Card>
                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-3xl font-bold text-green-500 mb-1">2</div>
                  <div className="text-sm text-slate-400">Battery Types</div>
                </Card>
                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-3xl font-bold text-purple-500 mb-1">2</div>
                  <div className="text-sm text-slate-400">Generations</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & View Controls */}
        <section className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-300">Filters:</span>
                </div>

                {/* Product Line Filter */}
                <select
                  value={filterLine}
                  onChange={(e) => setFilterLine(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Lines</option>
                  {lines.map(line => (
                    <option key={line} value={line}>{line}</option>
                  ))}
                </select>

                {/* Application Type Filter */}
                <select
                  value={filterApplication}
                  onChange={(e) => setFilterApplication(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Applications</option>
                  {applicationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                {/* Specs View Filter */}
                <select
                  value={showSpecs}
                  onChange={(e) => setShowSpecs(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Specifications</option>
                  <option value="essential">Essential Only</option>
                  <option value="battery">Battery Focus</option>
                  <option value="performance">Performance Focus</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Showing {filteredProducts.length} models</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      viewMode === 'table'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Comparison - Grid View */}
        {viewMode === 'grid' && (
          <section className="bg-slate-950 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => {
                  const lineColor = getLineColor(product.line);
                  const batteryBadge = getBatteryBadge(product.battery);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`border-2 border-${lineColor}-500/30 bg-gradient-to-br from-${lineColor}-500/5 to-slate-900 hover:border-${lineColor}-500/60 transition-all duration-300 h-full flex flex-col`}
                      >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-800">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`inline-flex items-center gap-2 rounded-full border border-${lineColor}-500/50 bg-${lineColor}-500/10 px-3 py-1`}>
                              <Zap className={`h-3 w-3 text-${lineColor}-500`} />
                              <span className={`text-xs font-semibold text-${lineColor}-500`}>
                                {product.line}
                              </span>
                            </div>
                            <div className={`rounded-full px-2 py-1 text-xs font-bold ${
                              batteryBadge.color === 'green' ? 'bg-green-500/20 text-green-500' :
                              batteryBadge.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                              'bg-slate-700 text-slate-400'
                            }`}>
                              {batteryBadge.text}
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-1">{product.model}</h3>
                          <p className="text-sm text-slate-400 mb-3">{product.fullName}</p>
                          <p className="text-xs text-slate-500">{product.description}</p>
                        </div>

                        {/* Application Type */}
                        <div className="px-6 py-3 bg-slate-900/50">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-300">{product.applicationType}</span>
                          </div>
                        </div>

                        {/* Key Specifications */}
                        <div className="p-6 flex-1 space-y-3">
                          {/* Speed */}
                          {product.performance.chainSpeed && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-400">Chain Speed</span>
                              <span className="text-sm font-bold text-white">
                                {product.performance.chainSpeed} {product.performance.chainSpeedUnit}
                              </span>
                            </div>
                          )}

                          {/* Tension */}
                          {product.sealingHead.tensionPower && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-400">Tension Range</span>
                              <span className="text-sm font-bold text-white">
                                {product.sealingHead.tensionPower.min}-{product.sealingHead.tensionPower.max} N
                              </span>
                            </div>
                          )}

                          {/* Strap Width */}
                          {product.sealingHead.strapWidth && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-400">Strap Width</span>
                              <span className="text-sm font-bold text-white">
                                {product.sealingHead.strapWidth.min}-{product.sealingHead.strapWidth.max} mm
                              </span>
                            </div>
                          )}

                          {/* Battery Cycles */}
                          {product.battery.strappingCycles && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-400">Battery Cycles</span>
                              <span className="text-sm font-bold text-green-500">
                                {product.battery.strappingCycles} cycles
                              </span>
                            </div>
                          )}

                          {/* Weight */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">System Weight</span>
                            <span className="text-sm font-bold text-white">
                              {product.system.weight} {product.system.weightUnit}
                            </span>
                          </div>

                          {/* Pallet Capacity */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Max Pallet Width</span>
                            <span className="text-sm font-bold text-white">
                              {product.flexibility.palletWidth.max} cm
                            </span>
                          </div>
                        </div>

                        {/* Features List */}
                        {product.includedFeatures && product.includedFeatures.length > 0 && (
                          <div className="px-6 pb-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                              Included Features
                            </p>
                            <div className="space-y-1">
                              {product.includedFeatures.slice(0, 3).map((feature, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className={`h-3 w-3 flex-shrink-0 mt-0.5 text-${lineColor}-500`} />
                                  <span className="text-xs text-slate-400">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <div className="p-6 pt-0 mt-auto">
                          <Link href={`/products/${product.id.toLowerCase()}`}>
                            <Button
                              size="sm"
                              variant="primary"
                              className={`w-full bg-gradient-to-r from-${lineColor}-500 to-${lineColor}-600 hover:from-${lineColor}-600 hover:to-${lineColor}-700 text-white`}
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Product Comparison - Table View */}
        {viewMode === 'table' && (
          <section className="bg-slate-950 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-800 bg-slate-950/50">
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 sticky left-0 bg-slate-950/95 z-10">
                          Model
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Line
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Application
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Battery
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Speed
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Tension
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Cycles
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Weight
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => {
                        const lineColor = getLineColor(product.line);
                        const batteryBadge = getBatteryBadge(product.battery);

                        return (
                          <motion.tr
                            key={product.id}
                            className="border-b border-slate-800 transition-colors hover:bg-slate-800/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <td className="px-4 py-4 sticky left-0 bg-slate-900/95 z-10">
                              <div>
                                <div className="font-bold text-white">{product.model}</div>
                                <div className="text-xs text-slate-500">{product.fullName}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-flex items-center gap-1 rounded-full border border-${lineColor}-500/50 bg-${lineColor}-500/10 px-2 py-1 text-xs font-semibold text-${lineColor}-500`}>
                                {product.line}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center text-slate-300">
                              {product.applicationType}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ${
                                batteryBadge.color === 'green' ? 'bg-green-500/20 text-green-500' :
                                batteryBadge.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                                'bg-slate-700 text-slate-400'
                              }`}>
                                {batteryBadge.text}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center font-bold text-white">
                              {product.performance.chainSpeed || 'Manual'}
                              {product.performance.chainSpeed && ` ${product.performance.chainSpeedUnit}`}
                            </td>
                            <td className="px-4 py-4 text-center font-bold text-white">
                              {product.sealingHead.tensionPower ?
                                `${product.sealingHead.tensionPower.max} N` :
                                'N/A'}
                            </td>
                            <td className="px-4 py-4 text-center font-bold text-green-500">
                              {product.battery.strappingCycles || 'N/A'}
                            </td>
                            <td className="px-4 py-4 text-center text-slate-300">
                              {product.system.weight} kg
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Link href={`/products/${product.id.toLowerCase()}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                                >
                                  Details
                                </Button>
                              </Link>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Product Lines Summary */}
        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24 border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Product Line Overview
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-slate-400">
                Understand the key differences between ErgoPack product families
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Economy Line */}
              <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-slate-900 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Economy Line</h3>
                    <p className="text-sm text-blue-400">Affordable & Reliable</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Battery className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-300">24V Lead-Fleece Battery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-300">40 m/min Chain Speed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-300">350 Strapping Cycles</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Models: 745E, 726E, 713E, 700, 700E, GO
                </p>
              </Card>

              {/* X-pert Line */}
              <Card className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-900 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">X-pert Line</h3>
                    <p className="text-sm text-amber-400">Premium Performance</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Battery className="h-5 w-5 text-amber-500" />
                    <span className="text-slate-300">Lithium-Ion Battery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-amber-500" />
                    <span className="text-slate-300">66 m/min Chain Speed (65% faster)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                    <span className="text-slate-300">1200 Strapping Cycles (3.4x more)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-amber-500" />
                    <span className="text-slate-300">Siemens Touchscreen + Line Laser</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Models: 745X Li, 726X Li, 713X Li, 700X Li, RE
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-950 py-24 border-t border-slate-800">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Card className="border-slate-800 bg-slate-900/50 p-12 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Need Expert Guidance?
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
                Our strapping specialists can help you select the optimal model based on your
                specific application, volume requirements, and budget constraints.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="primary"
                    className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 text-lg shadow-2xl shadow-amber-500/50"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/elite">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-600 px-10 py-5 text-lg text-slate-300 hover:bg-slate-800"
                  >
                    View Premium Experience
                  </Button>
                </Link>
              </div>

              <div className="mt-12 border-t border-slate-800 pt-8">
                <p className="text-sm text-slate-400">
                  Questions? Reach out at{' '}
                  <a href="mailto:sales@ergopack.in" className="text-amber-500 hover:underline">
                    sales@ergopack.in
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+911234567890" className="text-amber-500 hover:underline">
                    +91 123 456 7890
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
