import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../services/admin.service";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import "../../Pages/Register.css";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ admin_name: "", admin_email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await adminService.getAdminByEmail(id);
        if (res.success) {
          // backend may return { status: 'success', data: {...} } or the admin object directly
          const admin = res.data?.data ?? res.data ?? {};
          setForm({
            admin_name: admin.admin_name || admin.name || "",
            admin_email: admin.admin_email || admin.email || "",
          });
        } else {
          setError(res.message || "Failed to load admin");
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
      const res = await adminService.updateAdmin(id, form);
      if (res.success) {
        setSuccessMessage("Admin updated successfully");
        setTimeout(() => navigate("/admins"), 900);
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
          <h2>Edit Admin</h2>
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
                  <label>Name</label>
                  <input
                    name="admin_name"
                    value={form.admin_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="admin_email"
                    value={form.admin_email}
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
                    onClick={() => navigate("/admins")}
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

export default EditAdmin;
