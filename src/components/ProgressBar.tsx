import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="step-count">Step {currentStep} of {totalSteps}</span>
        <span className="step-name">
          {currentStep === 1 && 'Income Profile'}
          {currentStep === 2 && 'Demographics'}
          {currentStep === 3 && 'Income Details'}
          {currentStep === 4 && 'Rent & HRA'}
          {currentStep === 5 && 'Investments (80C)'}
          {currentStep === 6 && 'Medical (80D)'}
          {currentStep === 7 && 'Final Check'}
        </span>
      </div>
      
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <style>{`
        .progress-container {
          margin-bottom: var(--space-lg);
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 10px;
        }

        .step-count {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .step-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .progress-track {
          height: 8px;
          background: var(--bg-main);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, var(--primary), #8b5cf6);
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
