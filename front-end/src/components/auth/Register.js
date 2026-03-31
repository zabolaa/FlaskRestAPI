import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.register(formData.username, formData.password);
      setErrorMessage("");
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

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
          --input-bg: rgba(255, 255, 255, 0.03);
          --input-border: rgba(255, 255, 255, 0.08);
          --input-focus: rgba(94, 234, 212, 0.25);
          --error: #f87171;
          --error-bg: rgba(248, 113, 113, 0.08);
          --error-border: rgba(248, 113, 113, 0.15);
          --radius: 14px;
        }

        .register-root {
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

        .register-root::before {
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

        .register-root::after {
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
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .register-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          margin: 2rem;
          padding: 3rem 2.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          animation: scaleIn 0.5s ease-out both;
        }

        .register-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          margin-bottom: 2rem;
          transition: color 0.2s ease;
          animation: fadeUp 0.5s ease-out 0.1s both;
        }

        .register-back:hover {
          color: var(--text-secondary);
        }

        .register-badge {
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
          margin-bottom: 1rem;
          animation: fadeUp 0.5s ease-out 0.15s both;
        }

        .register-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          animation: fadeUp 0.5s ease-out 0.2s both;
        }

        .register-subtitle {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.3s both;
        }

        .register-field {
          margin-bottom: 1.25rem;
          animation: fadeUp 0.5s ease-out 0.35s both;
        }

        .register-field:nth-child(2) {
          animation-delay: 0.4s;
        }

        .register-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .register-input {
          width: 100%;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: var(--text-primary);
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 10px;
          outline: none;
          transition: all 0.2s ease;
        }

        .register-input::placeholder {
          color: var(--text-muted);
        }

        .register-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--input-focus);
          background: rgba(255, 255, 255, 0.04);
        }

        .register-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--error);
          background: var(--error-bg);
          border: 1px solid var(--error-border);
          border-radius: 10px;
          animation: shake 0.4s ease-out;
        }

        .register-submit {
          width: 100%;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--bg-primary);
          background: var(--accent);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          animation: fadeUp 0.5s ease-out 0.5s both;
        }

        .register-submit:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .register-submit:active {
          transform: translateY(0);
        }

        .register-divider {
          height: 1px;
          background: var(--border);
          margin: 1.75rem 0;
          animation: fadeUp 0.5s ease-out 0.55s both;
        }

        .register-login-link {
          text-align: center;
          font-size: 0.88rem;
          color: var(--text-muted);
          animation: fadeUp 0.5s ease-out 0.6s both;
        }

        .register-login-link a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .register-login-link a:hover {
          color: #7af0de;
        }
      `}</style>

      <div className="register-root">
        <div className="register-card">
          <Link to="/" className="register-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>

          <div className="register-badge">New account</div>

          <h1 className="register-title">Create an account</h1>
          <p className="register-subtitle">
            Sign up to start exploring shops and their products.
          </p>

          <form onSubmit={handleRegister}>
            <div className="register-field">
              <label htmlFor="username" className="register-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="register-input"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password" className="register-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="register-input"
                placeholder="Choose a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && (
              <div className="register-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMessage}
              </div>
            )}

            <button type="submit" className="register-submit">Create account</button>
          </form>

          <div className="register-divider" />

          <p className="register-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;