import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateExpense from "./UpdateExpense";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ExpenseList() {
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const curr = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleEditClick = (expense) => {
    setIsEditing(expense.expId);
    setEditData(expense);
  };

  const handleDeleteClick = (expId) => {
    setExpenseToDelete(expId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedExpData = curr.expData.filter(
      (el) => el.expId !== expenseToDelete
    );
    const updatedUserData = { ...curr, expData: updatedExpData };

    localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
    setDeleteModalOpen(false);
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="expense-list-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      <h3>Expense List</h3>
      <div className="expense-box-list">
        {curr?.expData?.length > 0 ? (
          <ul>
            {curr?.expData?.map((el) => (
              <li key={el.expId}>
                <h4>{el.expName}</h4>
                <p>
                  Amount: <span>{el.amount}₹</span>
                </p>
                <p>
                  Date: <span>{el.expDate}</span>
                </p>
                <p>
                  Description: <span>{el.description}</span>
                </p>
                <button
                  onClick={() => handleEditClick(el)}
                  className="back-button"
                  style={{
                    backgroundColor: "#1E90FF",
                    margin: "5px 5px 0 0",
                    marginTop: "10px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(el.expId)}
                  className="back-button"
                  style={{
                    backgroundColor: "#1E90FF",
                    margin: "5px 5px 0 0",
                    marginTop: "10px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="textCenter">No expenses available.</p>
        )}
      </div>

      {/* Modal for editing expense */}
      <UpdateExpense isOpen={isEditing !== null}>
        <button
          type="button"
          className="back-button"
          onClick={() => setIsEditing(null)}
        >
          Cancel
        </button>
        <h3>Update Expense</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="inputBox">
            <label htmlFor="expName">Expense Name:</label>
            <input
              type="text"
              name="expName"
              value={editData.expName}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="amount"
              value={editData.amount}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox">
            <label htmlFor="expDate">Date:</label>
            <input
              type="date"
              name="expDate"
              value={editData.expDate}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="inputBox text-area">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              rows={4}
              value={editData.description}
              onChange={handleInputChange}
              required
              className="input"
            ></textarea>
          </div>
          <button type="submit" className="loginButton submitButton">
            Update Expense
          </button>
        </form>
      </UpdateExpense>

      {/* Delete  Expense*/}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default ExpenseList;
