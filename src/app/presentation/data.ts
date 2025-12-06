// Product data for the 3D presentation - extracted from Ergopack documentation
// Models: 700 (Manual Crank), GO (Economy Portable), 726X Li (Premium Lithium-Ion)

export interface ProductSpec {
    model: string;
    fullName: string;
    tagline: string;
    description: string;
    category: string;
    color: string;
    accentColor: string;
    heroValue: string;
    heroUnit: string;
    heroLabel: string;
    specs: {
        weight: number;
        dimensions: { length: number; width: number; height: number };
        chainSpeed?: number;
        chainLength: number;
        palletWidth: { min: number; max: number };
        palletHeight: { min: number; max: number };
        cycles?: number;
        chargingTime?: string;
        tensionPower?: { min: number; max: number };
        strapWidth?: { min: number; max: number };
    };
    features: string[];
    materials: string[];
    advantages?: { title: string; value: string; detail: string }[];
    certifications: string[];
}

export const products: Record<string, ProductSpec> = {
    '700': {
        model: '700',
        fullName: 'ErgoPack 700',
        tagline: 'Zero Electricity. Pure Precision.',
        description: 'Manual Hand-Crank Strapping Tool - The foundation of ergonomic strapping',
        category: 'Manual Operation',
        color: '#C8102E',
        accentColor: '#FF4444',
        heroValue: '64.4',
        heroUnit: 'kg',
        heroLabel: 'Ultra-Light Weight',
        specs: {
            weight: 64.4,
            dimensions: { length: 630, width: 770, height: 1200 },
            chainLength: 6,
            palletWidth: { min: 30, max: 255 },
            palletHeight: { min: 10, max: 230 },
        },
        features: [
            'No battery required - infinite operation',
            'Zero maintenance costs',
            'Multi-material compatibility',
            'AGR Certified ergonomics',
            'Perfect for low-volume operations',
            'Manual hand crank operation',
            '6m standard chain length',
        ],
        materials: ['PP', 'PET', 'Paper', 'Cord', 'Composite'],
        certifications: ['ISO 12100:2010', 'EU Declaration of Conformity', 'AGR Certified'],
    },
    GO: {
        model: 'GO',
        fullName: 'ErgoPack GO',
        tagline: 'Mobility Without Compromise.',
        description: 'Economy Portable Pallet Strapping System - Go anywhere, strap anything',
        category: 'Economy Portable',
        color: '#4A90D9',
        accentColor: '#6BB3FF',
        heroValue: '350',
        heroUnit: 'cycles',
        heroLabel: 'Per Charge',
        specs: {
            weight: 90,
            dimensions: { length: 630, width: 770, height: 1200 },
            chainSpeed: 40,
            chainLength: 5,
            palletWidth: { min: 30, max: 240 },
            palletHeight: { min: 80, max: 190 },
            cycles: 350,
            chargingTime: '8-10 hours',
        },
        features: [
            'Joystick control for precise operation',
            '40 m/min chain speed',
            'Standard Tool-Lift included',
            'Sledge 85 included',
            '350 strapping cycles per charge',
            '24V lead-fleece battery',
            'Best value for mobility',
        ],
        materials: ['PP', 'PET', 'Paper', 'Cord', 'Composite'],
        certifications: ['ISO 12100:2010', 'EU Declaration of Conformity', 'AGR Certified'],
    },
    '726X': {
        model: '726X Li',
        fullName: 'ErgoPack 726X Li',
        tagline: 'The Future is Lithium.',
        description: 'Professional Lithium-Ion Light-Duty Strapping System - Peak performance',
        category: 'X-pert Line',
        color: '#FFB81C',
        accentColor: '#FFD700',
        heroValue: '1200',
        heroUnit: 'cycles',
        heroLabel: 'Per Charge',
        specs: {
            weight: 104,
            dimensions: { length: 665, width: 770, height: 1200 },
            chainSpeed: 66,
            chainLength: 6,
            palletWidth: { min: 40, max: 270 },
            palletHeight: { min: 10, max: 230 },
            cycles: 1200,
            chargingTime: '3.5 hours',
            tensionPower: { min: 400, max: 2500 },
            strapWidth: { min: 13, max: 16 },
        },
        features: [
            'Lithium-Ion advanced technology',
            '66 m/min chain speed - 65% faster',
            'Siemens Touchscreen control',
            'Line Laser Type 2 precision',
            '1200 strapping cycles - 3.4x more',
            '3.5 hour fast charging - 60% faster',
            'Premium X-pert Line quality',
        ],
        advantages: [
            { title: '3.4× More Cycles', value: '1200', detail: 'vs 350 cycles' },
            { title: '60% Faster Charging', value: '3.5h', detail: 'vs 8-10 hours' },
            { title: '60% Lighter Battery', value: '5kg', detail: 'vs 12.3kg' },
            { title: '65% Faster Speed', value: '66m/min', detail: 'vs 40m/min' },
        ],
        materials: ['PP', 'PET'],
        certifications: ['ISO 12100:2010', 'EU Declaration of Conformity', 'AGR Certified'],
    },
};

export const comparisonMatrix = [
    { feature: 'Operation Type', '700': 'Manual Crank', GO: 'Battery Powered', '726X': 'Lithium-Ion X-pert' },
    { feature: 'System Weight', '700': '64.4 kg', GO: '90 kg', '726X': '104 kg' },
    { feature: 'Chain Speed', '700': 'Manual', GO: '40 m/min', '726X': '66 m/min' },
    { feature: 'Cycles per Charge', '700': '∞ (Manual)', GO: '350 cycles', '726X': '1200 cycles' },
    { feature: 'Charging Time', '700': 'N/A', GO: '8-10 hours', '726X': '3.5 hours' },
    { feature: 'Battery Type', '700': 'None', GO: '24V Lead-Fleece', '726X': 'Li-Ion 36.3V' },
    { feature: 'Max Pallet Width', '700': '255 cm', GO: '240 cm', '726X': '270 cm' },
    { feature: 'Siemens Touchscreen', '700': '—', GO: '—', '726X': '✓ Included' },
    { feature: 'Line Laser', '700': '—', GO: '—', '726X': '✓ Type 2' },
    { feature: 'Best Application', '700': 'Low Volume', GO: 'Value + Mobility', '726X': 'High Performance' },
];

export const companyStats = {
    countries: 60,
    years: 50,
    units: '1M+',
    partners: 47,
};

export const timeline = [
    { year: '1970s', event: 'ErgoPack founded in Germany', description: 'Beginning of German engineering excellence' },
    { year: '1980s', event: 'First mobile strapping systems', description: 'Revolutionizing pallet strapping' },
    { year: '1990s', event: 'Battery-powered automation', description: 'Moving beyond manual operation' },
    { year: '2000s', event: 'Global expansion begins', description: 'Reaching 40+ countries' },
    { year: '2010s', event: 'Lithium-Ion technology', description: 'Next generation power systems' },
    { year: '2020s', event: 'Industry 4.0 integration', description: 'Smart connectivity and IoT' },
    { year: 'Today', event: 'India market expansion', description: 'Serving India\'s manufacturing elite' },
];

export const roiStats = [
    { value: '3×', label: 'Throughput Increase', icon: 'zap' },
    { value: '18', label: 'Month Payback Period', icon: 'clock', suffix: 'months' },
    { value: '75%', label: 'Labor Cost Reduction', icon: 'trending-down' },
    { value: '99.9%', label: 'Uptime Reliability', icon: 'check-circle' },
];

export type ProductKey = '700' | 'GO' | '726X';
