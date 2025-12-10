import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AdminMenu from "../AdminMenu/AdminMenu";

import adminService from "../../../services/admin.service";
import roadmapService from "../../../services/roadmap.service";
import stepsService from "../../../services/steps.service";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepsCountByRoadmap, setStepsCountByRoadmap] = useState({});

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [aRes, rRes, sRes] = await Promise.all([
        adminService.getAllAdmins(),
        roadmapService.getAllRoadmaps(),
        stepsService.getSteps(),
      ]);

      const adminList = aRes?.data?.data || aRes?.data || [];
      const roadmapList = rRes?.data?.data || rRes?.data || [];
      const stepList = sRes?.data?.data || sRes?.data || [];

      setAdmins(adminList);
      setRoadmaps(roadmapList);
      setSteps(stepList);

      const counts = {};

      await Promise.all(
        roadmapList.map(async (rm) => {
          const id = rm.roadmap_id || rm.id || rm.roadmapId;
          try {
            const s = await stepsService.getStepsByRoadmap(id);
            counts[id] = (s?.data?.data || s?.data || []).length;
          } catch {
            counts[id] = 0;
          }
        })
      );

      setStepsCountByRoadmap(counts);
      setLoading(false);
    }

    load();
  }, []);

  const roadmapBarData = roadmaps.map((rm) => {
    const id = rm.roadmap_id || rm.id || rm.roadmapId;
    return {
      name: rm.title || rm.roadmap_title || "Untitled",
      steps: stepsCountByRoadmap[id] || 0,
    };
  });

  const pieData = [
    { name: "Admins", value: admins.length },
    { name: "Roadmaps", value: roadmaps.length },
    { name: "Steps", value: steps.length },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#0d1117" }}>

      {/* SIDEBAR */}
      <aside
        className="border-end shadow-lg"
        style={{
          width: "260px",
          background: "#0b0f14",
          position: "fixed",
          top: 0,
          bottom: 0,
        }}
      >
        <AdminMenu />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 p-4" style={{ marginLeft: "260px" }}>

        <h2 className="fw-bold mb-4 text-light" style={{ letterSpacing: "-0.5px" }}>
          Dashboard Overview
        </h2>

        {loading ? (
          <div className="text-center fs-4 py-5 text-secondary">Loading...</div>
        ) : (
          <div className="container-fluid">

            {/* SUMMARY CARDS */}
            <div className="row g-4 mb-4">

              <div className="col-md-4">
                <div
                  className="card border-0 rounded-4 shadow-lg text-white p-3"
                  style={{
                    background: "linear-gradient(135deg, #1f2937, #111827)",
                    border: "1px solid #2d3748",
                  }}
                >
                  <h1 className="display-5 fw-bold text-primary">{admins.length}</h1>
                  <p className="fs-5 text-secondary">Total Admins</p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card border-0 rounded-4 shadow-lg text-white p-3"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #064e3b)",
                    border: "1px solid #134e4a",
                  }}
                >
                  <h1 className="display-5 fw-bold">{roadmaps.length}</h1>
                  <p className="fs-5 text-light">Roadmaps</p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card border-0 rounded-4 shadow-lg text-white p-3"
                  style={{
                    background: "linear-gradient(135deg, #854d0e, #451a03)",
                    border: "1px solid #78350f",
                  }}
                >
                  <h1 className="display-5 fw-bold">{steps.length}</h1>
                  <p className="fs-5 text-light">Total Steps</p>
                </div>
              </div>

            </div>

            {/* BAR CHART */}
            {/* <div
              className="card shadow-lg border-0 rounded-4 mb-4"
              style={{
                background: "#161b22",
                border: "1px solid #1f2937",
                color: "white",
              }}
            > */}
              {/* <div className="card-header bg-transparent border-0 py-3">
                <h5 className="fw-semibold mb-0 text-light">Steps Per Roadmap</h5>
              </div>
              <div className="card-body" style={{ height: "380px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roadmapBarData}>
                    <CartesianGrid stroke="#2d3748" />
                    <XAxis dataKey="name" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937" }} />
                    <Bar dataKey="steps" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div> */}

            {/* PIE CHART */}
            <div
              className="card shadow-lg border-0 rounded-4"
              style={{
                background: "#161b22",
                border: "1px solid #1f2937",
                color: "#fff",
              }}
            >
              <div className="card-header bg-transparent border-0 py-3">
                <h5 className="fw-semibold mb-0 text-light">System Overview</h5>
              </div>

              <div className="card-body" style={{ height: "380px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={130}
                      label
                    >
                      <Cell fill="#007bff" />
                      <Cell fill="#0d6c62" />
                      <Cell fill="#6f3c0a" />
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "#111827",
                        border: "1px solid #1f2937",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
