'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import InfoTooltip from '@/components/ui/InfoTooltip';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  Calculator,
  Clock,
  TrendingUp,
  Zap,
  Users,
  Timer,
  Table as TableIcon,
  BarChart3,
  IndianRupee,
  Hourglass,
  UserMinus,
} from 'lucide-react';

// Machine Data
const MACHINES = [
  { id: '726x', name: 'ErgoPack 726X Li', price: 2950000 },
  { id: 'go', name: 'ErgoPack Go', price: 1257000 },
  { id: '700', name: 'ErgoPack 700', price: 755000 },
];

const AMC_COST = 100000;

// Tooltips
const TOOLTIPS = {
  lines: 'Number of production lines requiring strapping',
  workersPerLine: 'Workers assigned per line per shift for manual strapping',
  shifts: 'Number of work shifts per day (1-3)',
  ctc: 'Monthly Cost-to-Company per worker (salary + benefits)',
  palletsPerShift: 'Pallets processed per shift per line',
  minsManual: 'Minutes to strap one pallet manually',
  operatorsAuto: 'Operators needed per line with ErgoPack',
  minsAuto: 'Minutes per pallet with ErgoPack',
  payback: 'Months to recover investment through savings',
  annualSavings: 'Yearly labor cost reduction',
  fiveYear: 'Net profit after 5 years (includes AMC from Year 2)',
  tenYear: 'Net profit over 10-year machine life (includes AMC)',
  staffFreed: 'Workers freed for other tasks',
  hoursSaved: 'Man-hours freed daily',
};

// Smooth animated number
function AnimatedValue({
  value,
  format = 'currency',
}: {
  value: number;
  format?: 'currency' | 'number' | 'decimal';
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number>();
  const startValueRef = useRef(value);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = Date.now();
    const duration = 1200;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startValueRef.current + (value - startValueRef.current) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value]);

  const formatValue = (val: number) => {
    if (format === 'decimal') return val.toFixed(1);
    if (format === 'number') return Math.round(val).toLocaleString('en-IN');
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return <span>{formatValue(displayValue)}</span>;
}

