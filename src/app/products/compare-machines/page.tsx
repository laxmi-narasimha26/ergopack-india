'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import { useFadeIn } from '@/lib/hooks/useScrollAnimation';
import {
  CheckCircle2,
  XCircle,
  Minus,
  ArrowRight,
  X,
  Plus,
  Zap,
  Award,
  Cpu,
  Settings,
  Gauge,
  TrendingUp,
  Shield,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { machines, getAllMachines, specificationCategories } from '@/lib/data/machines';
import type { MachineModel } from '@/lib/data/machines';

// Icon mapping
const iconMap: Record<string, any> = {
  Cpu,
  Settings,
  Gauge,
  Zap,
  TrendingUp,
  Shield,
  Target,
};

export default function CompareMachinesPage() {
  const [selectedMachines, setSelectedMachines] = useState<string[]>([
    'xpert-premium',
    'economy-standard',
  ]);
  const [showAddMachine, setShowAddMachine] = useState(false);

  const titleRef = useFadeIn({ start: 'top 80%' });

  const selectedMachineData = selectedMachines
    .map(id => machines.find(m => m.id === id))
    .filter((m): m is MachineModel => m !== undefined);

  const availableMachines = machines.filter(m => !selectedMachines.includes(m.id));

  const addMachine = (machineId: string) => {
    if (selectedMachines.length < 4 && !selectedMachines.includes(machineId)) {
      setSelectedMachines([...selectedMachines, machineId]);
      setShowAddMachine(false);
    }
  };

  const removeMachine = (machineId: string) => {
    if (selectedMachines.length > 2) {
      setSelectedMachines(selectedMachines.filter(id => id !== machineId));
    }
  };

  const getComparisonIndicator = (
    spec: any,
    machineIndex: number,
    allValues: any[]
  ) => {
    const currentValue = allValues[machineIndex];

    if (spec.highlight === 'both' || spec.highlight === 'none') {
      return <Minus className="h-5 w-5 text-slate-500" />;
    }

    // For numeric values
    if (typeof currentValue === 'number') {
      const maxValue = Math.max(...allValues.filter(v => typeof v === 'number'));
      return currentValue === maxValue ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <Minus className="h-5 w-5 text-slate-500" />
      );
    }

    // For text values based on highlight
    const machine = selectedMachineData[machineIndex];
    if (spec.highlight === machine?.line) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }

    return <Minus className="h-5 w-5 text-slate-500" />;
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
                Detailed Comparison
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
                Compare
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  Machine Specifications
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
                Side-by-side comparison of all features, specifications, and capabilities.
                Select up to 4 machines to compare.
              </p>
            </div>
          </div>
        </section>

        {/* Machine Selection Bar */}
        <section className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {selectedMachineData.map((machine, index) => (
                <Card
                  key={machine.id}
                  className={`flex-shrink-0 w-64 p-4 border-2 ${
                    machine.line === 'xpert'
                      ? 'border-amber-500/50 bg-amber-500/5'
                      : 'border-blue-500/50 bg-blue-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {machine.line === 'xpert' ? (
                          <Zap className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Award className="h-4 w-4 text-blue-500" />
                        )}
                        <span
                          className={`text-xs font-semibold ${
                            machine.line === 'xpert' ? 'text-amber-500' : 'text-blue-500'
                          }`}
                        >
                          {machine.line === 'xpert' ? 'X-pert' : 'E-conomy'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {machine.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{machine.tagline}</p>
                    </div>
                    {selectedMachines.length > 2 && (
                      <button
                        onClick={() => removeMachine(machine.id)}
                        className="flex-shrink-0 p-1 hover:bg-slate-800 rounded transition-colors"
                        aria-label="Remove machine"
                      >
                        <X className="h-4 w-4 text-slate-400" />
                      </button>
                    )}
                  </div>
                </Card>
              ))}

              {selectedMachines.length < 4 && (
                <button
                  onClick={() => setShowAddMachine(!showAddMachine)}
                  className="flex-shrink-0 w-64 h-24 border-2 border-dashed border-slate-700 rounded-lg hover:border-amber-500 hover:bg-slate-800/50 transition-colors flex items-center justify-center gap-2 text-slate-400 hover:text-amber-500"
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-sm font-semibold">Add Machine</span>
                </button>
              )}
            </div>

            {/* Add Machine Dropdown */}
            <AnimatePresence>
              {showAddMachine && availableMachines.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <Card className="border-slate-800 bg-slate-900 p-4">
                    <p className="text-sm font-semibold text-white mb-3">
                      Select a machine to add:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableMachines.map(machine => (
                        <button
                          key={machine.id}
                          onClick={() => addMachine(machine.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                            machine.line === 'xpert'
                              ? 'border-amber-500/30 hover:border-amber-500 bg-amber-500/5'
                              : 'border-blue-500/30 hover:border-blue-500 bg-blue-500/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {machine.line === 'xpert' ? (
                              <Zap className="h-4 w-4 text-amber-500" />
                            ) : (
                              <Award className="h-4 w-4 text-blue-500" />
                            )}
                            <span
                              className={`text-xs font-semibold ${
                                machine.line === 'xpert' ? 'text-amber-500' : 'text-blue-500'
                              }`}
                            >
                              {machine.line === 'xpert' ? 'X-pert Line' : 'E-conomy Line'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{machine.name}</h4>
                          <p className="text-xs text-slate-400">{machine.tagline}</p>
                        </button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Quick Overview Cards */}
        <section className="bg-slate-950 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedMachineData.length}, 1fr)` }}>
              {selectedMachineData.map((machine) => (
                <Card
                  key={machine.id}
                  className={`border-2 p-6 ${
                    machine.line === 'xpert'
                      ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-900'
                      : 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-slate-900'
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 mb-4">
                      {machine.line === 'xpert' ? (
                        <Zap className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Award className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-xs font-semibold text-slate-300">
                        {machine.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{machine.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{machine.tagline}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50">
                      <Gauge className="h-5 w-5 text-amber-500" />
                      <span className="text-white font-bold">{machine.tension}</span>
                      <span className="text-slate-400 text-sm">daN</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Key Features
                    </p>
                    {machine.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                            machine.line === 'xpert' ? 'text-amber-500' : 'text-blue-500'
                          }`}
                        />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Comparison Tables */}
        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {specificationCategories.map((category, catIndex) => {
                const Icon = iconMap[category.icon] || Settings;

                return (
                  <motion.div
                    key={catIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 }}
                  >
                    <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
                      {/* Category Header */}
                      <div className="bg-slate-950/50 border-b border-slate-800 p-6">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                        </div>
                      </div>

                      {/* Comparison Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/30">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 min-w-[200px]">
                                Specification
                              </th>
                              {selectedMachineData.map((machine) => (
                                <th
                                  key={machine.id}
                                  className="px-6 py-4 text-center min-w-[180px]"
                                >
                                  <div className="flex flex-col items-center gap-1">
                                    {machine.line === 'xpert' ? (
                                      <Zap className="h-5 w-5 text-amber-500" />
                                    ) : (
                                      <Award className="h-5 w-5 text-blue-500" />
                                    )}
                                    <span
                                      className={`text-sm font-semibold ${
                                        machine.line === 'xpert'
                                          ? 'text-amber-500'
                                          : 'text-blue-500'
                                      }`}
                                    >
                                      {machine.name.split(' ').slice(-1)[0]}
                                    </span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {category.specs.map((specKey, specIndex) => {
                              const firstMachine = selectedMachineData[0];
                              const spec = (firstMachine.specifications as any)[specKey];

                              if (!spec) return null;

                              const allValues = selectedMachineData.map(
                                m => (m.specifications as any)[specKey][m.line === 'xpert' ? 'xpert' : 'economy']
                              );

                              return (
                                <tr
                                  key={specKey}
                                  className="border-b border-slate-800 transition-colors hover:bg-slate-800/30"
                                >
                                  <td className="px-6 py-5">
                                    <span className="font-medium text-white">{spec.label}</span>
                                  </td>
                                  {selectedMachineData.map((machine, machineIndex) => {
                                    const machineSpec = (machine.specifications as any)[specKey];
                                    const value = machineSpec[machine.line === 'xpert' ? 'xpert' : 'economy'];
                                    const displayValue = spec.unit ? `${value} ${spec.unit}` : value;

                                    return (
                                      <td key={machine.id} className="px-6 py-5">
                                        <div className="flex flex-col items-center gap-2">
                                          {getComparisonIndicator(machineSpec, machineIndex, allValues)}
                                          <span className="text-slate-300 text-center text-sm">
                                            {displayValue}
                                          </span>
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-950 py-24 border-t border-slate-800">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Card className="border-slate-800 bg-slate-900/50 p-12 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Need Help Choosing?
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
                Our cargo securing specialists can analyze your specific requirements and
                recommend the optimal machine for your operation.
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
                <Link href="/industries">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-600 px-10 py-5 text-lg text-slate-300 hover:bg-slate-800"
                  >
                    View Industry Solutions
                  </Button>
                </Link>
              </div>

              <div className="mt-12 border-t border-slate-800 pt-8">
                <p className="text-sm text-slate-400">
                  Questions? Contact us at{' '}
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
