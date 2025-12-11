import { useEffect } from "react";
import "./App.css";
// import "react-responsive-carousel/lib/styles/carousel.css";
import "react-responsive-carousel/dist/styles/carousel.min.css";

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



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/AllRoadmaps" element={<AllRoadmaps />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="*" element={<Four04 />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected admin route */}
        <Route
          path="/admin"
          element={
           
              <Dashboard />
            
          }
        />
        <Route
          path="/admins"
          element={
            
              <ManageAdmins />
            
          }
        />
        <Route
          path="/admin/roadmaps"
          element={
            
              <ManageRoadmaps />
            
          }
        />
        <Route
          path="/admin/roadmap"
          element={
            
              <AddRoadmap />
            
          }
        />
        <Route
          path="/admin/steps"
          element={
            
              <StepsSettings />
            
          }
        />
        <Route
          path="/admin/step"
          element={
            
              <AddStep />
            
          }
        />
        <Route
          path="/admin/edit-admin/:id"
          element={
            
              <EditAdmin />
            
          }
        />
        <Route
          path="/admin/roadmap/edit-roadmap/:id"
          element={
            
              <EditRoadmap />
            
          }
        />
        <Route
          path="/admin/step/edit-step/:id"
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