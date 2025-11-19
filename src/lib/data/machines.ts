// Real Product Data Mapping for ErgoPack India
// This file provides comparison-friendly data structure for the real products

import productsData from '@/../../products-data.json';

export interface MachineSpec {
  label: string;
  xpert?: string | number;
  economy?: string | number;
  unit?: string;
  highlight?: 'xpert' | 'economy' | 'both' | 'none';
}

export interface MachineModel {
  id: string;
  name: string;
  line: 'xpert' | 'economy';
  tagline: string;
  price?: string;
  image?: string;
  category: string;
  tension: number;
  features: string[];
  specifications: {
    control: MachineSpec;
    positioning: MachineSpec;
    lift: MachineSpec;
    tension: MachineSpec;
    mechanism: MachineSpec;
    strapWidth: MachineSpec;
    power: MachineSpec;
    monitoring: MachineSpec;
    automation: MachineSpec;
    temperature: MachineSpec;
    certification: MachineSpec;
    warranty: MachineSpec;
    training: MachineSpec;
    roi: MachineSpec;
    idealFor: MachineSpec;
  };
}

// Helper function to get product data
const getProduct = (key: string) => (productsData.products as any)[key];

// Build real machines array from actual product data
export const machines: MachineModel[] = [
  // X-pert Line Models
  {
    id: '745x-li',
    name: '745X Li',
    line: 'xpert',
    tagline: 'Premium Heavy-Duty with Lithium-Ion',
    category: 'Premium Heavy-Duty System',
    tension: 4500,
    features: [
      'Lithium-Ion Battery (65% faster)',
      '1,200 Strapping Cycles per Charge',
      '66 m/min Chain Speed',
      'AGR Certified Ergonomic Design',
      'ISO 12100:2010 Certified',
      'Advanced Sealing Technology',
      '24V Lithium-Ion - 3.4x More Cycles',
      'Professional Mobile System',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 4500, economy: 4500, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '16-19mm', economy: '16-19mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-20°C to +50°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '3-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Heavy-Duty', economy: 'Standard Heavy-Duty', highlight: 'none' },
    },
  },
  {
    id: '726x-li',
    name: '726X Li',
    line: 'xpert',
    tagline: 'Premium Light-Duty with Lithium-Ion',
    category: 'Premium Light-Duty System',
    tension: 2600,
    features: [
      'Lithium-Ion Battery Technology',
      '1,200 Strapping Cycles per Charge',
      '66 m/min Chain Speed',
      'Light and Maneuverable',
      'AGR Certified Ergonomic',
      'Advanced Technology',
      'Professional Performance',
      'Compact Design',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 2600, economy: 2600, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '12.5-16mm', economy: '12.5-16mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'System Weight', xpert: '82 kg', economy: '72 kg', highlight: 'economy' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Light-Duty', economy: 'Standard Light-Duty', highlight: 'none' },
    },
  },
  {
    id: '713x-li',
    name: '713X Li',
    line: 'xpert',
    tagline: 'Premium Ultra-Light with Lithium-Ion',
    category: 'Premium Ultra-Light System',
    tension: 1300,
    features: [
      'Lithium-Ion Ultra-Light',
      '1,200 Strapping Cycles',
      '66 m/min Chain Speed',
      'Ultra-Compact Design',
      'Maximum Maneuverability',
      'AGR Certified',
      'Professional Precision',
      'Lightweight Champion',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1300, economy: 1300, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '9-12.5mm', economy: '9-12.5mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'System Weight', xpert: '72 kg', economy: '64 kg', highlight: 'economy' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Ultra-Light', economy: 'Standard Ultra-Light', highlight: 'none' },
    },
  },
  {
    id: '700x-li',
    name: '700X Li',
    line: 'xpert',
    tagline: 'Premium Stationary with Lithium-Ion',
    category: 'Premium Stationary System',
    tension: 4500,
    features: [
      'Stationary Lithium-Ion System',
      '1,200 Strapping Cycles',
      '66 m/min Chain Speed',
      'Fixed Position Excellence',
      'Heavy-Duty Performance',
      'AGR Certified',
      'Professional Grade',
      'Maximum Reliability',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Fixed Position', economy: 'Fixed Position', highlight: 'both' },
      lift: { label: 'Lifting Mechanism', xpert: 'Mounted System', economy: 'Manual System', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 4500, economy: 4500, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '16-19mm', economy: '16-19mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'Mobility', xpert: 'Stationary', economy: 'Stationary/Manual', highlight: 'none' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Fixed Station High-Volume', economy: 'Fixed Station Standard', highlight: 'none' },
    },
  },
  // E-conomy Line Models
  {
    id: '745e',
    name: '745E',
    line: 'economy',
    tagline: 'Reliable Heavy-Duty Performance',
    category: 'Professional Heavy-Duty System',
    tension: 4500,
    features: [
      'Lead-Fleece Battery',
      '350 Strapping Cycles',
      '40 m/min Chain Speed',
      'Proven Reliability',
      'AGR Certified Ergonomic',
      'ISO 12100:2010 Certified',
      'Cost-Effective Solution',
      'Professional Performance',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Tool-Lift System', highlight: 'both' },
      tension: { label: 'Max Tension Force', xpert: 4500, economy: 4500, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '16-19mm', economy: '16-19mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'System Weight', xpert: '104 kg', economy: '92.9 kg', highlight: 'economy' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '3-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Heavy-Duty', economy: 'Standard Heavy-Duty', highlight: 'none' },
    },
  },
  {
    id: '726e',
    name: '726E',
    line: 'economy',
    tagline: 'Reliable Light-Duty Performance',
    category: 'Professional Light-Duty System',
    tension: 2600,
    features: [
      'Lead-Fleece Battery',
      '350 Strapping Cycles',
      '40 m/min Chain Speed',
      'Light and Maneuverable',
      'AGR Certified',
      'Cost-Effective',
      'Proven Technology',
      'Reliable Performance',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Tool-Lift System', highlight: 'both' },
      tension: { label: 'Max Tension Force', xpert: 2600, economy: 2600, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '12.5-16mm', economy: '12.5-16mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'System Weight', xpert: '82 kg', economy: '72 kg', highlight: 'economy' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Light-Duty', economy: 'Standard Light-Duty', highlight: 'none' },
    },
  },
  {
    id: '713e',
    name: '713E',
    line: 'economy',
    tagline: 'Reliable Ultra-Light Performance',
    category: 'Professional Ultra-Light System',
    tension: 1300,
    features: [
      'Lead-Fleece Battery',
      '350 Strapping Cycles',
      '40 m/min Chain Speed',
      'Ultra-Compact',
      'Maximum Maneuverability',
      'AGR Certified',
      'Cost-Effective',
      'Lightweight Solution',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Precision Guides', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Tool-Lift System', economy: 'Tool-Lift System', highlight: 'both' },
      tension: { label: 'Max Tension Force', xpert: 1300, economy: 1300, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '9-12.5mm', economy: '9-12.5mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'System Weight', xpert: '72 kg', economy: '64 kg', highlight: 'economy' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'High-Volume Ultra-Light', economy: 'Standard Ultra-Light', highlight: 'none' },
    },
  },
  {
    id: '700e',
    name: '700E',
    line: 'economy',
    tagline: 'Reliable Stationary Performance',
    category: 'Professional Stationary System',
    tension: 4500,
    features: [
      'Lead-Fleece Battery',
      '350 Strapping Cycles',
      '40 m/min Chain Speed',
      'Fixed Position Reliability',
      'Heavy-Duty Performance',
      'AGR Certified',
      'Cost-Effective',
      'Proven Reliability',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Electronic Control', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Fixed Position', economy: 'Fixed Position', highlight: 'both' },
      lift: { label: 'Lifting Mechanism', xpert: 'Mounted System', economy: 'Mounted System', highlight: 'both' },
      tension: { label: 'Max Tension Force', xpert: 4500, economy: 4500, unit: 'N', highlight: 'both' },
      mechanism: { label: 'Tensioning System', xpert: 'Advanced Electronic', economy: 'Proven Mechanical', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '16-19mm', economy: '16-19mm', highlight: 'both' },
      power: { label: 'Battery Type', xpert: 'Lithium-Ion 24V', economy: 'Lead-Fleece 24V', highlight: 'xpert' },
      monitoring: { label: 'Strapping Cycles', xpert: '1200 cycles', economy: '350 cycles', highlight: 'xpert' },
      automation: { label: 'Chain Speed', xpert: '66 m/min', economy: '40 m/min', highlight: 'xpert' },
      temperature: { label: 'Mobility', xpert: 'Stationary', economy: 'Stationary', highlight: 'both' },
      certification: { label: 'Certifications', xpert: 'ISO 12100, AGR, EU', economy: 'ISO 12100, EU', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Fixed Station High-Volume', economy: 'Fixed Station Standard', highlight: 'none' },
    },
  },
];

export const getAllMachines = () => machines;

export const getMachinesByLine = (line: 'xpert' | 'economy') =>
  machines.filter(m => m.line === line);

export const getMachineById = (id: string) =>
  machines.find(m => m.id === id);

// Specification categories for comparison table
export const specificationCategories = [
  {
    category: 'Control & Interface',
    specs: ['control', 'positioning', 'monitoring'],
    icon: 'Cpu',
  },
  {
    category: 'Mechanical Systems',
    specs: ['lift', 'mechanism', 'tension'],
    icon: 'Settings',
  },
  {
    category: 'Technical Specifications',
    specs: ['strapWidth', 'power', 'temperature'],
    icon: 'Gauge',
  },
  {
    category: 'Automation & Features',
    specs: ['automation', 'certification', 'warranty'],
    icon: 'Zap',
  },
  {
    category: 'Business Metrics',
    specs: ['training', 'roi', 'idealFor'],
    icon: 'TrendingUp',
  },
];
