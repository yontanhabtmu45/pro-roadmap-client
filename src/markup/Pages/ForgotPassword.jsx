import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a password reset email
    console.log("Password reset email sent to:", email);
    setMessage("If this email is registered, you will receive a password reset link.");
    setEmail(""); // Clear the input field
  };

  return (
    <div className="main-highlight container">
      <div className="inner-main-highlight row">
        <div className="banner-login col-md-6">
          <h2>Pro Roadmap</h2>
          <p>
            Your Roadmap to mastery. Chart your course to becoming a top-tier
            developer.
          </p>
        </div>
        <div className="singup-wrapper col-md-6 h-100">
          <div className="inner-signup login-inner">
            <h1>Forgot Password</h1>
            <p>Enter your email address to reset your password.</p>
            <div className="login-form form-signup">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input type="submit" value="Send Reset Link" />
              </form>
              {message && <p style={{ color: "#61dafb", marginTop: "1rem" }}>{message}</p>}
              <div className="login-link">
                Remembered your password?
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#61dafb",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "0.5rem",
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;