import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import roadmapService from "../../services/roadmap.service";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import "../../Pages/Register.css";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";

function EditRoadmap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "", created_by: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await roadmapService.getAllRoadmaps(id);
        if (res.success) {
          // backend may return { status: 'success', data: {...} } or the roadmap object directly
          const roadmap = res.data?.data ?? res.data ?? {};
          setForm({
            title: roadmap.title || roadmap.title || "",
            description: roadmap.description || roadmap.description || "",
            category: roadmap.category || roadmap.category || "",
          });
        } else {
          setError(res.message || "Failed to load roadmap");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    };

    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    try {
      const res = await roadmapService.updateRoadmap(id, form);
      if (res.success) {
        setSuccessMessage("roadmap updated successfully");
        setTimeout(() => navigate("/admin/roadmaps"), 900);
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
          <h2>Edit roadmap</h2>
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
                  <label>Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Created by</label>
                  <input
                    name="created_by"
                    value={form.created_by}
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
                    onClick={() => navigate("/admin/roadmaps")}
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
