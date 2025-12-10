import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../Pages/Register.css";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import loginService from "../../services/login.service";
import { useNavigate } from "react-router-dom";
import MessageBanner from "../MessageBanner/MessageBanner";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="main-highlight container">
      <div className="inner-main-highlight row">
        <div className="banner-login col-md-6">
          <h2>Pro Roadmap</h2>
          <p>
            Your Roadmap to mastery. Chart your course to becoming a top tier
            developer.
          </p>
        </div>
        <div className="singup-wrapper col-md-6 h-100">
          <div className="inner-signup">
            <h1>Create an Account</h1>
            <p>Start your journey to become the top developer.</p>
            <div className="form-signup">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setServerError("");
                  let valid = true;
                  if (!fullName) {
                    valid = false;
                  }
                  if (!email) {
                    setEmailError("Please enter your email address");
                    valid = false;
                  } else {
                    const regex = /^\S+@\S+\.\S+$/;
                    if (!regex.test(email)) {
                      setEmailError("Invalid email format");
                      valid = false;
                    } else {
                      setEmailError("");
                    }
                  }
                  if (!password || password.length < 6) {
                    setPasswordError("Password must be at least 6 characters");
                    valid = false;
                  } else if (password !== confirmPassword) {
                    setPasswordError("Passwords do not match");
                    valid = false;
                  } else {
                    setPasswordError("");
                  }
                  if (!valid) return;

                  const formData = {
                    admin_name: fullName,
                    admin_email: email,
                    admin_password: password,
                  };
                  try {
                    const res = await loginService.register(formData);
                    if (res.success) {
                      // Registration succeeded — show success and navigate shortly
                      setSuccessMessage("Registration successful — redirecting to login...");
                      setTimeout(() => navigate("/login"), 1100);
                    } else {
                      setServerError(res.message || "Registration failed");
                    }
                  } catch (err) {
                    console.error(err);
                    setServerError("An error occurred. Please try again later.");
                  }
                }}
              >
                <MessageBanner
                  type={serverError ? "error" : successMessage ? "success" : ""}
                  message={serverError || successMessage}
                  onClose={() => {
                    setServerError("");
                    setSuccessMessage("");
                  }}
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email Address</label>
                {emailError && (
                  <div className="validation-error" role="alert">
                    {emailError}
                  </div>
                )}
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                {passwordError && (
                  <div className="validation-error" role="alert">
                    {passwordError}
                  </div>
                )}
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaRegEye
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {showConfirmPassword ? (
                    <FaRegEyeSlash
                      className="eye-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <FaRegEye
                      className="eye-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
                <input type="submit" value="Sign Up" />
              </form>
              <div className="login-link">
                Already have an account?
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
