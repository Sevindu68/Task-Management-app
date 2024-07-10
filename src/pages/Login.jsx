import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate()
  const [error, setError] = useState("");

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", user);
      console.log("Response:", response.data.token);
      const token = response.data.token;

    localStorage.setItem('token', token);
      navigate("/tasks")
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "There was an error logging in! Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Task App</h1>
      <div className="container">
        <div className="sub-container">
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={onInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            <center><input type="submit" value="Submit" /></center>
          </form>
          <p>
            Don't You Have An Account? <span><Link to="/register">Click Here!</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
