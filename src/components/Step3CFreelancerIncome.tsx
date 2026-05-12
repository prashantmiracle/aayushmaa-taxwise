import React, { useEffect, useState } from 'react';
import { useTax } from '../TaxContext';
import { Briefcase, Info, Lightbulb } from 'lucide-react';

const Step3CFreelancerIncome: React.FC = () => {
  const { input, updateInput, setStep } = useTax();
  const [receipts, setReceipts] = useState(input.businessTurnover || 0);

  useEffect(() => {
    const validReceipts = isNaN(receipts) ? 0 : receipts;
    const profit = validReceipts * 0.5;
    updateInput({ 
      businessTurnover: validReceipts,
      businessProfit: Math.round(profit) || 0
    });
  }, [receipts]);

  const handleInputChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setReceipts(numValue ? parseInt(numValue) : 0);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Freelancer Income (44ADA)</h2>
        <p className="step-subtitle">Professionals can assume 50% of their receipts as profit for easier filing.</p>
      </div>

      <div className="income-form">
        <div className="input-card soft-card">
          <div className="card-label-row">
            <label><Briefcase size={14} /> Total Annual Receipts</label>
            <span className="helper-link">Gross payments received</span>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              placeholder="e.g. 12,00,000"
              value={formatCurrency(receipts)}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        </div>

        <div className="profit-summary-premium soft-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="summary-info">
            <span className="label">Taxable Profit (50%)</span>
            <span className="value" style={{ color: 'var(--success)' }}>₹{formatCurrency(input.businessProfit || 0)}</span>
          </div>
          <div className="summary-footer">
            <Lightbulb size={14} />
            <span>Assumed expenses: ₹{formatCurrency(receipts * 0.5)}</span>
          </div>
        </div>

        <div className="info-box-premium">
          <Info size={16} />
          <p>Applies to technical consultants, legal/medical professionals, and architects with receipts up to ₹75 Lakhs.</p>
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
          border-radius: 20px;
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

        .info-box-premium {
          display: flex;
          gap: 12px;
          background: var(--bg-main);
          padding: var(--space-md);
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--text-soft);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default Step3CFreelancerIncome;
