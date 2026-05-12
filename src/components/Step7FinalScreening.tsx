import React from 'react';
import { useTax } from '../TaxContext';
import { Shield, Landmark, TrendingUp, Globe, Cpu, CheckCircle, AlertCircle } from 'lucide-react';
import { TaxInput } from '../types';

interface Step7FinalScreeningProps {
  onComplete: () => void;
}

const Step7FinalScreening: React.FC<Step7FinalScreeningProps> = ({ onComplete }) => {
  const { input, updateInput, setStep, results } = useTax();

  const handleToggle = (field: keyof TaxInput) => {
    updateInput({ [field]: !input[field] });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    updateInput({ [field]: numValue ? parseInt(numValue) : 0 });
  };

  const formatCurrency = (val: number | null | undefined) => {
    if (val === undefined || val === null) return '0';
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Final Check</h2>
        <p className="step-subtitle">Almost there! Select if any of these special scenarios apply to you.</p>
      </div>

      <div className="screening-sections">
        <div className="form-group">
          <label className="group-label">Additional Deductions (Old Regime)</label>
          <div className="input-grid-2">
            <div className="premium-input-card soft-card">
              <div className="card-label-row">
                <label>Home Loan Interest</label>
                <Landmark size={14} className="color-primary" />
              </div>
              <div className="premium-input-box-sm">
                <span className="unit">₹</span>
                <input 
                  type="text"
                  value={formatCurrency(input.homeLoanInterest)}
                  onChange={(e) => handleInputChange('homeLoanInterest', e.target.value)}
                />
              </div>
            </div>
            
            <div className="premium-input-card soft-card">
              <div className="card-label-row">
                <label>Savings Interest</label>
                <TrendingUp size={14} className="color-primary" />
              </div>
              <div className="premium-input-box-sm">
                <span className="unit">₹</span>
                <input 
                  type="text"
                  value={formatCurrency(input.savingsInterest)}
                  onChange={(e) => handleInputChange('savingsInterest', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="group-label">Special Income Scenarios</label>
          <div className="screening-checklist">
            {[
              { id: 'hasCrypto', label: 'Income from Crypto/NFTs', icon: <Cpu size={20} />, desc: '30% flat tax applies' },
              { id: 'hasCapitalGains', label: 'Sale of Shares/Property', icon: <TrendingUp size={20} />, desc: 'Requires ITR-2 or higher' },
              { id: 'hasForeignIncome', label: 'Foreign Income/Assets', icon: <Globe size={20} />, desc: 'Includes foreign stocks/RSUs' }
            ].map(item => (
              <div 
                key={item.id}
                className={`screening-card soft-card ${input[item.id as keyof TaxInput] ? 'active' : ''}`}
                onClick={() => handleToggle(item.id as keyof TaxInput)}
              >
                <div className="screening-icon">
                  {item.icon}
                </div>
                <div className="screening-info">
                  <span className="label">{item.label}</span>
                  <span className="desc">{item.desc}</span>
                </div>
                <div className="screening-check">
                  {input[item.id as keyof TaxInput] ? <CheckCircle size={20} /> : <div className="empty-circle"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="itr-guidance-premium soft-card">
        <div className="itr-top">
          <div className="itr-icon-box">
            <Shield size={24} />
          </div>
          <div className="itr-details">
            <span className="label">Recommended Tax Form</span>
            <span className="value">{results?.oldRegime?.itrForm || 'ITR-1'}</span>
          </div>
        </div>
        {results?.oldRegime?.isComplex ? (
          <div className="complex-alert">
            <AlertCircle size={16} />
            <span>Profile flagged as complex. Expert review recommended.</span>
          </div>
        ) : (
          <div className="simple-badge">
            <CheckCircle size={14} />
            <span>Standard Profile - Easy to File</span>
          </div>
        )}
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(6)}>Back</button>
        <button 
          className="btn-primary btn-lg" 
          onClick={onComplete}
        >
          Calculate Final Result
        </button>
      </div>

      <style>{`
        .screening-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .input-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }

        .premium-input-card {
          padding: var(--space-md);
        }

        .premium-input-box-sm {
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid var(--border-strong);
          padding-bottom: 4px;
        }

        .premium-input-box-sm .unit {
          font-weight: 700;
          color: var(--text-soft);
        }

        .premium-input-box-sm input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          outline: none;
        }

        .screening-checklist {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .screening-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          cursor: pointer;
          transition: all 0.2s;
        }

        .screening-card.active {
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .screening-icon {
          color: var(--text-soft);
        }

        .screening-card.active .screening-icon { color: var(--primary); }

        .screening-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .screening-info .label {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .screening-info .desc {
          font-size: 0.75rem;
          color: var(--text-soft);
        }

        .screening-check { color: var(--primary); }
        .empty-circle {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-strong);
          border-radius: 50%;
        }

        .itr-guidance-premium {
          padding: var(--space-lg);
          background: var(--bg-main);
          border-color: var(--border-strong);
          margin-bottom: var(--space-xl);
        }

        .itr-top {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .itr-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .itr-details {
          display: flex;
          flex-direction: column;
        }

        .itr-details .label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-soft);
        }

        .itr-details .value {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .complex-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--error);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 12px;
          background: #fee2e2;
          border-radius: 8px;
        }

        .simple-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--success);
          font-size: 0.85rem;
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .input-grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Step7FinalScreening;
