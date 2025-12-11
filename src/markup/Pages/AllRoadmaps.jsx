import React, { useEffect, useState } from "react"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllRoadmaps } from "../services/roadmap.service"; 
import "../Pages/Home.css"; 

function AllRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Fetch all roadmaps
  useEffect(() => {
    async function fetchData() {
      const result = await getAllRoadmaps();
      if (result.success) {

        // Sort DESC by roadmap_id
        let sorted = [...result.data].sort((a, b) => b.roadmap_id - a.roadmap_id);

        setRoadmaps(sorted);
        setFiltered(sorted);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Search filter
  useEffect(() => {
    const s = search.toLowerCase();
    let filteredList = roadmaps.filter((r) =>
      r.title.toLowerCase().includes(s)
    );

    // Keep descending order
    filteredList = filteredList.sort((a, b) => b.roadmap_id - a.roadmap_id);

    setFiltered(filteredList);
  }, [search, roadmaps]);

  // Remove HTML tags and keep first 2 sentences
  const getTwoSentencesClean = (html) => {
    if (!html) return "";
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const sentences = text.split(/[.!?]/).filter((s) => s.trim() !== "");
    const shortText = sentences.slice(0, 2).join(". ") + ".";
    return sentences.length > 2 ? shortText + "..." : shortText;
  };

  return (
    <>
      <Header />

      <main className="home-container">
        <h1 className="hero-title" style={{ marginBottom: "12px" }}>
          All Roadmaps
        </h1>
        <p className="hero-sub" style={{ marginBottom: "22px" }}>
          Explore all available learning paths from beginner to expert.
        </p>

        <div className="search-bar" style={{ maxWidth: "420px", marginBottom: "20px" }}>
          <input
            type="search"
            placeholder="Search roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <p className="muted">Loading roadmaps...</p>}
        {error && !loading && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}
        {!loading && filtered.length === 0 && <p className="muted">No roadmaps found.</p>}

        <section className="roadmap-grid">
          {!loading &&
            filtered.map((roadmap) => (
              <article className="card" key={roadmap.roadmap_id} tabIndex="0">
                <h3 className="card-title">{roadmap.title}</h3>
                <p className="card-desc">{getTwoSentencesClean(roadmap.description)}</p>

                <div className="card-footer">
                  <span className="pill">{roadmap.level || "All Levels"}</span>
                  <a href={`/roadmap/${roadmap.roadmap_id}`} className="btn">
                    View
                  </a>
                </div>
              </article>
            ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AllRoadmaps;
