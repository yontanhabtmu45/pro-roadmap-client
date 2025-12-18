import React, { useEffect, useState } from "react";
import roadmapService from "../../services/roadmap.service";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import "../../Pages/Register.css";
import "./ManageRoadmaps.css"; // add this for message styling

function ManageRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(""); // message text
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [showMessage, setShowMessage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await roadmapService.getAllRoadmaps();
        if (res.success) {
          setRoadmaps(res.data);
        } else {
          setError(res.message || "Failed to fetch roadmaps");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const showTimedMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); 
  };

  const handleDelete = async (roadmap_id) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?"))
      return;

    setDeletingId(roadmap_id);

    try {
      const res = await roadmapService.deleteRoadmap(roadmap_id);
      if (res.success) {
        setRoadmaps((prev) => prev.filter((r) => r.roadmap_id !== roadmap_id));
        showTimedMessage("Roadmap deleted successfully!", "success");
      } else {
        showTimedMessage(res.message || "Failed to delete roadmap", "error");
      }
    } catch (err) {
      showTimedMessage(err.message || "An error occurred", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (roadmap_id) => {
    window.location.href = `/ad/roadmap/edit-roadmap/${roadmap_id}`;
  };

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove HTML tags and limit to first 2 sentences
  const getTwoSentencesClean = (html) => {
    if (!html) return "";

    // Remove all HTML tags
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Split sentences
    const sentences = text.split(/[.!?]/).filter((s) => s.trim() !== "");

    // Rebuild first 2 sentences
    const shortText = sentences.slice(0, 2).join(". ") + ".";

    // Add "..." if more sentences exist
    return sentences.length > 2 ? shortText + "..." : shortText;
  };

  return (
    <div className="dashboard-wrap">
      <aside className="admin-sidebar">
        <AdminMenu />
      </aside>
      <main className="dashboard-main">
        <div className="home-container">
          <h2>Manage Roadmaps</h2>

          {/* Slide-in toast message */}
          {showMessage && (
            <div className={`toast-message ${messageType}`}>{message}</div>
          )}

          {/* Improved success/error message UI */}
          {showMessage && (
            <div className={`message-box ${messageType} fade`}>{message}</div>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
            <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoadmaps.length > 0 ? (
                    filteredRoadmaps.map((roadmap) => (
                      <tr key={roadmap.roadmap_id}>
                        <td>{roadmap.roadmap_id}</td>
                        <td>{roadmap.title}</td>
                        <td>{getTwoSentencesClean(roadmap.description)}</td>
                        <td>{roadmap.category}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(roadmap.roadmap_id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(roadmap.roadmap_id)}
                            disabled={deletingId === roadmap.roadmap_id}
                          >
                            {deletingId === roadmap.roadmap_id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No roadmaps found.
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

export default ManageRoadmaps;
