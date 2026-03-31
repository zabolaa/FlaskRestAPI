import React, { useState } from "react";

const ProductCard = ({
  id,
  initialName,
  initialPrice,
  onDelete,
  updateProduct,
}) => {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProduct({ name, price }, id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(initialName);
    setPrice(initialPrice);
    setIsEditing(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        .product-card {
          background: #141820;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 1.5rem;
          font-family: 'DM Sans', sans-serif;
          color: #e8ecf1;
          transition: all 0.2s ease;
        }

        .product-card:hover {
          background: #1a1f2a;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .product-card-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e8ecf1;
          margin-bottom: 0.35rem;
        }

        .product-card-price {
          font-size: 0.9rem;
          color: #5eead4;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .product-card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .product-btn {
          padding: 7px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .product-btn-edit {
          color: #8892a4;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .product-btn-edit:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #e8ecf1;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .product-btn-delete {
          color: #f87171;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.12);
        }

        .product-btn-delete:hover {
          background: rgba(248, 113, 113, 0.15);
          border-color: rgba(248, 113, 113, 0.25);
        }

        .product-btn-save {
          color: #0c0f14;
          background: #5eead4;
        }

        .product-btn-save:hover {
          background: #7af0de;
          transform: translateY(-1px);
          box-shadow: 0 2px 12px rgba(94, 234, 212, 0.25);
        }

        .product-btn-cancel {
          color: #8892a4;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .product-btn-cancel:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #e8ecf1;
        }

        /* ── Edit mode ── */
        .product-edit-field {
          margin-bottom: 0.75rem;
        }

        .product-edit-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #8892a4;
          margin-bottom: 5px;
        }

        .product-edit-input {
          width: 100%;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #e8ecf1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          outline: none;
          transition: all 0.2s ease;
        }

        .product-edit-input:focus {
          border-color: #5eead4;
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.25);
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>

      <div className="product-card">
        {isEditing ? (
          <div>
            <div className="product-edit-field">
              <label className="product-edit-label">Name</label>
              <input
                className="product-edit-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="product-edit-field">
              <label className="product-edit-label">Price</label>
              <input
                className="product-edit-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="product-card-actions">
              <button className="product-btn product-btn-save" onClick={handleSave}>Save</button>
              <button className="product-btn product-btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="product-card-name">{name}</div>
            <div className="product-card-price">${price}</div>
            <div className="product-card-actions">
              <button className="product-btn product-btn-edit" onClick={handleEdit}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: -1 }}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
              <button className="product-btn product-btn-delete" onClick={() => onDelete(id)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: -1 }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;