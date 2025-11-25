import { ComprehensiveProduct } from './comprehensive-products';

// ErgoPack GO - Economy Portable System
export const ergoPackGO: ComprehensiveProduct = {
  id: 'GO',
  name: 'ErgoPack GO',
  tagline: 'Mobile & Ergonomic Portable Pallet Strapping System',
  description:
    'GO Line economy portable strapping system. Flexible operation across multiple locations with 24V battery technology.',
  line: 'economy', // Grouping under economy broadly, or I could add 'go' type
  specifications: {
    line: 'Economy Line', // Or 'GO Line'
    model: 'GO',
    generation: '1',
    tariffNr: '842240',
    dimensions: {
      length: 630,
      width: 770,
      height: 1200,
      unit: 'mm',
    },
    weight: 90,
    weightUnit: 'kg',
    palletWidth: {
      min: 30,
      max: 240,
      unit: 'cm',
    },
    palletHeight: {
      min: 10,
      max: 230,
      unit: 'cm',
    },
    chainSpeed: '40m/min',
    chainLength: 'Standard 6m',
    control: 'Electrically via joystick',
    settingsChange: 'With pin',
  },
  battery: {
    type: '24V lead-fleece battery',
    weight: 12.3,
    loadingTime: '8-10 hours',
    voltage: '24V',
    strappingCycles: 350,
    chargingStation: {
      type: '3-stage lead loader',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Max. 60W',
      powerSupply: '2x 12V DC/2A',
    },
  },
  features: [
    'Portable strapping solution',
    'Flexible operation across multiple locations',
    '40m/min chain speed',
    '350 strapping cycles per charge',
    'Electric joystick control',
    'AGR certified ergonomic design',
    '24V lead-fleece battery included',
    'Mobile and versatile',
  ],
  materialCompatibility: ['Polypropylene (PP)', 'Polyester (PET)'],
  includedAccessories: [
    {
      id: 'sledge-85',
      name: 'Standard Sledge 85',
      description: 'For clearance height >95mm',
      category: 'included',
      details: ['Included in base system'],
    },
    {
      id: 'battery-charger',
      name: '24V Battery & Charger',
      description: '24V lead-fleece battery with charger',
      category: 'included',
      details: ['350 cycles per charge'],
    },
  ],
  optionalAccessories: [],
  certifications: {
    iso12100: true,
    euDeclaration: true,
    agr: true,
  },
  applications: ['Portable strapping operations', 'Flexible warehouse use', 'Low to medium volume'],
  images: {
    hero: '/images/products/GO/1.png',
    gallery: ['/images/products/GO/1.png', '/images/products/GO/2.png'],
    accessories: [],
    applications: [],
  },
};
