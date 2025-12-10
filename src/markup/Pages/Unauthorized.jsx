import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Unauthorized() {
  return (
    <>
    <Header />
      <section
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh", background: "#1111" }}
      >
        <div
          className="text-center p-4 rounded shadow-sm bg-black"
          style={{ maxWidth: 400 }}
        >
          <h2 className="text-danger fw-bold mb-3">Unauthorized</h2>
          <p className="mb-4 text-secondary">
            You don't have the authorization to access the page you requested.
          </p>
          <Link to="/" className="btn btn-primary fw-bold">
            Go to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Unauthorized;
