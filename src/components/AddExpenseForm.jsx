import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpenseForm() {
  const [expData, setExpData] = useState({
    expName: "",
    amount: "",
    expDate: "",
    description: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    return cur || {};
  });

  const validateInputs = () => {
    if (parseFloat(expData.amount) <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    if (expData.description.length < 1 || expData.description.length > 200) {
      setError("Description must be between 1 and 200 characters.");
      return false;
    }
    if (new Date(expData.expDate) > new Date()) {
      setError("Date cannot be in the future.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newExpense = {
      ...expData,
      expId: nanoid(),
    };

    const updatedUserData = {
      ...userData,
      expData: [...(userData.expData || []), newExpense],
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
    navigate("/expense-list");
  };

  return (
    <div className="add-expense">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      <form>
        <div className="inputBox">
          <label htmlFor="expName">Expense Name:</label>
          <input
            type="text"
            name="expName"
            value={expData.expName}
            onChange={(e) =>
              setExpData({ ...expData, expName: e.target.value })
            }
            className="input"
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            value={expData.amount}
            onChange={(e) => setExpData({ ...expData, amount: e.target.value })}
            className="input"
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="expDate"
            id="date-input"
            value={expData.expDate}
            className="input"
            onChange={(e) =>
              setExpData({ ...expData, expDate: e.target.value })
            }
            required
          />
        </div>
        <div className="inputBox text-area">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={expData.description}
            className="input"
            onChange={(e) =>
              setExpData({ ...expData, description: e.target.value })
            }
            required
          ></textarea>
        </div>
        {error && <p className="error">{error}</p>}{" "}
        {/* Display error message */}
        <button className="loginButton submitButton" onClick={handleAddExpense}>
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
