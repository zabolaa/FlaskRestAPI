import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-primary: #0c0f14;
          --bg-card: #141820;
          --bg-card-hover: #1a1f2a;
          --accent: #5eead4;
          --accent-dim: rgba(94, 234, 212, 0.08);
          --accent-glow: rgba(94, 234, 212, 0.15);
          --text-primary: #e8ecf1;
          --text-secondary: #8892a4;
          --text-muted: #515c6e;
          --border: rgba(255, 255, 255, 0.06);
          --radius: 14px;
        }

        .home-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
        }

        .home-root::before {
          content: '';
          position: absolute;
          top: -40%;
          left: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          animation: drift 18s ease-in-out infinite alternate;
        }

        .home-root::after {
          content: '';
          position: absolute;
          bottom: -30%;
          right: -15%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
          pointer-events: none;
          animation: drift 22s ease-in-out infinite alternate-reverse;
        }

        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 40px); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .home-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 520px;
          margin: 2rem;
          padding: 3rem 2.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          animation: scaleIn 0.5s ease-out both;
        }

        .home-badge {
          display: inline-block;
          padding: 5px 14px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(94, 234, 212, 0.12);
          border-radius: 100px;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.5s ease-out 0.15s both;
        }

        .home-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2.2rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          animation: fadeUp 0.5s ease-out 0.25s both;
        }

        .home-title strong {
          color: var(--accent);
        }

        .home-subtitle {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2.25rem;
          animation: fadeUp 0.5s ease-out 0.35s both;
        }

        .home-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.4s both;
        }

        .home-nav {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.45s both;
        }

        .home-nav-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
        }

        .home-nav-btn.primary {
          background: var(--accent);
          color: var(--bg-primary);
        }

        .home-nav-btn.primary:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .home-nav-btn.secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .home-nav-btn.secondary:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .home-linkedin {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 10px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          animation: fadeUp 0.5s ease-out 0.55s both;
        }

        .home-linkedin:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .home-linkedin svg {
          flex-shrink: 0;
          color: #0a66c2;
        }

        .home-linkedin span {
          color: var(--text-muted);
          margin-left: auto;
          font-size: 0.78rem;
        }
      `}</style>

      <div className="home-root">
        <div className="home-card">
          <div className="home-badge">Flask + React</div>

          <h1 className="home-title">
            REST APIs with <strong>Flask</strong> & Python
          </h1>

          <p className="home-subtitle">
            A lightweight frontend application paired with a Flask REST API
            — explore shops, manage data, and see it all in action.
          </p>

          <div className="home-divider" />

          <div className="home-nav">
            <Link to="/shop" className="home-nav-btn primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Shops
            </Link>

            {auth.isLoggedIn ? (
              <button
                className="home-nav-btn secondary"
                onClick={() => auth.signout(() => navigate("/"))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            ) : (
              <Link to="/login" className="home-nav-btn secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </Link>
            )}
          </div>

          <a
            href="https://www.linkedin.com/in/aleksandra-rdzanek-6874b018b"
            target="_blank"
            rel="noopener noreferrer"
            className="home-linkedin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Aleksandra Rdzanek
            <span>LinkedIn →</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;