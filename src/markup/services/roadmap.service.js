const api_url = "http://localhost:1010/api";

// A function to create roadmaps
export const createRoadmap = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) return { success: true, data };
    return {
      success: false,
      message: data.message || "Failed to create roadmap",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to get all roadmaps
export const getAllRoadmaps = async () => {
  try {
    const response = await fetch(`${api_url}/admin/roadmaps`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // Check the `status` field in the `data` object
    if (response.ok && data.status === "success") {
      return { success: true, data: data.data }; // Extract the `data` array
    }
    return {
      success: false,
      message: data.message || "Failed to fetch roadmaps",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// a function to get a single roadmap
export const getRoadmap = async (roadmap_id) => {
  try {
    const response = await fetch(`${api_url}/admin/roadmap/${roadmap_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      return { success: true, data };
    }

    return {
      success: false,
      message: data.message || "Failed to fetch roadmap",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to update roadmap by ID
export const updateRoadmap = async (roadmap_id, formData) => {
  try {
    const response = await fetch(
      `${api_url}/admin/roadmap/edit/${roadmap_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json(formData);
    if (response.ok) return { success: true, data };
    return {
      success: false,
      message: data.message || "Failed to fetch roadmaps",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to delete roadmap by ID
export const deleteRoadmap = async (roadmap_id) => {
  try {
    const response = await fetch(`${api_url}/admin/roadmap/${roadmap_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "appilaction/json" },
    });
    const data = await response.json();
    if (response.ok) return { success: true, data };
    return {
      success: false,
      message: data.message || "Failed to fetch roadmaps",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default {
  createRoadmap,
  getAllRoadmaps,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap,
};
