import React from 'react';
import { useTax } from '../TaxContext';
import { Landmark, Briefcase, Store, Monitor, CheckCircle } from 'lucide-react';

const Step1IncomeProfile: React.FC = () => {
  const { input, updateInput, setStep } = useTax();

  const profiles = [
    { 
      id: 'salaried', 
      title: 'Salaried', 
      desc: 'Receive regular salary with Form 16.', 
      icon: <Briefcase size={24} />,
      color: '#3b82f6'
    },
    { 
      id: 'pensioner', 
      title: 'Pensioner', 
      desc: 'Retired and receiving monthly pension.', 
      icon: <Landmark size={24} />,
      color: '#8b5cf6'
    },
    { 
      id: 'business', 
      title: 'Business', 
      desc: 'Running a business (Sec 44AD).', 
      icon: <Store size={24} />,
      color: '#f59e0b'
    },
    { 
      id: 'freelancer', 
      title: 'Freelancer', 
      desc: 'Professional or Freelance work (Sec 44ADA).', 
      icon: <Monitor size={24} />,
      color: '#10b981'
    }
  ];

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Select your primary profile</h2>
        <p className="step-subtitle">We will customize the calculator based on your source of income.</p>
      </div>

      <div className="profile-grid">
        {profiles.map(p => (
          <div 
            key={p.id}
            className={`profile-card soft-card ${input.taxpayerType === p.id ? 'selected' : ''}`}
            onClick={() => updateInput({ taxpayerType: p.id as any })}
          >
            <div className="profile-icon" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
              {p.icon}
            </div>
            <div className="profile-info">
              <span className="title">{p.title}</span>
              <span className="desc">{p.desc}</span>
            </div>
            <div className="selection-indicator">
              <CheckCircle size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="wizard-actions">
        <button 
          className="btn-primary btn-lg w-full" 
          disabled={!input.taxpayerType}
          onClick={() => setStep(2)}
        >
          Continue to Personal Details
        </button>
      </div>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .profile-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
          padding: var(--space-md);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border-width: 2px;
        }

        .profile-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .profile-card.selected {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }

        .profile-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-info .title {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .option-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .wizard-actions {
          display: flex;
          justify-content: center;
          padding-top: var(--space-lg);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .options-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Step1IncomeProfile;
