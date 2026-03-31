import React from 'react';

const ShopCard = ({ id, name, onDelete, onClick }) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        .shop-card {
          background: #141820;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 1.5rem;
          font-family: 'DM Sans', sans-serif;
          color: #e8ecf1;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .shop-card:hover {
          background: #1a1f2a;
          border-color: rgba(94, 234, 212, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .shop-card-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shop-card-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(94, 234, 212, 0.08);
          border: 1px solid rgba(94, 234, 212, 0.12);
          border-radius: 10px;
          color: #5eead4;
        }

        .shop-card-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #e8ecf1;
        }

        .shop-card-delete {
          align-self: flex-start;
          padding: 7px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #f87171;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.12);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .shop-card-delete:hover {
          background: rgba(248, 113, 113, 0.15);
          border-color: rgba(248, 113, 113, 0.25);
        }
      `}</style>

      <div className="shop-card" onClick={handleClick}>
        <div className="shop-card-info">
          <div className="shop-card-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="shop-card-name">{name}</span>
        </div>

        <button onClick={handleDelete} className="shop-card-delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: -1 }}>
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>
    </>
  );
};

export default ShopCard;