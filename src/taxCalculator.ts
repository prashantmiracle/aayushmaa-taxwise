import { TaxInput, TaxYearConfig, RegimeConfig } from './types';
import { TAX_CONFIG_2024_25 } from './historicalTaxConfig';

export interface CalculationResult {
  grossIncome: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  finalTax: number;
  deductions: {
    standard: number;
    other: number;
  };
  itrForm: 'ITR-1' | 'ITR-2' | 'ITR-3' | 'ITR-4';
  isComplex: boolean;
  slabsBreakdown: {
    slab: string;
    amount: number;
    rate: number;
    tax: number;
  }[];
}

export const getITRForm = (input: TaxInput): { form: CalculationResult['itrForm']; isComplex: boolean } => {
  let form: CalculationResult['itrForm'] = 'ITR-1';
  let isComplex = false;

  if (input.taxpayerType === 'business') {
    form = input.isPresumptive !== false ? 'ITR-4' : 'ITR-3';
  } else if (input.taxpayerType === 'freelancer') {
    form = input.isPresumptive !== false ? 'ITR-4' : 'ITR-3';
  }

  // Complexity overrides
  if (input.annualGross && input.annualGross > 5000000) {
    isComplex = true;
    if (form === 'ITR-1') form = 'ITR-2';
  }

  // Check screening flags
  if (input.hasForeignIncome || input.hasCrypto || input.hasCapitalGains) {
    isComplex = true;
    if (form === 'ITR-1' || form === 'ITR-4') form = 'ITR-2'; // Usually ITR-2 or 3
    if (input.taxpayerType === 'business' || input.taxpayerType === 'freelancer') form = 'ITR-3';
  }

  return { form, isComplex };
};

export interface TaxComparison {
  oldRegime: CalculationResult;
  newRegime: CalculationResult;
  recommendation: 'old' | 'new';
  savings: number;
  prevYearBestTax: number;
}

export const calculateRegimeTax = (
  income: number,
  config: RegimeConfig,
  cessRate: number,
  isResident: boolean,
  input: TaxInput
): CalculationResult => {
  const standardDeduction = config.standardDeduction;
  const taxableIncome = Math.max(0, income - standardDeduction);
  const { form, isComplex } = getITRForm(input);
  
  let remainingIncome = taxableIncome;
  let taxBeforeRebate = 0;
  const slabsBreakdown: CalculationResult['slabsBreakdown'] = [];

  for (const slab of config.slabs) {
    const slabMin = slab.min;
    const slabMax = slab.max || Infinity;
    const slabRange = slabMax - slabMin + 1;
    
    const amountInSlab = Math.max(0, Math.min(remainingIncome, slabRange));
    const taxInSlab = amountInSlab * slab.rate;
    
    slabsBreakdown.push({
      slab: slab.max ? `₹${slab.min.toLocaleString()} - ₹${slab.max.toLocaleString()}` : `Above ₹${slab.min.toLocaleString()}`,
      amount: amountInSlab,
      rate: slab.rate * 100,
      tax: taxInSlab
    });
    
    taxBeforeRebate += taxInSlab;
    remainingIncome -= amountInSlab;
    if (remainingIncome <= 0) break;
  }

  // Rebate 87A
  let rebate = 0;
  if (isResident && taxableIncome <= config.rebateLimit) {
    rebate = Math.min(taxBeforeRebate, config.rebateAmount);
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);
  const cess = taxAfterRebate * cessRate;
  const finalTax = taxAfterRebate + cess;

  return {
    grossIncome: income,
    taxableIncome,
    taxBeforeRebate,
    rebate,
    taxAfterRebate,
    cess,
    finalTax: Math.round(finalTax) || 0,
    deductions: {
      standard: standardDeduction,
      other: input.taxpayerType === 'salaried' ? (input.annualGross || 0) - income : 0 // Rough estimate of other deductions
    },
    itrForm: form,
    isComplex,
    slabsBreakdown
  };
};

