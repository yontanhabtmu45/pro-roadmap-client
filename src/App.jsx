import { useEffect } from "react";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.css";
// import "react-responsive-carousel/dist/styles/carousel.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Routes, Route } from "react-router-dom";

import Home from "./markup/Pages/Home";
import Register from "./markup/Pages/Register";
import Login from "./markup/Pages/Login";
import ForgotPassword from "./markup/Pages/ForgotPassword";



import AllRoadmaps from "./markup/Pages/AllRoadmaps";
import About from "./markup/Pages/About";
import Dashboard from "./markup/components/admin/Dashboard/Dashboard";
import ManageAdmins from "./markup/Pages/admin/ManageAdmins";
import ManageRoadmaps from "./markup/Pages/admin/ManageRoadmaps";
import AddRoadmap from "./markup/Pages/admin/AddRoadmap";
import StepsSettings from "./markup/Pages/admin/StepsSettings";
import AddStep from "./markup/Pages/admin/AddStep";
import EditAdmin from "./markup/Pages/admin/EditAdmin";
import EditRoadmap from "./markup/Pages/admin/EditRoadmap";
import EditStep from "./markup/Pages/admin/EditStep";
import RoadmapSteps from "./markup/Pages/RoadmapSteps";
import Unauthorized from "./markup/Pages/Unauthorized";
import Four04 from "./markup/Pages/Four04";
import Contact from "./markup/Pages/Contact";

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"



function App() {
  return (
    <>
    <SpeedInsights />
    <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Login />} />
        <Route path="/Reg" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/AllRoadmaps" element={<AllRoadmaps />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="*" element={<Four04 />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected admin route */}
        <Route
          path="/ad"
          element={
           
              <Dashboard />
            
          }
        />
        <Route
          path="/ads"
          element={
            
              <ManageAdmins />
            
          }
        />
        <Route
          path="/ad/roadmaps"
          element={
            
              <ManageRoadmaps />
            
          }
        />
        <Route
          path="/ad/roadmap"
          element={
            
              <AddRoadmap />
            
          }
        />
        <Route
          path="/ad/steps"
          element={
            
              <StepsSettings />
            
          }
        />
        <Route
          path="/ad/step"
          element={
            
              <AddStep />
            
          }
        />
        <Route
          path="/ad/edit-ad/:id"
          element={
            
              <EditAdmin />
            
          }
        />
        <Route
          path="/ad/roadmap/edit-roadmap/:id"
          element={
            
              <EditRoadmap />
            
          }
        />
        <Route
          path="/ad/step/edit-step/:id"
          element={
            
              <EditStep />
           
          }
        />
        <Route
          path="/roadmap/:roadmap_id"
          element={
            
              <RoadmapSteps />
            
          }
        />
      </Routes>
    </>
  );
}

export default App;