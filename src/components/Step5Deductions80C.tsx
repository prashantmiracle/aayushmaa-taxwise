import React from 'react';
import { useTax } from '../TaxContext';
import { CheckCircle } from 'lucide-react';

const Step5Deductions80C: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const handleValueChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    updateInput({ deduction80C: numValue ? parseInt(numValue) : 0 });
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  const percentage = Math.min(100, (input.deduction80C / 150000) * 100);

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Tax Savings (80C)</h2>
        <p className="step-subtitle">Investments like LIC, PPF, and ELSS can save you up to ₹1.5 Lakh in the Old Regime.</p>
      </div>

      <div className="deduction-form">
        <div className="form-group">
          <label className="group-label">Total 80C Investments</label>
          <div className="premium-input-card soft-card">
            <div className="premium-input-box">
              <span className="unit">₹</span>
              <input 
                type="text"
                value={formatCurrency(input.deduction80C)}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="limit-meter">
              <div className="meter-label">
                <span>Deduction Limit</span>
                <span>₹1.5 Lakh</span>
              </div>
              <div className="meter-track">
                <div 
                  className={`meter-fill ${percentage >= 100 ? 'full' : ''}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <CheckCircle size={14} className="color-success" /> <span>PPF & EPF</span>
          </div>
          <div className="info-item">
            <CheckCircle size={14} className="color-success" /> <span>ELSS Funds</span>
          </div>
          <div className="info-item">
            <CheckCircle size={14} className="color-success" /> <span>LIC Premium</span>
          </div>
          <div className="info-item">
            <CheckCircle size={14} className="color-success" /> <span>Tuition Fees</span>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(4)}>Back</button>
        <button className="btn-primary btn-lg" onClick={() => setStep(6)}>Continue to Medical</button>
      </div>

      <style>{`
        .deduction-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-soft);
        }

        .limit-meter {
          margin-top: var(--space-lg);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border);
        }

        .meter-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-soft);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .meter-track {
          height: 6px;
          background: var(--bg-main);
          border-radius: 3px;
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.4s ease;
        }

        .meter-fill.full {
          background: var(--success);
        }

        .color-success { color: var(--success); }
      `}</style>
    </div>
  );
};

export default Step5Deductions80C;
