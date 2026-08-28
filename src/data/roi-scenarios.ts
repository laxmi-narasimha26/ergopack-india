/**
 * Pre-built ROI scenarios — ready-made proposals for sales.
 *
 * Two payback targets (3-month and 6-month) for each of the three machines,
 * so a pallet count on a call maps straight to a quotable proposal.
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
 *
 * Note: crew size only moves in 2-person steps, so payback lands near — not
 * exactly on — 3.0 and 6.0 months. Figures below are the closest honest fit.
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

/** Which payback target a scenario is built around. */
export type ScenarioTier = 'three' | 'six';

export interface RoiScenario {
  id: string;
  machineId: '700' | 'go' | '726x';
  machineName: string;
  machineHref: string;
  positioning: string;
  tier: ScenarioTier;

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

const POSITIONING = {
  '700':
    'Hand-crank, no battery, no power needed — the lowest-cost entry into automated strapping.',
  go: 'Battery-powered and joystick-driven — faster cycles and less operator effort.',
  '726x':
    'Li-ion ChainLance with Siemens touchscreen and line laser — built for continuous high-volume dispatch.',
} as const;

const HREF = {
  '700': '/products/700',
  go: '/products/go',
  '726x': '/products/726x',
} as const;

export const ROI_SCENARIOS: RoiScenario[] = [
  /* ---------------------------- 3-MONTH PAYBACK ---------------------------- */
  {
    id: '700-three',
    machineId: '700',
    machineName: 'ErgoPack 700',
    machineHref: HREF['700'],
    positioning: POSITIONING['700'],
    tier: 'three',
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
    id: 'go-three',
    machineId: 'go',
    machineName: 'ErgoPack GO',
    machineHref: HREF.go,
    positioning: POSITIONING.go,
    tier: 'three',
    price: 1500000,
    palletsPerDay: 450,
    palletsPerShift: 150,
    shifts: 3,
    manualPeople: 18,
    manualPeoplePerShift: 6,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 11.25,
    ergoHoursPerShift: 3.75,
    bufferHoursPerShift: 4.25,
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
    id: '726x-three',
    machineId: '726x',
    machineName: 'ErgoPack 726X Li',
    machineHref: HREF['726x'],
    positioning: POSITIONING['726x'],
    tier: 'three',
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

  /* ---------------------------- 6-MONTH PAYBACK ---------------------------- */
  {
    id: '700-six',
    machineId: '700',
    machineName: 'ErgoPack 700',
    machineHref: HREF['700'],
    positioning: POSITIONING['700'],
    tier: 'six',
    price: 1000000,
    palletsPerDay: 150,
    palletsPerShift: 50,
    shifts: 3,
    manualPeople: 6,
    manualPeoplePerShift: 2,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 3.75,
    ergoHoursPerShift: 1.25,
    bufferHoursPerShift: 6.75,
    bufferHoursPerMonth: 527,
    manualMonthly: 120000,
    ergoMonthly: 9375,
    labourSavings: 110625,
    wasteSavings: 46800,
    totalMonthlySavings: 157425,
    paybackMonths: 6.4,
    annualSavings: 1889100,
    netAnnualAfterAmc: 1789100,
    fiveYear: 8045500,
    tenYear: 16991000,
  },
  {
    id: 'go-six',
    machineId: 'go',
    machineName: 'ErgoPack GO',
    machineHref: HREF.go,
    positioning: POSITIONING.go,
    tier: 'six',
    price: 1500000,
    palletsPerDay: 180,
    palletsPerShift: 60,
    shifts: 3,
    manualPeople: 12,
    manualPeoplePerShift: 4,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 4.5,
    ergoHoursPerShift: 1.5,
    bufferHoursPerShift: 6.5,
    bufferHoursPerMonth: 507,
    manualMonthly: 240000,
    ergoMonthly: 11250,
    labourSavings: 228750,
    wasteSavings: 56160,
    totalMonthlySavings: 284910,
    paybackMonths: 5.3,
    annualSavings: 3418920,
    netAnnualAfterAmc: 3318920,
    fiveYear: 15194600,
    tenYear: 31789200,
  },
  {
    id: '726x-six',
    machineId: '726x',
    machineName: 'ErgoPack 726X Li',
    machineHref: HREF['726x'],
    positioning: POSITIONING['726x'],
    tier: 'six',
    price: 3500000,
    palletsPerDay: 480,
    palletsPerShift: 160,
    shifts: 3,
    manualPeople: 24,
    manualPeoplePerShift: 8,
    ergoPeople: 3,
    ergoPeoplePerShift: 1,
    manualManhoursPerShift: 12.0,
    ergoHoursPerShift: 4.0,
    bufferHoursPerShift: 4.0,
    bufferHoursPerMonth: 312,
    manualMonthly: 480000,
    ergoMonthly: 30000,
    labourSavings: 450000,
    wasteSavings: 149760,
    totalMonthlySavings: 599760,
    paybackMonths: 5.8,
    annualSavings: 7197120,
    netAnnualAfterAmc: 7097120,
    fiveYear: 32085600,
    tenYear: 67571200,
  },
];
