// Import React  and the Hooks we need here
import React, { createContext, useState, useEffect } from 'react';
//  import util function we created to handle the reading from local storage
import getAuth from '../util/auth';
// Create the AuthContext
const AuthContext = createContext();
// create a custom hook to use the AuthContext
export const useAuth = () => {
    return React.useContext(AuthContext);
}

const API_URL = "http://localhost:1010"

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null); 

     
    const loginWithGoogle = async (googleToken) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await response.json();

      if (!data.success) return alert("Login failed");

      // Save token in localStorage
      localStorage.setItem("auth_token", data.token);

      // Decode user info
      const userInfo = jwtDecode(data.token);
      setUser(userInfo);

      return true;
    } catch (err) {
      console.error("Google login error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  
  // useEffect to load the auth data from localstorage when the component mounts
  useEffect(() => {
      // Retrieve login data from local storage
      const fetchAuthData = async () => {
          const authData = await getAuth();
          if (authData && authData.admin_token) {
              setAuth(authData);
                setIsLogged(true);
                setIsAdmin(true);
            } else {
                setAuth({});
                setIsLogged(false);
                setIsAdmin(false);
            }
        };
        fetchAuthData();
    }, []);

        const value = { auth, setAuth, isLogged, setIsLogged, isAdmin, setIsAdmin, user, loginWithGoogle, logout };
    

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}