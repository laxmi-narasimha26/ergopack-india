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
  strapMaterials?: string[];
  strapWidth?: string;
  strapThickness?: string;
  coilDiameters?: string[];
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
  line: 'economy' | 'xpert' | 'xpert-lfp-india';
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
  price?: number;
  sealingHead?: any;
  useCases?: any[];
  videoLinks?: string[];
  resources?: any;
  pdfPath?: string;
}

// ErgoPack 700 - Manual Hand-Crank System
export const ergoPack700: ComprehensiveProduct = {
  id: '700',
  name: 'ErgoPack 700',
  tagline: 'Manual Hand-Crank Pallet Strapping System',
  description:
    'Cost-effective manual strapping solution with no battery required. Perfect for operations seeking reliable, economical pallet strapping with zero electricity costs.',
  line: 'economy',
  pdfPath: '/pdfs/700_Technical_Data.pdf',
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
    hero: '/images/products/700.png',
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
  description:
    'Economy Line battery-powered strapping system with 40m/min speed and 350 cycles per charge. Multi-material compatibility for versatile packaging operations.',
  line: 'economy',
  specifications: {
    line: 'Economy Line',
    model: '700E',
    generation: '2',
    tariffNr: '842240',
    dimensions: {
      length: 630,
      width: 770,
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
      description:
        'Ideal for pallets lower than 80cm, suitable for pallets as low as 10cm in height',
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
    hero: '/images/products/700e.png',
    gallery: [
      '/images/products/700E/1.png',
      '/images/products/700E/2.jpg',
      '/images/products/700E/18.png',
      '/images/products/700E/19.jpg',
    ],
    accessories: ['/images/products/700E/11.jpg', '/images/products/700E/12.jpg'],
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

// ErgoPack 700X Li - X-pert Line Premium System
export const ergoPack700X: ComprehensiveProduct = {
  id: '700X',
  name: 'ErgoPack 700X Li',
  tagline: 'Premium Lithium-Ion Pallet Strapping System',
  description:
    'X-pert Line premium strapping system with advanced Lithium-Ion battery delivering up to 1200 cycles and 66m/min speed. Features Siemens Industry Touchscreen and premium ergonomic design for high-volume operations.',
  line: 'xpert',
  specifications: {
    line: 'X-pert Line',
    model: '700X Li',
    generation: '2',
    tariffNr: '842240',
    dimensions: {
      length: 665,
      width: 770,
      height: 1200,
      unit: 'mm',
    },
    weight: 95,
    weightUnit: 'kg',
    palletWidth: {
      min: 40,
      max: 270,
      unit: 'cm',
    },
    palletHeight: {
      min: 10,
      max: 230,
      unit: 'cm',
    },
    chainSpeed: '66m/min',
    chainLength: 'Standard 6m',
    control: 'Electrically via joystick',
    settingsChange: 'Siemens industry touchscreen',
  },
  battery: {
    type: 'Lithium-Ion',
    weight: 5,
    loadingTime: '~3.5 hours',
    voltage: '36.3V',
    strappingCycles: 1200,
    chargingStation: {
      type: 'Wide-range charger',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Up to ~650W',
      powerSupply: 'Up to 10A',
    },
  },
  features: [
    '66m/min chain speed - 65% faster than Economy Line',
    'Up to 1200 strapping cycles per charge - 3.4x more than Economy',
    'Premium Lithium-Ion battery - only 5kg weight',
    'Ultra-fast 3.5 hour charge time',
    'Siemens Industry Touchscreen display for advanced control',
    'Easy change of settings via touchscreen interface',
    'Electric joystick control for precise operation',
    'Multi-material compatibility (PP, PET, Paper, Cord, Composite)',
    'AGR certified ergonomic design',
    'Generation 2 premium technology',
    'Wide-range universal charger included',
    'Mobile and highly maneuverable design',
    'Extended pallet width range: 40-270cm',
    'Touchscreen-based width adjustment',
    'Optional sealing head with quick release',
    'Optional tool-lift systems (Standard & Triplex)',
    'Optional Easy Move Assistant for enhanced mobility',
    'Optional screen protector for display protection',
    'Coil diameter compatibility: 406, 400, 200mm',
    'ISO 12100:2010 certified',
    'EU Declaration of Conformity',
    'Battery capacity: 24.15Ah at 36.3V',
    'Optimal for high-volume multi-shift operations',
    'Premium X-pert Line quality and performance',
    'Lightweight battery system vs. lead-fleece alternatives',
    'Fast-charging technology for minimal downtime',
    'Professional-grade Siemens industrial controls',
    'Video tutorials available for key features',
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
      id: 'siemens-touchscreen',
      name: 'Siemens Industry Touchscreen',
      description: 'Advanced industrial touchscreen control system',
      category: 'included',
      details: [
        'Easy change of settings',
        'Set pallet width digitally',
        'Professional Siemens industrial-grade display',
        'Intuitive user interface',
        'Video demonstration available',
      ],
    },
    {
      id: 'joystick-control',
      name: 'Electric Joystick Control',
      description: 'Precision electric joystick for easy operation',
      category: 'included',
      details: ['Ergonomic design', 'Precise control', 'Video demonstration available'],
    },
    {
      id: 'lithium-battery-charger',
      name: 'Lithium-Ion Battery & Wide-Range Charger',
      description: 'Premium lithium-ion battery with fast-charging station',
      category: 'included',
      details: [
        '5 kg battery weight (60% lighter than lead-fleece)',
        'Up to 1200 strapping cycles per charge',
        '~3.5 hour fast charge time',
        '36.3V / 24.15Ah capacity',
        '100-240V universal voltage compatibility',
        'Up to 650W power consumption',
        'Wide-range charger included',
      ],
    },
  ],
  optionalAccessories: [
    {
      id: 'triplex-tool-lift',
      name: 'Triplex-Tool-Lift (TTL)',
      description:
        'Ideal for pallets lower than 80cm, suitable for pallets as low as 10cm in height',
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
      details: [
        'Standard lifting mechanism',
        'Quick release system',
        'Ideal for taller pallets',
        'Video demonstration available',
      ],
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
      name: 'Sledge 85L (47L)',
      description: 'Extended skid for lower runner heights up to 40mm',
      category: 'optional',
      details: ['Very low clearance', 'Down to 40mm'],
    },
    {
      id: 'strap-brake-relief',
      name: 'Strap-Brake-Relief',
      description: 'For pallets higher than 120cm - relief in pulling out strap',
      category: 'optional',
      details: [
        'For tall pallets >120cm',
        'Eases strap extraction',
        'Video demonstration available',
      ],
    },
    {
      id: 'headpiece-bumper',
      name: 'Headpiece with Bumper',
      description: 'For pallets with an overhang of max. 40mm',
      category: 'optional',
      details: ['Bumper passes overhang', 'Max 40mm overhang', 'Video demonstration available'],
    },
    {
      id: 'easy-move-assistant',
      name: 'Easy Move Assistant',
      description: 'Premium mobility enhancement for easier machine handling',
      category: 'optional',
      details: [
        'X-pert Line exclusive feature',
        'For easier handling of machine',
        'More ergonomic for longer distances',
        'Enhanced mobility and maneuverability',
      ],
    },
    {
      id: 'spare-battery',
      name: 'Spare Lithium-Ion Battery',
      description: 'Additional lithium-ion battery optimal for multiple shifts',
      category: 'optional',
      details: [
        'Premium Lithium-Ion technology',
        'Up to 1200 cycles',
        'Seamless shift changeover',
        'Only 5kg weight',
      ],
    },
    {
      id: 'mohm',
      name: 'Mobile Overheight Module (MOHM)',
      description: 'For pallets higher than 230cm, up to 305cm',
      category: 'optional',
      details: ['Extends to 305cm', 'Mobile design', 'Video demonstration available'],
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
      details: ['Two tunnels per pair', 'For scantling loads', 'Video demonstration available'],
    },
    {
      id: 'stationary-sledge-tunnel',
      name: 'Stationary Sledge Tunnel',
      description: 'Adjustable sledge tunnel for different widths',
      category: 'optional',
      details: ['Fixed installation', 'Adjustable width', 'Video demonstration available'],
    },
    {
      id: 'screen-protector',
      name: 'Screen Protector',
      description: 'Protect the Siemens touchscreen display from damages',
      category: 'optional',
      details: [
        'X-pert Line exclusive accessory',
        'Protects premium touchscreen',
        'Easy installation',
      ],
    },
    {
      id: 'battery-trolley',
      name: 'Ergonomic Battery Change Trolley',
      description: 'For easy and ergonomic exchange of the battery',
      category: 'optional',
      details: ['Ergonomic design', 'Facilitates battery change', 'Reduces physical strain'],
    },
  ],
  certifications: {
    iso12100: true,
    euDeclaration: true,
    agr: true,
  },
  applications: [
    'High volume operations',
    'Logistics centers',
    'Manufacturing facilities',
    'Multi-shift operations',
    'Export packaging',
    'Versatile material handling',
    'Various pallet configurations',
    'Mixed-material strapping operations',
  ],
  images: {
    hero: '/images/products/700x.png',
    gallery: ['/images/products/700X/1.png', '/images/products/700X/2.jpg'],
    accessories: [],
    applications: [],
  },
};

// ErgoPack 713X LFP - X-pert Line Premium System (9-13mm)
export const ergoPack713XLFP: ComprehensiveProduct = {
  id: '713XLFP',
  name: 'ErgoPack 713X LFP',
  tagline: '🇮🇳 Premium LFP Technology - Exclusively for India',
  description: 'India-exclusive ultra-light strapping system with advanced LFP battery technology. Perfect for Indian operations requiring 600 cycles per charge with 8-hour charging. Safest lithium chemistry engineered for local conditions.',
  line: 'xpert-lfp-india',
  specifications: {
    line: 'X-pert Line',
    model: '713X LFP',
    generation: '2',
    tariffNr: '842240',
    dimensions: {
      length: 665,
      width: 770,
      height: 1200,
      unit: 'mm',
    },
    weight: 95,
    weightUnit: 'kg',
    palletWidth: {
      min: 40,
      max: 270,
      unit: 'cm',
    },
    palletHeight: {
      min: 10,
      max: 230,
      unit: 'cm',
    },
    chainSpeed: '66m/min',
    chainLength: 'Standard 6m',
    control: 'Electrically via joystick',
    settingsChange: 'Siemens industry touchscreen',
    strapWidth: '9-13mm',
  },
  battery: {
    type: 'Lithium-Iron-Phosphate (LFP)',
    weight: 5,
    loadingTime: '8 hours',
    voltage: '24V',
    strappingCycles: 600,
    chargingStation: {
      type: 'Standard charger',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Max. 60W',
      powerSupply: '2x 12V DC/2A',
    },
  },
  features: [
    'Optimized for 9-13mm strap widths',
    'Advanced LFP Battery Technology - Safest lithium chemistry',
    'Longer cycle life compared to standard Li-Ion',
    '66m/min chain speed',
    'Up to 1200 strapping cycles per charge',
    'Siemens Industry Touchscreen display',
    'Electric joystick control',
    'AGR certified ergonomic design',
    'Wide-range universal charger included',
    'Mobile and highly maneuverable',
    'Touchscreen-based width adjustment',
    'Optional sealing head with quick release',
    'Optional tool-lift systems',
    'ISO 12100:2010 certified',
    'EU Declaration of Conformity',
  ],
  materialCompatibility: ['Polypropylene (PP)', 'Polyester (PET)'],
  includedAccessories: [
    {
      id: 'sledge-85',
      name: 'Standard Sledge 85',
      description: 'For clearance height >95mm',
      category: 'included',
      details: ['Included in base system', 'Suitable for EPAL and equivalent pallets'],
    },
    {
      id: 'siemens-touchscreen',
      name: 'Siemens Industry Touchscreen',
      description: 'Advanced industrial touchscreen control system',
      category: 'included',
      details: [
        'Easy change of settings',
        'Set pallet width digitally',
        'Professional Siemens display',
      ],
    },
    {
      id: 'joystick-control',
      name: 'Electric Joystick Control',
      description: 'Precision electric joystick for easy operation',
      category: 'included',
      details: ['Ergonomic design', 'Precise control'],
    },
    {
      id: 'lfp-battery-charger',
      name: 'LFP Battery & Wide-Range Charger',
      description: 'Premium LFP battery with fast-charging station',
      category: 'included',
      details: [
        '5 kg battery weight',
        'Up to 1200 strapping cycles',
        '~3.5 hour fast charge time',
        'Superior safety profile',
      ],
    },
  ],
  optionalAccessories: [
    {
      id: 'triplex-tool-lift',
      name: 'Triplex-Tool-Lift (TTL)',
      description:
        'Ideal for pallets lower than 80cm, suitable for pallets as low as 10cm in height',
      category: 'optional',
      details: ['Three-stage lifting mechanism', 'For low pallets down to 10cm'],
    },
    {
      id: 'standard-tool-lift',
      name: 'Standard Tool-Lift',
      description: 'For pallets >80cm with sealing head quick release',
      category: 'optional',
      details: ['Standard lifting mechanism', 'Quick release system'],
    },
    {
      id: 'sealing-head',
      name: 'Sealing Head',
      description: 'Sealing head installed and mounted on system',
      category: 'optional',
      details: ['Professional sealing', 'Can be combined with tool-lift'],
    },
    {
      id: 'line-laser',
      name: 'Line-Laser Type 2',
      description: 'For optimal system positioning',
      category: 'optional',
      details: ['Precise positioning guidance'],
    },
  ],
  certifications: {
    iso12100: true,
    euDeclaration: true,
    agr: true,
  },
  applications: [
    'High volume operations',
    'Logistics centers',
    'Manufacturing facilities',
    'Multi-shift operations',
    'Operations requiring 9-13mm straps',
  ],
  images: {
    hero: '/images/products/700X.png',
    gallery: ['/images/products/700X/1.png', '/images/products/700X/2.jpg'],
    accessories: [],
    applications: [],
  },
};

// ErgoPack 726X LFP - X-pert Line Premium System (13-16mm)
export const ergoPack726XLFP: ComprehensiveProduct = {
  id: '726XLFP',
  name: 'ErgoPack 726X LFP',
  tagline: '🇮🇳 Premium LFP Technology - Exclusively for India',
  description: 'India-exclusive compact strapping system with LFP battery technology. Ideal for Indian warehouses requiring 600 cycles and 8-hour charging. Premium safety and reliability engineered for local conditions.',
  line: 'xpert-lfp-india',
  specifications: {
    line: 'X-pert Line',
    model: '726X LFP',
    generation: '2',
    tariffNr: '842240',
    dimensions: {
      length: 665,
      width: 770,
      height: 1200,
      unit: 'mm',
    },
    weight: 95,
    weightUnit: 'kg',
    palletWidth: {
      min: 40,
      max: 270,
      unit: 'cm',
    },
    palletHeight: {
      min: 10,
      max: 230,
      unit: 'cm',
    },
    chainSpeed: '66m/min',
    chainLength: 'Standard 6m',
    control: 'Electrically via joystick',
    settingsChange: 'Siemens industry touchscreen',
    strapWidth: '13-16mm',
  },
  battery: {
    type: 'Lithium-Iron-Phosphate (LFP)',
    weight: 5,
    loadingTime: '8 hours',
    voltage: '24V',
    strappingCycles: 600,
    chargingStation: {
      type: 'Standard charger',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Max. 60W',
      powerSupply: '2x 12V DC/2A',
    },
  },
  features: [
    'Optimized for 13-16mm strap widths',
    'Advanced LFP Battery Technology - Safest lithium chemistry',
    'Longer cycle life compared to standard Li-Ion',
    '66m/min chain speed',
    'Up to 1200 strapping cycles per charge',
    'Siemens Industry Touchscreen display',
    'Electric joystick control',
    'AGR certified ergonomic design',
    'Wide-range universal charger included',
    'Mobile and highly maneuverable',
    'Touchscreen-based width adjustment',
    'Optional sealing head with quick release',
    'Optional tool-lift systems',
    'ISO 12100:2010 certified',
    'EU Declaration of Conformity',
  ],
  materialCompatibility: ['Polypropylene (PP)', 'Polyester (PET)'],
  includedAccessories: [
    {
      id: 'sledge-85',
      name: 'Standard Sledge 85',
      description: 'For clearance height >95mm',
      category: 'included',
      details: ['Included in base system', 'Suitable for EPAL and equivalent pallets'],
    },
    {
      id: 'siemens-touchscreen',
      name: 'Siemens Industry Touchscreen',
      description: 'Advanced industrial touchscreen control system',
      category: 'included',
      details: [
        'Easy change of settings',
        'Set pallet width digitally',
        'Professional Siemens display',
      ],
    },
    {
      id: 'joystick-control',
      name: 'Electric Joystick Control',
      description: 'Precision electric joystick for easy operation',
      category: 'included',
      details: ['Ergonomic design', 'Precise control'],
    },
    {
      id: 'lfp-battery-charger',
      name: 'LFP Battery & Wide-Range Charger',
      description: 'Premium LFP battery with fast-charging station',
      category: 'included',
      details: [
        '5 kg battery weight',
        'Up to 1200 strapping cycles',
        '~3.5 hour fast charge time',
        'Superior safety profile',
      ],
    },
  ],
  optionalAccessories: [
    {
      id: 'triplex-tool-lift',
      name: 'Triplex-Tool-Lift (TTL)',
      description:
        'Ideal for pallets lower than 80cm, suitable for pallets as low as 10cm in height',
      category: 'optional',
      details: ['Three-stage lifting mechanism', 'For low pallets down to 10cm'],
    },
    {
      id: 'standard-tool-lift',
      name: 'Standard Tool-Lift',
      description: 'For pallets >80cm with sealing head quick release',
      category: 'optional',
      details: ['Standard lifting mechanism', 'Quick release system'],
    },
    {
      id: 'sealing-head',
      name: 'Sealing Head',
      description: 'Sealing head installed and mounted on system',
      category: 'optional',
      details: ['Professional sealing', 'Can be combined with tool-lift'],
    },
    {
      id: 'line-laser',
      name: 'Line-Laser Type 2',
      description: 'For optimal system positioning',
      category: 'optional',
      details: ['Precise positioning guidance'],
    },
  ],
  certifications: {
    iso12100: true,
    euDeclaration: true,
    agr: true,
  },
  applications: [
    'High volume operations',
    'Logistics centers',
    'Manufacturing facilities',
    'Multi-shift operations',
    'Operations requiring 13-16mm straps',
  ],
  images: {
    hero: '/images/products/700X.png',
    gallery: ['/images/products/700X/1.png', '/images/products/700X/2.jpg'],
    accessories: [],
    applications: [],
  },
};

// ErgoPack 700X LFP - X-pert Line Premium System (LFP)
export const ergoPack700XLFP: ComprehensiveProduct = {
  ...ergoPack700X,
  id: '700XLFP',
  name: 'ErgoPack 700X LFP',
  tagline: '🇮🇳 Premium LFP Technology - Exclusively for India',
  description: 'India-exclusive strapping system featuring advanced Lithium-Iron-Phosphate (LFP) battery technology - the safest lithium chemistry. Engineered specifically for Indian industrial conditions with 600 cycles per charge, 8-hour charging time, and superior thermal stability.',
  line: 'xpert-lfp-india',
  pdfPath: '/pdfs/700XLFP_Technical_Data.pdf',
  battery: {
    type: 'Lithium-Iron-Phosphate (LFP)',
    weight: 5,
    loadingTime: '8 hours',
    voltage: '24V',
    strappingCycles: 600,
    chargingStation: {
      type: 'Standard charger',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Max. 60W',
      powerSupply: '2x 12V DC/2A',
    },
  },
  features: [
    'LFP (Lithium-Iron-Phosphate) Battery - Safest lithium chemistry',
    '600 Strapping Cycles per Charge - Optimized for Indian operations',
    '8-Hour Charging Time - Full shift productivity',
    '66 m/min Chain Speed',
    '🇮🇳 Exclusively for India - Engineered for local conditions',
    'AGR Certified Ergonomic Design',
    'Superior Thermal Stability for Indian Climate',
  ],
};

// ErgoPack 713X - X-pert Line (9-13mm)
export const ergoPack713X: ComprehensiveProduct = {
  ...ergoPack700X,
  id: '713X',
  name: 'ErgoPack 713X',
  pdfPath: '/pdfs/713X_Technical_Data.pdf',
  specifications: {
    ...ergoPack700X.specifications,
    model: '713X',
    strapWidth: '9-13mm',
  },
};

// ErgoPack 713E - Economy Line (9-13mm)
export const ergoPack713E: ComprehensiveProduct = {
  ...ergoPack700E,
  id: '713E',
  name: 'ErgoPack 713E',
  pdfPath: '/pdfs/713E_Technical_Data.pdf',
  specifications: {
    ...ergoPack700E.specifications,
    model: '713E',
    strapWidth: '9-13mm',
  },
};

// ErgoPack 726X - X-pert Line (13-16mm)
export const ergoPack726X: ComprehensiveProduct = {
  ...ergoPack700X,
  id: '726X',
  name: 'ErgoPack 726X',
  pdfPath: '/pdfs/726X_Technical_Data.pdf',
  specifications: {
    ...ergoPack700X.specifications,
    model: '726X',
    strapWidth: '13-16mm',
  },
};

// ErgoPack 726E - Economy Line (13-16mm)
export const ergoPack726E: ComprehensiveProduct = {
  ...ergoPack700E,
  id: '726E',
  name: 'ErgoPack 726E',
  pdfPath: '/pdfs/726E_Technical_Data.pdf',
  specifications: {
    ...ergoPack700E.specifications,
    model: '726E',
    strapWidth: '13-16mm',
  },
};

// ErgoPack 745X - X-pert Line (16-19mm)
export const ergoPack745X: ComprehensiveProduct = {
  ...ergoPack700X,
  id: '745X',
  name: 'ErgoPack 745X',
  pdfPath: '/pdfs/745X_Technical_Data.pdf',
  specifications: {
    ...ergoPack700X.specifications,
    model: '745X',
    strapWidth: '16-19mm',
  },
};

// ErgoPack 745E - Economy Line (16-19mm)
export const ergoPack745E: ComprehensiveProduct = {
  ...ergoPack700E,
  id: '745E',
  name: 'ErgoPack 745E',
  pdfPath: '/pdfs/745E_Technical_Data.pdf',
  specifications: {
    ...ergoPack700E.specifications,
    model: '745E',
    strapWidth: '16-19mm',
  },
};

// ErgoPack 745X LFP - X-pert Line Premium System (LFP)
export const ergoPack745XLFP: ComprehensiveProduct = {
  ...ergoPack745X,
  id: '745XLFP',
  name: 'ErgoPack 745X LFP',
  tagline: '\ud83c\uddee\ud83c\uddf3 Premium LFP Technology - Exclusively for India',
  description: 'India-exclusive heavy-duty strapping system with LFP battery technology. Maximum power and safety with 600 cycles and 8-hour charging, engineered for demanding Indian industrial operations.',
  line: 'xpert-lfp-india',
  pdfPath: '/pdfs/745XLFP_Technical_Data.pdf',
  battery: {
    type: 'Lithium-Iron-Phosphate (LFP)',
    weight: 5,
    loadingTime: '8 hours',
    voltage: '24V',
    strappingCycles: 600,
    chargingStation: {
      type: 'Standard charger',
      operatingVoltage: '100-240V - 50/60Hz',
      powerConsumption: 'Max. 60W',
      powerSupply: '2x 12V DC/2A',
    },
  },
  features: [
    'LFP Battery - Maximum safety',
    '600 Cycles - India-optimized',
    '8-Hour Charging',
    'Heavy-Duty Performance',
    '\ud83c\uddee\ud83c\uddf3 Exclusively for India',
  ],
};

// ErgoPack GO - Economy Portable System
export const ergoPackGO: ComprehensiveProduct = {
  id: 'GO',
  name: 'ErgoPack GO',
  tagline: 'Mobile & Ergonomic Portable Pallet Strapping System',
  description:
    'GO Line economy portable strapping system. Flexible operation across multiple locations with 24V battery technology.',
  line: 'economy',
  pdfPath: '/pdfs/GO_Technical_Data.pdf',
  specifications: {
    line: 'Economy Line',
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

export const allComprehensiveProducts = [
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack700XLFP,
  ergoPack713E,
  ergoPack713X,
  ergoPack713XLFP,
  ergoPack726E,
  ergoPack726X,
  ergoPack726XLFP,
  ergoPack745E,
  ergoPack745X,
  ergoPack745XLFP,
  ergoPackGO,
];
