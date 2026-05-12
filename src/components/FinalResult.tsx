import React, { useEffect, useRef } from 'react';
import { useTax } from '../TaxContext';
import { Trophy, ArrowLeft, Download, Printer, ShieldCheck, TrendingDown, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface FinalResultProps {
  onBack: () => void;
}

const FinalResult: React.FC<FinalResultProps> = ({ onBack }) => {
  const { results, resetInput } = useTax();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b']
      });
    } catch (err) {
      console.warn("Confetti failed", err);
    }
  }, []);

  if (!results || !results.oldRegime || !results.newRegime) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} className="color-red" />
        <h2>Calculation Error</h2>
        <p>We couldn't generate your report. Please try resetting the calculator.</p>
        <button className="btn-primary" onClick={resetInput}>Reset Calculator</button>
      </div>
    );
  }

  const isNewBetter = results.recommendation === 'new';
  const winner = isNewBetter ? results.newRegime : results.oldRegime;

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Tax_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="final-result-page">
      <div className="container container-narrow">
        <div className="report-actions-top">
          <button className="btn-inline" onClick={onBack}>
            <ArrowLeft size={16} /> Edit Details
          </button>
          <div className="action-group">
            <button className="btn-secondary-sm" onClick={downloadPDF}>
              <Download size={16} /> Save PDF
            </button>
            <button className="btn-secondary-sm" onClick={() => window.print()}>
              <Printer size={16} /> Print
            </button>
          </div>
        </div>

        <div className="report-paper soft-card" ref={reportRef}>
          {/* Winner Header */}
          <div className={`winner-banner ${isNewBetter ? 'bg-new' : 'bg-old'}`}>
            <div className="winner-content">
              <div className="trophy-box">
                <Trophy size={40} />
              </div>
              <div className="winner-text">
                <span className="label">Recommended Regime</span>
                <h2 className="title">{isNewBetter ? 'New Tax Regime' : 'Old Tax Regime'}</h2>
              </div>
              <div className="winner-savings">
                <span className="label">Total Annual Savings</span>
                <span className="amount">₹{results.savings.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="report-body">
            <section className="report-section">
              <h3 className="section-title">Income Summary</h3>
              <div className="data-grid">
                <div className="data-item">
                  <span className="label">Gross Annual Income</span>
                  <span className="val">₹{results.oldRegime.grossIncome.toLocaleString('en-IN')}</span>
                </div>
                <div className="data-item">
                  <span className="label">Suggested ITR Form</span>
                  <span className="val badge-itr">{results.oldRegime.itrForm}</span>
                </div>
              </div>
            </section>

            <section className="report-section">
              <h3 className="section-title">Regime Comparison</h3>
              <div className="comparison-table">
                <div className="table-header">
                  <span>Particulars</span>
                  <span>Old Regime</span>
                  <span>New Regime</span>
                </div>
                <div className="table-row">
                  <span>Standard Deduction</span>
                  <span className="minus">-₹{results.oldRegime.deductions?.standard.toLocaleString() || '0'}</span>
                  <span className="minus">-₹{results.newRegime.deductions?.standard.toLocaleString() || '0'}</span>
                </div>
                <div className="table-row">
                  <span>Investments (80C/D/HRA)</span>
                  <span className="minus">-₹{results.oldRegime.deductions?.other.toLocaleString() || '0'}</span>
                  <span className="val">₹0</span>
                </div>
                <div className="table-row row-highlight">
                  <span>Total Taxable Income</span>
                  <span className="val">₹{results.oldRegime.taxableIncome.toLocaleString()}</span>
                  <span className="val">₹{results.newRegime.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="table-row row-total">
                  <span>Final Tax (Incl. Cess)</span>
                  <span className={`tax-val ${!isNewBetter ? 'winner-text-green' : ''}`}>
                    ₹{results.oldRegime.finalTax.toLocaleString()}
                  </span>
                  <span className={`tax-val ${isNewBetter ? 'winner-text-green' : ''}`}>
                    ₹{results.newRegime.finalTax.toLocaleString()}
                  </span>
                </div>
              </div>
            </section>

            <div className="report-footer">
              <div className="privacy-seal">
                <ShieldCheck size={16} />
                <span>Verified Calculation • FY 2025-26 Updated</span>
              </div>
              <p className="disclaimer">
                Note: This is an estimate based on provided inputs. Please verify with a professional CA before filing.
              </p>
            </div>
          </div>
        </div>

        <div className="report-bottom-actions">
          <button className="btn-primary btn-xl w-full" onClick={resetInput}>
            Start New Calculation
          </button>
        </div>
      </div>

      <style>{`
        .final-result-page {
          padding: var(--space-xl) 0;
          background: var(--bg-main);
          min-height: 100vh;
        }

        .report-actions-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }

        .btn-inline {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
          background: none;
        }

        .action-group {
          display: flex;
          gap: 10px;
        }

        .btn-secondary-sm {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: white;
          border: 1.5px solid var(--border-strong);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .report-paper {
          padding: 0;
          overflow: hidden;
          background: white;
          margin-bottom: var(--space-xl);
          box-shadow: var(--shadow-lg);
        }

        .winner-banner {
          padding: calc(var(--space-xl) * 1) var(--space-xl);
          color: white;
          position: relative;
        }

        .bg-new { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); }
        .bg-old { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }

        .winner-content {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }

        .trophy-box {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .winner-text .label, .winner-savings .label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .winner-text .title {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1;
        }

        .winner-savings {
          margin-left: auto;
          text-align: right;
        }

        .winner-savings .amount {
          font-size: 2.5rem;
          font-weight: 900;
          font-family: var(--font-heading);
        }

        .report-body {
          padding: var(--space-xl);
        }

        .report-section {
          margin-bottom: var(--space-xl);
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: var(--space-md);
          border-bottom: 2px solid var(--bg-main);
          padding-bottom: 8px;
        }

        .data-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-lg);
        }

        .data-item {
          display: flex;
          flex-direction: column;
        }

        .data-item .label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-soft);
          margin-bottom: 4px;
        }

        .data-item .val {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .badge-itr {
          width: fit-content;
          padding: 4px 12px;
          background: var(--primary-light);
          color: var(--primary);
          border-radius: 6px;
        }

        .comparison-table {
          width: 100%;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.2fr;
          padding: 12px var(--space-md);
          background: var(--bg-main);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.2fr;
          padding: 14px var(--space-md);
          border-bottom: 1px solid var(--border);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .table-row .val { color: var(--text-main); }
        .table-row .minus { color: var(--error); }

        .row-highlight { background: #fdfdfd; }
        .row-total {
          background: white;
          border-bottom: none;
          font-size: 1.1rem;
        }

        .row-total span:first-child { color: var(--text-main); font-weight: 800; }

        .tax-val { font-weight: 800; font-family: var(--font-heading); font-size: 1.25rem; }
        .winner-text-green { color: var(--success); }

        .report-footer {
          margin-top: var(--space-xl);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .privacy-seal {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-soft);
          margin-bottom: 12px;
        }

        .disclaimer {
          font-size: 0.75rem;
          color: var(--text-soft);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .winner-content { flex-direction: column; text-align: center; }
          .winner-savings { margin-left: 0; text-align: center; }
          .data-grid { grid-template-columns: 1fr; }
          .table-header, .table-row { grid-template-columns: 1.5fr 1fr 1fr; font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
};

export default FinalResult;
