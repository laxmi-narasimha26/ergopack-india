'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ROIMetrics {
  totalSavings: number;
  monthlyROI: number;
  paybackPeriod: number;
  reductionInFailures: number;
  annualSavings: number;
}

export default function ROICalculator() {
  const [loadsPerMonth, setLoadsPerMonth] = useState(500);
  const [averageLoss loading, setAverageLossPerFailure] = useState(25000);
  const [currentFailureRate, setCurrentFailureRate] = useState(0.05);
  const [metrics, setMetrics] = useState<ROIMetrics | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    // ErgoLance system cost per load
    const systemCostPerLoad = 150;
    const ergoLanceFailureRate = 0.0001; // 99.99% success rate

    // Current scenario
    const currentMonthlyFailures = loadsPerMonth * currentFailureRate;
    const currentMonthlyCost = currentMonthlyFailures * averageLossPerFailure;

    // With ErgoLance
    const ergoLanceMonthlyFailures = loadsPerMonth * ergoLanceFailureRate;
    const ergoLanceMonthlyCost =
      ergoLanceMonthlyFailures * averageLossPerFailure +
      loadsPerMonth * systemCostPerLoad;

    // Savings
    const monthlySavings = currentMonthlyCost - ergoLanceMonthlyCost;
    const annualSavings = monthlySavings * 12;

    // System investment
    const systemInvestment = 50000; // Base system cost
    const paybackMonths = systemInvestment / monthlySavings;

    const calculatedMetrics: ROIMetrics = {
      totalSavings: monthlySavings,
      monthlyROI: (monthlySavings / systemInvestment) * 100,
      paybackPeriod: paybackMonths,
      reductionInFailures: ((currentMonthlyFailures - ergoLanceMonthlyFailures) / currentMonthlyFailures) * 100,
      annualSavings: annualSavings,
    };

    setMetrics(calculatedMetrics);
    setShowResults(true);
  };

  useEffect(() => {
    // Auto-calculate on input change with debounce
    const timer = setTimeout(() => {
      calculateROI();
    }, 500);

    return () => clearTimeout(timer);
  }, [loadsPerMonth, averageLossPerFailure, currentFailureRate]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Calculate Your ROI</h3>
            <p className="text-slate-400">
              See how much you could save with ErgoLance precision securing systems
            </p>
          </div>

          <div className="space-y-6">
            {/* Loads per month */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Monthly Loads
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  value={loadsPerMonth}
                  onChange={(e) => setLoadsPerMonth(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-lg"
                  min="1"
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  value={loadsPerMonth}
                  onChange={(e) => setLoadsPerMonth(Number(e.target.value))}
                  min="100"
                  max="5000"
                  step="100"
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>100</span>
                  <span>5,000</span>
                </div>
              </div>
            </div>

            {/* Average loss per failure */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Average Loss Per Failure ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  value={averageLossPerFailure}
                  onChange={(e) => setAverageLossPerFailure(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-lg"
                  min="1000"
                  step="1000"
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  value={averageLossPerFailure}
                  onChange={(e) => setAverageLossPerFailure(Number(e.target.value))}
                  min="5000"
                  max="100000"
                  step="5000"
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$5K</span>
                  <span>$100K</span>
                </div>
              </div>
            </div>

            {/* Current failure rate */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Current Failure Rate (%)
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  value={(currentFailureRate * 100).toFixed(2)}
                  onChange={(e) => setCurrentFailureRate(Number(e.target.value) / 100)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-lg"
                  min="0.01"
                  max="10"
                  step="0.01"
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  value={currentFailureRate * 100}
                  onChange={(e) => setCurrentFailureRate(Number(e.target.value) / 100)}
                  min="0.1"
                  max="10"
                  step="0.1"
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0.1%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-8">
          <AnimatePresence mode="wait">
            {metrics && showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-sm font-semibold mb-4">
                    <TrendingUp className="h-4 w-4" />
                    Your Projected Savings
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    ${metrics.totalSavings.toLocaleString()}
                    <span className="text-lg text-slate-400">/month</span>
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Annual Savings */}
                  <motion.div
                    className="p-6 bg-slate-800/50 rounded-xl border border-slate-700"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Annual Savings</span>
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                      ${metrics.annualSavings.toLocaleString()}
                    </div>
                  </motion.div>

                  {/* Payback Period */}
                  <motion.div
                    className="p-6 bg-slate-800/50 rounded-xl border border-slate-700"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Payback Period</span>
                      <TrendingUp className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-amber-400">
                      {metrics.paybackPeriod.toFixed(1)} months
                    </div>
                  </motion.div>

                  {/* Failure Reduction */}
                  <motion.div
                    className="p-6 bg-slate-800/50 rounded-xl border border-slate-700"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Failure Reduction</span>
                      <CheckCircle2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                      {metrics.reductionInFailures.toFixed(1)}%
                    </div>
                  </motion.div>

                  {/* Monthly ROI */}
                  <motion.div
                    className="p-6 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl border border-amber-500/50"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-300 text-sm font-semibold">Monthly ROI</span>
                      <TrendingUp className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="text-4xl font-bold text-amber-400">
                      {metrics.monthlyROI.toFixed(1)}%
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 flex items-center justify-center gap-2"
                  >
                    Get Quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
