import { TaxYearConfig } from './types';

export const TAX_CONFIG_2024_25: TaxYearConfig = {
  year: '2024-25',
  cessRate: 0.04,
  newRegime: {
    standardDeduction: 50000,
    rebateLimit: 700000,
    rebateAmount: 25000,
    slabs: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 600000, rate: 0.05 },
      { min: 600000, max: 900000, rate: 0.10 },
      { min: 900000, max: 1200000, rate: 0.15 },
      { min: 1200000, max: 1500000, rate: 0.20 },
      { min: 1500000, max: null, rate: 0.30 },
    ]
  },
  oldRegime: {
    below60: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ]
    },
    senior60to79: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ]
    },
    superSenior80plus: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 500000, rate: 0 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ]
    }
  }
};
