import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Pages/Register.css"; 
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import roadmapService from "../../services/roadmap.service";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";

function AddRoadmap() {
  const navigate = useNavigate();

  const [title, setRoadmapTitle] = useState("");
  const [description, setRoadmapDescription] = useState("");
  const [category, setRoadmapCategory] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // Validation errors
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [createdError, setCreatedError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setTitleError("");
    setDescriptionError("");
    setCategoryError("");
    setCreatedError("");
    setServerError("");
    setSuccessMessage("");

    // Validate form fields
    let valid = true;

    if (!title) {
      setTitleError("Roadmap Title is required");
      valid = false;
    }
    if (!description) {
      setDescriptionError("Roadmap Description is required");
      valid = false;
    }
    if (!category) {
      setCategoryError("Roadmap Category is required");
      valid = false;
    }
    if (!created_by) {
      setCreatedError("Roadmap created admin id is required");
      valid = false;
      S;
    }

    if (!valid) return;

    // Prepare form data
    const formData = {
      title,
      description,
      category,
      created_by,
    };

    // Call the service to create the roadmap
    try {
      const res = await roadmapService.createRoadmap(formData);
      if (res.success) {
        setSuccessMessage("Roadmap added successfully!");
        setTimeout(() => {
          navigate("/admin/roadmaps"); // Redirect to the roadmaps list page
        }, 1200);
      } else {
        setServerError(res.message || "Failed to add roadmap");
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <div className="dashboard-wrap">
      <aside className="admin-sidebar">
        <AdminMenu />
      </aside>
      <main className="dashboard-main">
        <div className="home-container">
          <div className="admin_form_container">
            <div>
              <h2>Add New Roadmap</h2>
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
                <label>Roadmap Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setRoadmapTitle(e.target.value)}
                  className="form-control"
                  required
                />
                {titleError && (
                  <div className="error-message">{titleError}</div>
                )}
              </div>
              <div className="form-group">
                <label>roadmap Description:</label>

                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setRoadmapDescription}
                  className="rich-editor"
                />

                {descriptionError && (
                  <div className="error-message">{descriptionError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Roadmap Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setRoadmapCategory(e.target.value)}
                  className="form-control"
                  required
                />
                {categoryError && (
                  <div className="error-message">{categoryError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Roadmap Created By:</label>
                <input
                  type="text"
                  value={created_by}
                  onChange={(e) => setCreated_by(e.target.value)}
                  className="form-control"
                  required
                />
                {createdError && (
                  <div className="error-message">{createdError}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Roadmap
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddRoadmap;
