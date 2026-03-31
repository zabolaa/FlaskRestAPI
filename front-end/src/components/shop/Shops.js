import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import ShopCard from "./ShopCard";
import axiosInstance from "../../services/axiosInstance";
import NewShopModal from "./NewShopModal";

const Shops = () => {
  let navigate = useNavigate();
  let auth = useAuth();
  const [shops, setShops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axiosInstance.get("/shop");
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/shop/${id}`);
      setShops(shops.filter((shop) => shop.id !== id));
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleShopClick = (id) => {
    navigate(`/store/${id}`);
  };

  const handleLogout = () => {
    auth.signout(() => {
      navigate("/");
    });
  };

  const handleCreateShop = async (name) => {
    try {
      const response = await axiosInstance.post("/shop", { name });
      setShops([...shops, response.data]);
    } catch (error) {
      console.error("Error creating shop:", error);
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
          --radius: 14px;
        }

        .shops-root {
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .shops-root::before {
          content: '';
          position: fixed;
          top: -40%;
          left: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          animation: drift 18s ease-in-out infinite alternate;
        }

        .shops-root::after {
          content: '';
          position: fixed;
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

        .shops-container {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 2rem 4rem;
        }

        /* ── Header bar ── */
        .shops-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.5s ease-out both;
        }

        .shops-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .shops-back:hover {
          color: var(--text-secondary);
        }

        .shops-logout {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .shops-logout:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* ── Title section ── */
        .shops-title-section {
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.1s both;
        }

        .shops-badge {
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
        }

        .shops-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .shops-count {
          font-size: 0.9rem;
          color: #5eead4;
        }

        /* ── Shop grid ── */
        .shops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .shops-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-card);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: var(--radius);
          animation: fadeUp 0.5s ease-out 0.2s both;
        }

        .shops-empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .shops-empty-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .shops-empty-hint {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* ── Create button ── */
        .shops-create-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--bg-primary);
          background: var(--accent);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          animation: fadeUp 0.5s ease-out 0.3s both;
        }

        .shops-create-btn:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .shops-create-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="shops-root">
        <div className="shops-container">
          {/* Header */}
          <div className="shops-header">
            <Link to="/" className="shops-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Home
            </Link>

            <button onClick={handleLogout} className="shops-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>

          {/* Title */}
          <div className="shops-title-section">
            <div className="shops-badge">Browse</div>
            <h1 className="shops-title">All Shops</h1>
            <p className="shops-count">
              {shops.length} {shops.length === 1 ? "shop" : "shops"} available
            </p>
          </div>

          {/* Shop grid */}
          <div className="shops-grid">
            {shops.length === 0 ? (
              <div className="shops-empty">
                <div className="shops-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="shops-empty-text">No shops yet</p>
                <p className="shops-empty-hint">Create your first shop to get started.</p>
              </div>
            ) : (
              shops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  id={shop.id}
                  name={shop.name}
                  onDelete={handleDelete}
                  onClick={handleShopClick}
                />
              ))
            )}
          </div>

          {/* Create button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="shops-create-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Shop
          </button>

          <NewShopModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateShop}
          />
        </div>
      </div>
    </>
  );
};

export default Shops;