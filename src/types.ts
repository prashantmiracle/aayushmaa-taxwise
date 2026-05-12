export type TaxpayerType = 'salaried' | 'business' | 'freelancer' | 'pensioner' | 'mixed' | null;

export type AgeCategory = 'below60' | 'senior60to79' | 'superSenior80plus';

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
}

export interface RegimeConfig {
  slabs: TaxSlab[];
  standardDeduction: number;
  rebateLimit: number;
  rebateAmount: number;
}

export interface TaxYearConfig {
  year: string;
  newRegime: RegimeConfig;
  oldRegime: {
    below60: RegimeConfig;
    senior60to79: RegimeConfig;
    superSenior80plus: RegimeConfig;
  };
  cessRate: number;
}

export interface TaxInput {
  taxpayerType: TaxpayerType;
  ageCategory: AgeCategory;
  isResident: boolean;
  
  // Salaried
  annualGross?: number;
  monthlyInHand?: number;
  basicSalary?: number;
  hraReceived?: number;
  pfDeducted?: number;
  
  // Rent
  paysRent: boolean;
  monthlyRent?: number;
  cityType?: 'metro' | 'nonMetro';
  
  // Deductions (Old Regime)
  deduction80C: number;
  deduction80D: number;
  deductionNPS: number;
  homeLoanInterest: number;
  savingsInterest: number;
  
  // Business/Freelance
  businessTurnover?: number;
  businessProfit?: number;
  isPresumptive?: boolean;

  // Screening Flags
  hasCrypto?: boolean;
  hasForeignIncome?: boolean;
  hasCapitalGains?: boolean;
}

export const INITIAL_TAX_INPUT: TaxInput = {
  taxpayerType: null,
  ageCategory: 'below60',
  isResident: true,
  paysRent: false,
  deduction80C: 0,
  deduction80D: 0,
  deductionNPS: 0,
  homeLoanInterest: 0,
  savingsInterest: 0,
  hasCrypto: false,
  hasForeignIncome: false,
  hasCapitalGains: false,
};
