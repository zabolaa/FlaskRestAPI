import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import axiosInstance from "../../services/axiosInstance";
import NewProductModal from "./NewProductModal";
import { useAuth } from "../../hooks/auth";

const Products = () => {
  const { shopId } = useParams();
  let auth = useAuth();
  const navigate = useNavigate();
  const [shopName, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    fetchShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  const fetchShops = async () => {
    try {
      const { data } = await axiosInstance.get(`/shop/${shopId}`);
      setProducts(data.products);
      setName(data.name);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCreateProduct = async ({ name, price }) => {
    try {
      await axiosInstance.post("/product", {
        name,
        price,
        shop_id: shopId,
      });
      await fetchShops();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async ({ name, price }, id) => {
    try {
      await axiosInstance.put(`/product/${id}`, {
        name,
        price,
      });
      await fetchShops();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleLogout = () => {
    auth.signout(() => {
      navigate("/");
    });
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

        .products-root {
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .products-root::before {
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

        .products-root::after {
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

        .products-container {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 2rem 4rem;
        }

        /* ── Header bar ── */
        .products-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.5s ease-out both;
        }

        .products-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s ease;
        }

        .products-back:hover {
          color: var(--text-secondary);
        }

        .products-logout {
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

        .products-logout:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* ── Title section ── */
        .products-title-section {
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease-out 0.1s both;
        }

        .products-badge {
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

        .products-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .products-title strong {
          color: var(--accent);
        }

        .products-count {
          font-size: 0.9rem;
          color: #5eead4;
        }

        /* ── Product grid ── */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .products-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-card);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: var(--radius);
          animation: fadeUp 0.5s ease-out 0.2s both;
        }

        .products-empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .products-empty-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .products-empty-hint {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* ── Create button ── */
        .products-create-btn {
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

        .products-create-btn:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .products-create-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="products-root">
        <div className="products-container">
          {/* Header */}
          <div className="products-header">
            <button onClick={() => navigate(-1)} className="products-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to shops
            </button>

            <button onClick={handleLogout} className="products-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>

          {/* Title */}
          <div className="products-title-section">
            <div className="products-badge">Products</div>
            <h1 className="products-title">
              <strong>{shopName}</strong>
            </h1>
            <p className="products-count">
              {products.length} {products.length === 1 ? "product" : "products"} available
            </p>
          </div>

          {/* Product grid */}
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="products-empty">
                <div className="products-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <p className="products-empty-text">No products yet</p>
                <p className="products-empty-hint">Add your first product to this shop.</p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  initialName={product.name}
                  initialPrice={product.price}
                  onDelete={handleDelete}
                  updateProduct={updateProduct}
                />
              ))
            )}
          </div>

          {/* Create button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="products-create-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Product
          </button>

          <NewProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateProduct}
          />
        </div>
      </div>
    </>
  );
};

export default Products;