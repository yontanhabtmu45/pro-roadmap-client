const api_url = "http://localhost:1010/api";


// A function to send the register request to the server
export const register = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// A function to send the login request to the server and handle the response
export const login = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// A function to send the logout request to the server (client-side cleanup)
export const logout = async () => {
  localStorage.removeItem("admin");
};

// A function to check if the user is currently logged in
export const checkAuth = async () => {
  try {
    const response = await fetch(`${api_url}/check-auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { loggedIn: true, data };
    } else {
      return { loggedIn: false };
    }
  } catch (error) {
    return { loggedIn: false, message: error.message };
  }
};

// A function to initiate password reset
export const resetPassword = async (formData) => {
  try {
    const response = await fetch(`${api_url}/admin/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export all functions for use in other parts of the application
export default {
  register,
  login,
  logout,
  checkAuth,
  resetPassword,
};
