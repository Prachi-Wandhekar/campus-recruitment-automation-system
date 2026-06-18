import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
  name: "",
  email: "",
  password: "",
  role: "USER"
});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8082/api/auth/register",
        user
      );

      alert("Registration Successful");
      navigate("/login");

    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h1 className="register-title">
          Register your account
        </h1>

        <form onSubmit={registerUser}>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name..."
            className="register-input"
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Enter a username..."
            className="register-input"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            className="register-input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="register-input"
            onChange={handleChange}
          />

          <select
  name="role"
  className="register-input"
  onChange={handleChange}
>

  <option value="USER">
    User
  </option>

  <option value="ADMIN">
    Admin
  </option>

</select>

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;