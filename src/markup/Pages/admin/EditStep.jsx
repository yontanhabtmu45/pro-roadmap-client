import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stepService from "../../services/steps.service";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import "../../Pages/Register.css";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";

function EditRoadmap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ step_title: "", step_description: "", step_order: ""});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await stepService.getSteps(id);
        if (res.success) {
          // backend may return { status: 'success', data: {...} } or the step object directly
          const step = res.data?.data ?? res.data ?? {};
          setForm({
            step_title: step.title || step.title || "",
            step_description: step.description || step.description || "",
            step_order: step.step_order || step.order || "",
          });
        } else {
          setError(res.message || "Failed to load step");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    };

    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    try {
      const payload = {
        step_title: form.step_title,
        step_description: form.step_description,
        step_order: form.step_order,
        step_order: Number(form.step_order)
      };
      const res = await stepService.updateStep(id, payload);
      if (res.success) {
        setSuccessMessage("step updated successfully");
        setTimeout(() => navigate("/ad/steps"), 900);
      } else {
        setServerError(res.message || "Update failed");
      }
    } catch (err) {
      const msg = (err && err.message) || "An error occurred";
      setServerError(msg);
    }
  };

  return (
    <div className="dashboard-wrap">
      <aside className="admin-sidebar">
        <AdminMenu />
      </aside>
      <main className="dashboard-main">
        <div className="home-container">
          <h2>Edit step</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="admin_form_container">
              <form className="admin_form" onSubmit={handleSubmit}>
                <MessageBanner
                  type={serverError ? "error" : successMessage ? "success" : ""}
                  message={serverError || successMessage}
                  onClose={() => {
                    setServerError("");
                    setSuccessMessage("");
                  }}
                />

                <div className="form-group">
                  <label>step Title</label>
                  <input
                    name="step_title"
                    value={form.step_title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Step Description</label>
                  <input
                    name="step_description"
                    value={form.step_description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>step Order</label>
                  <input
                    name="step_order"
                    value={form.step_order}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => navigate("/admin/steps")}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default EditRoadmap;
