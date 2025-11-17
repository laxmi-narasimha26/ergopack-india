// Machine Types and Product Data for ErgoPack India
// Based on ErgoPack product lines

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

export const machines: MachineModel[] = [
  // X-pert Line Models
  {
    id: 'xpert-premium',
    name: 'X-pert Line Premium',
    line: 'xpert',
    tagline: 'Ultimate Precision & Automation',
    category: 'Premium Automated System',
    tension: 1500,
    features: [
      'Siemens 7" Color Touchscreen',
      'Triplex-Tool-Lift System (3-Stage)',
      'Line-Laser Positioning (±1mm)',
      'ChainLance Patented System',
      'Real-Time IoT Monitoring',
      'Automatic Tension Adjustment',
      'Blockchain-Verified Records',
      'Predictive Maintenance AI',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Siemens 7" Touchscreen', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Line-Laser (±1mm)', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Triplex-Tool-Lift (3-Stage)', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1500, economy: 1000, unit: 'daN', highlight: 'xpert' },
      mechanism: { label: 'Tensioning System', xpert: 'ChainLance Patented', economy: 'Proven Ratchet', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '25-50mm', economy: '25-50mm', highlight: 'both' },
      power: { label: 'Power Supply', xpert: '230V/400V Dual', economy: '230V', highlight: 'xpert' },
      monitoring: { label: 'Load Monitoring', xpert: 'Real-Time IoT Sensors', economy: 'Manual Inspection', highlight: 'xpert' },
      automation: { label: 'Automation Level', xpert: 'Fully Automated', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-20°C to +50°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'CE, ISO 9001, cGMP', economy: 'CE, ISO 9001', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years + Extended', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '90 Days', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Mission-Critical, High-Value', economy: 'Standard Operations', highlight: 'none' },
    },
  },
  {
    id: 'xpert-standard',
    name: 'X-pert Line Standard',
    line: 'xpert',
    tagline: 'Advanced Automation Essentials',
    category: 'Advanced Automated System',
    tension: 1500,
    features: [
      'Siemens 7" Color Touchscreen',
      'Dual-Tool-Lift System',
      'Line-Laser Positioning (±2mm)',
      'ChainLance System',
      'IoT Monitoring Ready',
      'Semi-Automatic Tension',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Siemens 7" Touchscreen', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Line-Laser (±2mm)', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Dual-Tool-Lift', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1500, economy: 1000, unit: 'daN', highlight: 'xpert' },
      mechanism: { label: 'Tensioning System', xpert: 'ChainLance System', economy: 'Proven Ratchet', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '25-50mm', economy: '25-50mm', highlight: 'both' },
      power: { label: 'Power Supply', xpert: '230V/400V', economy: '230V', highlight: 'xpert' },
      monitoring: { label: 'Load Monitoring', xpert: 'IoT Ready', economy: 'Manual Inspection', highlight: 'xpert' },
      automation: { label: 'Automation Level', xpert: 'Semi-Automated', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-20°C to +50°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'CE, ISO 9001', economy: 'CE, ISO 9001', highlight: 'both' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1 Day', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '4-6 Months', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Growing Operations', economy: 'Standard Operations', highlight: 'none' },
    },
  },
  // E-conomy Line Models
  {
    id: 'economy-plus',
    name: 'E-conomy Line Plus',
    line: 'economy',
    tagline: 'Enhanced Reliability & Performance',
    category: 'Enhanced Professional System',
    tension: 1000,
    features: [
      'Electronic Control Display',
      'Enhanced Lift System',
      'Visual Guide Positioning',
      'Heavy-Duty Ratchet (1000 daN)',
      'Robust Steel Construction',
      'Quick Training',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Siemens Touchscreen', economy: 'Electronic Display', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Line-Laser', economy: 'Enhanced Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Triplex-Tool-Lift', economy: 'Enhanced Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1500, economy: 1000, unit: 'daN', highlight: 'xpert' },
      mechanism: { label: 'Tensioning System', xpert: 'ChainLance', economy: 'Heavy-Duty Ratchet', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '25-50mm', economy: '25-50mm', highlight: 'both' },
      power: { label: 'Power Supply', xpert: '230V/400V', economy: '230V', highlight: 'xpert' },
      monitoring: { label: 'Load Monitoring', xpert: 'Real-Time IoT', economy: 'Visual Inspection', highlight: 'xpert' },
      automation: { label: 'Automation Level', xpert: 'Fully Automated', economy: 'Semi-Automatic', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-20°C to +50°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'CE, ISO 9001, cGMP', economy: 'CE, ISO 9001', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: '2-4 Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '90 Days', economy: '6-9 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Mission-Critical', economy: 'Professional Operations', highlight: 'none' },
    },
  },
  {
    id: 'economy-standard',
    name: 'E-conomy Line Standard',
    line: 'economy',
    tagline: 'Proven Reliability & Value',
    category: 'Standard Professional System',
    tension: 1000,
    features: [
      'Manual/Semi-Automatic Controls',
      'Standard Lift System',
      'Visual Guide Markers',
      'Reliable Ratchet System',
      '10+ Years Field Proven',
      'Minimal Maintenance',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Siemens Touchscreen', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Line-Laser', economy: 'Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Triplex-Tool-Lift', economy: 'Standard Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1500, economy: 1000, unit: 'daN', highlight: 'xpert' },
      mechanism: { label: 'Tensioning System', xpert: 'ChainLance', economy: 'Proven Ratchet', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '25-50mm', economy: '25-50mm', highlight: 'both' },
      power: { label: 'Power Supply', xpert: '230V/400V', economy: '230V', highlight: 'xpert' },
      monitoring: { label: 'Load Monitoring', xpert: 'Real-Time IoT', economy: 'Manual Inspection', highlight: 'xpert' },
      automation: { label: 'Automation Level', xpert: 'Fully Automated', economy: 'Manual/Semi-Auto', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-20°C to +50°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'CE, ISO 9001', economy: 'CE, ISO 9001', highlight: 'both' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '2 Years', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: 'Few Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '90 Days', economy: '6-12 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Mission-Critical', economy: 'Standard Operations', highlight: 'none' },
    },
  },
  {
    id: 'economy-entry',
    name: 'E-conomy Line Entry',
    line: 'economy',
    tagline: 'Essential Performance & Value',
    category: 'Entry Professional System',
    tension: 800,
    features: [
      'Manual Controls',
      'Basic Lift System',
      'Simple Operation',
      'Standard Ratchet',
      'Durable Construction',
      'Low Investment',
    ],
    specifications: {
      control: { label: 'Control Interface', xpert: 'Siemens Touchscreen', economy: 'Manual Controls', highlight: 'xpert' },
      positioning: { label: 'Positioning System', xpert: 'Line-Laser', economy: 'Basic Visual Guides', highlight: 'xpert' },
      lift: { label: 'Lifting Mechanism', xpert: 'Triplex-Tool-Lift', economy: 'Basic Mechanical', highlight: 'xpert' },
      tension: { label: 'Max Tension Force', xpert: 1500, economy: 800, unit: 'daN', highlight: 'xpert' },
      mechanism: { label: 'Tensioning System', xpert: 'ChainLance', economy: 'Standard Ratchet', highlight: 'xpert' },
      strapWidth: { label: 'Strap Width Range', xpert: '25-50mm', economy: '25-40mm', highlight: 'xpert' },
      power: { label: 'Power Supply', xpert: '230V/400V', economy: '230V', highlight: 'xpert' },
      monitoring: { label: 'Load Monitoring', xpert: 'Real-Time IoT', economy: 'Manual Only', highlight: 'xpert' },
      automation: { label: 'Automation Level', xpert: 'Fully Automated', economy: 'Manual', highlight: 'xpert' },
      temperature: { label: 'Operating Range', xpert: '-20°C to +60°C', economy: '-10°C to +40°C', highlight: 'xpert' },
      certification: { label: 'Certifications', xpert: 'CE, ISO 9001', economy: 'CE', highlight: 'xpert' },
      warranty: { label: 'Warranty Period', xpert: '3 Years', economy: '1 Year', highlight: 'xpert' },
      training: { label: 'Training Required', xpert: '1-2 Days', economy: '1-2 Hours', highlight: 'economy' },
      roi: { label: 'Typical ROI', xpert: '90 Days', economy: '12-18 Months', highlight: 'xpert' },
      idealFor: { label: 'Best Suited For', xpert: 'Mission-Critical', economy: 'Basic Operations', highlight: 'none' },
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
