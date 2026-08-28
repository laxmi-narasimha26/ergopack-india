'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import InfoTooltip from '@/components/ui/InfoTooltip';
import {
  ROI_SCENARIOS,
  SCENARIO_ASSUMPTIONS,
  type RoiScenario,
  type ScenarioTier,
} from '@/data/roi-scenarios';
import { ArrowRight, Clock, IndianRupee, Zap, RotateCcw, Pencil } from 'lucide-react';

const RUPEE = '₹';
const MACHINE_ORDER: RoiScenario['machineId'][] = ['700', 'go', '726x'];

/** Everything the visitor is allowed to change. */
type Editable = {
  price: number;
  palletsPerDay: number;
  shifts: number;
  monthlyCTC: number;
  manualMinsPerPallet: number;
  ergoMinsPerPallet: number;
  workingDaysPerMonth: number;
  shiftHours: number;
  wastePerPallet: number;
  amcPerYear: number;
  /** Manual crew per shift — derived by default, but overridable. */
  manualPeoplePerShift: number | null;
  ergoPeoplePerShift: number;
};

const TIPS = {
  price:
    'Ex-works machine price. Edit it to match the quote you have been given, including any discount.',
  palletsPerDay:
    'Total pallets your site straps across all shifts in a day. This is the single biggest driver of payback.',
  shifts: 'How many shifts you run per day. Pallets are divided evenly across them.',
  monthlyCTC:
    'Full monthly cost of one worker to the company — wages plus benefits, PF, ESI and overheads.',
  manualMins:
    'Real-world minutes to strap one pallet by hand, including positioning, walking around the pallet, threading and tensioning.',
  ergoMins:
    'Minutes per pallet with ErgoPack. The chain lance feeds under the pallet automatically, so the operator never bends or walks around.',
  workingDays:
    'Working days per month used to convert monthly salary into a daily and hourly rate.',
  shiftHours: 'Paid hours in one shift. Used to work out the hourly cost of a worker.',
  waste:
    'Strapping material saved per pallet. Manual tensioning is inconsistent and wastes strap; ErgoPack applies calibrated, repeatable tension.',
  amc: 'Annual maintenance contract, charged from year 2 onward. Year 1 is covered by warranty.',
  manualCrew:
    'People per shift on manual strapping today. Defaults to 2 people per 50 pallets per shift — real-world staffing that already allows for handling, waiting and rest. Override it with your actual headcount.',
  ergoCrew: 'Operators per shift with ErgoPack. One trained operator runs the machine.',
  manualCost:
    'Your crew is paid their full salary whether or not they are strapping all day, so this counts full CTC for everyone on the manual crew.',
  ergoCost:
    'The ErgoPack operator is only charged for the hours they actually run the machine. The rest of their shift is free for other work.',
  wasteSaving: 'Strapping material no longer wasted, across every pallet you strap in a month.',
  totalSaving: 'Labour saving plus material saving each month. This is what pays back the machine.',
  payback:
    'Machine price divided by the total monthly saving — how long until the machine has paid for itself.',
  manualHours:
    'Total man-hours of strapping work per shift. Spread across the whole crew, not one person — for example 11.2 man-hours might be 6 people working under 2 hours each.',
  ergoHours: 'Hours the single ErgoPack operator spends running the machine per shift.',
  buffer:
    'Hours per shift the operator is free for other work once strapping is done. This is capacity you already pay for — its value is already inside the labour saving, so it is not added again.',
  annual: 'Total saving over the first 12 months, before AMC.',
  fiveYear:
    'Total saving over five years, after subtracting the machine price and AMC from year 2.',
  tenYear: 'Total saving over ten years, after subtracting the machine price and AMC from year 2.',
  machineCount:
    'How many machines this volume needs. One machine strapping at the rate shown can only cover so many pallets in a shift.',
};