// Chart Tooltip Component - shows Manual, ErgoPack costs and Savings
function ChartTooltip({
  active,
  payload,
  setHoveredYear,
}: {
  active?: boolean;
  payload?: any[];
  setHoveredYear: (year: number | null) => void;
}) {
  useEffect(() => {
    if (active && payload && payload.length > 0) {
      setHoveredYear(payload[0].payload.yearNum);
    }
  }, [active, payload, setHoveredYear]);

  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    const manual = data.manual;
    const ergo = data.ergopack;
    const savings = manual - ergo;

    const formatVal = (v: number) => {
      if (v >= 10000000) return '₹' + (v / 10000000).toFixed(2) + ' Cr';
      if (v >= 100000) return '₹' + (v / 100000).toFixed(2) + 'L';
      if (v >= 1000) return '₹' + (v / 1000).toFixed(1) + 'K';
      return '₹' + v.toLocaleString('en-IN');
    };

    return (
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg p-3 min-w-[160px]">
        <div className="text-sm font-bold text-neutral-800 mb-2">{data.year}</div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Manual:</span>
            <span className="font-semibold text-neutral-700">{formatVal(manual)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-emerald-600">ErgoPack:</span>
            <span className="font-semibold text-emerald-600">{formatVal(ergo)}</span>
          </div>
          <div className="border-t border-neutral-100 pt-1.5 flex justify-between text-xs">
            <span className="text-emerald-700 font-medium">Savings:</span>
            <span className="font-bold text-emerald-600">{formatVal(savings)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function ROICalculator() {
  const [viewMode, setViewMode] = useState<'numbers' | 'visuals'>('numbers');
  const [selectedMachineId, setSelectedMachineId] = useState(MACHINES[0].id);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Inputs
  const [numLines, setNumLines] = useState(1);
  const [manualPeoplePerLine, setManualPeoplePerLine] = useState(4);
  const [shiftsPerDay, setShiftsPerDay] = useState(2);
  const [monthlyCTC, setMonthlyCTC] = useState(30000);
  const [palletsPerShiftLine, setPalletsPerShiftLine] = useState(50);
  const [manualMinsPerPallet, setManualMinsPerPallet] = useState(4.5);
  const [autoPeoplePerLine, setAutoPeoplePerLine] = useState(1);
  const [autoMinsPerPallet, setAutoMinsPerPallet] = useState(1.5);

  // Calculations
  const selectedMachine = MACHINES.find((m) => m.id === selectedMachineId) || MACHINES[1];
  const machinePrice = selectedMachine.price;

  const totalManualManpower = numLines * manualPeoplePerLine * shiftsPerDay;
  const totalAutoManpower = numLines * autoPeoplePerLine * shiftsPerDay;
  const manpowerReduction = totalManualManpower - totalAutoManpower;
  const manpowerReductionPercent =
    totalManualManpower > 0 ? (manpowerReduction / totalManualManpower) * 100 : 0;

  const manualMonthlyCost = totalManualManpower * monthlyCTC;
  const autoMonthlyCost = totalAutoManpower * monthlyCTC;
  const monthlyLabourSavings = manualMonthlyCost - autoMonthlyCost;
  const annualLabourSavings = monthlyLabourSavings * 12;
  const netAnnualSavingsAfterAMC = annualLabourSavings - AMC_COST;

  const manualPalletsPerDay = numLines * shiftsPerDay * palletsPerShiftLine;
  const manualStrappingHoursPerDay = (manualPalletsPerDay * manualMinsPerPallet) / 60;
  const autoStrappingHoursPerDay = (manualPalletsPerDay * autoMinsPerPallet) / 60;
  const hoursSavedPerDay = manualStrappingHoursPerDay - autoStrappingHoursPerDay;
  const timeSavedPercent =
    manualStrappingHoursPerDay > 0 ? (hoursSavedPerDay / manualStrappingHoursPerDay) * 100 : 0;

  const paybackPeriodMonths = monthlyLabourSavings > 0 ? machinePrice / monthlyLabourSavings : 0;
  const fiveYearNetBenefit = annualLabourSavings + 4 * netAnnualSavingsAfterAMC - machinePrice;
  const tenYearNetBenefit = annualLabourSavings + 9 * netAnnualSavingsAfterAMC - machinePrice;

  // Chart Data
  const yearlyData = useMemo(() => {
    const data = [];
    let cumulativeManual = 0;
    let cumulativeErgo = machinePrice;

    for (let year = 1; year <= 10; year++) {
      cumulativeManual += manualMonthlyCost * 12;
      const amc = year > 1 ? AMC_COST : 0;
      cumulativeErgo += autoMonthlyCost * 12 + amc;
      const savings = cumulativeManual - cumulativeErgo;

      data.push({
        year: `Yr ${year}`,
        yearNum: year,
        manual: cumulativeManual,
        ergopack: cumulativeErgo,
        savings: savings,
      });
    }
    return data;
  }, [manualMonthlyCost, machinePrice, autoMonthlyCost]);

  // Get savings for hovered year
  const hoveredSavings = useMemo(() => {
    if (hoveredYear === null) return null;
    const data = yearlyData.find((d) => d.yearNum === hoveredYear);
    return data ? data.savings : null;
  }, [hoveredYear, yearlyData]);

  const formatCurrency = (val: number) => '₹' + Math.round(val).toLocaleString('en-IN');
  const formatCompact = (val: number) => {
    if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr';
    if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + ' L';
    if (val >= 1000) return '₹' + (val / 1000).toFixed(1) + 'K';
    return '₹' + val.toLocaleString('en-IN');
  };
  const formatNum = (val: number) => val.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  const handleInput =
    (setter: (val: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0) setter(val);
      else if (e.target.value === '') setter(0);
    };

  // Stable chart callbacks
  const handleChartMouseMove = useCallback((e: any) => {
    if (e && e.activePayload && e.activePayload[0]) {
      setHoveredYear(e.activePayload[0].payload.yearNum);
    }
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setHoveredYear(null);
  }, []);

  // Funnel data for the ribbon visualization
  const funnelStages = useMemo(
    () => [
      {
        name: '10-Year Benefit',
        value: Math.max(0, tenYearNetBenefit),
        pct: '+' + formatNum((tenYearNetBenefit / machinePrice) * 100) + '% ROI',
      },
      {
        name: 'Annual Savings',
        value: annualLabourSavings,
        pct: formatCompact(monthlyLabourSavings) + '/mo',
      },
      {
        name: 'Payback',
        value: paybackPeriodMonths * 1000000,
        pct: paybackPeriodMonths.toFixed(1) + ' months',
        displayValue: paybackPeriodMonths.toFixed(1) + ' mo',
      },
      {
        name: 'Hours Saved/Day',
        value: hoursSavedPerDay * 1000000,
        pct: manualStrappingHoursPerDay.toFixed(1) + ' → ' + autoStrappingHoursPerDay.toFixed(1),
        pct2: formatNum(timeSavedPercent) + '% faster',
        displayValue: hoursSavedPerDay.toFixed(1) + ' hrs',
      },
      {
        name: 'Auto Manpower',
        value: totalAutoManpower * 500000,
        pct: totalAutoManpower + ' people',
        pct2: '-' + formatNum(manpowerReductionPercent) + '%',
        displayValue: totalAutoManpower,
      },
    ],
    [
      tenYearNetBenefit,
      annualLabourSavings,
      paybackPeriodMonths,
      hoursSavedPerDay,
      totalAutoManpower,
      machinePrice,
      monthlyLabourSavings,
      manpowerReductionPercent,
      timeSavedPercent,
      manualStrappingHoursPerDay,
      autoStrappingHoursPerDay,
    ]
  );

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-900 p-3 rounded-xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">ROI Calculator</h1>
              <p className="text-neutral-400 text-sm">Calculate your savings instantly</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
              {MACHINES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMachineId(m.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${selectedMachineId === m.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('numbers')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'numbers' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                Numbers
              </button>
              <button
                onClick={() => setViewMode('visuals')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'visuals' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Charts
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Inputs ONLY */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-neutral-50 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                Your Current Setup
              </h3>
              <div className="space-y-3">
                <InputRow
                  label="Production Lines"
                  value={numLines}
                  onChange={handleInput(setNumLines)}
                  tooltip={TOOLTIPS.lines}
                />
                <InputRow
                  label="Workers/Line/Shift"
                  value={manualPeoplePerLine}
                  onChange={handleInput(setManualPeoplePerLine)}
                  tooltip={TOOLTIPS.workersPerLine}
                />
                <InputRow
                  label="Shifts/Day"
                  value={shiftsPerDay}
                  onChange={handleInput(setShiftsPerDay)}
                  tooltip={TOOLTIPS.shifts}
                />
                <InputRow
                  label="Monthly CTC (₹)"
                  value={monthlyCTC}
                  onChange={handleInput(setMonthlyCTC)}
                  tooltip={TOOLTIPS.ctc}
                />
                <InputRow
                  label="Pallets/Shift/Line"
                  value={palletsPerShiftLine}
                  onChange={handleInput(setPalletsPerShiftLine)}
                  tooltip={TOOLTIPS.palletsPerShift}
                />
                <InputRow
                  label="Mins/Pallet (Manual)"
                  value={manualMinsPerPallet}
                  onChange={handleInput(setManualMinsPerPallet)}
                  tooltip={TOOLTIPS.minsManual}
                  step={0.5}
                />
              </div>
              <div className="border-t border-neutral-200 my-4 pt-4">
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
                  With ErgoPack
                </h3>
                <div className="space-y-3">
                  <InputRow
                    label="Operators/Line/Shift"
                    value={autoPeoplePerLine}
                    onChange={handleInput(setAutoPeoplePerLine)}
                    tooltip={TOOLTIPS.operatorsAuto}
                  />
                  <InputRow
                    label="Mins/Pallet (Target)"
                    value={autoMinsPerPallet}
                    onChange={handleInput(setAutoMinsPerPallet)}
                    tooltip={TOOLTIPS.minsAuto}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-9">
            {viewMode === 'numbers' ? (
              <div className="space-y-5">
                {/* Dark Header Banner - 4 Key Metrics */}
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl p-6">
                  <div className="grid grid-cols-4 gap-4">
                    <HeaderMetric
                      label="Payback"
                      value={paybackPeriodMonths}
                      format="decimal"
                      suffix=" mo"
                      tooltip={TOOLTIPS.payback}
                    />
                    <HeaderMetric
                      label="Annual Savings"
                      value={annualLabourSavings}
                      format="currency"
                      tooltip={TOOLTIPS.annualSavings}
                    />
                    <HeaderMetric
                      label="5-Year Benefit"
                      value={Math.max(0, fiveYearNetBenefit)}
                      format="currency"
                      tooltip={TOOLTIPS.fiveYear}
                      sub="After AMC from Yr 2"
                    />
                    <HeaderMetric
                      label="10-Year Benefit"
                      value={Math.max(0, tenYearNetBenefit)}
                      format="currency"
                      tooltip={TOOLTIPS.tenYear}
                      sub="Includes ₹1L/yr AMC"
                    />
                  </div>
                </div>

                {/* Two Column Detail Sections */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Manpower Section */}
                  <DetailSection title="Manpower" icon={<Users className="w-4 h-4" />}>
                    <DetailRow label="Current Staff" value={totalManualManpower} suffix=" people" />
                    <DetailRow label="With ErgoPack" value={totalAutoManpower} suffix=" people" />
                    <DetailRow
                      label="Staff Freed"
                      value={manpowerReduction}
                      suffix=" people"
                      highlight
                    />
                    <DetailRow
                      label="Reduction"
                      value={manpowerReductionPercent}
                      suffix="%"
                      format="decimal"
                      highlight
                    />
                  </DetailSection>

                  {/* Time Efficiency Section */}
                  <DetailSection title="Time Efficiency" icon={<Timer className="w-4 h-4" />}>
                    <DetailRow
                      label="Current Time"
                      value={manualMinsPerPallet}
                      suffix=" min/pallet"
                      format="decimal"
                    />
                    <DetailRow
                      label="ErgoPack Time"
                      value={autoMinsPerPallet}
                      suffix=" min/pallet"
                      format="decimal"
                    />
                    <DetailRow
                      label="Hours Saved"
                      value={hoursSavedPerDay}
                      suffix=" hrs/day"
                      format="decimal"
                      highlight
                    />
                    <DetailRow
                      label="Efficiency Gain"
                      value={timeSavedPercent}
                      suffix="%"
                      format="decimal"
                      highlight
                    />
                  </DetailSection>
                </div>

                {/* Second Row - Labor Cost & Investment */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Monthly Labor Cost */}
                  <DetailSection
                    title="Monthly Labor Cost"
                    icon={<TrendingUp className="w-4 h-4" />}
                  >
                    <DetailRow label="Current Cost" value={manualMonthlyCost} format="compact" />
                    <DetailRow label="ErgoPack Cost" value={autoMonthlyCost} format="compact" />
                    <DetailRow
                      label="Monthly Savings"
                      value={monthlyLabourSavings}
                      format="compact"
                      highlight
                    />
                    <DetailRow
                      label="Annual Savings"
                      value={annualLabourSavings}
                      format="compact"
                      highlight
                    />
                  </DetailSection>

                  {/* Payback Analysis */}
                  <DetailSection
                    title="Payback Analysis"
                    icon={<IndianRupee className="w-4 h-4" />}
                  >
                    <DetailRow
                      label="Payback Period"
                      value={paybackPeriodMonths}
                      suffix=" months"
                      format="decimal"
                      highlight
                    />
                    <DetailRow label="AMC (From Yr 2)" value={AMC_COST} format="compact" />
                    <DetailRow
                      label="Net Annual (After AMC)"
                      value={netAnnualSavingsAfterAMC}
                      format="compact"
                      highlight
                    />
                  </DetailSection>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Main Chart */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">
                        10-Year Cost Projection
                      </h3>
                      <div className="text-xs text-neutral-500">
                        Cumulative expenditure comparison
                      </div>
                    </div>
                    <div className="text-right bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl px-5 py-3 min-w-[200px] border border-emerald-200">
                      <div className="text-xs text-emerald-700 uppercase tracking-wider font-semibold">
                        {hoveredYear !== null ? `Year ${hoveredYear} Savings` : 'Hover for savings'}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                        {hoveredSavings !== null
                          ? formatCurrency(Math.max(0, hoveredSavings))
                          : '—'}
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[280px] sm:h-[350px]"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={yearlyData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                        onMouseMove={handleChartMouseMove}
                        onMouseLeave={handleChartMouseLeave}
                      >
                        <defs>
                          <linearGradient id="manualGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6b7280" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#6b7280" stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="ergoGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: '#6b7280', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                          width={60}
                        />
                        <RechartsTooltip
                          content={<ChartTooltip setHoveredYear={setHoveredYear} />}
                        />
                        <Area
                          type="monotone"
                          dataKey="manual"
                          stroke="#6b7280"
                          strokeWidth={2}
                          fill="url(#manualGrad)"
                          name="manual"
                          isAnimationActive={false}
                          activeDot={{ r: 6, stroke: '#6b7280', strokeWidth: 2, fill: '#fff' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="ergopack"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          fill="url(#ergoGrad)"
                          name="ergopack"
                          isAnimationActive={false}
                          activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                        />
                        <Legend
                          iconType="line"
                          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                          formatter={(value) =>
                            value === 'manual' ? 'Manual Process' : 'With ErgoPack'
                          }
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Tapered Ribbon Funnel */}
                <TaperedRibbonFunnel stages={funnelStages} />

                {/* Cost Comparison Bar */}
                <CostComparisonBar
                  manualCost={manualMonthlyCost}
                  ergoCost={autoMonthlyCost}
                  formatCompact={formatCompact}
                />

                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard
                    label="Monthly Savings"
                    value={formatCompact(monthlyLabourSavings)}
                    highlight
                  />
                  <StatCard label="AMC/Year" value="₹1.00 L" sub="From Year 2" />
                  <StatCard
                    label="5-Year Benefit"
                    value={formatCompact(Math.max(0, fiveYearNetBenefit))}
                    highlight
                  />
                  <StatCard
                    label="10-Year Benefit"
                    value={formatCompact(Math.max(0, tenYearNetBenefit))}
                    highlight
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tapered Ribbon Funnel Component - SVG based, mobile-responsive
function TaperedRibbonFunnel({
  stages,
}: {
  stages: {
    name: string;
    value: number;
    pct: string;
    pct2?: string;
    displayValue?: string | number;
  }[];
}) {
  // Calculate ribbon paths - DRAMATIC taper from left (big) to right (small)
  const paths = useMemo(() => {
    const width = 1000;
    const height = 400;
    const cols = stages.length;
    const step = width / cols;
    const x = Array.from({ length: cols + 1 }, (_, i) => i * step);

    // Create a dramatic taper: starts very thick (350), ends thin (60)
    const startThickness = 350;
    const endThickness = 60;

    // Linear interpolation for each boundary
    const tB = x.map((_, i) => {
      const ratio = i / (x.length - 1);
      return startThickness - (startThickness - endThickness) * ratio;
    });

    // Generate ribbon path with bezier curves
    const ribbonPath = (tBoundary: number[], yCenter: number, scale: number) => {
      const n = x.length;
      const scaledT = tBoundary.map((t) => t * scale);
      const top = scaledT.map((th) => yCenter - th / 2);
      const bot = scaledT.map((th) => yCenter + th / 2);
      const midX = (i: number) => (x[i] + x[i + 1]) / 2;

      let d = `M ${x[0]} ${top[0]}`;
      for (let i = 0; i < n - 1; i++) {
        const mx = midX(i);
        d += ` C ${mx} ${top[i]} ${mx} ${top[i + 1]} ${x[i + 1]} ${top[i + 1]}`;
      }
      d += ` L ${x[n - 1]} ${bot[n - 1]}`;
      for (let i = n - 2; i >= 0; i--) {
        const mx = midX(i);
        d += ` C ${mx} ${bot[i + 1]} ${mx} ${bot[i]} ${x[i]} ${bot[i]}`;
      }
      d += ' Z';
      return d;
    };

    const baseY = height / 2;
    return {
      back: ribbonPath(tB, baseY - 10, 1.0),
      mid: ribbonPath(tB, baseY + 5, 0.75),
      front: ribbonPath(tB, baseY + 18, 0.5),
      x,
      step,
      height,
    };
  }, [stages]);

  return (
    <div
      className="relative bg-white border border-neutral-200 rounded-2xl overflow-x-auto"
      style={{ minHeight: '280px' }}
    >
      {/* Mobile hint */}
      <div className="sm:hidden absolute top-2 right-2 text-[9px] text-neutral-400 z-20">
        ← Scroll →
      </div>

      {/* Container with minimum width for mobile scroll */}
      <div className="relative" style={{ minWidth: '700px' }}>
        {/* SVG Ribbon - absolute positioned behind content */}
        <svg
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: '40px', height: '200px', width: '100%' }}
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ribbonG1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="ribbonG2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="ribbonG3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.25} />
              <stop offset="50%" stopColor="#2563eb" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <path d={paths.back} fill="url(#ribbonG1)" />
          <path d={paths.mid} fill="url(#ribbonG2)" />
          <path d={paths.front} fill="url(#ribbonG3)" />
        </svg>

        {/* Column Grid Overlay */}
        <div
          className="relative z-10 grid"
          style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
        >
          {stages.map((stage, i) => (
            <div
              key={i}
              className="py-4 px-3 relative"
              style={{
                borderRight: i < stages.length - 1 ? '1px solid rgba(15,23,42,0.08)' : 'none',
              }}
            >
              {/* Top Label */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {i + 1}
                </div>
                <span className="text-xs font-semibold text-neutral-700">{stage.name}</span>
              </div>

              {/* Middle Space - where ribbon passes through */}
              <div className="h-[150px] flex flex-col items-center justify-center gap-2">
                <div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md border border-blue-200 text-blue-700 text-xs font-bold">
                  {stage.pct}
                </div>
                {stage.pct2 && (
                  <div className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                    {stage.pct2}
                  </div>
                )}
              </div>

              {/* Bottom Value */}
              <div className="flex flex-col items-center justify-center mt-3">
                <span className="text-lg sm:text-xl font-bold text-neutral-900">
                  {stage.displayValue !== undefined
                    ? stage.displayValue
                    : '₹' + Math.round(stage.value).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cost Comparison - Horizontal Bar Chart
function CostComparisonBar({
  manualCost,
  ergoCost,
  formatCompact,
}: {
  manualCost: number;
  ergoCost: number;
  formatCompact: (val: number) => string;
}) {
  const maxCost = Math.max(manualCost, ergoCost);
  const manualWidth = (manualCost / maxCost) * 100;
  const ergoWidth = (ergoCost / maxCost) * 100;
  const savingsPct = ((manualCost - ergoCost) / manualCost) * 100;

  return (
    <div className="bg-neutral-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
          Monthly Cost Comparison
        </h4>
        <div className="px-2 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-xs font-bold text-emerald-600">
          {savingsPct.toFixed(0)}% Saved
        </div>
      </div>
      <div className="space-y-3">
        {/* Manual */}
        <div className="flex items-center gap-3">
          <div className="w-20 text-xs text-neutral-600 text-right">Manual</div>
          <div className="flex-1 h-7 bg-neutral-200 rounded-lg overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neutral-500 to-neutral-400 rounded-lg transition-all duration-500"
              style={{ width: `${manualWidth}%` }}
            />
          </div>
          <div className="w-16 text-sm font-bold text-neutral-700">{formatCompact(manualCost)}</div>
        </div>
        {/* ErgoPack */}
        <div className="flex items-center gap-3">
          <div className="w-20 text-xs text-emerald-700 text-right font-medium">ErgoPack</div>
          <div className="flex-1 h-7 bg-neutral-200 rounded-lg overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg transition-all duration-500"
              style={{ width: `${ergoWidth}%` }}
            />
          </div>
          <div className="w-16 text-sm font-bold text-emerald-600">{formatCompact(ergoCost)}</div>
        </div>
      </div>
    </div>
  );
}

// Header Metric for dark banner
function HeaderMetric({ label, value, format, suffix = '', tooltip, sub }: any) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
        {label} <InfoTooltip content={tooltip} />
      </div>
      <div className="text-2xl lg:text-3xl font-black text-emerald-400 tracking-tight">
        <AnimatedValue value={value} format={format} />
        {suffix}
      </div>
      {sub && <div className="text-[9px] text-neutral-500 mt-0.5">{sub}</div>}
    </div>
  );
}

// Detail Section
function DetailSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 rounded-xl p-5">
      <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

// Detail Row
function DetailRow({ label, value, suffix = '', format = 'number', highlight = false }: any) {
  const formatValue = (val: number) => {
    if (format === 'compact') {
      if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr';
      if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + ' L';
      if (val >= 1000) return '₹' + (val / 1000).toFixed(1) + 'K';
      return '₹' + val.toLocaleString('en-IN');
    }
    if (format === 'decimal') return val.toFixed(1);
    return Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-neutral-500">{label}</span>
      <span
        className={`text-sm font-semibold ${highlight ? 'text-emerald-600' : 'text-neutral-900'}`}
      >
        {formatValue(value)}
        {suffix}
      </span>
    </div>
  );
}

function InputRow({ label, value, onChange, tooltip, step = 1 }: any) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all content on focus for easy editing
    // Note: selectionStart/End don't work on type="number", so we use select()
    setTimeout(() => {
      e.target.select();
    }, 0);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <span className="text-sm text-neutral-600 truncate">{label}</span>
        <InfoTooltip content={tooltip} />
      </div>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        min={0}
        step={step}
        inputMode="decimal"
        className="w-20 sm:w-24 bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 text-sm font-semibold text-right focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all"
      />
    </div>
  );
}

function StatCard({ label, value, highlight, sub }: any) {
  return (
    <div className="bg-neutral-50 rounded-lg p-3 text-center">
      <div className="text-[10px] text-neutral-500 mb-1">{label}</div>
      <div
        className={`text-sm sm:text-base font-bold truncate ${highlight ? 'text-emerald-600' : 'text-neutral-900'}`}
      >
        {value}
      </div>
      {sub && <div className="text-[9px] text-neutral-400">{sub}</div>}
    </div>
  );
}
