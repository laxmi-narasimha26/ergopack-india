/**
 * Pre-built ROI scenarios — ready-made proposals for sales.
 *
 * Instead of making a prospect sit through the full calculator, these are six
 * worked cases (three machines x two volume tiers) that can be quoted directly
 * off the pallet count a customer gives on a call.
 *
 * Model assumptions (single source of truth — keep in sync with the numbers below):
 *   - Manual strapping: 4.5 min/pallet. With ErgoPack: 1.5 min/pallet.
 *   - Manual crew sizing: 2 people per 50 pallets per shift (real-world staffing,
 *     which includes handling, waiting and idle time — not raw strapping speed).
 *   - ErgoPack: 1 operator per shift, one machine.
 *   - Worker CTC ₹20,000/month over 26 working days and 8-hour shifts
 *     => ₹769.23/day => ₹96.15/hour.
 *   - Manual labour is charged at full CTC (you pay the full salary regardless
 *     of idle time). ErgoPack labour is charged only for the hours the operator
 *     actually runs the machine.
 *   - Strapping waste saved: ₹12/pallet. AMC ₹1,00,000/year from year 2.
 *   - Buffer hours are reported as freed capacity, NOT added to the savings
 *     total — that time is already reflected in the labour-cost gap.
 */

export const SCENARIO_ASSUMPTIONS = {
  monthlyCTC: 20000,
  workingDaysPerMonth: 26,
  shiftHours: 8,
  hourlyRate: 96.15,
  dailyRate: 769.23,
  manualMinsPerPallet: 4.5,
  ergoMinsPerPallet: 1.5,
  peoplePer50PalletsPerShift: 2,
  wastePerPallet: 12,
  amcPerYear: 100000,
} as const;

export type ScenarioTier = 'fast' | 'standard';

export interface RoiScenario {
  id: string;
  machineId: '700' | 'go' | '726x';
  machineName: string;
  machineHref: string;
  /** One-line reason this machine suits this volume. */
  positioning: string;
  tier: ScenarioTier;
  /** Headline used on the card, e.g. "Pays back in ~2.1 months". */
  paybackLabel: string;

  price: number;
  palletsPerDay: number;
  palletsPerShift: number;
  shifts: number;

  manualPeople: number;
  manualPeoplePerShift: number;
  ergoPeople: number;
  ergoPeoplePerShift: number;

  /** Man-hours of strapping work per shift under manual process. */
  manualManhoursPerShift: number;
  /** Hours the ErgoPack operator actually runs the machine per shift. */
  ergoHoursPerShift: number;
  /** Hours per shift the operator is freed for other work. */
  bufferHoursPerShift: number;
  bufferHoursPerMonth: number;

  manualMonthly: number;
  ergoMonthly: number;
  labourSavings: number;
  wasteSavings: number;
  totalMonthlySavings: number;

  paybackMonths: number;
  annualSavings: number;
  netAnnualAfterAmc: number;
  fiveYear: number;
  tenYear: number;
}

