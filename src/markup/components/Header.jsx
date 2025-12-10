import React, { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdOutlineNightlight } from "react-icons/md";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import loginService from "../services/login.service";
import Logo from "../../assets/logo.png"

function Header() {
  // Use the custom hook to access the data in the context
  const { isLogged, setIsLogged } = useAuth();

  const [adminLogged, setAdminLogged] = useState(false);

  // Function to handle logout
  const logOut = () => {
    loginService.logout();
    setIsLogged(false);
    setAdminLogged(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode)
        document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      // also keep legacy body class for older components/styles that relied on it
      document.body.classList.toggle("dark-mode", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch (e) {
      /* ignore */
    }
  }, [isDarkMode]);

  // Check for admin login in localStorage and keep in sync with context
  useEffect(() => {
    try {
      const admin = localStorage.getItem("admin");
      setAdminLogged(!!admin);
    } catch (e) {
      setAdminLogged(false);
    }
  }, [isLogged]);

  const toggleTheme = () => setIsDarkMode((v) => !v);

  return (
    <header className="main-header">
      <div className="inner-header">
        <div className="header-title">
          <h2>
            <Link to="/">
              <img src={Logo} alt="ProRoadmap" className="logo" />
              ProRoadmap
            </Link>
          </h2>
        </div>
        <nav className="nav-links" aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AllRoadmaps">All Roadmaps</Link>
            </li>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            {/* <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-pressed={isDarkMode}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <CiLight /> : <MdOutlineNightlight />}
              </button>
            </li>
            <li>
              {adminLogged ? (
                <div className="link-btn admin-links">
                  <Link
                    to="/admin"
                    className="theme-btn btn-style-one sign-in-btn"
                  >
                    Admin
                  </Link>
                  <button
                    className="theme-btn btn-style-one blue sign-up-btn"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </div>
              ) : isLogged ? (
                <div className="link-btn">
                  <Link
                    to="/Register"
                    className="theme-btn btn-style-one blue sign-up-btn"
                    onClick={logOut}
                  >
                    Log out
                  </Link>
                </div>
              ) : (
                <div className="link-btn">
                  <Link
                    to="/login"
                    className="theme-btn btn-style-one sign-in-btn"
                  >
                    Login
                  </Link>
                </div>
              )}
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;