export const calculateHRAExemption = (
  monthlyBasic: number,
  monthlyHRA: number,
  monthlyRent: number,
  cityType: 'metro' | 'nonMetro' | undefined
): number => {
  if (!cityType || monthlyRent === 0) return 0;

  const annualBasic = monthlyBasic * 12;
  const annualHRA = monthlyHRA * 12;
  const annualRent = monthlyRent * 12;

  // 1. Actual HRA received
  const option1 = annualHRA;

  // 2. Rent paid minus 10% of basic salary
  const option2 = Math.max(0, annualRent - (0.1 * annualBasic));

  // 3. 50% (metro) or 40% (non-metro) of basic salary
  const cityMultiplier = cityType === 'metro' ? 0.5 : 0.4;
  const option3 = annualBasic * cityMultiplier;

  return Math.min(option1, option2, option3);
};

export const calculateTaxComparison = (
  input: TaxInput,
  config: TaxYearConfig
): TaxComparison => {
  // 1. Estimate Gross Income
  let grossIncome = 0;

  if (input.taxpayerType === 'salaried' || input.taxpayerType === 'pensioner') {
    grossIncome = input.annualGross || 0;
    if (!grossIncome && input.monthlyInHand) {
      const estimatedAnnualInHand = input.monthlyInHand * 12;
      const estimatedAnnualPF = (input.pfDeducted || 0) * 12;
      grossIncome = estimatedAnnualInHand + estimatedAnnualPF;
    }
  } else if (input.taxpayerType === 'business') {
    // 44AD: Presumptive Business Income
    // Simplified V1: We'll use 8% as a conservative baseline if not specified, 
    // or apply 6% for digital receipts if we had that split. 
    // For now, we take input.businessProfit as the gross taxable business income.
    grossIncome = input.businessProfit || 0;
  } else if (input.taxpayerType === 'freelancer') {
    // 44ADA: Presumptive Professional Income
    // Usually 50% of gross receipts.
    grossIncome = input.businessProfit || 0;
  }

  // 2. HRA Exemption (Old Regime Only)
  const hraExemption = calculateHRAExemption(
    input.basicSalary || 0,
    input.hraReceived || 0,
    input.monthlyRent || 0,
    input.cityType
  );

  // 3. Apply Old Regime Deductions
  const capped80C = Math.min(150000, input.deduction80C);
  
  const totalOldDeductions = 
    hraExemption +
    capped80C + 
    input.deduction80D + 
    input.deductionNPS + 
    input.homeLoanInterest + 
    input.savingsInterest;

  const oldIncomeAfterDeductions = Math.max(0, grossIncome - totalOldDeductions);

  // 4. Determine Old Regime Config based on Age
  let oldConfig = config.oldRegime.below60;
  if (input.ageCategory === 'senior60to79') oldConfig = config.oldRegime.senior60to79;
  if (input.ageCategory === 'superSenior80plus') oldConfig = config.oldRegime.superSenior80plus;

  // 5. Calculate Both
  const oldRegime = calculateRegimeTax(oldIncomeAfterDeductions, oldConfig, config.cessRate, input.isResident, input);
  const newRegime = calculateRegimeTax(grossIncome, config.newRegime, config.cessRate, input.isResident, input);

  const recommendation = newRegime.finalTax <= oldRegime.finalTax ? 'new' : 'old';
  const savings = Math.abs(oldRegime.finalTax - newRegime.finalTax);

  // 6. Calculate Previous Year (2024-25) for comparison
  const prevOld = calculateRegimeTax(oldIncomeAfterDeductions, TAX_CONFIG_2024_25.oldRegime[input.ageCategory === 'below60' ? 'below60' : input.ageCategory === 'senior60to79' ? 'senior60to79' : 'superSenior80plus'], 0.04, input.isResident, input);
  const prevNew = calculateRegimeTax(grossIncome, TAX_CONFIG_2024_25.newRegime, 0.04, input.isResident, input);
  const prevYearBestTax = Math.min(prevOld.finalTax, prevNew.finalTax);

  return {
    oldRegime,
    newRegime,
    recommendation,
    savings,
    prevYearBestTax
  };
};
