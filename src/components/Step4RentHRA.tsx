import React from 'react';
import { useTax } from '../TaxContext';
import { Home, CheckCircle, Info } from 'lucide-react';

const Step4RentHRA: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const handleRentToggle = (pays: boolean) => {
    updateInput({ paysRent: pays });
  };

  const handleRentChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    updateInput({ monthlyRent: numValue ? parseInt(numValue) : 0 });
  };

  const handleCityTypeChange = (type: 'metro' | 'nonMetro') => {
    updateInput({ cityType: type });
  };

  const formatCurrency = (val: number | undefined) => {
    if (val === undefined) return '0';
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Rent & HRA</h2>
        <p className="step-subtitle">Your house rent can help you save tax in the Old Regime.</p>
      </div>

      <div className="rent-toggle-section">
        <label className="group-label">Do you pay house rent?</label>
        <div className="choice-row">
          <button 
            className={`choice-chip-sm ${input.paysRent ? 'active' : ''}`}
            onClick={() => handleRentToggle(true)}
          >
            Yes, I pay rent
          </button>
          <button 
            className={`choice-chip-sm ${!input.paysRent ? 'active' : ''}`}
            onClick={() => handleRentToggle(false)}
          >
            No, I live in my own house
          </button>
        </div>
      </div>

      {!input.paysRent ? (
        <div className="skip-card soft-card">
          <Home size={48} className="icon-muted" />
          <p>Since you don't pay rent, you are not eligible for HRA tax exemption.</p>
          <div className="info-box">
            <Info size={16} />
            <span>If you live with parents and pay them rent, you can still claim HRA by getting rent receipts.</span>
          </div>
        </div>
      ) : (
        <div className="rent-form">
          <div className="form-group">
            <label className="group-label">Monthly Rent Amount</label>
            <div className="premium-input-card soft-card">
              <div className="premium-input-box">
                <span className="unit">₹</span>
                <input 
                  type="text"
                  value={formatCurrency(input.monthlyRent)}
                  onChange={(e) => handleRentChange(e.target.value)}
                  placeholder="0"
                />
              </div>
              <p className="input-hint">Annual rent: ₹{formatCurrency((input.monthlyRent || 0) * 12)}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="group-label">Where is the rented house located?</label>
            <div className="metro-selection">
              <button 
                className={`selection-tile soft-card ${input.cityType === 'metro' ? 'active' : ''}`}
                onClick={() => handleCityTypeChange('metro')}
              >
                <div className="tile-content">
                  <span className="main">Metro City</span>
                  <span className="sub">Delhi, Mumbai, Kolkata, Chennai</span>
                </div>
                <div className="tile-check">
                  <CheckCircle size={18} />
                </div>
              </button>
              
              <button 
                className={`selection-tile soft-card ${input.cityType === 'nonMetro' ? 'active' : ''}`}
                onClick={() => handleCityTypeChange('nonMetro')}
              >
                <div className="tile-content">
                  <span className="main">Other City</span>
                  <span className="sub">Any city not listed above</span>
                </div>
                <div className="tile-check">
                  <CheckCircle size={18} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(3)}>Back</button>
        <button className="btn-primary btn-lg" onClick={() => setStep(5)}>Continue to Deductions</button>
      </div>

      <style>{`
        .rent-toggle-section {
          margin-bottom: var(--space-xl);
        }

        .rent-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
          animation: fadeIn 0.3s ease-out;
        }

        .choice-row {
          display: flex;
          gap: var(--space-sm);
        }

        .choice-chip-sm {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: white;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .choice-chip-sm.active {
          border-color: var(--primary);
          background: var(--primary-light);
          color: var(--primary);
        }

        .skip-card {
          text-align: center;
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
          background: white;
        }

        .icon-muted { color: var(--border-strong); opacity: 0.5; }

        .info-box {
          display: flex;
          gap: 10px;
          background: rgba(37, 99, 235, 0.05);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--text-soft);
          text-align: left;
          line-height: 1.4;
          max-width: 450px;
        }

        .metro-selection {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .selection-tile {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) var(--space-lg);
          background: white;
          border: 1.5px solid var(--border);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .selection-tile.active {
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .tile-content .main {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-main);
          display: block;
        }

        .tile-content .sub {
          font-size: 0.8rem;
          color: var(--text-soft);
        }

        .tile-check {
          color: var(--primary);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .selection-tile.active .tile-check {
          opacity: 1;
        }

        .input-hint {
          font-size: 0.8rem;
          color: var(--text-soft);
          margin-top: 8px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Step4RentHRA;
