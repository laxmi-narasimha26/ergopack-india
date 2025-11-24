// Comparison data types for ErgoPackIndia products

export interface SystemSpecifications {
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  weight: number;
  weightUnit: string;
  construction?: string;
  materials?: string[];
}

export interface FlexibilitySpecs {
  palletWidth: {
    min: number;
    max: number;
    unit: string;
  };
  palletHeight: {
    min: number;
    max: number;
    unit: string;
  };
  adjustability?: string[];
}

export interface PerformanceMetrics {
  chainSpeed?: number;
  chainSpeedUnit?: string;
  standardChainLength: number;
  chainLengthUnit: string;
  operationType?: string;
  efficiency?: string;
  cycleTime?: string;
}

export interface PowerBattery {
  type: string;
  weight?: number;
  weightUnit?: string;
  loadingTime?: number | { min: number; max: number; unit: string };
  loadingTimeUnit?: string;
  voltageNominal?: number;
  voltageUnit?: string;
  capacityNominal?: number;
  capacityUnit?: string;
  strappingCycles?: number;
  runtime?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

export interface SealingStrapping {
  tensionPower?: {
    min: number;
    max: number;
    unit: string;
  };
  strapWidth?: {
    min: number;
    max: number;
    unit: string;
  };
  strapThickness?: {
    min: number;
    max: number;
    unit: string;
  };
  strapMaterials: string[];
  mounting?: string;
  availability?: string;
  included?: boolean;
  sealingMethod?: string;
}

export interface ControlDisplay {
  interfaceType?: string;
  touchscreen?: boolean;
  touchscreenType?: string;
  displayType?: string;
  indicators?: string[];
  controls?: string[];
  automation?: string;
}

export interface SafetyErgonomics {
  certifications: string[];
  safetyFeatures?: string[];
  ergonomicFeatures?: string[];
  agrCertified: boolean;
  complianceStandards?: string[];
}

export interface FeaturesAccessories {
  included: string[];
  optional?: string[];
  compatibility?: {
    [key: string]: string | boolean;
  };
}

export interface Environmental {
  operatingTemperature?: {
    min: number;
    max: number;
    unit: string;
  };
  storageTemperature?: {
    min: number;
    max: number;
    unit: string;
  };
  humidity?: string;
  noiseLevel?: {
    value: number;
    unit: string;
  };
  dustProtection?: string;
  weatherResistance?: string;
}

export interface Maintenance {
  serviceInterval?: string;
  userMaintenance?: string[];
  professionalService?: string[];
  spareParts?: string[];
  warranty?: string;
}

export interface ComparisonData {
  systemSpecs: SystemSpecifications;
  flexibility: FlexibilitySpecs;
  performance: PerformanceMetrics;
  powerBattery: PowerBattery;
  sealingStrapping: SealingStrapping;
  controlDisplay: ControlDisplay;
  safetyErgonomics: SafetyErgonomics;
  featuresAccessories: FeaturesAccessories;
  environmental?: Environmental;
  maintenance?: Maintenance;
}

export interface Product {
  model: string;
  fullName: string;
  image: string;
  line: string;
  generation: number;
  tariffNumber: string;
  description: string;
  applicationType: string;
  htmlPage: string;
  pdfPath: string;
  overviewPath: string;
  comparison: ComparisonData;
}

export interface ComparisonMatrix {
  products: Product[];
  categories: ComparisonCategory[];
  metadata: {
    totalDifferences: number;
    totalSimilarities: number;
    comparisonDate: string;
  };
}

export interface ComparisonCategory {
  name: string;
  displayName: string;
  attributes: ComparisonAttribute[];
}

export interface ComparisonAttribute {
  key: string;
  label: string;
  values: Record<string, string | number | boolean | null>;
  isDifferent: boolean;
  bestValue?: string; // product model with best value
  unit?: string;
  description?: string;
}

export type FilterMode = 'all' | 'differences' | 'similarities';

export interface ComparisonState {
  selectedProducts: string[];
  filterMode: FilterMode;
  expandedCategories: string[];
}
