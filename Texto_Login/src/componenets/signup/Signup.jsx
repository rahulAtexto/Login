import React, { useState } from "react";
import "./Signup.css"; // import css
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [location, setLocation] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetch("http://localhost:5000/users", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, phone, location, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.id) {
  //         alert("Signup Successful ✅, please login.");
  //         navigate("/")
  //       } else {
  //         alert(data.message || "Signup Failed ❌");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain 1 uppercase")
      .matches(/[0-9]/, "Must contain 1 number")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
      location:Yup.string()
      .required("Location is required"),
  });

  return (
    <div className="app" >
          <header className="navbar">
            <div className="logo">Texto</div>
            <nav>
              <a href="#">About Us</a>
              <a href="#">Contact Us</a>
              
            </nav>
      
            <Link to="/" className="signbtn">Login</Link>    </header>
            <section className="banner">
      <h2>Sign Up to Create Account</h2>
    </section>

    
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <Formik
      initialValues={{ name: "", email: "", password: "", phone: "",location:"" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          console.log(values)
          // ✅ Send form values with fetch
          const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values), // Formik values
          });

          if (!res.ok) throw new Error("Signup failed");

          const data = await res.json();
          alert("✅ Signup successful!");
          console.log("Server response:", data);
          navigate("/")
          resetForm(); // clear form after success
        } catch (err) {
          alert("❌ " + err.message);
        }
      }}>{()=>(
        <Form  className="signup-form">
          
          <Field
          type="text"
          name="name"
          placeholder="Full Name"
          
          className="signup-input"
          required
        />
        <ErrorMessage name="name" component="p" style={{ color: "red" }} />

          
        
        <Field
          type="email"
          name="email"
          placeholder="Email Address"
          
          className="signup-input"
          required
        />   
         <ErrorMessage name="email" component="p" style={{ color: "red" }} />
        <Field
          type="tel"
          name="phone"
          placeholder="Phone Number"
          
          className="signup-input"
          required
        />
        <ErrorMessage name="phone" component="p" style={{ color: "red" }} />
        <Field
          type="text"
          placeholder="Location"
          name="location"
          
          className="signup-input"
        />
       <ErrorMessage name="location" component="p" style={{ color: "red" }} />
        <Field
          type="password"
          placeholder="Password"
          name="password"
          
          className="signup-input"
          required
        />
         <ErrorMessage name="password" component="p" style={{ color: "red" }} />

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </Form>

      )}
      </Formik>
        
      </div>
    </div>
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

export default Signup;
