import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../Pages/Register.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import stepsService from "../../services/steps.service";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";

function AddStep() {
  const navigate = useNavigate();

  const [roadmap_id, setRoadmapId] = useState("");
  const [step_order, setStepOrder] = useState("");
  const [step_title, setStepTitle] = useState("");
  const [step_description, setStepDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // Validation errors
  const [roadmapIdError, setRoadmapIdError] = useState("");
  const [stepOrderError, setStepOrderError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors

    setRoadmapIdError("");
    setStepOrderError("");
    setTitleError("");
    setDescriptionError("");
    setServerError("");
    setSuccessMessage("");

    // Validate form fields
    let valid = true;

    if (!roadmap_id) {
      setRoadmapIdError("Roadmap ID is required");
      valid = false;
    }
    if (!step_order || isNaN(step_order)) {
      setStepOrderError("Step order must be a valid number");
      valid = false;
    }

    if (!step_title) {
      setTitleError("Step Title is required");
      valid = false;
    }
    if (!step_description) {
      setDescriptionError("Step Description is required");
      valid = false;
    }

    if (!valid) return;

    // Prepare form data
    const formData = {
      roadmap_id: roadmap_id,
      steps: [
        {
          step_order: parseInt(step_order, 10),
          step_title: step_title,
          step_description: step_description,
        },
      ],
    };

    // Call the service to create the step
    try {
      const res = await stepsService.createSteps(roadmap_id, formData);
      if (res.success) {
        setSuccessMessage("Step added successfully!");
        setTimeout(() => {
          navigate(`/admin/steps`);
        }, 1200);
      } else {
        setServerError(res.message || "Failed to add step");
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
              <h2>Add New Step</h2>
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
                <label>Roadmap ID:</label>
                <input
                  type="text"
                  value={roadmap_id}
                  onChange={(e) => setRoadmapId(e.target.value)}
                  className="form-control"
                  required
                />
                {roadmapIdError && (
                  <div className="error-message">{roadmapIdError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Step Order:</label>
                <input
                  type="number"
                  value={step_order}
                  onChange={(e) => setStepOrder(e.target.value)}
                  className="form-control"
                  required
                />
                {stepOrderError && (
                  <div className="error-message">{stepOrderError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Step Title:</label>
                <input
                  type="text"
                  value={step_title}
                  onChange={(e) => setStepTitle(e.target.value)}
                  className="form-control"
                  required
                />
                {titleError && (
                  <div className="error-message">{titleError}</div>
                )}
              </div>
              <div className="form-group">
                <label>Step Description:</label>

                <ReactQuill
                  theme="snow"
                  value={step_description}
                  onChange={setStepDescription}
                  className="rich-editor"
                />

                {descriptionError && (
                  <div className="error-message">{descriptionError}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Add Step
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddStep;
