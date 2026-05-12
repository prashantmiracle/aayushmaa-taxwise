import React, { useEffect, useState } from 'react';
import { useTax } from '../TaxContext';
import { HeartPulse, Users, Info } from 'lucide-react';

const Step6Medical80D: React.FC = () => {
  const { input, updateInput, setStep } = useTax();
  const [data, setData] = useState({
    selfAmount: 0,
    parentsAmount: 0,
    parentsSenior: false,
    checkup: 0
  });

  useEffect(() => {
    const selfLimit = input.ageCategory !== 'below60' ? 50000 : 25000;
    const parentLimit = data.parentsSenior ? 50000 : 25000;
    const selfTotal = Math.min(selfLimit, data.selfAmount + data.checkup);
    const parentsTotal = Math.min(parentLimit, data.parentsAmount);
    updateInput({ deduction80D: selfTotal + parentsTotal });
  }, [data, input.ageCategory]);

  const handleValueChange = (field: string, value: string | boolean) => {
    if (typeof value === 'string') {
      const numValue = value.replace(/[^0-9]/g, '');
      setData(prev => ({ ...prev, [field]: numValue ? parseInt(numValue) : 0 }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Medical & Health (80D)</h2>
        <p className="step-subtitle">Health insurance premiums can save you additional tax in the Old Regime.</p>
      </div>

      <div className="medical-sections">
        {/* Self Card */}
        <div className="input-card soft-card">
          <div className="card-top">
            <HeartPulse size={24} className="color-red" />
            <div className="card-titles">
              <span className="title">Self, Spouse & Children</span>
              <span className="desc">Premium paid for your immediate family.</span>
            </div>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              value={formatCurrency(data.selfAmount)}
              onChange={(e) => handleValueChange('selfAmount', e.target.value)}
            />
          </div>
          <div className="limit-tag">
            Limit: ₹{input.ageCategory !== 'below60' ? '50,000' : '25,000'}
          </div>
        </div>

        {/* Parents Card */}
        <div className="input-card soft-card">
          <div className="card-top">
            <Users size={24} className="color-blue" />
            <div className="card-titles">
              <span className="title">Parents Premium</span>
              <span className="desc">Premium paid for your parents.</span>
            </div>
          </div>
          <div className="premium-input-box">
            <span className="unit">₹</span>
            <input 
              type="text" 
              value={formatCurrency(data.parentsAmount)}
              onChange={(e) => handleValueChange('parentsAmount', e.target.value)}
            />
          </div>
          <div className="parents-options">
            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={data.parentsSenior}
                onChange={(e) => handleValueChange('parentsSenior', e.target.checked)}
              />
              <span className="checkbox-label">My parents are senior citizens (60+)</span>
            </label>
          </div>
          <div className="limit-tag">
            Limit: ₹{data.parentsSenior ? '50,000' : '25,000'}
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(5)}>Back</button>
        <button className="btn-primary btn-lg" onClick={() => setStep(7)}>Final Screening</button>
      </div>

      <style>{`
        .medical-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .input-card {
          padding: var(--space-lg);
          position: relative;
        }

        .card-top {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .card-titles .title {
          display: block;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .card-titles .desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .parents-options {
          margin-top: var(--space-md);
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .checkbox-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .limit-tag {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          background: var(--bg-main);
          border-radius: 6px;
          color: var(--text-soft);
          border: 1px solid var(--border);
        }

        .color-red { color: var(--error); }
        .color-blue { color: var(--primary); }
      `}</style>
    </div>
  );
};

export default Step6Medical80D;
