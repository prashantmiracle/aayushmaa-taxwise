import React from 'react';
import { useTax } from '../TaxContext';
import { TrendingDown, AlertCircle, CheckCircle2, Trophy, ShieldCheck, Zap } from 'lucide-react';

const LivePreview: React.FC = () => {
  const { results, input } = useTax();

  const formatCurrency = (val: number | undefined) => {
    if (val === undefined) return '0';
    return val.toLocaleString('en-IN');
  };

  const getConfidence = () => {
    let score = 20;
    let label = 'Awaiting Data';
    let color = 'var(--text-soft)';

    if (input.taxpayerType) score += 20;
    if (input.annualGross || input.monthlyInHand) score += 40;
    if (input.ageCategory) score += 20;

    if (score >= 80) {
      label = 'High Confidence';
      color = 'var(--success)';
    } else if (score >= 40) {
      label = 'Medium Confidence';
      color = 'var(--accent)';
    }

    return { label, color, score };
  };

  const confidence = getConfidence();
  const hasData = results?.oldRegime?.grossIncome > 0;

  if (!results || !hasData) {
    return (
      <div className="preview-empty">
        <div className="empty-content">
          <TrendingDown size={48} className="empty-icon" />
          <h3>Your tax estimate will appear here</h3>
          <p>Complete the profile and income steps to see your regime comparison.</p>
        </div>
        <style>{`
          .preview-empty {
            height: 100%;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 24px;
            border: 2px dashed var(--border);
            padding: var(--space-xl);
            text-align: center;
          }
          .empty-icon { color: var(--border-strong); margin-bottom: var(--space-md); }
          .empty-content h3 { font-size: 1.25rem; margin-bottom: 8px; font-weight: 700; }
          .empty-content p { color: var(--text-soft); font-size: 0.9rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="live-preview-panel soft-card">
      <div className="preview-header">
        <div className="header-top">
          <div className="confidence-badge" style={{ color: confidence.color, background: `${confidence.color}15` }}>
            {confidence.label === 'High Confidence' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            <span>{confidence.label}</span>
          </div>
          <div className="live-indicator">
            <span className="dot"></span>
            LIVE
          </div>
        </div>
        <h3>Live Estimate</h3>
        <div className="confidence-track">
          <div className="confidence-fill" style={{ width: `${confidence.score}%`, backgroundColor: confidence.color }}></div>
        </div>
      </div>

      <div className="preview-body">
        <div className="regime-comparison">
          <div className={`regime-tile ${results?.recommendation === 'old' ? 'active' : ''}`}>
            <div className="tile-label">
              <span>Old Regime</span>
              {results?.recommendation === 'old' && <Trophy size={14} className="color-primary" />}
            </div>
            <div className="tile-value">₹{formatCurrency(results?.oldRegime?.finalTax)}</div>
          </div>

          <div className={`regime-tile ${results?.recommendation === 'new' ? 'active' : ''}`}>
            <div className="tile-label">
              <span>New Regime</span>
              {results?.recommendation === 'new' && <Trophy size={14} className="color-primary" />}
            </div>
            <div className="tile-value">₹{formatCurrency(results?.newRegime?.finalTax)}</div>
          </div>
        </div>

        <div className="savings-card">
          <span className="savings-label">Best choice saves you</span>
          <div className="savings-amount">₹{formatCurrency(results?.savings)}</div>
        </div>

        <div className="preview-details">
          <div className="detail-item">
            <span className="label">Gross Income</span>
            <span className="value">₹{formatCurrency(results.oldRegime?.grossIncome)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Recommended ITR</span>
            <span className="itr-badge">{results.oldRegime?.itrForm || 'ITR-1'}</span>
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <Zap size={14} className="color-primary" />
        <span>Updates in real-time</span>
      </div>

      <style>{`
        .live-preview-panel {
          padding: var(--space-lg);
          background: white;
          position: sticky;
          top: calc(var(--header-height) + var(--space-lg));
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-sm);
        }

        .confidence-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-soft);
        }

        .live-indicator .dot {
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .preview-header h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: var(--space-md);
        }

        .confidence-track {
          height: 4px;
          background: var(--bg-main);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: var(--space-lg);
        }

        .confidence-fill {
          height: 100%;
          transition: width 0.4s ease;
        }

        .regime-comparison {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .regime-tile {
          padding: var(--space-md);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          transition: all 0.2s;
        }

        .regime-tile.active {
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .tile-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-soft);
          margin-bottom: 4px;
        }

        .tile-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .savings-card {
          background: var(--bg-main);
          padding: var(--space-md);
          border-radius: 14px;
          text-align: center;
          margin-bottom: var(--space-lg);
          border: 1px dashed var(--border-strong);
        }

        .savings-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-soft);
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .savings-amount {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--primary);
          font-family: var(--font-heading);
        }

        .preview-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding: var(--space-md) 0;
          border-top: 1px solid var(--border);
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-item .label {
          font-size: 0.85rem;
          color: var(--text-soft);
          font-weight: 500;
        }

        .detail-item .value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .itr-badge {
          background: var(--bg-main);
          color: var(--primary);
          font-weight: 800;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }

        .preview-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-soft);
          margin-top: var(--space-sm);
        }

        .color-primary { color: var(--primary); }
      `}</style>
    </div>
  );
};

export default LivePreview;
