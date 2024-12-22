export enum CalculationFormat {
  PERCENTAGE_OF = 'percentage_of',
  RATIO_TO_PERCENT = 'ratio_to_percent',
  OUT_OF_PERCENTAGE = 'out_of_percentage',
  PERCENT_DIFFERENCE = 'percent_difference',
  IS_WHAT_PERCENT = 'is_what_percent',
  PERCENT_OFF = 'percent_off'
}

export interface Calculation {
  id: string;
  formatType: CalculationFormat;
  valueX: number;
  valueY: number;
  result: number;
  slug: string;
  createdAt: Date;
  lastAccessedAt?: Date;
  accessCount: number;
  isAutomated: boolean;
  calculationSteps: CalculationStep[];
  relatedFormats: RelatedFormat[];
}

export interface CalculationStep {
  stepNumber: number;
  description: string;
  formula?: string;
  intermediateResult?: number;
}

export interface RelatedFormat {
  formatType: CalculationFormat;
  slug: string;
  description: string;
  result: number;
}
