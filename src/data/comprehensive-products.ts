// Comprehensive Product Data Structure
// Extracted from Model Overview PDFs and Technical Datasheets

export interface ProductAccessory {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: 'included' | 'optional';
  details?: string[];
}

export interface ProductSpecifications {
  line: 'Economy Line' | 'X-pert Line';
  model: string;
  generation?: string;
  tariffNr: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'mm';
  };
  weight: number;
  weightUnit: 'kg';
  palletWidth: {
    min: number;
    max: number;
    unit: 'cm';
  };
  palletHeight: {
    min: number;
    max: number;
    unit: 'cm';
  };
  chainSpeed: string;
  chainLength: string;
  control: string;
  settingsChange: string;
}

export interface BatteryInfo {
  type: string;
  weight: number;
  loadingTime: string;
  voltage: string;
  strappingCycles: number;
  chargingStation?: {
    type: string;
    operatingVoltage: string;
    powerConsumption: string;
    powerSupply: string;
  };
}

export interface ProductCertifications {
  iso12100?: boolean;
  euDeclaration?: boolean;
  agr?: boolean;
}

export interface ComprehensiveProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  line: 'economy' | 'xpert';
  specifications: ProductSpecifications;
  battery?: BatteryInfo;
  features: string[];
  materialCompatibility?: string[];
  includedAccessories: ProductAccessory[];
  optionalAccessories: ProductAccessory[];
  certifications: ProductCertifications;
  applications: string[];
  images: {
    hero: string;
    gallery: string[];
    accessories: string[];
    applications: string[];
  };
}

// ErgoPack 700 - Manual Hand-Crank System
export const ergoPack700: ComprehensiveProduct = {
  id: '700',
  name: 'ErgoPack 700',
  tagline: 'Manual Hand-Crank Pallet Strapping System',
  description: 'Cost-effective manual strapping solution with no battery required. Perfect for operations seeking reliable, economical pallet strapping with zero electricity costs.',
  line: 'economy',
  specifications: {
    line: 'Economy Line',
    model: '700',
    tariffNr: '842240',
    dimensions: {
      length: 630,
      width: 770,
      height: 1200,
      unit: 'mm',
    },
    weight: 64.4,
    weightUnit: 'kg',
    palletWidth: {
      min: 30,
      max: 255,
      unit: 'cm',
    },
    palletHeight: {
      min: 10,
      max: 230,
      unit: 'cm',
    },
    chainSpeed: 'Hand Crank',
    chainLength: 'Standard 6m',
    control: 'Hand Crank',
    settingsChange: 'With Pin',
  },
  features: [
    'No battery required - zero electricity costs',
    'Manual hand-crank operation for complete control',
    'Multi-material compatibility (PP, PET, Paper, Cord, Composite)',
    'AGR certified ergonomic design',
    'Mobile and compact design',
    'Robust steel construction',
    'Wide pallet flexibility: 30-255cm width',
    'Height range: 10-230cm',
    'Standard 6m chain included',
    'Pin-based width adjustment',
    'Coil diameter compatibility: 406, 400, 200mm',
    'Low maintenance requirements',
    'Ideal for low-volume operations',
    'No charging downtime',
  ],
  materialCompatibility: [
    'Polypropylene (PP)',
    'Polyester (PET)',
    'Paper strap',
    'Cord strap',
    'Composite strap',
  ],
  includedAccessories: [
    {
      id: 'sledge-85',
      name: 'Standard Sledge 85',
      description: 'For clearance height >95mm',
      category: 'included',
      details: ['Included in base system', 'Suitable for EPAL and equivalent pallets'],
    },
  ],
  optionalAccessories: [
    {
      id: 'sledge-47',
      name: 'Sledge 47',
      description: 'For pallets with clearance height 55mm to 95mm',
      category: 'optional',
      details: ['Lower clearance height compatibility', 'Minimum clearance: 55mm'],
    },
    {
      id: 'sledge-47s',
      name: 'Sledge 47S',
      description: 'For pallets with narrow entry, 160mm in width',
      category: 'optional',
      details: ['Narrow pallet entry', '160mm width design'],
    },
    {
      id: 'sledge-85l',
      name: 'Sledge 85L',
      description: 'Extended skid for lower runner heights up to 40mm',
      category: 'optional',
      details: ['For very low clearance', 'Down to 40mm runner height'],
    },
    {
      id: 'strap-brake-relief',
      name: 'Strap-Brake-Relief',
      description: 'For pallets higher than 120cm - provides relief in pulling out strap',
      category: 'optional',
      details: ['Recommended for pallets >120cm', 'Eases strap extraction'],
    },
    {
      id: 'headpiece-bumper',
      name: 'Headpiece with Bumper',
      description: 'For pallets with an overhang of max. 40mm',
      category: 'optional',
      details: ['Bumper to pass overhang', 'Max 40mm overhang'],
    },
    {
      id: 'mohm',
      name: 'Mobile Overheight Module (MOHM)',
      description: 'For pallets higher than 230cm, up to 305cm',
      category: 'optional',
      details: ['Extends height capacity to 305cm', 'Mobile design'],
    },
    {
      id: 'additional-chain',
      name: 'Additional Chain',
      description: 'Extra chain length for larger pallets',
      category: 'optional',
      details: ['Extends strapping capacity', 'Compatible with standard chain system'],
    },
    {
      id: 'mobile-sledge-tunnel',
      name: 'Mobile Sledge Tunnel (Pair)',
      description: 'For goods strapped on scantlings',
      category: 'optional',
      details: ['One pair includes two tunnels', 'For non-standard load configurations'],
    },
    {
      id: 'stationary-sledge-tunnel',
      name: 'Stationary Sledge Tunnel',
      description: 'Adjustable sledge tunnel for different widths',
      category: 'optional',
      details: ['Fixed installation option', 'Adjustable for various widths'],
    },
  ],
  certifications: {
    agr: true,
  },
  applications: [
    'Low to medium volume operations',
    'Warehouse and logistics centers',
    'Manufacturing facilities',
    'Distribution centers',
    'Retail back-of-house operations',
    'Export packaging',
    'Various pallet configurations',
    'Coil and cylindrical goods',
    'Boxed products',
    'Oversized items with MOHM',
  ],
  images: {
    hero: '/images/products/700/2.jpg',
    gallery: [
      '/images/products/700/1.png',
      '/images/products/700/2.jpg',
      '/images/products/700/16.jpg',
      '/images/products/700/17.jpg',
    ],
    accessories: [
      '/images/products/700/18.png', // Sledge
      '/images/products/700/19.png', // Application examples
    ],
    applications: [
      '/images/products/700/20.png',
      '/images/products/700/21.png',
      '/images/products/700/22.png',
      '/images/products/700/23.png',
      '/images/products/700/24.png',
      '/images/products/700/25.png',
      '/images/products/700/26.png',
      '/images/products/700/27.png',
    ],
  },
};

