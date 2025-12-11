import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminService from "../../services/admin.service";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import "../../Pages/Register.css";

function ManageAdmins() {
  const { admin_email } = useParams();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all admins on component mount
    const fetchAdmins = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await adminService.getAllAdmins();
        if (res.success) {
          setAdmins(res.data);
          console.log(res.data);
        } else {
          setError(res.message || "Failed to fetch admins");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (admin_id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const res = await adminService.deleteAdmin(admin_id);
        if (res.success) {
          setAdmins((prev) =>
            prev.filter((admin) => admin.admin_id !== admin_id)
          );
          alert("Admin deleted successfully");
        } else {
          alert(res.message || "Failed to delete admin");
        }
      } catch (err) {
        alert(err.message || "An error occurred");
      }
    }
  };

  const handleEdit = (admin_id) => {
    // Redirect to the edit admin page
    window.location.href = `/ad/edit-admin/${admin_id}`;
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrap">
      <aside className="admin-sidebar">
        <AdminMenu />
      </aside>
      <main className="dashboard-main">
        <div className="home-container">
          <h2>Manage Admins</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by admin name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created at</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredAdmins) && filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => (
                      <tr key={admin.admin_id}>
                        <td>{admin.admin_id}</td>
                        <td>{admin.admin_name}</td>
                        <td>{admin.admin_email}</td>
                        <td>{admin.created_at}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(admin.admin_id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(admin.admin_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No admins found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default ManageAdmins;
