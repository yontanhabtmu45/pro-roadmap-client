// const api_url = "http://localhost:1010/api";
const api_url = "https://pro-roadmap-server-1.onrender.com/api";

// Helper function to get token
function getToken() {
  return localStorage.getItem("adminToken");
}

// =========================
// LOGIN (GET JWT TOKEN)
// =========================
export const login = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token
      localStorage.setItem("adminToken", data.token);
      return { success: true, data };
    }

    return { success: false, message: data.error || "Login failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// =========================
// CREATE ADMIN (PROTECTED)
// =========================
export const register = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }

    return { success: false, message: data.error || "Registration failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// =========================
// GET ALL ADMINS (PROTECTED)
// =========================
export const getAllAdmins = async () => {
  try {
    const response = await fetch(`${api_url}/admins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      return { success: true, data: data.data };
    }

    return { success: false, message: data.error || "Failed to fetch admins" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// =========================
// GET ADMIN BY EMAIL (PROTECTED)
// =========================
export const getAdminByEmail = async (admin_email) => {
  try {
    const response = await fetch(`${api_url}/admin/${admin_email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }

    return { success: false, message: data.error || "Failed to fetch admin" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// =========================
// UPDATE ADMIN (PROTECTED)
// =========================
export const updateAdmin = async (admin_id, formData) => {
  try {
    const response = await fetch(`${api_url}/admin/${admin_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }

    return { success: false, message: data.error || "Update failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// =========================
// DELETE ADMIN (PROTECTED)
// =========================
export const deleteAdmin = async (admin_id) => {
  try {
    const response = await fetch(`${api_url}/admin/${admin_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }

    return { success: false, message: data.error || "Deletion failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export all functions
const adminService = {
  login,
  register,
  getAllAdmins,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
};

export default adminService;
