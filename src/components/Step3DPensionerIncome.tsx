import React from 'react';
import { useTax } from '../TaxContext';
import { Landmark, Info, CircleDollarSign } from 'lucide-react';

const Step3DPensionerIncome: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const handleMonthlyChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    updateInput({ monthlyInHand: numValue ? parseInt(numValue) : 0 });
  };

  const handleAnnualChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    updateInput({ annualGross: numValue ? parseInt(numValue) : 0 });
  };

  const formatCurrency = (val: number | undefined) => {
    if (val === undefined) return '0';
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Pensioner Income</h2>
        <p className="step-subtitle">Pension is taxed as salary, and you are eligible for the full Standard Deduction.</p>
      </div>

      <div className="income-form">
        <div className="input-card soft-card">
          <div className="card-label-row">
            <label><Landmark size={14} /> Monthly Pension</label>
            <span className="helper-link">Net credited to bank</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              placeholder="e.g. 50,000"
              value={formatCurrency(input.monthlyInHand)}
              onChange={(e) => handleMonthlyChange(e.target.value)}
            />
          </div>
          <p className="input-hint">Annual: ₹{formatCurrency((input.monthlyInHand || 0) * 12)}</p>
        </div>

        <div className="input-card soft-card">
          <div className="card-label-row">
            <label><CircleDollarSign size={14} /> Other Annual Income</label>
            <span className="helper-link">Interest, Rent, etc.</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              placeholder="e.g. 1,00,000"
              value={formatCurrency(input.annualGross)}
              onChange={(e) => handleAnnualChange(e.target.value)}
            />
          </div>
        </div>

        <div className="benefits-highlight soft-card">
          <div className="benefits-header">
            <Info size={18} />
            <span>Pensioner Benefits</span>
          </div>
          <div className="benefits-list">
            <div className="benefit">
              <span className="bullet"></span>
              <span>₹75,000 Standard Deduction (New Regime)</span>
            </div>
            <div className="benefit">
              <span className="bullet"></span>
              <span>Higher tax-free limits based on age category</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(1)}>Back</button>
        <button 
          className="btn-primary btn-lg" 
          disabled={!input.monthlyInHand && !input.annualGross}
          onClick={() => {
            const totalAnnual = ((input.monthlyInHand || 0) * 12) + (input.annualGross || 0);
            updateInput({ annualGross: totalAnnual });
            setStep(4);
          }}
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

        .benefits-highlight {
          padding: var(--space-lg);
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.2);
        }

        .benefits-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
          font-weight: 800;
          font-size: 0.95rem;
          margin-bottom: var(--space-md);
          text-transform: uppercase;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-soft);
        }

        .bullet {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
        }

        .input-hint {
          font-size: 0.8rem;
          color: var(--text-soft);
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default Step3DPensionerIncome;
