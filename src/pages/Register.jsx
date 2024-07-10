import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [user, setUser] = useState({
        name:"",
        email: "",
        password: "",
      });
    
        const navigate=useNavigate()
      const [error, setError] = useState("");
    
      const {name, email, password } = user;
    
      const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/users", user);
          console.log("Response:", response.data);
          navigate("/")
          // Handle successful login here, e.g., navigate to another page
          setError(""); // Clear any previous error
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
          {error && <div style={{ color: "red" }}>{error}</div>}
          <h2>Register</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={onInputChange}
            />
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
            <input type="submit" value="Submit" />
          </form>
          <p>
            Do You Have An Account? <span><Link to="/">Click Here!</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
