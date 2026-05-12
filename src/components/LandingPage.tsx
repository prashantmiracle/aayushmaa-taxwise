import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Zap, 
  FileText, 
  EyeOff,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import MockResultCard from './MockResultCard';

interface LandingPageProps {
  onStart: () => void;
  onSampleReport: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onSampleReport }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge-wrapper">
              <span className="badge">Updated for FY 2025-26</span>
            </div>
            <h1>Save more on taxes with <span className="gradient-text">Aayushmaa® TaxWise.</span></h1>
            <p className="hero-subtitle">
              Answer simple questions in plain English. Compare old vs new tax regime instantly for 
              <strong> FY 2025-26 / AY 2026-27</strong>.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-lg" onClick={onStart}>
                Start Free Tax Check <ArrowRight size={20} />
              </button>
              <button className="btn-secondary btn-lg" onClick={onSampleReport}>
                See sample report
              </button>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>Browser-only calculation</span>
              </div>
              <div className="trust-item">
                <Lock size={18} />
                <span>No signup needed</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <MockResultCard />
            <div className="visual-decoration decoration-1"></div>
            <div className="visual-decoration decoration-2"></div>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="features-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>Why use this calculator?</h2>
            <p>Most calculators ask for CTC or gross salary. We start with what you actually know.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-blue">
                <Users />
              </div>
              <h3>Simple Language</h3>
              <p>No 80C or Section 24 jargon. Just simple questions about your rent, investments, and life.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-amber">
                <Zap />
              </div>
              <h3>Live Progress</h3>
              <p>Watch your tax estimate update in real-time as you answer every question.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-green">
                <FileText />
              </div>
              <h3>PDF Report</h3>
              <p>Download a detailed breakdown of your comparison to share or save for filing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="privacy-section" id="privacy">
        <div className="container">
          <div className="privacy-card glass">
            <div className="privacy-content">
              <div className="feature-icon bg-red">
                <EyeOff />
              </div>
              <h2>Your data never leaves your browser.</h2>
              <p>
                We believe tax data is deeply personal. All calculations are performed locally 
                on your device. We do not store or upload your income details to any server.
              </p>
              <div className="privacy-badge">
                <ShieldCheck size={16} /> <span>100% Client-Side</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who can use it */}
      <section className="persona-section">
        <div className="container">
          <div className="section-header">
            <h2>Built for every Indian taxpayer</h2>
          </div>
          <div className="persona-grid">
            <div className="persona-item">
              <span>Salaried Employees</span>
              <ArrowUpRight size={16} />
            </div>
            <div className="persona-item">
              <span>Freelancers</span>
              <ArrowUpRight size={16} />
            </div>
            <div className="persona-item">
              <span>Small Business Owners</span>
              <ArrowUpRight size={16} />
            </div>
            <div className="persona-item">
              <span>Senior Citizens</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .landing-page {
          padding-bottom: var(--space-xl);
        }

        /* Hero */
        .hero-section {
          padding: var(--space-xl) 0;
          background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: var(--space-xl);
          align-items: center;
        }

        .hero-content h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: var(--space-md);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 600px;
          margin-bottom: var(--space-xl);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--bg-main);
          border-color: var(--primary);
        }

        .hero-trust {
          display: flex;
          gap: var(--space-lg);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-decoration {
          position: absolute;
          z-index: -1;
          filter: blur(60px);
          border-radius: 50%;
        }

        .decoration-1 {
          width: 300px;
          height: 300px;
          background: rgba(37, 99, 235, 0.1);
          top: -50px;
          right: -50px;
        }

        .decoration-2 {
          width: 200px;
          height: 200px;
          background: rgba(245, 158, 11, 0.1);
          bottom: -50px;
          left: -50px;
        }

        /* Features */
        .features-section {
          padding: var(--space-xl) 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .section-header h2 {
          font-size: 2.5rem;
        }

        .section-title {
          font-size: 2.25rem;
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .features {
          padding: var(--space-xl) 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        .feature-card {
          padding: var(--space-lg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .feature-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
          color: white;
        }

        .bg-blue { background-color: var(--primary); }
        .bg-amber { background-color: var(--accent); }
        .bg-green { background-color: var(--success); }
        .bg-red { background-color: var(--error); }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: var(--space-xs);
        }

        .feature-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Privacy */
        .privacy-section {
          padding: var(--space-xl) 0;
        }

        .privacy-card {
          padding: var(--space-xl);
          border-radius: 32px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .privacy-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .privacy-card h2 {
          font-size: 2rem;
        }

        .privacy-card p {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.85rem;
        }

        /* Persona */
        .persona-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
        }

        .persona-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .persona-item:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(37, 99, 235, 0.02);
        }

        @media (max-width: 1024px) {
          .hero-content h1 { font-size: 3rem; }
          .features-grid { grid-template-columns: 1fr; }
          .persona-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; }
          .hero-content h1 { font-size: 2.5rem; }
          .hero-subtitle { margin: 0 auto var(--space-xl); }
          .hero-actions { justify-content: center; flex-direction: column; }
          .hero-trust { justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
