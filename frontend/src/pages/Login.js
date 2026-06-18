import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8082/api/auth/login",
        loginData
      );

      const user = response.data;
      console.log(user);

localStorage.setItem(
  "user",
  JSON.stringify(user)
);

      /* SAVE USER */

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login Successful");

      /* ROLE BASED LOGIN */

      if (user.role === "ADMIN") {

        navigate("/admin-dashboard");

      } else {

        navigate("/user-dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");
    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">
          Login Account
        </h1>

        <form onSubmit={loginUser}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="login-input"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="login-input"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="register-text">

          Don’t have an account?

          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;