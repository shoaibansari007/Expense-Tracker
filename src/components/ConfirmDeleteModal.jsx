import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this expense?</p>

        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="confirm-button"
          style={{ backgroundColor: "#ff4d4d" }}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
