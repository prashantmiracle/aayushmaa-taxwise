import React, { useEffect, useState } from 'react';
import { useTax } from '../TaxContext';
import { Store, CreditCard, Banknote, HelpCircle } from 'lucide-react';

const Step3BBusinessIncome: React.FC = () => {
  const { input, updateInput, setStep } = useTax();
  const [turnover, setTurnover] = useState({
    cash: input.businessTurnover ? Math.round(input.businessTurnover * 0.4) : 0, // Mock split if existing
    digital: input.businessTurnover ? Math.round(input.businessTurnover * 0.6) : 0
  });

  useEffect(() => {
    const validCash = isNaN(turnover.cash) ? 0 : turnover.cash;
    const validDigital = isNaN(turnover.digital) ? 0 : turnover.digital;
    const profit = (validCash * 0.08) + (validDigital * 0.06);
    
    updateInput({ 
      businessTurnover: validCash + validDigital,
      businessProfit: Math.round(profit) || 0
    });
  }, [turnover]);

  const handleInputChange = (field: 'cash' | 'digital', value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setTurnover(prev => ({ ...prev, [field]: numValue ? parseInt(numValue) : 0 }));
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Business Income (44AD)</h2>
        <p className="step-subtitle">Estimate your income easily using presumptive taxation rules.</p>
      </div>

      <div className="income-form">
        <div className="input-card soft-card">
          <div className="card-label-row">
            <label><Banknote size={14} /> Annual Cash Sales</label>
            <span className="helper-link">8% profit rate</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              value={formatCurrency(turnover.cash)}
              onChange={(e) => handleInputChange('cash', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="input-card soft-card">
          <div className="card-label-row">
            <label><CreditCard size={14} /> Annual Digital Sales</label>
            <span className="helper-link">6% profit rate</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              value={formatCurrency(turnover.digital)}
              onChange={(e) => handleInputChange('digital', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="profit-summary-premium soft-card">
          <div className="summary-info">
            <span className="label">Estimated Taxable Profit</span>
            <span className="value">₹{formatCurrency(input.businessProfit || 0)}</span>
          </div>
          <div className="summary-footer">
            <HelpCircle size={14} />
            <span>Based on Section 44AD presumptive rates</span>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(1)}>Back</button>
        <button 
          className="btn-primary btn-lg" 
          disabled={!input.businessTurnover}
          onClick={() => setStep(4)}
        >
          Continue to HRA
        </button>
      </div>

      <style>{`
        .income-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .profit-summary-premium {
          padding: var(--space-lg);
          background: var(--bg-main);
          border-color: var(--border-strong);
          text-align: center;
        }

        .summary-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .summary-info .label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-soft);
          text-transform: uppercase;
        }

        .summary-info .value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          font-family: var(--font-heading);
        }

        .summary-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-soft);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Step3BBusinessIncome;
