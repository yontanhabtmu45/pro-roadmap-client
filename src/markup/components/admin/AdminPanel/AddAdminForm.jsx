import React, { useState } from "react";
import "../../../Pages/Register.css";
// Import admin service
import adminService from"../../../services/admin.service";
import MessageBanner from "../../MessageBanner/MessageBanner";

function AddAdminForm() {
  const [admin_email, setAdmin_email] = useState("");
  const [admin_password, setAdmin_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [admin_name, setAdmin_name] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [success, setSuccess] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Errors
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");
    setServerError("");
    setSuccess("");
    // Validate form fields
    let valid = true;
    // Email is required
    if (!admin_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!admin_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(admin_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // password must be at least 6 characters long

    if (!admin_password || admin_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    }
    if (admin_password !== confirm_password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }
    if (!admin_name) {
      setNameError("Name is required");
      valid = false;
    }
    if (!valid) return;

    // Prepare form data
    const formData = {
      admin_email,
      admin_password,
      admin_name,
      isActive,
    };

    // pass the formdata to the service
    try {
      const res = await adminService.register(formData);
      if (res.success) {
        setSuccess(true);
        setSuccessMessage("New admin added successfully! Redirecting...");
        setServerError("");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        setServerError(res.message || "Failed to add admin");
      }
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <section className="main_admin_form">
      <div className="admin_form_container">
        <div>
          <h2>Add New Admin</h2>
        </div>
      </div>
      <div className="admin_form_container">
        <form onSubmit={handleSubmit} className="admin_form">
          <MessageBanner
            type={serverError ? "error" : successMessage ? "success" : ""}
            message={serverError || successMessage}
            onClose={() => {
              setServerError("");
              setSuccessMessage("");
            }}
          />
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={admin_name}
              onChange={(e) => setAdmin_name(e.target.value)}
              className="form-control"
              required
            />
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={admin_email}
                onChange={(e) => setAdmin_email(e.target.value)}
                className="form-control"
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={admin_password}
                onChange={(e) => setAdmin_password(e.target.value)}
                className="form-control"
                required
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                className="form-control"
                required
              />
              {confirmPasswordError && (
                <div className="error-message">{confirmPasswordError}</div>
              )}
            </div>
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
          <div className="form-group">
            <label>Active:</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-check-input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Admin
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddAdminForm;
