import React, { useState } from 'react';
import { useTax } from '../TaxContext';
import ProgressBar from './ProgressBar';
import Step1IncomeProfile from './Step1IncomeProfile';
import Step2Demographics from './Step2Demographics';
import Step3ASalariedIncome from './Step3ASalariedIncome';
import Step3BBusinessIncome from './Step3BBusinessIncome';
import Step3CFreelancerIncome from './Step3CFreelancerIncome';
import Step3DPensionerIncome from './Step3DPensionerIncome';
import Step4RentHRA from './Step4RentHRA';
import Step5Deductions80C from './Step5Deductions80C';
import Step6Medical80D from './Step6Medical80D';
import Step7FinalScreening from './Step7FinalScreening';
import FinalResult from './FinalResult';
import LivePreview from './LivePreview';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardProps {
  onBackToHome: () => void;
}

const Wizard: React.FC<WizardProps> = ({ onBackToHome }) => {
  const { currentStep, input, resetInput } = useTax();
  const [showResult, setShowResult] = useState(false);
  const totalSteps = 7;

  if (showResult) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-xl)' }}>
        <FinalResult 
          onBack={() => setShowResult(false)} 
          onReset={() => {
            resetInput();
            setShowResult(false);
          }}
        />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1IncomeProfile />;
      case 2:
        return <Step2Demographics />;
      case 3:
        if (input.taxpayerType === 'salaried') return <Step3ASalariedIncome />;
        if (input.taxpayerType === 'business') return <Step3BBusinessIncome />;
        if (input.taxpayerType === 'freelancer') return <Step3CFreelancerIncome />;
        if (input.taxpayerType === 'pensioner') return <Step3DPensionerIncome />;
        return (
          <div className="placeholder-step">
            <h2>Step 3: {input.taxpayerType} Income</h2>
            <p>This flow is planned for a later phase.</p>
            <button className="btn-secondary" onClick={() => onBackToHome()}>Back to Home</button>
          </div>
        );
      case 4:
        return <Step4RentHRA />;
      case 5:
        return <Step5Deductions80C />;
      case 6:
        return <Step6Medical80D />;
      case 7:
        return <Step7FinalScreening onComplete={() => setShowResult(true)} />;
      default:
        return null;
    }
  };

  return (
    <section className="wizard-section">
      <div className="container">
        <div className="wizard-layout">
          {/* Main Content Area */}
          <div className="wizard-main">
            <div className="wizard-card soft-card">
              <div className="wizard-card-header">
                <button className="btn-inline-back" onClick={onBackToHome}>
                  <ArrowLeft size={16} /> Back to Dashboard
                </button>
                <div className="wizard-progress-wrapper">
                  <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                </div>
              </div>

              <div className="wizard-step-body">
                {renderStep()}
              </div>

            </div>
          </div>
          
          {/* Sidebar Insights */}
          <aside className="wizard-sidebar">
            <div className="sidebar-sticky">
              <LivePreview />
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .wizard-section {
          padding: var(--space-lg) 0 var(--space-xl);
          background-color: var(--bg-main);
          min-height: calc(100vh - var(--header-height) - var(--footer-height));
        }

        .wizard-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: var(--space-xl);
          align-items: start;
        }

        .wizard-card {
          overflow: hidden;
          background: white;
        }

        .wizard-card-header {
          padding: var(--space-lg) var(--space-lg) 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .btn-inline-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          color: var(--text-soft);
          font-weight: 600;
          font-size: 0.85rem;
          width: fit-content;
        }

        .btn-inline-back:hover {
          color: var(--primary);
        }

        .wizard-step-body {
          padding: var(--space-lg);
        }

        .wizard-final-cta {
          padding: var(--space-lg);
          border-top: 1px solid var(--border);
          background: #fdfdfd;
        }

        .sidebar-sticky {
          position: sticky;
          top: calc(var(--header-height) + var(--space-md));
        }

        .w-full { width: 100%; }

        @media (max-width: 1100px) {
          .wizard-layout {
            grid-template-columns: 1fr;
          }
          .wizard-sidebar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Wizard;
