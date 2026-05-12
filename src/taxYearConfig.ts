import { TaxYearConfig } from './types';

export const TAX_CONFIG_2025_26: TaxYearConfig = {
  year: 'FY 2025-26 (AY 2026-27)',
  cessRate: 0.04,
  newRegime: {
    standardDeduction: 75000,
    rebateLimit: 1200000,
    rebateAmount: 60000,
    slabs: [
      { min: 0, max: 400000, rate: 0 },
      { min: 400001, max: 800000, rate: 0.05 },
      { min: 800001, max: 1200000, rate: 0.10 },
      { min: 1200001, max: 1600000, rate: 0.15 },
      { min: 1600001, max: 2000000, rate: 0.20 },
      { min: 2000001, max: 2400000, rate: 0.25 },
      { min: 2400001, max: null, rate: 0.30 },
    ],
  },
  oldRegime: {
    below60: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250001, max: 500000, rate: 0.05 },
        { min: 500001, max: 1000000, rate: 0.20 },
        { min: 1000001, max: null, rate: 0.30 },
      ],
    },
    senior60to79: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300001, max: 500000, rate: 0.05 },
        { min: 500001, max: 1000000, rate: 0.20 },
        { min: 1000001, max: null, rate: 0.30 },
      ],
    },
    superSenior80plus: {
      standardDeduction: 50000,
      rebateLimit: 500000,
      rebateAmount: 12500,
      slabs: [
        { min: 0, max: 500000, rate: 0 },
        { min: 500001, max: 1000000, rate: 0.20 },
        { min: 1000001, max: null, rate: 0.30 },
      ],
    },
  },
};
