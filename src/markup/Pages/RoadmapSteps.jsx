import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getRoadmap } from "../services/roadmap.service";
import { getStepsByRoadmap } from "../services/steps.service";
import { motion } from "framer-motion";
import {
  FaFlagCheckered,
  FaCheckCircle,
  FaPlay,
  FaCode,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

import "../Pages/Home.css";
import "../Pages/AllRoadmaps.css";

function RoadmapSteps() {
  const { roadmap_id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Step icons based on category
  const categoryIcons = {
    intro: <FaPlay />,
    concept: <FaLightbulb />,
    coding: <FaCode />,
    analytics: <FaChartLine />,
    completed: <FaCheckCircle />,
    final: <FaFlagCheckered />,
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const roadmapRes = await getRoadmap(roadmap_id);
      const stepsRes = await getStepsByRoadmap(roadmap_id);

      if (!roadmapRes.success) {
        setError(roadmapRes.message);
        setLoading(false);
        return;
      }

      if (!stepsRes.success) {
        setError(stepsRes.message);
        setLoading(false);
        return;
      }

      setRoadmap(roadmapRes.data.data[0] || null);

      // Fallback sort
      const sortedSteps = [...stepsRes.data].sort(
        (a, b) => a.step_order - b.step_order
      );
      setSteps(sortedSteps);

      setLoading(false);
    }

    loadData();
  }, [roadmap_id]);

  return (
    <>
      <Header />

      <main className="roadmap-container">
        {/* LOADING */}
        {loading && <p className="muted">Loading roadmap...</p>}

        {/* ERROR */}
        {!loading && error && (
          <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
        )}

        {/* SIDEBAR + MAIN */}
        {!loading && roadmap && (
          <div className="roadmap-layout">
            {/* —————————————
                LEFT SIDEBAR
            ————————————— */}
            <aside className="roadmap-sidebar">
              <h3>📌 Steps Navigation</h3>

              <ul>
                {steps.map((step) => (
                  <li key={step.step_id}>
                    <a href={`#step-${step.step_id}`}>
                      Step {step.step_order} — {step.step_title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* ——————————————
                MAIN CONTENT
            —————————————— */}
            <section className="roadmap-main">
              <Link to="/AllRoadmaps" className="btn ghost back-btn">
                ← Back to All Roadmaps
              </Link>

              <h1 className="hero-title">{roadmap.title}</h1>
              <p className="hero-sub">{roadmap.description}</p>

              <h2 className="steps-header">Roadmap Steps</h2>

              <div className="timeline">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step_id}
                    id={`step-${step.step_id}`}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.12 }}
                  >
                    <div className="timeline-icon">
                      {categoryIcons[step.category] || <FaLightbulb />}
                    </div>

                    <div className="timeline-content">
                      <h3>
                        Step {step.step_order}: {step.step_title}
                      </h3>

                      {step.tags && (
                        <div className="tags">
                          {step.tags.split(",").map((t) => (
                            <span key={t} className="tag">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Render Quill HTML */}
                      <div
                        className="desc rich-html"
                        dangerouslySetInnerHTML={{
                          __html: step.step_description,
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        )}

        {!loading && steps.length === 0 && (
          <p className="muted">This roadmap has no steps yet.</p>
        )}
      </main>

      <Footer />
    </>
  );
}

export default RoadmapSteps;
