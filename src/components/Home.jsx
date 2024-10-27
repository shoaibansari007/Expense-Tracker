import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="expense-box">
        <h1>Welcome to Expense Tracker</h1>
        <div className="exp-links">
          <Link to="/add-expense" className="exp-link">
            Add Expense
          </Link>
          <Link to="/expense-list" className="exp-link">
            Expense List
          </Link>
        </div>
        <p>
          Track and Manage your expenses effectively. Use the navigation links
          to add new expenses or view your expense history.
        </p>
      </div>
    </div>
  );
}

export default Home;
