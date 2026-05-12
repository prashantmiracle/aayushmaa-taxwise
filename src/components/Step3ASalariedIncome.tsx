import React from 'react';
import { useTax } from '../TaxContext';
import { TrendingDown } from 'lucide-react';

const Step3ASalariedIncome: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const handleMonthlyChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    const monthly = numValue ? parseInt(numValue) : 0;
    updateInput({ 
      monthlyInHand: monthly,
      annualGross: monthly * 12 
    });
  };

  const handleAnnualChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    const annual = numValue ? parseInt(numValue) : 0;
    updateInput({ 
      annualGross: annual,
      monthlyInHand: Math.round(annual / 12)
    });
  };

  const formatCurrency = (val: number | undefined) => {
    if (val === undefined) return '0';
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Your Salaried Income</h2>
        <p className="step-subtitle">Tell us how much you earn. Don't worry, we'll help you estimate if you're not sure.</p>
      </div>

      <div className="income-form">
        <div className="input-card soft-card">
          <div className="card-label-row">
            <label>Monthly In-Hand Salary</label>
            <span className="helper-link">Net credited to bank</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text"
              value={formatCurrency(input.monthlyInHand)}
              onChange={(e) => handleMonthlyChange(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="connector">
          <div className="line"></div>
          <span className="or">OR</span>
          <div className="line"></div>
        </div>

        <div className="input-card soft-card">
          <div className="card-label-row">
            <label>Annual Gross Salary</label>
            <span className="helper-link">CTC as per Form 16</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text"
              value={formatCurrency(input.annualGross)}
              onChange={(e) => handleAnnualChange(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="deduction-notice-card">
          <div className="notice-icon">
            <TrendingDown size={20} />
          </div>
          <div className="notice-text">
            <h4>Standard Deduction Applied</h4>
            <p>₹75,000 (New) / ₹50,000 (Old) will be automatically deducted from your taxable income.</p>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(1)}>Back</button>
        <button 
          className="btn-primary btn-lg" 
          disabled={!input.annualGross}
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

        .connector {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-sm) 0;
        }

        .line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .or {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-soft);
        }

        .deduction-notice-card {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--bg-main);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-strong);
        }

        .notice-icon {
          color: var(--primary);
        }

        .notice-text h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .notice-text p {
          font-size: 0.8rem;
          color: var(--text-soft);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default Step3ASalariedIncome;