function formatCompact(value: number) {
  const sign = value < 0 ? '-' : '';
  const v = Math.abs(value);
  if (v >= 10000000) return `${sign}${RUPEE}${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `${sign}${RUPEE}${(v / 100000).toFixed(2)} L`;
  if (v >= 1000) return `${sign}${RUPEE}${(v / 1000).toFixed(0)}K`;
  return `${sign}${RUPEE}${Math.round(v).toLocaleString('en-IN')}`;
}

function formatFull(value: number) {
  return `${RUPEE}${Math.round(value).toLocaleString('en-IN')}`;
}

function toEditable(scenario: RoiScenario): Editable {
  return {
    price: scenario.price,
    palletsPerDay: scenario.palletsPerDay,
    shifts: scenario.shifts,
    monthlyCTC: SCENARIO_ASSUMPTIONS.monthlyCTC,
    manualMinsPerPallet: SCENARIO_ASSUMPTIONS.manualMinsPerPallet,
    ergoMinsPerPallet: SCENARIO_ASSUMPTIONS.ergoMinsPerPallet,
    workingDaysPerMonth: SCENARIO_ASSUMPTIONS.workingDaysPerMonth,
    shiftHours: SCENARIO_ASSUMPTIONS.shiftHours,
    wastePerPallet: SCENARIO_ASSUMPTIONS.wastePerPallet,
    amcPerYear: SCENARIO_ASSUMPTIONS.amcPerYear,
    manualPeoplePerShift: null,
    ergoPeoplePerShift: scenario.ergoPeoplePerShift,
  };
}

/**
 * Single source of truth for the live maths. Mirrors the documented model in
 * src/data/roi-scenarios.ts so an untouched scenario reproduces its stored numbers.
 */
function compute(input: Editable) {
  const shifts = Math.max(1, input.shifts);
  const palletsPerShift = input.palletsPerDay / shifts;

  const hourlyRate =
    input.monthlyCTC > 0 && input.workingDaysPerMonth > 0 && input.shiftHours > 0
      ? input.monthlyCTC / input.workingDaysPerMonth / input.shiftHours
      : 0;

  // Manual crew: 2 people per 50 pallets/shift unless overridden.
  const derivedManualPerShift = Math.max(2, Math.ceil(palletsPerShift / 50) * 2);
  const manualPeoplePerShift = input.manualPeoplePerShift ?? derivedManualPerShift;
  const manualPeople = manualPeoplePerShift * shifts;

  // How many machines this volume needs at the stated cycle time.
  const machineCapacityPerShift =
    input.ergoMinsPerPallet > 0 ? (input.shiftHours * 60) / input.ergoMinsPerPallet : Infinity;
  const machinesNeeded = Math.max(1, Math.ceil(palletsPerShift / machineCapacityPerShift));

  const ergoPeoplePerShift = Math.max(1, input.ergoPeoplePerShift) * machinesNeeded;
  const ergoPeople = ergoPeoplePerShift * shifts;

  const manualManhoursPerShift = (palletsPerShift * input.manualMinsPerPallet) / 60;
  const ergoHoursPerShift =
    machinesNeeded > 0 ? (palletsPerShift * input.ergoMinsPerPallet) / 60 / machinesNeeded : 0;
  const cappedErgoHours = Math.min(ergoHoursPerShift, input.shiftHours);

  const manualMonthly = manualPeople * input.monthlyCTC;
  const ergoMonthly = ergoPeople * hourlyRate * cappedErgoHours * input.workingDaysPerMonth;

  const bufferHoursPerShift = Math.max(0, input.shiftHours - cappedErgoHours);
  const bufferHoursPerMonth = bufferHoursPerShift * ergoPeople * input.workingDaysPerMonth;

  const labourSavings = manualMonthly - ergoMonthly;
  const wasteSavings = input.palletsPerDay * input.wastePerPallet * input.workingDaysPerMonth;
  const totalMonthlySavings = labourSavings + wasteSavings;

  const capex = input.price * machinesNeeded;
  const amcTotal = input.amcPerYear * machinesNeeded;
  const paybackMonths = totalMonthlySavings > 0 ? capex / totalMonthlySavings : Infinity;
  const annualSavings = totalMonthlySavings * 12;
  const netAnnualAfterAmc = annualSavings - amcTotal;

  return {
    palletsPerShift,
    hourlyRate,
    manualPeoplePerShift,
    manualPeople,
    ergoPeoplePerShift,
    ergoPeople,
    machinesNeeded,
    capex,
    manualManhoursPerShift,
    ergoHoursPerShift: cappedErgoHours,
    bufferHoursPerShift,
    bufferHoursPerMonth,
    manualMonthly,
    ergoMonthly,
    labourSavings,
    wasteSavings,
    totalMonthlySavings,
    paybackMonths,
    annualSavings,
    netAnnualAfterAmc,
    fiveYear: annualSavings + 4 * netAnnualAfterAmc - capex,
    tenYear: annualSavings + 9 * netAnnualAfterAmc - capex,
    derivedManualPerShift,
  };
}

export default function ScenarioProposals() {
  const [tier, setTier] = useState<ScenarioTier>('fast');
  const [activeId, setActiveId] = useState<string>('700-fast');
  const [edited, setEdited] = useState<Editable>(() => toEditable(ROI_SCENARIOS[0]));
  const [dirty, setDirty] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const active = useMemo(
    () => ROI_SCENARIOS.find((s) => s.id === activeId) ?? ROI_SCENARIOS[0],
    [activeId]
  );

  // Loading a different scenario resets the sheet to that scenario's baseline.
  useEffect(() => {
    setEdited(toEditable(active));
    setDirty(false);
  }, [active]);

  const results = useMemo(() => compute(edited), [edited]);

  const visible = useMemo(
    () =>
      MACHINE_ORDER.map((id) => ROI_SCENARIOS.find((s) => s.machineId === id && s.tier === tier)!),
    [tier]
  );

  const set = useCallback(<K extends keyof Editable>(key: K, value: Editable[K]) => {
    setEdited((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const reset = useCallback(() => {
    setEdited(toEditable(active));
    setDirty(false);
  }, [active]);

  const switchTier = (nextTier: ScenarioTier) => {
    setTier(nextTier);
    setActiveId(`${active.machineId}-${nextTier}`);
  };

  const paybackText = Number.isFinite(results.paybackMonths)
    ? `${results.paybackMonths.toFixed(1)}`
    : '—';

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8">
        <div className="mb-8">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8102E]">
            Ready-Made Proposals
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find your payback in 10 seconds
          </h1>
          <div className="mt-3 max-w-2xl text-neutral-600">
            Pick the volume closest to yours for an instant answer — then change any number to match
            your floor exactly. Everything updates as you type. Hover any{' '}
            <span className="inline-flex translate-y-0.5 items-center">
              <InfoTooltip content="Like this — every field on this page explains itself." />
            </span>{' '}
            for an explanation.
          </div>
        </div>

        {/* Tier toggle */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg bg-neutral-100 p-1">
            {(['fast', 'standard'] as ScenarioTier[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTier(t)}
                className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  tier === t
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t === 'fast' ? 'High Volume' : 'Standard Volume'}
              </button>
            ))}
          </div>
          <span className="text-xs text-neutral-500">
            {tier === 'fast'
              ? 'Fastest payback — for busy dispatch floors'
              : 'Typical mid-size operation'}
          </span>
        </div>

        {/* Machine cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {visible.map((scenario) => {
            const selected = scenario.id === active.id;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveId(scenario.id)}
                className={`rounded-2xl border-2 p-5 text-left transition-all ${
                  selected
                    ? 'border-[#C8102E] bg-red-50/40 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="mb-1 text-sm font-bold">{scenario.machineName}</div>
                <div className="mb-4 text-xs text-neutral-500">
                  {formatCompact(scenario.price)} · {scenario.palletsPerDay} pallets/day
                </div>
                <div className="text-3xl font-black tabular-nums text-[#C8102E]">
                  {scenario.paybackMonths}
                  <span className="ml-1 text-base font-bold">mo</span>
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Payback period
                </div>
                <div className="mt-4 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
                  Saves{' '}
                  <span className="font-bold text-emerald-700">
                    {formatCompact(scenario.totalMonthlySavings)}
                  </span>{' '}
                  every month
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ---------------- Editable inputs ---------------- */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 lg:sticky lg:top-24">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
                  <Pencil className="h-3.5 w-3.5" />
                  Your numbers
                </h3>
                {dirty && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {dirty && (
                <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                  Showing your edited figures, not the standard scenario.
                </p>
              )}

              <div className="space-y-3">
                <Field
                  label="Machine price"
                  tip={TIPS.price}
                  value={edited.price}
                  onChange={(v) => set('price', v)}
                  step={50000}
                  prefix={RUPEE}
                />
                <Field
                  label="Pallets per day"
                  tip={TIPS.palletsPerDay}
                  value={edited.palletsPerDay}
                  onChange={(v) => set('palletsPerDay', v)}
                  step={50}
                />
                <Field
                  label="Shifts per day"
                  tip={TIPS.shifts}
                  value={edited.shifts}
                  onChange={(v) => set('shifts', v)}
                  min={1}
                  max={3}
                />
                <Field
                  label="Monthly CTC per worker"
                  tip={TIPS.monthlyCTC}
                  value={edited.monthlyCTC}
                  onChange={(v) => set('monthlyCTC', v)}
                  step={1000}
                  prefix={RUPEE}
                />
                <Field
                  label="Manual crew per shift"
                  tip={TIPS.manualCrew}
                  value={edited.manualPeoplePerShift ?? results.derivedManualPerShift}
                  onChange={(v) => set('manualPeoplePerShift', v)}
                  hint={
                    edited.manualPeoplePerShift === null
                      ? `Auto: ${results.derivedManualPerShift} people`
                      : 'Manual override'
                  }
                />
                <Field
                  label="Minutes per pallet — manual"
                  tip={TIPS.manualMins}
                  value={edited.manualMinsPerPallet}
                  onChange={(v) => set('manualMinsPerPallet', v)}
                  step={0.5}
                />
                <Field
                  label="Minutes per pallet — ErgoPack"
                  tip={TIPS.ergoMins}
                  value={edited.ergoMinsPerPallet}
                  onChange={(v) => set('ergoMinsPerPallet', v)}
                  step={0.1}
                />

                <button
                  onClick={() => setShowAdvanced((s) => !s)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                >
                  {showAdvanced ? 'Hide' : 'Show'} advanced settings
                </button>

                {showAdvanced && (
                  <div className="space-y-3 border-t border-neutral-200 pt-3">
                    <Field
                      label="Working days per month"
                      tip={TIPS.workingDays}
                      value={edited.workingDaysPerMonth}
                      onChange={(v) => set('workingDaysPerMonth', v)}
                    />
                    <Field
                      label="Hours per shift"
                      tip={TIPS.shiftHours}
                      value={edited.shiftHours}
                      onChange={(v) => set('shiftHours', v)}
                    />
                    <Field
                      label="Operators per shift"
                      tip={TIPS.ergoCrew}
                      value={edited.ergoPeoplePerShift}
                      onChange={(v) => set('ergoPeoplePerShift', v)}
                      min={1}
                    />
                    <Field
                      label="Strap saved per pallet"
                      tip={TIPS.waste}
                      value={edited.wastePerPallet}
                      onChange={(v) => set('wastePerPallet', v)}
                      prefix={RUPEE}
                    />
                    <Field
                      label="AMC per year"
                      tip={TIPS.amc}
                      value={edited.amcPerYear}
                      onChange={(v) => set('amcPerYear', v)}
                      step={10000}
                      prefix={RUPEE}
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-lg bg-white p-3 text-[11px] text-neutral-500">
                Worker cost works out to{' '}
                <span className="font-bold text-neutral-800">
                  {RUPEE}
                  {results.hourlyRate.toFixed(2)}/hour
                </span>{' '}
                ({formatFull(edited.monthlyCTC)} ÷ {edited.workingDaysPerMonth} days ÷{' '}
                {edited.shiftHours} hrs)
              </div>
            </div>
          </div>

          {/* ---------------- Live results ---------------- */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">{active.machineName}</h2>
                  <p className="mt-1 max-w-xl text-sm text-neutral-600">{active.positioning}</p>
                </div>
                <div className="shrink-0 rounded-xl bg-neutral-900 px-5 py-3 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Investment
                  </div>
                  <div className="text-lg font-bold text-white">{formatCompact(results.capex)}</div>
                  {results.machinesNeeded > 1 && (
                    <div className="mt-0.5 text-[10px] text-amber-300">
                      {results.machinesNeeded} machines
                    </div>
                  )}
                </div>
              </div>

              {results.machinesNeeded > 1 && (
                <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-xs text-amber-900">
                  At {Math.round(results.palletsPerShift)} pallets a shift, one machine cannot keep
                  up — this needs <strong>{results.machinesNeeded} machines</strong>, and the
                  investment above reflects that.
                  <InfoTooltip content={TIPS.machineCount} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-4">
                <Stat label="Pallets / day" value={Math.round(edited.palletsPerDay).toString()} />
                <Stat
                  label="Shifts"
                  value={`${edited.shifts} × ${Math.round(results.palletsPerShift)}/shift`}
                />
                <Stat
                  label="Crew today"
                  value={`${results.manualPeople} people`}
                  sub={`${results.manualPeoplePerShift} per shift`}
                  tip={TIPS.manualCrew}
                />
                <Stat
                  label="With ErgoPack"
                  value={`${results.ergoPeople} people`}
                  sub={`${results.ergoPeoplePerShift} per shift`}
                  tip={TIPS.ergoCrew}
                  good
                />
              </div>

              {/* Money */}
              <div className="px-6 py-6">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <IndianRupee className="h-3.5 w-3.5" />
                  Where the money goes every month
                </h3>
                <div className="space-y-3">
                  <CostRow
                    label="What you pay today"
                    detail={`${results.manualPeople} people × ${formatFull(edited.monthlyCTC)} full salary`}
                    amount={results.manualMonthly}
                    tip={TIPS.manualCost}
                    tone="bad"
                  />
                  <CostRow
                    label="What you'd pay with ErgoPack"
                    detail={`${results.ergoPeople} operators × ${results.ergoHoursPerShift.toFixed(1)} hrs actually worked × ${edited.workingDaysPerMonth} days`}
                    amount={results.ergoMonthly}
                    tip={TIPS.ergoCost}
                    tone="good"
                  />
                  <CostRow
                    label="Strapping material saved"
                    detail={`${RUPEE}${edited.wastePerPallet}/pallet less waste with calibrated tension`}
                    amount={results.wasteSavings}
                    tip={TIPS.wasteSaving}
                    tone="good"
                  />

                  <div className="mt-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <div className="flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                          Total monthly saving
                          <InfoTooltip content={TIPS.totalSaving} />
                        </div>
                        <div className="mt-1 text-xs text-emerald-700/80">
                          Labour {formatCompact(results.labourSavings)} + material{' '}
                          {formatCompact(results.wasteSavings)}
                        </div>
                      </div>
                      <div className="text-3xl font-black tabular-nums text-emerald-700">
                        {formatFull(results.totalMonthlySavings)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="border-t border-neutral-200 px-6 py-6">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <Clock className="h-3.5 w-3.5" />
                  The time you get back
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TimeCard
                    label="Strapping work today"
                    value={`${results.manualManhoursPerShift.toFixed(1)} hrs`}
                    sub={`man-hours per shift across ${results.manualPeoplePerShift} people`}
                    tip={TIPS.manualHours}
                  />
                  <TimeCard
                    label="With ErgoPack"
                    value={`${results.ergoHoursPerShift.toFixed(1)} hrs`}
                    sub="one operator, same output"
                    tip={TIPS.ergoHours}
                    good
                  />
                  <TimeCard
                    label="Operator freed for"
                    value={`${results.bufferHoursPerShift.toFixed(1)} hrs`}
                    sub={`per shift · ${Math.round(results.bufferHoursPerMonth)} hrs a month`}
                    tip={TIPS.buffer}
                    accent
                  />
                </div>
              </div>

              {/* Long term */}
              <div className="border-t border-neutral-200 px-6 py-6">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <Zap className="h-3.5 w-3.5" />
                  Beyond payback
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Stat2
                    label="Payback"
                    value={`${paybackText} months`}
                    tip={TIPS.payback}
                    highlight
                  />
                  <Stat2
                    label="Year 1 saving"
                    value={formatCompact(results.annualSavings)}
                    tip={TIPS.annual}
                  />
                  <Stat2
                    label="5-year net"
                    value={formatCompact(results.fiveYear)}
                    tip={TIPS.fiveYear}
                  />
                  <Stat2
                    label="10-year net"
                    value={formatCompact(results.tenYear)}
                    tip={TIPS.tenYear}
                  />
                </div>
                <p className="mt-3 text-[11px] text-neutral-500">
                  Net figures are after the machine cost and{' '}
                  {formatCompact(edited.amcPerYear * results.machinesNeeded)}/year AMC from year 2
                  onward.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-neutral-200 px-6 py-5 sm:flex-row">
                <Link href="/contact" className="flex-1">
                  <button className="w-full rounded-lg bg-[#C8102E] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700">
                    Request this quote
                  </button>
                </Link>
                <Link href={active.machineHref} className="flex-1">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 text-sm font-bold uppercase tracking-wider text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900">
                    See {active.machineName} <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>

            <details className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
              <summary className="cursor-pointer text-sm font-semibold text-neutral-700">
                How these numbers are calculated
              </summary>
              <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-neutral-600">
                <li>
                  • Manual crews default to 2 people per 50 pallets per shift — real-world staffing
                  that already allows for handling, waiting and rest, not raw strapping speed. You
                  can override it with your actual headcount.
                </li>
                <li>
                  • Your current cost counts full salaries, because a worker is paid their full wage
                  whether or not they are strapping all day. The ErgoPack cost counts only the hours
                  the operator actually runs the machine.
                </li>
                <li>
                  • Freed hours are capacity you already pay for. Their value is already inside the
                  labour saving, so they are shown as time — never added to the rupee total twice.
                </li>
                <li>
                  • Payback is the machine price divided by the total monthly saving. AMC applies
                  from year 2; year 1 is under warranty.
                </li>
                <li>
                  • If the volume exceeds what one machine can strap in a shift, the figures
                  automatically account for additional machines.
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- small pieces ----------------------------- */

function Field({
  label,
  tip,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  prefix,
  hint,
}: {
  label: string;
  tip: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center text-[11px] font-semibold text-neutral-600">
        {label}
        <InfoTooltip content={tip} />
      </span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          inputMode="decimal"
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            const parsed = Number.parseFloat(e.target.value);
            onChange(Number.isFinite(parsed) && parsed >= min ? parsed : min);
          }}
          className={`w-full rounded-lg border border-neutral-300 bg-white py-2 text-right text-sm font-bold text-neutral-900 outline-none transition-all focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 ${
            prefix ? 'pl-8 pr-3' : 'px-3'
          }`}
        />
      </div>
      {hint && <span className="mt-1 block text-[10px] text-neutral-400">{hint}</span>}
    </label>
  );
}

function Stat({
  label,
  value,
  sub,
  good,
  tip,
}: {
  label: string;
  value: string;
  sub?: string;
  good?: boolean;
  tip?: string;
}) {
  return (
    <div className="bg-white px-5 py-4">
      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        {label}
        {tip && <InfoTooltip content={tip} />}
      </div>
      <div className={`mt-1 text-lg font-bold ${good ? 'text-emerald-700' : 'text-neutral-900'}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-neutral-500">{sub}</div>}
    </div>
  );
}

function Stat2({
  label,
  value,
  highlight,
  tip,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  tip?: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight ? 'bg-[#C8102E] text-white' : 'border border-neutral-200 bg-white'
      }`}
    >
      <div
        className={`flex items-center text-[10px] font-bold uppercase tracking-widest ${
          highlight ? 'text-white/70' : 'text-neutral-400'
        }`}
      >
        {label}
        {tip && <InfoTooltip content={tip} />}
      </div>
      <div
        className={`mt-1 text-lg font-bold tabular-nums ${
          highlight ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function CostRow({
  label,
  detail,
  amount,
  tone,
  tip,
}: {
  label: string;
  detail: string;
  amount: number;
  tone: 'good' | 'bad';
  tip?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral-200 px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center text-sm font-semibold text-neutral-900">
          {label}
          {tip && <InfoTooltip content={tip} />}
        </div>
        <div className="mt-0.5 text-xs text-neutral-500">{detail}</div>
      </div>
      <div
        className={`text-lg font-bold tabular-nums ${
          tone === 'bad' ? 'text-neutral-900' : 'text-emerald-700'
        }`}
      >
        {formatFull(amount)}
      </div>
    </div>
  );
}

function TimeCard({
  label,
  value,
  sub,
  good,
  accent,
  tip,
}: {
  label: string;
  value: string;
  sub: string;
  good?: boolean;
  accent?: boolean;
  tip?: string;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent
          ? 'border-amber-300 bg-amber-50'
          : good
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-neutral-200 bg-white'
      }`}
    >
      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-neutral-500">
        {label}
        {tip && <InfoTooltip content={tip} />}
      </div>
      <div
        className={`mt-1 text-2xl font-black tabular-nums ${
          accent ? 'text-amber-700' : good ? 'text-emerald-700' : 'text-neutral-900'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] text-neutral-500">{sub}</div>
    </div>
  );
}
