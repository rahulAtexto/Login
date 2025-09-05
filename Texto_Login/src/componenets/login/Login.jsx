import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [error, setError] = useState("");

   const navigate = useNavigate();


   const handleGoogleLogin = () => {
    // Hit backend /auth/google → redirects to Google → comes back
    window.location.href = "http://localhost:5000/auth/google";
  };


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
          console.log(data.token);
          localStorage.setItem("token", data.token);
          navigate('/home');
        } else {
          alert(data.message || "Login Failed ❌");
        }
      })
      .catch((err) => console.error(err));
  };
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/.test(email);

useEffect(() => {
  if (!email || !isValidEmail(email)){
    return 
  } ;
    if (!email) {
      setEmailExists(false);

      setError("");
      return;
    }

    // Call API when email changes
    fetch("http://localhost:5000/users/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server error: " + res.status);
        console.log("fetch is working")
        return res.json();
      })
      .then((json) => {
        if (json && json.exists) {  // assume API returns { exists: true/false }
          setEmailExists(true);
          setError("");
          alert("Your Email is There")
        } else {
          setEmailExists(false);
          setError("❌ Email not found in database");
          alert("❌Email not found");
        }
      })
      .catch((err) => {
        setEmailExists(false);
        setError("⚠️ " + err.message);
      });
      console.log(emailExists)
      console.log("useeffect is working")
  }, [email]);
  return (
   

    <div className="app">
    {/* Navbar */}
    <header className="navbar">
      <div className="logo">Texto</div>
      <nav>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        
      </nav>

      <Link to="/signup" className="signbtn">Signup</Link>    </header>

    {/* Login Banner */}
    <section className="banner">
      <h2>Log in to your account</h2>
    </section>

  

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" value={email} placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
      {email ? emailExists ? <input type="password" value={pass} onChange={(e) => {setPass(e.target.value)}} placeholder="Password" /> : <p>EMAIL DOES NOT EXISTS</p>:<p>Enter Your email</p>}

      {/* <div className="captcha">
        <input type="checkbox" />
        <span>I’m not a robot (captcha here)</span>
      </div> */}

      {emailExists?<div  className="remember">
        <input type="checkbox" />
        <label>Remember me</label>
      </div>:<p></p>}

     {emailExists? <button  type="submit" className="login-btn">Login</button>:<p></p>}
     {emailExists?<div className="form-links">
        <a href="#">Forgot Password?</a> |{" "}
        <span>
          Don’t have an account? <a href="/signup">Signup</a>
        </span>
      </div>:<p></p>}

      <button
        onClick={handleGoogleLogin}
        style={{
          backgroundColor: "#db4437",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Sign in with Google
      </button>
    </form>

    {/* Footer */}
    <footer className="footer">
      <div className="footer-logo">Textto</div>
      <div className="footer-grid">
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Press & Media</a>
          <a href="#">Customers</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <h4>Docs</h4>
          <a href="#">API</a>
          <a href="#">Help Document</a>
          <a href="#">Forum</a>
        </div>
        <div>
          <h4>Follow us</h4>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Medium</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="legal">
          Privacy | Security | Cookies | Terms | DLT
        </p>
        {/* <p>© 2022 Gupshup. All rights reserved.</p> */}
      </div>
    </footer>
  </div>


  );
};

export default Login;
