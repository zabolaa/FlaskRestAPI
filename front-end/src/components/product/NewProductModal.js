import React, { useState } from "react";

const NewProductModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreate = () => {
    onCreate({ name, price });
    setName("");
    setPrice(0);
    onClose();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap');

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          animation: modalFadeIn 0.25s ease-out both;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: 2rem;
          padding: 2.5rem;
          background: #141820;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #e8ecf1;
          animation: modalSlideUp 0.3s ease-out 0.05s both;
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          color: #515c6e;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #8892a4;
        }

        .modal-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #e8ecf1;
          margin-bottom: 0.4rem;
        }

        .modal-subtitle {
          font-size: 0.88rem;
          color: #8892a4;
          margin-bottom: 1.75rem;
        }

        .modal-field {
          margin-bottom: 1.25rem;
        }

        .modal-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #8892a4;
          margin-bottom: 8px;
        }

        .modal-input {
          width: 100%;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #e8ecf1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          outline: none;
          transition: all 0.2s ease;
        }

        .modal-input::placeholder {
          color: #515c6e;
        }

        .modal-input:focus {
          border-color: #5eead4;
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.25);
          background: rgba(255, 255, 255, 0.04);
        }

        .modal-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .modal-btn-create {
          flex: 1;
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0c0f14;
          background: #5eead4;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-btn-create:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(94, 234, 212, 0.25);
        }

        .modal-btn-create:active {
          transform: translateY(0);
        }

        .modal-btn-cancel {
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #8892a4;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-btn-cancel:hover {
          background: #1a1f2a;
          color: #e8ecf1;
          border-color: rgba(255, 255, 255, 0.12);
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            aria-label="close"
            onClick={onClose}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h2 className="modal-title">Create New Product</h2>
          <p className="modal-subtitle">Add a product with a name and price.</p>

          <div className="modal-field">
            <label className="modal-label">Product Name</label>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Product Price</label>
            <input
              className="modal-input"
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>

          <div className="modal-actions">
            <button onClick={handleCreate} className="modal-btn-create">
              Create Product
            </button>
            <button onClick={onClose} className="modal-btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductModal;