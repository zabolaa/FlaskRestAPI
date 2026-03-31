import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signin(formData.username, formData.password);
      setErrorMessage("");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

        .login-root {
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

        .login-root::before {
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

        .login-root::after {
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

        .login-card {
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

        .login-back {
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

        .login-back:hover {
          color: var(--text-secondary);
        }

        .login-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          animation: fadeUp 0.5s ease-out 0.15s both;
        }

        .login-subtitle {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.25s both;
        }

        .login-field {
          margin-bottom: 1.25rem;
          animation: fadeUp 0.5s ease-out 0.35s both;
        }

        .login-field:nth-child(2) {
          animation-delay: 0.4s;
        }

        .login-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .login-input {
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

        .login-input::placeholder {
          color: var(--text-muted);
        }

        .login-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--input-focus);
          background: rgba(255, 255, 255, 0.04);
        }

        .login-error {
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

        .login-submit {
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

        .login-submit:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .login-submit:active {
          transform: translateY(0);
        }

        .login-divider {
          height: 1px;
          background: var(--border);
          margin: 1.75rem 0;
          animation: fadeUp 0.5s ease-out 0.55s both;
        }

        .login-register {
          text-align: center;
          font-size: 0.88rem;
          color: var(--text-muted);
          animation: fadeUp 0.5s ease-out 0.6s both;
        }

        .login-register a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .login-register a:hover {
          color: #7af0de;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          <Link to="/" className="login-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            Sign in to access shops and their products.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="login-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMessage}
              </div>
            )}

            <button type="submit" className="login-submit">Sign in</button>
          </form>

          <div className="login-divider" />

          <p className="login-register">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;