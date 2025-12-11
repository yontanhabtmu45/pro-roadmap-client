import React, { useEffect, useState } from "react";
import stepsService from "../../services/steps.service";
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import "../../Pages/Register.css";
import "./ManageRoadmaps.css"; // add this for message styling

function StepsSettings() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(""); // message text
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [showMessage, setShowMessage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all admins on component mount
    const fetchSteps = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await stepsService.getSteps();
        // Sort steps descending by order
        if (res.success) {
          const sortedSteps = res.data.sort(
            (a, b) => b.step_order - a.step_order
          );
          setSteps(sortedSteps);
          // console.log(res.data);
        } else {
          setError(res.message || "Failed to fetch Steps");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  const showTimedMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // fade out after 3 seconds
  };

  const handleDelete = async (step_id) => {
    if (!window.confirm("Are you sure you want to delete this Step?")) return;

    setDeletingId(step_id);

    try {
      const res = await stepsService.deleteStep(step_id);
      if (res.success) {
        setSteps((prev) => prev.filter((r) => r.step_id !== step_id));
        showTimedMessage("Step deleted successfully!", "success");
      } else {
        showTimedMessage(res.message || "Failed to delete Step", "error");
      }
    } catch (err) {
      showTimedMessage(err.message || "An error occurred", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (step_id) => {
    // Redirect to the edit step page
    window.location.href = `/ad/step/edit-step/${step_id}`;
  };

  const filteredSteps = steps.filter((step) =>
    step.step_title.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2>Manage Steps</h2>
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
                    <th>roadmap Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredSteps) && filteredSteps.length > 0 ? (
                    filteredSteps.map((step) => (
                      <tr key={step.step_id}>
                        <td>{step.step_id}</td>
                        <td>{step.roadmap_id}</td>
                        <td>{step.step_title}</td>
                        <td>{getTwoSentencesClean(step.step_description)}</td>
                        <td>{step.step_order}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(step.step_id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(step.step_id)}
                            disabled={deletingId === step.step_id}
                          >
                            {deletingId === step.step_id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No steps found.
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

export default StepsSettings;
