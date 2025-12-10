import React from "react";
import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <>
      <Header />
      <main className="home-container">
        <section className="home-hero" aria-labelledby="about-title">
          <div className="hero-left">
            <h1 id="about-title" className="hero-title">About Us</h1>
            <p className="hero-sub">We are committed to making tech education accessible, structured, and achievable for everyone.</p>
          </div>
        </section>

        <section className="roadmap-grid" aria-live="polite">
          <article className="card" tabIndex="0">
            <h3 className="card-title">Our Mission</h3>
            <p className="card-desc">
              To empower learners globally by providing clear, curated learning paths that simplify the journey into tech.
            </p>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">What We Do</h3>
            <p className="card-desc">
              We build structured roadmaps for frontend, backend, DevOps, cloud, and more — helping you grow step‑by‑step.
            </p>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">Our Vision</h3>
            <p className="card-desc">
              A world where anyone, regardless of background, can learn and succeed in technology.
            </p>
          </article>
        </section>

        <section className="home-hero" style={{ marginTop: "20px" }}>
          <div className="hero-left">
            <h2 className="hero-title">Why We Built This</h2>
            <p className="hero-sub">
              Too many beginners feel lost in endless tutorials and scattered resources. Our platform brings everything
              together in a structured, beginner‑friendly, and goal-driven format.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;
