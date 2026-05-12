import React, { useState } from 'react';
import { Calculator, ShieldCheck, Github } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import { useTax } from './TaxContext';

type AppView = 'landing' | 'wizard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const { resetInput } = useTax();

  const startWizard = () => {
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
            <button className="btn-primary-sm" onClick={startWizard}>
              {view === 'landing' ? 'Get Started' : 'Reset Session'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {view === 'landing' ? (
          <LandingPage onStart={startWizard} />
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

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

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

        .logo-icon {
          color: var(--primary);
        }

        .logo-text span {
          color: var(--primary);
          font-weight: 500;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        .btn-primary-sm {
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
        }

        .btn-primary-sm:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

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

        .footer-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-success {
          color: var(--success);
        }

        .social-link {
          color: var(--text-soft);
          transition: color 0.2s;
        }

        .social-link:hover {
          color: var(--text-main);
        }

        @media (max-width: 640px) {
          .nav-links { display: none; }
        }
      `}</style>
    </div>
  );
};

export default App;
