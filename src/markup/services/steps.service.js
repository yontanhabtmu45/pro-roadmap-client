// const api_url = "http://localhost:1010/api";
const api_url = "https://pro-roadmap-server-1.onrender.com";

// A function to create steps for a specific roadmap
export const createSteps = async (roadmap_id, formData) => {
  try {
    const response = await fetch(`${api_url}/admin/steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) return { success: true, data };
    return {
      success: false,
      message: data.message || "Failed to create steps",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// A function to get all steps for a specific roadmap
export const getSteps = async () => {
  try {
    const response = await fetch(`${api_url}/admin/steps`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) return { success: true, data:data.data };
    return { success: false, message: data.message || "Failed to fetch steps" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to get a single step by its ID (if needed in future)
export const getStepById = async (step_id) => {
  try {
    const response = await fetch(`${api_url}/admin/step/${step_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) return { success: true, data };
    return { success: false, message: data.message || "Failed to fetch step" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get steps for ONE roadmap
export const getStepsByRoadmap = async (roadmap_id) => {
  try {
    const response = await fetch(`${api_url}/admin/steps/${roadmap_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      return { success: true, data: data.data };
    }

    return { success: false, message: data.message || "Failed to fetch steps" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to update a step (if needed in future)
export const updateStep = async (step_id, formData) => {
  try {
    const response = await fetch(`${api_url}/admin/steps/edit/${step_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json(formData);
    if (response.ok) return { success: true, data };
    return { success: false, message: data.message || "Failed to update step" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to delete step by ID (if needed in future)
export const deleteStep = async (step_id) => {
  try {
    const response = await fetch(`${api_url}/admin/steps/${step_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) return { success: true, data };
    return { success: false, message: data.message || "Failed to delete step" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export all functions for use in other parts of the application
export default {
  createSteps,
  getSteps,
  getStepById,
  getStepsByRoadmap,
  updateStep,
  deleteStep,
};
