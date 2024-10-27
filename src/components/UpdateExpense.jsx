import React from "react";

const UpdateExpense = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-expense" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default UpdateExpense;
