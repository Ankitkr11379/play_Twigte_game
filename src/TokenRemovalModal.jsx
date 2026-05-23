import React, { useState, useEffect } from "react";
import "./TokenRemovalModal.css";

const TokenRemovalModal = ({ open, tokens, maxSelect, onConfirm, onCancel }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!open) setSelected([]);
  }, [open]);

  const handleSelect = (idx) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else if (selected.length < maxSelect) {
      setSelected([...selected, idx]);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Select {maxSelect} opponent token{maxSelect > 1 ? 's' : ''} to remove</h2>
        <div className="token-list">
          {tokens.length === 0 ? (
            <div>No tokens available to remove.</div>
          ) : (
            tokens.map((idx) => (
              <button
                key={idx}
                className={`token-btn${selected.includes(idx) ? " selected" : ""}`}
                onClick={() => handleSelect(idx)}
                disabled={selected.length >= maxSelect && !selected.includes(idx)}
              >
                {idx} ({tokenValues ? tokenValues.find(t => t.index === idx)?.value : ""})
              </button>
            ))
          )}
        </div>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length !== maxSelect}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenRemovalModal;
