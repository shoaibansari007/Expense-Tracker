import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  const usersList = JSON.parse(localStorage.getItem("users")) || [];

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Invalid email format";
      }
    } else if (name === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters long";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setError(false);
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMatched = usersList.find(
      (el) => el.email === user.email && el.password === user.password
    );

    if (userMatched) {
      localStorage.setItem("loggedin", true);
      localStorage.setItem("currentUser", JSON.stringify(userMatched));
      navigate("/");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(user).every((field) => field !== "");
    const noErrors = Object.values(errors).every((error) => error === "");
    setIsDisabled(!(allFieldsFilled && noErrors));
  }, [user, errors]);

  return (
    <div className="mainContainer">
      <form>
        <h2>Login Page</h2>
        <div className="inputBox">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={`${errors.email ? "input-error-border" : ""} input`}
          />
          {errors.email && <p className="input-error">{errors.email}</p>}
        </div>
        <div className="inputBox">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={`${errors.password ? "input-error-border" : ""} input`}
          />
          {errors.password && <p className="input-error">{errors.password}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className={`loginButton submitButton ${
            isDisabled ? "button-disabled" : ""
          }`}
          disabled={isDisabled}
        >
          Login
        </button>
        {error && <p className="error">Invalid Email or Password</p>}
        <div className="nav-link">
          <Link to={"/register"}>New User? Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
