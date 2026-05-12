import React, { useState } from 'react';
import { Calculator, ShieldCheck, Github, X, Trophy } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import { useTax } from './TaxContext';

type AppView = 'landing' | 'wizard';

// Sample data for the modal report
const SAMPLE = {
  gross: 1500000,
  oldStandard: 50000,
  newStandard: 75000,
  hraExemption: 150000,
  deductions80CD: 175000,
  oldTaxable: 1125000,
  newTaxable: 1425000,
  oldTax: 156000,
  newTax: 97500,
  savings: 58500,
};

const SampleReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Sample Tax Report</h3>
        <p className="modal-subtitle">Based on a salaried professional in a metro city</p>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
      </div>

      <div className="modal-body">
        <div className="sample-winner-banner">
          <div className="sample-trophy"><Trophy size={28} /></div>
          <div className="sample-winner-text">
            <span className="sample-label">Recommended Regime</span>
            <strong>New Tax Regime</strong>
          </div>
          <div className="sample-savings">
            <span className="sample-label">Annual Savings</span>
            <strong>₹{SAMPLE.savings.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div className="sample-section">
          <div className="sample-row label-row">
            <span>Particulars</span>
            <span>Old Regime</span>
            <span>New Regime</span>
          </div>
          <div className="sample-row">
            <span>Gross Annual Income</span>
            <span>₹{SAMPLE.gross.toLocaleString('en-IN')}</span>
            <span>₹{SAMPLE.gross.toLocaleString('en-IN')}</span>
          </div>
          <div className="sample-row deduction">
            <span>Standard Deduction</span>
            <span>-₹{SAMPLE.oldStandard.toLocaleString('en-IN')}</span>
            <span>-₹{SAMPLE.newStandard.toLocaleString('en-IN')}</span>
          </div>
          <div className="sample-row deduction">
            <span>HRA Exemption (Rent)</span>
            <span>-₹{SAMPLE.hraExemption.toLocaleString('en-IN')}</span>
            <span>₹0</span>
          </div>
          <div className="sample-row deduction">
            <span>80C / 80D Deductions</span>
            <span>-₹{SAMPLE.deductions80CD.toLocaleString('en-IN')}</span>
            <span>₹0</span>
          </div>
          <div className="sample-row highlight">
            <span>Total Taxable Income</span>
            <span>₹{SAMPLE.oldTaxable.toLocaleString('en-IN')}</span>
            <span>₹{SAMPLE.newTaxable.toLocaleString('en-IN')}</span>
          </div>
          <div className="sample-row total">
            <span>Final Tax (Incl. 4% Cess)</span>
            <span>₹{SAMPLE.oldTax.toLocaleString('en-IN')}</span>
            <span className="winner-amount">₹{SAMPLE.newTax.toLocaleString('en-IN')} ✓</span>
          </div>
        </div>

        <div className="sample-assumptions">
          <strong>Sample assumptions:</strong> Gross ₹15L/yr • Metro city rent ₹25K/mo • 80C ₹1.5L • Health insurance ₹25K • Below 60 • Resident Indian
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [showSampleReport, setShowSampleReport] = useState(false);
  const { resetInput } = useTax();

  const handleHeaderAction = () => {
    if (view === 'wizard') {
      resetInput();
    }
    setView('wizard');
    window.scrollTo(0, 0);
  };

  const goToLanding = () => {
    setView('landing');
    resetInput();
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-wrapper">
      {showSampleReport && <SampleReportModal onClose={() => setShowSampleReport(false)} />}

      {/* Sticky Header */}
      <header className="header glass">
        <div className="container header-content">
          <div className="logo" onClick={goToLanding} style={{ cursor: 'pointer' }}>
            <Calculator className="logo-icon" size={24} strokeWidth={2.5} />
            <span className="logo-text">Aayushmaa® <span>TaxWise</span></span>
          </div>
          <nav className="nav">
            {view === 'landing' && (
              <div className="nav-links">
                <a href="#how-it-works">How it works</a>
                <a href="#privacy">Privacy</a>
              </div>
            )}
            <button className="btn-primary-sm" onClick={handleHeaderAction}>
              {view === 'landing' ? 'Get Started' : 'Reset Session'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {view === 'landing' ? (
          <LandingPage onStart={handleHeaderAction} onSampleReport={() => setShowSampleReport(true)} />
        ) : (
          <Wizard onBackToHome={goToLanding} />
        )}
      </main>

      {/* Sticky Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-info">
            <ShieldCheck size={16} className="icon-success" />
            <span>Secure. Browser-only calculations.</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
              <Github size={20} />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--bg-main);
        }

        .main-content { flex: 1; display: flex; flex-direction: column; }

        .header {
          position: sticky;
          top: 0;
          height: var(--header-height);
          display: flex;
          align-items: center;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.7);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.03em;
        }

        .logo-icon { color: var(--primary); }
        .logo-text span { color: var(--primary); font-weight: 500; }

        .nav { display: flex; align-items: center; gap: 2rem; }
        .nav-links { display: flex; gap: 1.5rem; }
        .nav-links a { font-weight: 600; color: var(--text-muted); font-size: 0.9rem; }
        .nav-links a:hover { color: var(--primary); }

        .btn-primary-sm {
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
        }
        .btn-primary-sm:hover { background: var(--primary-hover); transform: translateY(-1px); }

        .footer {
          height: var(--footer-height);
          display: flex;
          align-items: center;
          border-top: 1px solid var(--border);
          background: white;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          color: var(--text-soft);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .footer-info { display: flex; align-items: center; gap: 8px; }
        .icon-success { color: var(--success); }
        .social-link { color: var(--text-soft); transition: color 0.2s; }
        .social-link:hover { color: var(--text-main); }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: modalFadeIn 0.2s ease;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          animation: modalSlideUp 0.25s ease;
        }

        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .modal-header h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; }
        .modal-subtitle { font-size: 0.85rem; color: var(--text-muted); }

        .modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .modal-close:hover { background: var(--border); color: var(--text-main); }

        .modal-body { padding: 1.25rem 1.5rem 1.5rem; }

        .sample-winner-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
        }

        .sample-trophy {
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 0.75rem;
          display: flex;
          align-items: center;
        }

        .sample-winner-text, .sample-savings { display: flex; flex-direction: column; gap: 2px; }
        .sample-savings { margin-left: auto; text-align: right; }
        .sample-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.75; font-weight: 700; }
        .sample-winner-text strong { font-size: 1.15rem; font-weight: 800; }
        .sample-savings strong { font-size: 1.4rem; font-weight: 900; }

        .sample-section {
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .sample-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 10px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
        }
        .sample-row:last-child { border-bottom: none; }

        .sample-row.label-row {
          background: var(--bg-main);
          text-transform: uppercase;
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          color: var(--text-soft);
        }

        .sample-row.deduction span:nth-child(2) { color: var(--error); }
        .sample-row.highlight { background: #f9fafb; }
        .sample-row.total { font-size: 0.95rem; color: var(--text-main); font-weight: 700; }
        .winner-amount { color: var(--success); font-weight: 800; }

        .sample-assumptions {
          font-size: 0.75rem;
          color: var(--text-soft);
          background: var(--bg-main);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .nav-links { display: none; }
          .sample-row { grid-template-columns: 1.5fr 1fr 1fr; font-size: 0.75rem; padding: 8px 10px; }
        }
      `}</style>
    </div>
  );
};

export default App;
