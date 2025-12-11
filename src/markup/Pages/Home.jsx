import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { getAllRoadmaps } from "../services/roadmap.service"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [search, setSearch] = useState("");


  // Fetch all roadmaps
    useEffect(() => {
      async function fetchData() {
        const result = await getAllRoadmaps();
        if (result.success) {
          setRoadmaps(result.data);
          setFiltered(result.data);
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
    const f = roadmaps.filter((r) => r.title.toLowerCase().includes(s));
    setFiltered(f);
  }, [search, roadmaps]);

  return (
    <>
      <Header />
      <main className="home-container">
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-left">
            <h1 id="hero-title" className="hero-title">
              Your Guided Path to Mastering Tech Skills
            </h1>
            <p className="hero-sub">
              From beginner to pro — follow curated roadmaps for Full‑Stack,
              DevOps, and more.
            </p>

            <div className="hero-actions">
              <Link to="/AllRoadmaps" className="btn">
                Explore All Roadmaps
              </Link>
              <Link to="/Register" className="btn ghost">
                Get Started
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div
              className="search-bar"
              role="search"
              aria-label="Search roadmaps"
            >
              {/* SEARCH BAR */}
              <input
                type="search"
                placeholder="Search roadmaps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="search"
                placeholder="Search roadmaps..."
                aria-label="Search roadmaps"
              />
              {/* <button className="btn ghost" aria-label="Search">
                Search
              </button> */}
            </div>
          </div>
        </section>
        {/* DATA EMPTY */}
        {!loading && filtered.length === 0 && (
          <p className="muted">No roadmaps found.</p>
        )}

        {/* ROADMAP GRID */}
        <section className="roadmap-grid">
          {!loading &&
            filtered.map((roadmap) => (
              <article className="card" key={roadmap.roadmap_id} tabIndex="0">
                <h3 className="card-title">{roadmap.title}</h3>
                <p className="card-desc">
                  {getTwoSentencesClean(roadmap.description)}
                </p>

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

export default Home;
