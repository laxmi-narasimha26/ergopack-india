'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import {
  Calculator,
  TrendingUp,
  Zap,
  Users,
  Timer,
  Table as TableIcon,
  BarChart3,
  IndianRupee,
} from 'lucide-react';

const MACHINES = [
  { id: '726x', name: 'ErgoPack 726X Li', price: 3500000 },
  { id: 'go', name: 'ErgoPack Go', price: 1500000 },
  { id: '700', name: 'ErgoPack 700', price: 1000000 },
];

const AMC_COST = 100000;
const STRAPPING_WASTE_PER_PALLET = 12;
const WORKING_HOURS_PER_DAY = 8;
const WORKING_DAYS_PER_MONTH = 25;
const RUPEE_SYMBOL = '\u20B9';

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
  strappingWaste: `ErgoPack reduces strapping waste by ${RUPEE_SYMBOL}12 per pallet compared to manual strapping`,
};

type ViewMode = 'numbers' | 'visuals' | 'sheet';
type MachineDefinition = (typeof MACHINES)[number];
type MachineInputField = 'price' | 'operatorsPerLine' | 'minsPerPallet';
type SharedInputField =
  | 'numLines'
  | 'manualPeoplePerLine'
  | 'shiftsPerDay'
  | 'monthlyCTC'
  | 'palletsPerShiftLine'
  | 'manualMinsPerPallet';
type SheetFormat = 'number' | 'decimal' | 'currency' | 'compact' | 'text';

type SharedInputs = {
  numLines: number;
  manualPeoplePerLine: number;
  shiftsPerDay: number;
  monthlyCTC: number;
  palletsPerShiftLine: number;
  manualMinsPerPallet: number;
};

type MachineInputs = {
  price: number;
  operatorsPerLine: number;
  minsPerPallet: number;
};

type MachineMetrics = {
  machinePrice: number;
  totalManualManpower: number;
  totalAutoManpower: number;
  manpowerReduction: number;
  manpowerReductionPercent: number;
  dailyPallets: number;
  manualStrappingHoursPerDay: number;
  autoStrappingHoursPerDay: number;
  hoursSavedPerDay: number;
  timeSavedPercent: number;
  manualMonthlyCost: number;
  autoMonthlyCost: number;
  monthlyLabourSavings: number;
  annualLabourSavings: number;
  dailyStrappingWasteSavings: number;
  monthlyStrappingWasteSavings: number;
  annualStrappingWasteSavings: number;
  monthlyTotalSavings: number;
  annualTotalSavings: number;
  netAnnualSavingsAfterAMC: number;
  paybackPeriodMonths: number;
  fiveYearNetBenefit: number;
  tenYearNetBenefit: number;
  yearlyData: {
    year: string;
    yearNum: number;
    manual: number;
    ergopack: number;
    savings: number;
  }[];
};

type ComparisonMachine = {
  machine: MachineDefinition;
  inputs: MachineInputs;
  metrics: MachineMetrics;
};

type SpreadsheetViewProps = {
  comparisonMachines: ComparisonMachine[];
  selectedMachineId: string;
  onSelectMachine: (machineId: string) => void;
  sharedInputs: SharedInputs;
  onSharedInputChange: Record<
    SharedInputField,
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
  onMachineInputChange: (
    machineId: string,
    field: MachineInputField
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type SheetDisplayCellProps = {
  value: number | string;
  format?: SheetFormat;
  note?: string;
  highlight?: boolean;
  selected?: boolean;
  muted?: boolean;
};

type SheetInputCellProps = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  note?: string;
  selected?: boolean;
  onFocus?: () => void;
};

function createInitialMachineInputs(): Record<string, MachineInputs> {
  return MACHINES.reduce<Record<string, MachineInputs>>((accumulator, machine) => {
    accumulator[machine.id] = {
      price: machine.price,
      operatorsPerLine: 1,
      minsPerPallet: 1.5,
    };
    return accumulator;
  }, {});
}

function parseNumericValue(value: string) {
  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0;
  }
  return parsedValue;
}

function formatCurrency(value: number) {
  return `${RUPEE_SYMBOL}${Math.round(value).toLocaleString('en-IN')}`;
}

function formatCompactCurrency(value: number) {
  if (value >= 10000000) return `${RUPEE_SYMBOL}${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${RUPEE_SYMBOL}${(value / 100000).toFixed(2)} L`;
  if (value >= 1000) return `${RUPEE_SYMBOL}${(value / 1000).toFixed(1)}K`;
  return `${RUPEE_SYMBOL}${value.toLocaleString('en-IN')}`;
}

