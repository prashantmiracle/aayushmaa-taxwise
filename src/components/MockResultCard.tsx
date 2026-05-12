import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

const MockResultCard: React.FC = () => {
  return (
    <div className="mock-card">
      <div className="card-header">
        <CheckCircle className="icon-success" size={20} />
        <span className="recommendation">Recommended: New Regime</span>
      </div>
      
      <div className="card-main">
        <div className="saving-amount">
          <span className="label">Estimated saving</span>
          <span className="value">₹18,420</span>
        </div>
        
        <div className="tax-comparison">
          <div className="comparison-row">
            <span>Old regime tax</span>
            <span className="tax-val">₹82,160</span>
          </div>
          <div className="comparison-row">
            <span>New regime tax</span>
            <span className="tax-val highlighted">₹63,740</span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="confidence">
          <Info size={14} />
          <span>Confidence: Good estimate</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <style>{`
        .mock-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: var(--space-md);
          box-shadow: var(--shadow-lg);
          max-width: 340px;
          width: 100%;
          text-align: left;
          position: relative;
          overflow: hidden;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          margin-bottom: var(--space-md);
        }

        .recommendation {
          font-weight: 700;
          color: var(--success);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .saving-amount {
          margin-bottom: var(--space-md);
        }

        .saving-amount .label {
          display: block;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-bottom: 2px;
        }

        .saving-amount .value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: var(--font-heading);
        }

        .tax-comparison {
          background: var(--bg-main);
          padding: var(--space-sm);
          border-radius: 12px;
          margin-bottom: var(--space-md);
        }

        .comparison-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: var(--space-xs);
        }

        .comparison-row:last-child {
          margin-bottom: 0;
        }

        .tax-val {
          font-weight: 600;
          color: var(--text-main);
        }

        .tax-val.highlighted {
          color: var(--primary);
        }

        .card-footer {
          border-top: 1px solid var(--border);
          padding-top: var(--space-sm);
        }

        .confidence {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.75rem;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          width: 85%;
          background: var(--primary);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default MockResultCard;
