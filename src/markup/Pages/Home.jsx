import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main className="home-container">
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-left">
            <h1 id="hero-title" className="hero-title">Your Guided Path to Mastering Tech Skills</h1>
            <p className="hero-sub">From beginner to pro — follow curated roadmaps for Full‑Stack, DevOps, and more.</p>

            <div className="hero-actions">
              <Link to="/AllRoadmaps" className="btn" >Explore All Roadmaps</Link>
              <Link to="/Register" className="btn ghost" >Get Started</Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="search-bar" role="search" aria-label="Search roadmaps">
              <input type="search" placeholder="Search roadmaps..." aria-label="Search roadmaps" />
              <button className="btn ghost" aria-label="Search">Search</button>
            </div>
          </div>
        </section>

        <section className="roadmap-grid" aria-live="polite">
          <article className="card" tabIndex="0">
            <h3 className="card-title">Front-End Development</h3>
            <p className="card-desc">Master HTML, CSS, JavaScript and modern frameworks like React, Angular, Vue.</p>
            <div className="card-footer">
              <span className="pill">Beginner → Advanced</span>
              <Link to="/AllRoadmaps#frontend" className="btn" >View</Link>
            </div>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">Back-End Development</h3>
            <p className="card-desc">Learn Node.js, databases, authentication and API design.</p>
            <div className="card-footer">
              <span className="pill">Fundamentals → Pro</span>
              <Link to="/AllRoadmaps#backend" className="btn" >View</Link>
            </div>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">DevOps Engineer</h3>
            <p className="card-desc">Understand CI/CD, containers, infra as code and cloud services.</p>
            <div className="card-footer">
              <span className="pill">Intro → Expert</span>
              <Link to="/AllRoadmaps#devops" className="btn" >View</Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
