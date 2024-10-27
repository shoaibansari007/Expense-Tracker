import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    userId: nanoid(),
    expData: [],
  });

  const [errors, setErrors] = useState({});
  const [userExistsError, setUserExistsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (value.length < 4)
          error = "Username must be at least 4 characters long";
        break;
      case "password":
        if (value.length < 6)
          error = "Password must be at least 6 characters long";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "fullname":
        const fullnameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
        if (!fullnameRegex.test(value))
          error = "Invalid Full Name (e.g., 'John Doe Smith')";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserExistsError(false);
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(user).every((field) => field !== "");
    const noErrors = Object.values(errors).every((error) => error === "");
    setIsDisabled(!(allFieldsFilled && noErrors));
  }, [user, errors]);

  const handleRegister = (e) => {
    e.preventDefault();

    const storedUserList = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUserList.some((el) => el.email === user.email);

    if (userExists) {
      setShowModal(true);
    } else {
      const updatedUserList = [...storedUserList, user];
      localStorage.setItem("users", JSON.stringify(updatedUserList));
      navigate("/login");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mainContainer">
      <form>
        <h2>Registration</h2>

        <div className="inputBox">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
            className={`${errors.username ? "input-error-border" : ""} input`}
            required
          />
          {errors.username && <p className="input-error">{errors.username}</p>}
        </div>

        <div className="inputBox">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            className={`${errors.password ? "input-error-border" : ""} input`}
            required
          />
          {errors.password && <p className="input-error">{errors.password}</p>}
        </div>

        <div className="inputBox">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            className={`${errors.email ? "input-error-border" : ""} input`}
            required
          />
          {errors.email && <p className="input-error">{errors.email}</p>}
        </div>

        <div className="inputBox">
          <label htmlFor="fullname">Full Name</label>
          <input
            name="fullname"
            type="text"
            value={user.fullname}
            onChange={handleChange}
            className={`${errors.fullname ? "input-error-border" : ""} input`}
            required
          />
          {errors.fullname && <p className="input-error">{errors.fullname}</p>}
        </div>

        <button
          onClick={handleRegister}
          className={`registerButton submitButton ${
            isDisabled ? "button-disabled" : ""
          }`}
          disabled={isDisabled}
        >
          Register
        </button>

        <div className="nav-link">
          <Link to={"/login"}>Already have an account? Login Here</Link>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Already Exists</h2>
            <p>
              The email address you entered is already associated with an
              account.
            </p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