// ErgoPack 700E - Economy Line Battery System
export const ergoPack700E: ComprehensiveProduct = {
  id: '700E',
  name: 'ErgoPack 700E',
  tagline: 'Multi-Material Battery Strapping System',
  description: 'Economy Line battery-powered strapping system with 40m/min speed and 350 cycles per charge. Multi-material compatibility for versatile packaging operations.',
  line: 'economy',
  specifications: {
    line: 'Economy Line',
    model: '700E',
    generation: '2',
    tariffNr: '842240',
    dimensions: {
      length: 6300,
      width: 7700,
      height: 1200,
      unit: 'mm',
    },
    weight: 88.1,
    weightUnit: 'kg',
    palletWidth: {
      min: 30,
      max: 255,
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
    '40m/min chain speed for efficient operation',
    '350 strapping cycles per charge',
    'Electric joystick control for easy operation',
    'Multi-material compatibility (PP, PET, Paper, Cord, Composite)',
    'AGR certified ergonomic design',
    '24V lead-fleece battery included',
    '3-stage charging station included',
    '8-10 hour charge time',
    'Generation 2 technology',
    'Mobile and versatile',
    'Pin-based width adjustment (Pallet width + 20cm)',
    'Optional sealing head available',
    'Optional tool-lift for added convenience',
    'Optional Triplex-Tool-Lift for low pallets (down to 10cm)',
    'Coil diameter compatibility: 406, 400, 200mm',
    'ISO 12100:2010 certified',
    'EU Declaration of Conformity',
  ],
  materialCompatibility: [
    'Polypropylene (PP)',
    'Polyester (PET)',
    'Paper strap',
    'Cord strap',
    'Composite strap',
  ],
  includedAccessories: [
    {
      id: 'sledge-85',
      name: 'Standard Sledge 85',
      description: 'For clearance height >95mm',
      category: 'included',
      details: ['Included in base system', 'Suitable for EPAL and equivalent pallets'],
    },
    {
      id: 'battery-charger',
      name: '24V Battery & 3-Stage Charger',
      description: '24V lead-fleece battery with intelligent charging station',
      category: 'included',
      details: [
        '12.3 kg battery weight',
        '350 strapping cycles per charge',
        '8-10 hour charge time',
        '100-240V universal voltage',
        'Max 60W power consumption',
      ],
    },
    {
      id: 'joystick-control',
      name: 'Electric Joystick Control',
      description: 'Intuitive joystick for easy operation',
      category: 'included',
      details: ['Ergonomic design', 'Precise control', 'Video demonstration available'],
    },
  ],
  optionalAccessories: [
    {
      id: 'triplex-tool-lift',
      name: 'Triplex-Tool-Lift (TTL)',
      description: 'Ideal for pallets lower than 80cm, suitable for pallets as low as 10cm in height',
      category: 'optional',
      details: [
        'Three-stage lifting mechanism',
        'For low pallets down to 10cm',
        'Sealing head quick release included',
        'Video demonstration available',
      ],
    },
    {
      id: 'standard-tool-lift',
      name: 'Standard Tool-Lift',
      description: 'For pallets >80cm with sealing head quick release',
      category: 'optional',
      details: ['Standard lifting mechanism', 'Quick release system', 'Ideal for taller pallets'],
    },
    {
      id: 'sealing-head',
      name: 'Sealing Head',
      description: 'Sealing head installed and mounted on system',
      category: 'optional',
      details: ['Professional sealing', 'Can be combined with tool-lift', 'Quick mount/dismount'],
    },
    {
      id: 'sealing-head-ttl-adapter',
      name: 'Sealing Head TTL Adapter',
      description: 'Adapter to release the sealing head from the Tool-Lift',
      category: 'optional',
      details: ['Quick release mechanism', 'Compatible with TTL'],
    },
    {
      id: 'line-laser',
      name: 'Line-Laser Type 2',
      description: 'For optimal system positioning',
      category: 'optional',
      details: ['Precise positioning guidance', 'Video demonstration available'],
    },
    {
      id: 'sledge-47',
      name: 'Sledge 47',
      description: 'For pallets with clearance height 55mm to 95mm',
      category: 'optional',
      details: ['Lower clearance height', 'Minimum 55mm clearance'],
    },
    {
      id: 'sledge-47s',
      name: 'Sledge 47S',
      description: 'For pallets with narrow entry, 160mm in width',
      category: 'optional',
      details: ['Narrow entry design', '160mm width'],
    },
    {
      id: 'sledge-85l',
      name: 'Sledge 85L',
      description: 'Extended skid for lower runner heights up to 40mm',
      category: 'optional',
      details: ['Very low clearance', 'Down to 40mm'],
    },
    {
      id: 'strap-brake-relief',
      name: 'Strap-Brake-Relief',
      description: 'For pallets higher than 120cm - relief in pulling out strap',
      category: 'optional',
      details: ['For tall pallets >120cm', 'Eases strap extraction'],
    },
    {
      id: 'headpiece-bumper',
      name: 'Headpiece with Bumper',
      description: 'For pallets with an overhang of max. 40mm',
      category: 'optional',
      details: ['Bumper passes overhang', 'Max 40mm overhang'],
    },
    {
      id: 'spare-battery',
      name: 'Spare Battery',
      description: 'Additional 24V battery optimal for multiple shifts',
      category: 'optional',
      details: ['24V lead-fleece', '350 cycles', 'Seamless shift changeover'],
    },
    {
      id: 'mohm',
      name: 'Mobile Overheight Module (MOHM)',
      description: 'For pallets higher than 230cm, up to 305cm',
      category: 'optional',
      details: ['Extends to 305cm', 'Mobile design'],
    },
    {
      id: 'additional-chain',
      name: 'Additional Chain',
      description: 'Up to 2m extra chain, 8m total',
      category: 'optional',
      details: ['Extends to 8m total', 'For wider pallets'],
    },
    {
      id: 'mobile-sledge-tunnel',
      name: 'Mobile Sledge Tunnel (Pair)',
      description: 'For goods strapped on scantlings - one pair includes two tunnels',
      category: 'optional',
      details: ['Two tunnels per pair', 'For scantling loads'],
    },
    {
      id: 'stationary-sledge-tunnel',
      name: 'Stationary Sledge Tunnel',
      description: 'Adjustable sledge tunnel for different widths',
      category: 'optional',
      details: ['Fixed installation', 'Adjustable width'],
    },
  ],
  certifications: {
    iso12100: true,
    euDeclaration: true,
    agr: true,
  },
  applications: [
    'Medium to high volume operations',
    'Warehouse and logistics centers',
    'Manufacturing facilities',
    'Distribution centers',
    'Multi-shift operations',
    'Export packaging',
    'Versatile material handling',
    'Various pallet configurations',
    'Mixed-material strapping operations',
  ],
  images: {
    hero: '/images/products/700E/18.png',
    gallery: [
      '/images/products/700E/1.png',
      '/images/products/700E/2.jpg',
      '/images/products/700E/18.png',
      '/images/products/700E/19.jpg',
    ],
    accessories: [
      '/images/products/700E/11.jpg',
      '/images/products/700E/12.jpg',
    ],
    applications: [
      '/images/products/700E/20.png',
      '/images/products/700E/21.png',
      '/images/products/700E/22.png',
      '/images/products/700E/23.png',
      '/images/products/700E/24.png',
      '/images/products/700E/25.png',
      '/images/products/700E/26.png',
      '/images/products/700E/27.png',
      '/images/products/700E/28.png',
      '/images/products/700E/29.png',
    ],
  },
};

export const allComprehensiveProducts = {
  '700': ergoPack700,
  '700E': ergoPack700E,
  // More products will be added as we process their PDFs
};
