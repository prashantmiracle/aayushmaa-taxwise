import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { TaxInput, INITIAL_TAX_INPUT } from './types';
import { calculateTaxComparison, TaxComparison } from './taxCalculator';
import { TAX_CONFIG_2025_26 } from './taxYearConfig';

interface TaxContextType {
  input: TaxInput;
  updateInput: (updates: Partial<TaxInput>) => void;
  resetInput: () => void;
  currentStep: number;
  setStep: (step: number) => void;
  results: TaxComparison;
}

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export const TaxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<TaxInput>(() => {
    try {
      const saved = localStorage.getItem('tax_input');
      return saved ? JSON.parse(saved) : INITIAL_TAX_INPUT;
    } catch (e) {
      return INITIAL_TAX_INPUT;
    }
  });
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = localStorage.getItem('tax_step');
      const step = saved ? parseInt(saved) : 1;
      return isNaN(step) ? 1 : step;
    } catch (e) {
      return 1;
    }
  });

  // Persist state
  React.useEffect(() => {
    localStorage.setItem('tax_input', JSON.stringify(input));
  }, [input]);

  React.useEffect(() => {
    localStorage.setItem('tax_step', currentStep.toString());
  }, [currentStep]);

  const updateInput = (updates: Partial<TaxInput>) => {
    setInput(prev => ({ ...prev, ...updates }));
  };

  const resetInput = () => {
    setInput(INITIAL_TAX_INPUT);
    setCurrentStep(1);
    localStorage.removeItem('tax_input');
    localStorage.removeItem('tax_step');
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  // Memoize results so we don't recalculate on every render unless input changes
  const results = useMemo(() => {
    try {
      return calculateTaxComparison(input, TAX_CONFIG_2025_26);
    } catch (err) {
      console.error("Tax calculation error:", err);
      // Return a safe fallback to prevent blank page
      return calculateTaxComparison(INITIAL_TAX_INPUT, TAX_CONFIG_2025_26);
    }
  }, [input]);

  return (
    <TaxContext.Provider value={{ input, updateInput, resetInput, currentStep, setStep, results }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTax = () => {
  const context = useContext(TaxContext);
  if (context === undefined) {
    throw new Error('useTax must be used within a TaxProvider');
  }
  return context;
};
