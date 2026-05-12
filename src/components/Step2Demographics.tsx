import React from 'react';
import { useTax } from '../TaxContext';
import { AgeCategory } from '../types';

const Step2Demographics: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const handleAgeChange = (age: AgeCategory) => {
    updateInput({ ageCategory: age });
  };

  const handleResidentChange = (isResident: boolean) => {
    updateInput({ isResident });
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Personal Details</h2>
        <p className="step-subtitle">Age and residency impact your tax slabs and exemptions.</p>
      </div>

      <div className="form-sections">
        <div className="form-group">
          <label className="group-label">Taxpayer Age Group</label>
          <div className="choice-grid">
            {[
              { id: 'below60', label: 'Below 60', sub: 'Born after 1965' },
              { id: 'senior60to79', label: '60 to 79', sub: 'Senior Citizen' },
              { id: 'superSenior80plus', label: '80+', sub: 'Super Senior' }
            ].map(age => (
              <button 
                key={age.id}
                className={`choice-chip ${input.ageCategory === age.id ? 'active' : ''}`}
                onClick={() => handleAgeChange(age.id as AgeCategory)}
              >
                <span className="chip-label">{age.label}</span>
                <span className="chip-sub">{age.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="group-label">Residential Status</label>
          <div className="choice-row">
            <button 
              className={`choice-chip-sm ${input.isResident ? 'active' : ''}`}
              onClick={() => handleResidentChange(true)}
            >
              Resident
            </button>
            <button 
              className={`choice-chip-sm ${!input.isResident ? 'active' : ''}`}
              onClick={() => handleResidentChange(false)}
            >
              Non-Resident (NRI)
            </button>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="btn-secondary btn-lg" onClick={() => setStep(1)}>Back</button>
        <button className="btn-primary btn-lg" onClick={() => setStep(3)}>Continue to Income</button>
      </div>

      <style>{`
        .form-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .group-label {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: var(--space-md);
        }

        .choice-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
        }

        .choice-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-md);
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .choice-chip.active {
          border-color: var(--primary);
          background: var(--primary-light);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
        }

        .chip-label {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-main);
        }

        .chip-sub {
          font-size: 0.75rem;
          color: var(--text-soft);
        }

        .choice-row {
          display: flex;
          gap: var(--space-sm);
        }

        .choice-chip-sm {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: white;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .choice-chip-sm.active {
          border-color: var(--primary);
          background: var(--primary-light);
          color: var(--primary);
        }

        @media (max-width: 640px) {
          .choice-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Step2Demographics;