export const ROI_SCENARIOS: RoiScenario[] = [
  {
    id: '700-fast',
    machineId: '700',
    machineName: 'ErgoPack 700',
    machineHref: '/products/700',
    positioning:
      'Hand-crank, no battery, no power needed — the lowest-cost entry into automated strapping.',
    tier: 'fast',
    paybackLabel: 'Pays back in ~2 months',
    price: 1000000,
    palletsPerDay: 450,
    palletsPerShift: 150,
    shifts: 3,
    manualPeople: 18,
    manualPeoplePerShift: 6,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 11.25,
    ergoHoursPerShift: 3.8,
    bufferHoursPerShift: 4.2,
    bufferHoursPerMonth: 332,
    manualMonthly: 360000,
    ergoMonthly: 28125,
    labourSavings: 331875,
    wasteSavings: 140400,
    totalMonthlySavings: 472275,
    paybackMonths: 2.1,
    annualSavings: 5667300,
    netAnnualAfterAmc: 5567300,
    fiveYear: 26936500,
    tenYear: 54773000,
  },
  {
    id: '700-standard',
    machineId: '700',
    machineName: 'ErgoPack 700',
    machineHref: '/products/700',
    positioning:
      'Hand-crank, no battery, no power needed — the lowest-cost entry into automated strapping.',
    tier: 'standard',
    paybackLabel: 'Pays back in ~3 months',
    price: 1000000,
    palletsPerDay: 300,
    palletsPerShift: 100,
    shifts: 3,
    manualPeople: 12,
    manualPeoplePerShift: 4,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 7.5,
    ergoHoursPerShift: 2.5,
    bufferHoursPerShift: 5.5,
    bufferHoursPerMonth: 429,
    manualMonthly: 240000,
    ergoMonthly: 18750,
    labourSavings: 221250,
    wasteSavings: 93600,
    totalMonthlySavings: 314850,
    paybackMonths: 3.2,
    annualSavings: 3778200,
    netAnnualAfterAmc: 3678200,
    fiveYear: 17491000,
    tenYear: 35882000,
  },
  {
    id: 'go-fast',
    machineId: 'go',
    machineName: 'ErgoPack GO',
    machineHref: '/products/go',
    positioning:
      'Battery-powered and joystick-driven — faster cycles and less operator effort at mid volumes.',
    tier: 'fast',
    paybackLabel: 'Pays back in ~2.5 months',
    price: 1500000,
    palletsPerDay: 600,
    palletsPerShift: 200,
    shifts: 3,
    manualPeople: 24,
    manualPeoplePerShift: 8,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 15.0,
    ergoHoursPerShift: 5.0,
    bufferHoursPerShift: 3.0,
    bufferHoursPerMonth: 234,
    manualMonthly: 480000,
    ergoMonthly: 37500,
    labourSavings: 442500,
    wasteSavings: 187200,
    totalMonthlySavings: 629700,
    paybackMonths: 2.4,
    annualSavings: 7556400,
    netAnnualAfterAmc: 7456400,
    fiveYear: 35882000,
    tenYear: 73164000,
  },
  {
    id: 'go-standard',
    machineId: 'go',
    machineName: 'ErgoPack GO',
    machineHref: '/products/go',
    positioning:
      'Battery-powered and joystick-driven — faster cycles and less operator effort at mid volumes.',
    tier: 'standard',
    paybackLabel: 'Pays back in ~3 months',
    price: 1500000,
    palletsPerDay: 450,
    palletsPerShift: 150,
    shifts: 3,
    manualPeople: 18,
    manualPeoplePerShift: 6,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 11.25,
    ergoHoursPerShift: 3.8,
    bufferHoursPerShift: 4.2,
    bufferHoursPerMonth: 332,
    manualMonthly: 360000,
    ergoMonthly: 28125,
    labourSavings: 331875,
    wasteSavings: 140400,
    totalMonthlySavings: 472275,
    paybackMonths: 3.2,
    annualSavings: 5667300,
    netAnnualAfterAmc: 5567300,
    fiveYear: 26436500,
    tenYear: 54273000,
  },
  {
    id: '726x-fast',
    machineId: '726x',
    machineName: 'ErgoPack 726X Li',
    machineHref: '/products/726x',
    positioning:
      'Li-ion ChainLance with Siemens touchscreen and line laser — built for continuous high-volume dispatch.',
    tier: 'fast',
    paybackLabel: 'Pays back in under 4 months',
    price: 3500000,
    palletsPerDay: 900,
    palletsPerShift: 300,
    shifts: 3,
    manualPeople: 36,
    manualPeoplePerShift: 12,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 22.5,
    ergoHoursPerShift: 7.5,
    bufferHoursPerShift: 0.5,
    bufferHoursPerMonth: 39,
    manualMonthly: 720000,
    ergoMonthly: 56250,
    labourSavings: 663750,
    wasteSavings: 280800,
    totalMonthlySavings: 944550,
    paybackMonths: 3.7,
    annualSavings: 11334600,
    netAnnualAfterAmc: 11234600,
    fiveYear: 52773000,
    tenYear: 108946000,
  },
  {
    id: '726x-standard',
    machineId: '726x',
    machineName: 'ErgoPack 726X Li',
    machineHref: '/products/726x',
    positioning:
      'Li-ion ChainLance with Siemens touchscreen and line laser — built for continuous high-volume dispatch.',
    tier: 'standard',
    paybackLabel: 'Pays back in under 6 months',
    price: 3500000,
    palletsPerDay: 600,
    palletsPerShift: 200,
    shifts: 3,
    manualPeople: 24,
    manualPeoplePerShift: 8,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 15.0,
    ergoHoursPerShift: 5.0,
    bufferHoursPerShift: 3.0,
    bufferHoursPerMonth: 234,
    manualMonthly: 480000,
    ergoMonthly: 37500,
    labourSavings: 442500,
    wasteSavings: 187200,
    totalMonthlySavings: 629700,
    paybackMonths: 5.6,
    annualSavings: 7556400,
    netAnnualAfterAmc: 7456400,
    fiveYear: 33882000,
    tenYear: 71164000,
  },
];

/** Pick the recommended machine for a given daily pallet volume. */
export function recommendMachine(palletsPerDay: number): RoiScenario {
  const ordered = [...ROI_SCENARIOS].sort((a, b) => a.palletsPerDay - b.palletsPerDay);
  return (
    ordered.find((scenario) => palletsPerDay <= scenario.palletsPerDay) ??
    ordered[ordered.length - 1]
  );
}
