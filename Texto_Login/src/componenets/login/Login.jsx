import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          alert("Login Successful ✅");
          localStorage.setItem("token", data.token);
        } else {
          alert(data.message || "Login Failed ❌");
        }
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* ✅ Link to signup */}
        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="login-link">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