function formatDecimalValue(value: number) {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatNumberValue(value: number) {
  return Math.round(value).toLocaleString('en-IN');
}

function formatSheetValue(value: number | string, format: SheetFormat = 'number') {
  if (typeof value === 'string') {
    return value;
  }

  if (format === 'currency') return formatCurrency(value);
  if (format === 'compact') return formatCompactCurrency(value);
  if (format === 'decimal') return formatDecimalValue(value);
  return formatNumberValue(value);
}

function calculateMachineMetrics(
  sharedInputs: SharedInputs,
  machineInputs: MachineInputs
): MachineMetrics {
  const {
    numLines,
    manualPeoplePerLine,
    shiftsPerDay,
    monthlyCTC,
    palletsPerShiftLine,
    manualMinsPerPallet,
  } = sharedInputs;
  const { price: machinePrice, operatorsPerLine, minsPerPallet } = machineInputs;

  const totalManualManpower = numLines * manualPeoplePerLine * shiftsPerDay;
  const totalAutoManpower = numLines * operatorsPerLine * shiftsPerDay;
  const manpowerReduction = totalManualManpower - totalAutoManpower;
  const manpowerReductionPercent =
    totalManualManpower > 0 ? (manpowerReduction / totalManualManpower) * 100 : 0;

  const dailyPallets = palletsPerShiftLine * shiftsPerDay * numLines;
  const manualStrappingHoursPerDay = (dailyPallets * manualMinsPerPallet) / 60;
  const autoStrappingHoursPerDay = (dailyPallets * minsPerPallet) / 60;
  const hoursSavedPerDay = manualStrappingHoursPerDay - autoStrappingHoursPerDay;
  const timeSavedPercent =
    manualStrappingHoursPerDay > 0 ? (hoursSavedPerDay / manualStrappingHoursPerDay) * 100 : 0;

  const manualMonthlyCost = totalManualManpower * monthlyCTC;
  const autoFractionPerWorker =
    totalAutoManpower > 0
      ? Math.min(1, autoStrappingHoursPerDay / (totalAutoManpower * WORKING_HOURS_PER_DAY))
      : 0;
  const autoMonthlyCost = totalAutoManpower * monthlyCTC * autoFractionPerWorker;

  const monthlyLabourSavings = manualMonthlyCost - autoMonthlyCost;
  const annualLabourSavings = monthlyLabourSavings * 12;

  const dailyStrappingWasteSavings = dailyPallets * STRAPPING_WASTE_PER_PALLET;
  const monthlyStrappingWasteSavings = dailyStrappingWasteSavings * WORKING_DAYS_PER_MONTH;
  const annualStrappingWasteSavings = monthlyStrappingWasteSavings * 12;

  const monthlyTotalSavings = monthlyLabourSavings + monthlyStrappingWasteSavings;
  const annualTotalSavings = annualLabourSavings + annualStrappingWasteSavings;
  const netAnnualSavingsAfterAMC = annualTotalSavings - AMC_COST;
  const paybackPeriodMonths = monthlyTotalSavings > 0 ? machinePrice / monthlyTotalSavings : 0;
  const fiveYearNetBenefit = annualTotalSavings + 4 * netAnnualSavingsAfterAMC - machinePrice;
  const tenYearNetBenefit = annualTotalSavings + 9 * netAnnualSavingsAfterAMC - machinePrice;

  let cumulativeManual = 0;
  let cumulativeErgo = machinePrice;

  const yearlyData = Array.from({ length: 10 }, (_, index) => {
    const yearNum = index + 1;
    cumulativeManual += manualMonthlyCost * 12;
    cumulativeErgo += autoMonthlyCost * 12 + (yearNum > 1 ? AMC_COST : 0);

    return {
      year: `Yr ${yearNum}`,
      yearNum,
      manual: cumulativeManual,
      ergopack: cumulativeErgo,
      savings: cumulativeManual - cumulativeErgo,
    };
  });

  return {
    machinePrice,
    totalManualManpower,
    totalAutoManpower,
    manpowerReduction,
    manpowerReductionPercent,
    dailyPallets,
    manualStrappingHoursPerDay,
    autoStrappingHoursPerDay,
    hoursSavedPerDay,
    timeSavedPercent,
    manualMonthlyCost,
    autoMonthlyCost,
    monthlyLabourSavings,
    annualLabourSavings,
    dailyStrappingWasteSavings,
    monthlyStrappingWasteSavings,
    annualStrappingWasteSavings,
    monthlyTotalSavings,
    annualTotalSavings,
    netAnnualSavingsAfterAMC,
    paybackPeriodMonths,
    fiveYearNetBenefit,
    tenYearNetBenefit,
    yearlyData,
  };
}

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
  }, [displayValue, value]);

  const formatValue = (nextValue: number) => {
    if (format === 'decimal') return nextValue.toFixed(1);
    if (format === 'number') return Math.round(nextValue).toLocaleString('en-IN');
    return formatCurrency(nextValue);
  };

  return <span>{formatValue(displayValue)}</span>;
}

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

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;
  const manual = data.manual;
  const ergo = data.ergopack;
  const savings = manual - ergo;

  return (
    <div className="min-w-[170px] rounded-xl border border-neutral-200 bg-white p-3 shadow-lg">
      <div className="mb-2 text-sm font-bold text-neutral-800">{data.year}</div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Manual:</span>
          <span className="font-semibold text-neutral-700">{formatCompactCurrency(manual)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-emerald-600">ErgoPack:</span>
          <span className="font-semibold text-emerald-600">{formatCompactCurrency(ergo)}</span>
        </div>
        <div className="flex justify-between border-t border-neutral-100 pt-1.5 text-xs">
          <span className="font-medium text-emerald-700">Savings:</span>
          <span className="font-bold text-emerald-600">{formatCompactCurrency(savings)}</span>
        </div>
      </div>
    </div>
  );
}
export default function ROICalculator() {
  const [viewMode, setViewMode] = useState<ViewMode>('numbers');
  const [calcMode, setCalcMode] = useState<'basic' | 'advanced'>('basic');
  const [selectedMachineId, setSelectedMachineId] = useState(MACHINES[0].id);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const [numLines, setNumLines] = useState(1);
  const [manualPeoplePerLine, setManualPeoplePerLine] = useState(4);
  const [shiftsPerDay, setShiftsPerDay] = useState(2);
  const [monthlyCTC, setMonthlyCTC] = useState(30000);
  const [palletsPerShiftLine, setPalletsPerShiftLine] = useState(50);
  const [manualMinsPerPallet, setManualMinsPerPallet] = useState(4.5);
  const [machineInputs, setMachineInputs] = useState<Record<string, MachineInputs>>(
    createInitialMachineInputs
  );

  const sharedInputs = useMemo(
    () => ({
      numLines,
      manualPeoplePerLine,
      shiftsPerDay,
      monthlyCTC,
      palletsPerShiftLine,
      manualMinsPerPallet,
    }),
    [
      manualMinsPerPallet,
      manualPeoplePerLine,
      monthlyCTC,
      numLines,
      palletsPerShiftLine,
      shiftsPerDay,
    ]
  );

  const comparisonMachines = useMemo<ComparisonMachine[]>(
    () =>
      MACHINES.map((machine) => {
        const currentInputs = machineInputs[machine.id] ?? {
          price: machine.price,
          operatorsPerLine: 1,
          minsPerPallet: 1.5,
        };

        return {
          machine,
          inputs: currentInputs,
          metrics: calculateMachineMetrics(sharedInputs, currentInputs),
        };
      }),
    [machineInputs, sharedInputs]
  );

  const selectedMachineData =
    comparisonMachines.find((machine) => machine.machine.id === selectedMachineId) ??
    comparisonMachines[0];
  const selectedMachine = selectedMachineData.machine;
  const selectedMachineInputs = selectedMachineData.inputs;
  const selectedMetrics = selectedMachineData.metrics;

  const {
    machinePrice,
    totalManualManpower,
    totalAutoManpower,
    manpowerReduction,
    manpowerReductionPercent,
    manualStrappingHoursPerDay,
    autoStrappingHoursPerDay,
    hoursSavedPerDay,
    timeSavedPercent,
    manualMonthlyCost,
    autoMonthlyCost,
    monthlyLabourSavings,
    annualLabourSavings,
    dailyStrappingWasteSavings,
    monthlyStrappingWasteSavings,
    annualStrappingWasteSavings,
    monthlyTotalSavings,
    annualTotalSavings,
    netAnnualSavingsAfterAMC,
    paybackPeriodMonths,
    fiveYearNetBenefit,
    tenYearNetBenefit,
    yearlyData,
  } = selectedMetrics;

  const formatNum = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  const hoveredSavings = useMemo(() => {
    if (hoveredYear === null) return null;
    const data = yearlyData.find((year) => year.yearNum === hoveredYear);
    return data ? data.savings : null;
  }, [hoveredYear, yearlyData]);

  const handleSharedInput =
    (setter: (value: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value === '' ? 0 : parseNumericValue(event.target.value));
    };

  const handleMachineInputChange = useCallback(
    (machineId: string, field: MachineInputField) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value === '' ? 0 : parseNumericValue(event.target.value);

        setMachineInputs((currentInputs) => ({
          ...currentInputs,
          [machineId]: {
            ...(currentInputs[machineId] ?? createInitialMachineInputs()[machineId]),
            [field]: nextValue,
          },
        }));
      },
    []
  );

  const handleChartMouseMove = useCallback((event: any) => {
    if (event?.activePayload?.[0]) {
      setHoveredYear(event.activePayload[0].payload.yearNum);
    }
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setHoveredYear(null);
  }, []);

  const funnelStages = useMemo(
    () => [
      {
        name: '10-Year Benefit',
        value: Math.max(0, tenYearNetBenefit),
        pct: `+${formatNum((tenYearNetBenefit / Math.max(machinePrice, 1)) * 100)}% ROI`,
      },
      {
        name: 'Annual Savings',
        value: annualTotalSavings,
        pct: `${formatCompactCurrency(monthlyTotalSavings)}/mo`,
      },
      {
        name: 'Payback',
        value: paybackPeriodMonths * 1000000,
        pct: `${paybackPeriodMonths.toFixed(1)} months`,
        displayValue: `${paybackPeriodMonths.toFixed(1)} mo`,
      },
      {
        name: 'Hours Saved/Day',
        value: hoursSavedPerDay * 1000000,
        pct: `${manualStrappingHoursPerDay.toFixed(1)} -> ${autoStrappingHoursPerDay.toFixed(1)}`,
        pct2: `${formatNum(timeSavedPercent)}% faster`,
        displayValue: `${hoursSavedPerDay.toFixed(1)} hrs`,
      },
      {
        name: 'Auto Manpower',
        value: totalAutoManpower * 500000,
        pct: `${formatNumberValue(totalAutoManpower)} people`,
        pct2: `-${formatNum(manpowerReductionPercent)}%`,
        displayValue: totalAutoManpower,
      },
    ],
    [
      annualTotalSavings,
      autoStrappingHoursPerDay,
      hoursSavedPerDay,
      machinePrice,
      manualStrappingHoursPerDay,
      manpowerReductionPercent,
      monthlyTotalSavings,
      paybackPeriodMonths,
      tenYearNetBenefit,
      timeSavedPercent,
      totalAutoManpower,
    ]
  );

  const sharedInputHandlers: Record<
    SharedInputField,
    (event: React.ChangeEvent<HTMLInputElement>) => void
  > = {
    numLines: handleSharedInput(setNumLines),
    manualPeoplePerLine: handleSharedInput(setManualPeoplePerLine),
    shiftsPerDay: handleSharedInput(setShiftsPerDay),
    monthlyCTC: handleSharedInput(setMonthlyCTC),
    palletsPerShiftLine: handleSharedInput(setPalletsPerShiftLine),
    manualMinsPerPallet: handleSharedInput(setManualMinsPerPallet),
  };
  const isSheetView = viewMode === 'sheet';

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900">
      <div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-8 lg:px-12">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-neutral-900 p-3">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">ROI Calculator</h1>
              <p className="text-sm text-neutral-400">
                Live numbers, charts, and sheet comparison for all three machines
              </p>
              <a
                href="/roi-scenarios"
                className="mt-1 inline-block text-xs font-semibold text-[#C8102E] hover:underline"
              >
                In a hurry? See ready-made payback scenarios →
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
              {MACHINES.map((machine) => (
                <button
                  key={machine.id}
                  onClick={() => setSelectedMachineId(machine.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedMachineId === machine.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {machine.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
              <button
                onClick={() => setViewMode('numbers')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'numbers'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <IndianRupee className="h-3.5 w-3.5" />
                Numbers
              </button>
              <button
                onClick={() => setViewMode('visuals')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'visuals'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Charts
              </button>
              <button
                onClick={() => setViewMode('sheet')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'sheet'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                Sheet
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {!isSheetView && (
            <div className="space-y-4 lg:col-span-3">
              <div className="rounded-2xl bg-neutral-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    <Zap className="h-3.5 w-3.5" />
                    Your Current Setup
                  </h3>
                  <div className="flex items-center rounded-lg bg-neutral-200 p-0.5">
                    <button
                      onClick={() => setCalcMode('basic')}
                      className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        calcMode === 'basic'
                          ? 'bg-white text-neutral-900 shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => setCalcMode('advanced')}
                      className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        calcMode === 'advanced'
                          ? 'bg-neutral-900 text-white shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      Adv
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <InputRow
                    label="Production Lines"
                    value={numLines}
                    onChange={sharedInputHandlers.numLines}
                    tooltip={TOOLTIPS.lines}
                  />
                  <InputRow
                    label="Workers/Line/Shift"
                    value={manualPeoplePerLine}
                    onChange={sharedInputHandlers.manualPeoplePerLine}
                    tooltip={TOOLTIPS.workersPerLine}
                  />
                  <InputRow
                    label="Shifts/Day"
                    value={shiftsPerDay}
                    onChange={sharedInputHandlers.shiftsPerDay}
                    tooltip={TOOLTIPS.shifts}
                  />
                  <InputRow
                    label={`Monthly CTC (${RUPEE_SYMBOL})`}
                    value={monthlyCTC}
                    onChange={sharedInputHandlers.monthlyCTC}
                    tooltip={TOOLTIPS.ctc}
                  />
                  <InputRow
                    label="Pallets/Shift/Line"
                    value={palletsPerShiftLine}
                    onChange={sharedInputHandlers.palletsPerShiftLine}
                    tooltip={TOOLTIPS.palletsPerShift}
                  />
                  <InputRow
                    label="Mins/Pallet (Manual)"
                    value={manualMinsPerPallet}
                    onChange={sharedInputHandlers.manualMinsPerPallet}
                    tooltip={TOOLTIPS.minsManual}
                    step={0.5}
                  />
                </div>

                {calcMode === 'advanced' && (
                  <div className="my-4 border-t border-neutral-200 pt-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        With {selectedMachine.name}
                      </h3>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                        Selected machine
                      </span>
                    </div>
                    <div className="space-y-3">
                      <InputRow
                        label="Machine Price"
                        value={selectedMachineInputs.price}
                        onChange={handleMachineInputChange(selectedMachine.id, 'price')}
                        tooltip="Editable machine price for live payback comparison"
                        step={1000}
                      />
                      <InputRow
                        label="Operators/Line/Shift"
                        value={selectedMachineInputs.operatorsPerLine}
                        onChange={handleMachineInputChange(selectedMachine.id, 'operatorsPerLine')}
                        tooltip={TOOLTIPS.operatorsAuto}
                      />
                      <InputRow
                        label="Mins/Pallet (Target)"
                        value={selectedMachineInputs.minsPerPallet}
                        onChange={handleMachineInputChange(selectedMachine.id, 'minsPerPallet')}
                        tooltip={TOOLTIPS.minsAuto}
                        step={0.1}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={isSheetView ? 'lg:col-span-12' : 'lg:col-span-9'}>
            {viewMode === 'numbers' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                        Active machine
                      </div>
                      <div className="text-sm font-semibold text-white">{selectedMachine.name}</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-neutral-300">
                      Price: {formatCompactCurrency(machinePrice)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <HeaderMetric
                      label="Payback"
                      value={paybackPeriodMonths}
                      format="decimal"
                      suffix=" mo"
                      tooltip={TOOLTIPS.payback}
                    />
                    <HeaderMetric
                      label="Annual Savings"
                      value={annualTotalSavings}
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
                      sub={`Includes ${RUPEE_SYMBOL}1L/yr AMC`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                  <ComparisonCard
                    title="Manpower"
                    icon={<Users className="h-4 w-4 text-neutral-500" />}
                    currentLabel="Current Staff"
                    currentValue={totalManualManpower}
                    ergoLabel="With ErgoPack"
                    ergoValue={totalAutoManpower}
                    highlightLabel="Staff Freed"
                    highlightValue={manpowerReduction}
                    highlightSuffix=" people"
                    format="number"
                  />
                  <ComparisonCard
                    title="Time Efficiency"
                    icon={<Timer className="h-4 w-4 text-neutral-500" />}
                    currentLabel="Current Time"
                    currentValue={manualMinsPerPallet}
                    ergoLabel="ErgoPack Time"
                    ergoValue={selectedMachineInputs.minsPerPallet}
                    highlightLabel="Hours Saved"
                    highlightValue={hoursSavedPerDay}
                    highlightSuffix=" hrs/day"
                    format="decimal"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                  <DetailSection
                    title="Monthly Labor Cost"
                    icon={<TrendingUp className="h-4 w-4" />}
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

                  <DetailSection
                    title="Payback Analysis"
                    icon={<IndianRupee className="h-4 w-4" />}
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

                <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Strapping Waste Savings
                    </h3>
                    <InfoTooltip content={TOOLTIPS.strappingWaste} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white/60 p-3">
                      <div className="mb-1 text-xs font-medium text-emerald-600">Daily</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {formatCompactCurrency(dailyStrappingWasteSavings)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <div className="mb-1 text-xs font-medium text-emerald-600">Monthly</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {formatCompactCurrency(monthlyStrappingWasteSavings)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3">
                      <div className="mb-1 text-xs font-medium text-emerald-600">Annual</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {formatCompactCurrency(annualStrappingWasteSavings)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'visuals' && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">
                        10-Year Cost Projection
                      </h3>
                      <div className="text-xs text-neutral-500">
                        Cumulative expenditure comparison for {selectedMachine.name}
                      </div>
                    </div>
                    <div className="min-w-[200px] rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 px-5 py-3 text-right">
                      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                        {hoveredYear !== null ? `Year ${hoveredYear} Savings` : 'Hover for savings'}
                      </div>
                      <div className="mt-1 text-2xl font-black text-emerald-600 sm:text-3xl">
                        {hoveredSavings !== null
                          ? formatCurrency(Math.max(0, hoveredSavings))
                          : '--'}
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
                          tickFormatter={(value) =>
                            `${RUPEE_SYMBOL}${(value / 100000).toFixed(0)}L`
                          }
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

                <TaperedRibbonFunnel stages={funnelStages} />

                <CostComparisonBar
                  manualCost={manualMonthlyCost}
                  ergoCost={autoMonthlyCost}
                  formatCompact={formatCompactCurrency}
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatCard
                    label="Monthly Savings"
                    value={formatCompactCurrency(monthlyLabourSavings)}
                    highlight
                  />
                  <StatCard label="AMC/Year" value={`${RUPEE_SYMBOL}1.00 L`} sub="From Year 2" />
                  <StatCard
                    label="5-Year Benefit"
                    value={formatCompactCurrency(Math.max(0, fiveYearNetBenefit))}
                    highlight
                  />
                  <StatCard
                    label="10-Year Benefit"
                    value={formatCompactCurrency(Math.max(0, tenYearNetBenefit))}
                    highlight
                  />
                </div>
              </div>
            )}

            {viewMode === 'sheet' && (
              <SpreadsheetView
                comparisonMachines={comparisonMachines}
                selectedMachineId={selectedMachineId}
                onSelectMachine={setSelectedMachineId}
                sharedInputs={sharedInputs}
                onSharedInputChange={sharedInputHandlers}
                onMachineInputChange={handleMachineInputChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function SpreadsheetView({
  comparisonMachines,
  selectedMachineId,
  onSelectMachine,
  sharedInputs,
  onSharedInputChange,
  onMachineInputChange,
}: SpreadsheetViewProps) {
  const currentMetrics = comparisonMachines[0]?.metrics;

  if (!currentMetrics) {
    return null;
  }

  const sharedRows: {
    key: SharedInputField;
    label: string;
    hint: string;
    step?: number;
    value: number;
  }[] = [
    {
      key: 'numLines',
      label: 'Production Lines',
      hint: 'Applies to every machine column',
      value: sharedInputs.numLines,
    },
    {
      key: 'manualPeoplePerLine',
      label: 'Workers / Line / Shift',
      hint: 'Manual staffing baseline',
      value: sharedInputs.manualPeoplePerLine,
    },
    {
      key: 'shiftsPerDay',
      label: 'Shifts / Day',
      hint: 'Shared operating schedule',
      value: sharedInputs.shiftsPerDay,
    },
    {
      key: 'monthlyCTC',
      label: `Monthly CTC (${RUPEE_SYMBOL})`,
      hint: 'Loaded monthly manpower cost',
      value: sharedInputs.monthlyCTC,
    },
    {
      key: 'palletsPerShiftLine',
      label: 'Pallets / Shift / Line',
      hint: 'Daily throughput driver',
      value: sharedInputs.palletsPerShiftLine,
    },
    {
      key: 'manualMinsPerPallet',
      label: 'Manual Mins / Pallet',
      hint: 'Current process time',
      step: 0.5,
      value: sharedInputs.manualMinsPerPallet,
    },
  ];

  const machineRows: {
    key: MachineInputField;
    label: string;
    hint: string;
    step?: number;
    getValue: (entry: ComparisonMachine) => number;
  }[] = [
    {
      key: 'price',
      label: 'Machine Price',
      hint: 'Editable for proposal alignment',
      step: 1000,
      getValue: (entry) => entry.inputs.price,
    },
    {
      key: 'operatorsPerLine',
      label: 'Operators / Line / Shift',
      hint: 'Machine-side manpower assumption',
      getValue: (entry) => entry.inputs.operatorsPerLine,
    },
    {
      key: 'minsPerPallet',
      label: 'Target Mins / Pallet',
      hint: 'Machine-side cycle time',
      step: 0.1,
      getValue: (entry) => entry.inputs.minsPerPallet,
    },
  ];

  const outputRows: {
    label: string;
    hint: string;
    currentValue: number | string;
    currentFormat?: SheetFormat;
    machineValue: (entry: ComparisonMachine) => number | string;
    machineFormat?: SheetFormat;
    highlight?: boolean;
  }[] = [
    {
      label: 'Total Manpower',
      hint: 'People scheduled across lines and shifts',
      currentValue: currentMetrics.totalManualManpower,
      currentFormat: 'number',
      machineValue: (entry) => entry.metrics.totalAutoManpower,
      machineFormat: 'number',
    },
    {
      label: 'Time Per Pallet',
      hint: 'Manual vs machine cycle time',
      currentValue: sharedInputs.manualMinsPerPallet,
      currentFormat: 'decimal',
      machineValue: (entry) => entry.inputs.minsPerPallet,
      machineFormat: 'decimal',
    },
    {
      label: 'Daily Strapping Hours',
      hint: 'Current process vs machine process',
      currentValue: currentMetrics.manualStrappingHoursPerDay,
      currentFormat: 'decimal',
      machineValue: (entry) => entry.metrics.autoStrappingHoursPerDay,
      machineFormat: 'decimal',
    },
    {
      label: 'Staff Freed',
      hint: 'Redeployable manpower',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.manpowerReduction,
      machineFormat: 'number',
      highlight: true,
    },
    {
      label: 'Hours Saved / Day',
      hint: 'Daily time released',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.hoursSavedPerDay,
      machineFormat: 'decimal',
      highlight: true,
    },
    {
      label: 'Monthly Labour Cost',
      hint: 'Manual baseline vs machine-side spend',
      currentValue: currentMetrics.manualMonthlyCost,
      currentFormat: 'compact',
      machineValue: (entry) => entry.metrics.autoMonthlyCost,
      machineFormat: 'compact',
    },
    {
      label: 'Monthly Labour Savings',
      hint: 'Direct manpower savings',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.monthlyLabourSavings,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: 'Monthly Waste Savings',
      hint: 'Strapping waste avoided',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.monthlyStrappingWasteSavings,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: 'Monthly Total Savings',
      hint: 'Labour plus waste savings',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.monthlyTotalSavings,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: 'Payback Period',
      hint: 'Months to recover machine investment',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.paybackPeriodMonths,
      machineFormat: 'decimal',
      highlight: true,
    },
    {
      label: 'Annual Savings',
      hint: 'Gross annual saving before AMC',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.annualTotalSavings,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: 'Net Annual After AMC',
      hint: 'Annual saving after year-2 AMC',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.netAnnualSavingsAfterAMC,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: '5-Year Benefit',
      hint: 'Net value over five years',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.fiveYearNetBenefit,
      machineFormat: 'compact',
      highlight: true,
    },
    {
      label: '10-Year Benefit',
      hint: 'Net value over ten years',
      currentValue: '--',
      currentFormat: 'text',
      machineValue: (entry) => entry.metrics.tenYearNetBenefit,
      machineFormat: 'compact',
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Live Comparison Sheet</h3>
            <p className="text-sm text-neutral-500">
              Edit any shared input or machine column. Numbers and charts update instantly.
            </p>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Click a machine column to make it the active Numbers / Charts view
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-30">
              <tr>
                <th className="sticky left-0 z-30 min-w-[260px] border-b border-r border-neutral-200 bg-neutral-950 px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-white">
                  Metric
                </th>
                <th className="min-w-[210px] border-b border-r border-neutral-200 bg-neutral-950 px-4 py-4 text-left">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                    Current Process
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">Manual baseline</div>
                </th>
                {comparisonMachines.map((entry) => {
                  const selected = entry.machine.id === selectedMachineId;

                  return (
                    <th
                      key={entry.machine.id}
                      className={`min-w-[220px] border-b border-r border-neutral-200 px-4 py-4 text-left ${
                        selected ? 'bg-emerald-950/95' : 'bg-neutral-950'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectMachine(entry.machine.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
                            Machine
                          </div>
                          {selected && (
                            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          {entry.machine.name}
                        </div>
                        <div className="mt-2 text-xs text-neutral-300">
                          Price: {formatCompactCurrency(entry.inputs.price)}
                        </div>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              <SheetSectionRow title="Shared Inputs" />
              {sharedRows.map((row) => (
                <tr key={row.key}>
                  <SheetMetricCell label={row.label} hint={row.hint} />
                  <SheetInputCell
                    value={row.value}
                    onChange={onSharedInputChange[row.key]}
                    step={row.step}
                    note="Editable baseline"
                  />
                  {comparisonMachines.map((entry) => (
                    <SheetDisplayCell
                      key={`${row.key}-${entry.machine.id}`}
                      value={row.value}
                      format={row.key === 'manualMinsPerPallet' ? 'decimal' : 'number'}
                      note="Shared"
                      muted
                      selected={entry.machine.id === selectedMachineId}
                    />
                  ))}
                </tr>
              ))}

              <SheetSectionRow title="Machine Inputs" />
              {machineRows.map((row) => (
                <tr key={row.key}>
                  <SheetMetricCell label={row.label} hint={row.hint} />
                  <SheetDisplayCell value="--" format="text" note="Set per machine" muted />
                  {comparisonMachines.map((entry) => (
                    <SheetInputCell
                      key={`${row.key}-${entry.machine.id}`}
                      value={row.getValue(entry)}
                      onChange={onMachineInputChange(entry.machine.id, row.key)}
                      step={row.step}
                      note="Editable"
                      selected={entry.machine.id === selectedMachineId}
                      onFocus={() => onSelectMachine(entry.machine.id)}
                    />
                  ))}
                </tr>
              ))}

              <SheetSectionRow title="Live Outputs" />
              {outputRows.map((row) => (
                <tr key={row.label}>
                  <SheetMetricCell label={row.label} hint={row.hint} />
                  <SheetDisplayCell
                    value={row.currentValue}
                    format={row.currentFormat}
                    muted={row.currentValue === '--'}
                  />
                  {comparisonMachines.map((entry) => (
                    <SheetDisplayCell
                      key={`${row.label}-${entry.machine.id}`}
                      value={row.machineValue(entry)}
                      format={row.machineFormat}
                      highlight={row.highlight}
                      selected={entry.machine.id === selectedMachineId}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SheetSectionRow({ title }: { title: string }) {
  return (
    <tr>
      <td
        colSpan={MACHINES.length + 2}
        className="border-b border-t border-neutral-200 bg-neutral-100 px-4 py-2 text-left text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-600"
      >
        {title}
      </td>
    </tr>
  );
}

function SheetMetricCell({ label, hint }: { label: string; hint: string }) {
  return (
    <td className="sticky left-0 z-10 min-w-[260px] border-b border-r border-neutral-200 bg-white px-4 py-3 align-top">
      <div className="text-sm font-semibold text-neutral-900">{label}</div>
      <div className="mt-1 text-xs text-neutral-500">{hint}</div>
    </td>
  );
}

function SheetDisplayCell({
  value,
  format = 'number',
  note,
  highlight = false,
  selected = false,
  muted = false,
}: SheetDisplayCellProps) {
  return (
    <td
      className={`border-b border-r border-neutral-200 px-4 py-3 align-top ${
        selected ? 'bg-emerald-50/60' : 'bg-white'
      }`}
    >
      <div
        className={`text-sm font-semibold ${
          muted ? 'text-neutral-400' : highlight ? 'text-emerald-700' : 'text-neutral-900'
        }`}
      >
        {formatSheetValue(value, format)}
      </div>
      {note && <div className="mt-1 text-[11px] text-neutral-400">{note}</div>}
    </td>
  );
}

function SheetInputCell({
  value,
  onChange,
  step = 1,
  note,
  selected = false,
  onFocus,
}: SheetInputCellProps) {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.();
    setTimeout(() => {
      event.target.select();
    }, 0);
  };

  return (
    <td
      className={`border-b border-r border-neutral-200 px-4 py-3 align-top ${
        selected ? 'bg-emerald-50/60' : 'bg-white'
      }`}
    >
      <input
        type="number"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        min={0}
        step={step}
        inputMode="decimal"
        className={`w-full rounded-lg border px-3 py-2 text-right text-sm font-semibold text-neutral-900 outline-none transition-all ${
          selected
            ? 'border-emerald-300 bg-white focus:ring-2 focus:ring-emerald-200'
            : 'border-neutral-200 bg-neutral-50 focus:ring-2 focus:ring-neutral-200'
        }`}
      />
      {note && <div className="mt-1 text-[11px] text-neutral-400">{note}</div>}
    </td>
  );
}
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
  const paths = useMemo(() => {
    const width = 1000;
    const height = 400;
    const cols = stages.length;
    const step = width / cols;
    const x = Array.from({ length: cols + 1 }, (_, index) => index * step);
    const startThickness = 350;
    const endThickness = 60;

    const thicknessBoundaries = x.map((_, index) => {
      const ratio = index / (x.length - 1);
      return startThickness - (startThickness - endThickness) * ratio;
    });

    const ribbonPath = (boundaries: number[], centerY: number, scale: number) => {
      const scaledThickness = boundaries.map((value) => value * scale);
      const top = scaledThickness.map((value) => centerY - value / 2);
      const bottom = scaledThickness.map((value) => centerY + value / 2);
      const midX = (index: number) => (x[index] + x[index + 1]) / 2;

      let path = `M ${x[0]} ${top[0]}`;
      for (let index = 0; index < x.length - 1; index += 1) {
        const mid = midX(index);
        path += ` C ${mid} ${top[index]} ${mid} ${top[index + 1]} ${x[index + 1]} ${top[index + 1]}`;
      }
      path += ` L ${x[x.length - 1]} ${bottom[bottom.length - 1]}`;
      for (let index = x.length - 2; index >= 0; index -= 1) {
        const mid = midX(index);
        path += ` C ${mid} ${bottom[index + 1]} ${mid} ${bottom[index]} ${x[index]} ${bottom[index]}`;
      }
      path += ' Z';
      return path;
    };

    const baseY = height / 2;
    return {
      back: ribbonPath(thicknessBoundaries, baseY - 10, 1),
      mid: ribbonPath(thicknessBoundaries, baseY + 5, 0.75),
      front: ribbonPath(thicknessBoundaries, baseY + 18, 0.5),
    };
  }, [stages]);

  return (
    <div
      className="relative overflow-x-auto rounded-2xl border border-neutral-200 bg-white"
      style={{ minHeight: '280px' }}
    >
      <div className="absolute right-2 top-2 z-20 text-[9px] text-neutral-400 sm:hidden">
        {'<- Scroll ->'}
      </div>

      <div className="relative" style={{ minWidth: '700px' }}>
        <svg
          className="pointer-events-none absolute left-0 right-0"
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

        <div
          className="relative z-10 grid"
          style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className="relative px-3 py-4"
              style={{
                borderRight: index < stages.length - 1 ? '1px solid rgba(15,23,42,0.08)' : 'none',
              }}
            >
              <div className="mb-4 flex items-center justify-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white shadow-sm">
                  {index + 1}
                </div>
                <span className="text-xs font-semibold text-neutral-700">{stage.name}</span>
              </div>

              <div className="flex h-[150px] flex-col items-center justify-center gap-2">
                <div className="rounded-full border border-blue-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-md">
                  {stage.pct}
                </div>
                {stage.pct2 && (
                  <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {stage.pct2}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-neutral-900 sm:text-xl">
                  {stage.displayValue !== undefined
                    ? stage.displayValue
                    : formatCurrency(stage.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CostComparisonBar({
  manualCost,
  ergoCost,
  formatCompact,
}: {
  manualCost: number;
  ergoCost: number;
  formatCompact: (value: number) => string;
}) {
  const maxCost = Math.max(manualCost, ergoCost, 1);
  const manualWidth = manualCost > 0 ? (manualCost / maxCost) * 100 : 0;
  const ergoWidth = ergoCost > 0 ? (ergoCost / maxCost) * 100 : 0;
  const savingsPct = manualCost > 0 ? ((manualCost - ergoCost) / manualCost) * 100 : 0;

  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
          Monthly Cost Comparison
        </h4>
        <div className="rounded-full border border-emerald-300 bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-600">
          {savingsPct.toFixed(0)}% Saved
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-20 text-right text-xs text-neutral-600">Manual</div>
          <div className="h-7 flex-1 overflow-hidden rounded-lg bg-neutral-200">
            <div
              className="h-full rounded-lg bg-gradient-to-r from-neutral-500 to-neutral-400 transition-all duration-500"
              style={{ width: `${manualWidth}%` }}
            />
          </div>
          <div className="w-16 text-sm font-bold text-neutral-700">{formatCompact(manualCost)}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-20 text-right text-xs font-medium text-emerald-700">ErgoPack</div>
          <div className="h-7 flex-1 overflow-hidden rounded-lg bg-neutral-200">
            <div
              className="h-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${ergoWidth}%` }}
            />
          </div>
          <div className="w-16 text-sm font-bold text-emerald-600">{formatCompact(ergoCost)}</div>
        </div>
      </div>
    </div>
  );
}

function HeaderMetric({
  label,
  value,
  format,
  suffix = '',
  tooltip,
  sub,
}: {
  label: string;
  value: number;
  format: 'currency' | 'number' | 'decimal';
  suffix?: string;
  tooltip: string;
  sub?: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-1 flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-neutral-400">
        {label} <InfoTooltip content={tooltip} />
      </div>
      <div className="max-w-full truncate text-lg font-black tracking-tight text-emerald-400 text-nowrap sm:text-2xl lg:text-3xl">
        <AnimatedValue value={value} format={format} />
        {suffix}
      </div>
      {sub && <div className="mt-0.5 text-[9px] text-neutral-500">{sub}</div>}
    </div>
  );
}
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
    <div className="rounded-xl bg-neutral-50 p-5">
      <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
        {icon}
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  suffix = '',
  format = 'number',
  highlight = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  format?: 'number' | 'decimal' | 'compact';
  highlight?: boolean;
}) {
  const formattedValue =
    format === 'compact'
      ? formatCompactCurrency(value)
      : format === 'decimal'
        ? value.toFixed(1)
        : formatNumberValue(value);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-500">{label}</span>
      <span
        className={`text-sm font-semibold ${highlight ? 'text-emerald-600' : 'text-neutral-900'}`}
      >
        {formattedValue}
        {suffix}
      </span>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  tooltip,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip: string;
  step?: number;
}) {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      event.target.select();
    }, 0);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className="truncate text-sm text-neutral-600">{label}</span>
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
        className="w-20 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-right text-sm font-semibold text-neutral-900 transition-all focus:outline-none focus:ring-2 focus:ring-neutral-300 sm:w-24"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
  sub,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  sub?: string;
}) {
  return (
    <div className="rounded-lg bg-neutral-50 p-3 text-center">
      <div className="mb-1 text-[10px] text-neutral-500">{label}</div>
      <div
        className={`truncate text-sm font-bold sm:text-base ${
          highlight ? 'text-emerald-600' : 'text-neutral-900'
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-[9px] text-neutral-400">{sub}</div>}
    </div>
  );
}

function ComparisonCard({
  title,
  icon,
  currentLabel,
  currentValue,
  ergoLabel,
  ergoValue,
  highlightLabel,
  highlightValue,
  highlightSuffix,
  format = 'number',
}: {
  title: string;
  icon: React.ReactNode;
  currentLabel: string;
  currentValue: number;
  ergoLabel: string;
  ergoValue: number;
  highlightLabel: string;
  highlightValue: number | string;
  highlightSuffix?: string;
  format?: 'number' | 'decimal' | 'compact';
}) {
  const formatValue = (value: number) => {
    if (format === 'decimal') return value.toFixed(1);
    if (format === 'compact') return formatCompactCurrency(value);
    return formatNumberValue(value);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
      <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-100/50 px-4 py-3">
        {icon}
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">{title}</h3>
      </div>

      <div className="grid grid-cols-2 divide-x divide-neutral-100">
        <div className="flex flex-col items-center bg-white p-4 text-center">
          <span className="mb-1 text-[10px] uppercase tracking-wide text-neutral-400">
            {currentLabel}
          </span>
          <span className="text-lg font-bold text-neutral-700">{formatValue(currentValue)}</span>
        </div>

        <div className="flex flex-col items-center bg-emerald-50/30 p-4 text-center">
          <span className="mb-1 text-[10px] uppercase tracking-wide text-emerald-600/80">
            {ergoLabel}
          </span>
          <span className="text-lg font-bold text-emerald-600">{formatValue(ergoValue)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-emerald-100/50 px-4 py-3">
        <span className="text-xs font-semibold text-emerald-800">{highlightLabel}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-emerald-700">
            {typeof highlightValue === 'number' ? formatValue(highlightValue) : highlightValue}
            {highlightSuffix}
          </span>
          {format === 'decimal' && (
            <span className="rounded-full bg-emerald-200 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
              SAVED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
