import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register";
import ProtectedRoute from "./services/ProtectedRoute.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        margin: "0",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpenseForm />} />
            <Route path="/expense-list" element={<ExpenseList />} />
          </Route>
          <Route
            path="*"
            element={<div className="not-found">404 - Page Not Found</div>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
