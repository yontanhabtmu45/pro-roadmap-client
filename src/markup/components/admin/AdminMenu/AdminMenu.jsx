import React from "react";
import { Link } from "react-router-dom";
import { 
  RiDashboardLine,
  RiAdminLine,
  RiRoadMapLine,
  RiAddLine,
  RiSettings3Line,
  RiFileAddLine
} from "react-icons/ri";

import "../../../Pages/Home.css";
import "../Dashboard/Dashboard.css";

function AdminMenu() {
  return (
    <aside className="card admin-menu glass-dark">
      <h3 className="card-title">Admin</h3>
      <p className="card-desc">Quick links and management actions</p>

      <div className="list-group" style={{ marginTop: 12 }}>

        <Link to="/admin" className="list-link">
          <RiDashboardLine className="menu-icon" />
          Dashboard
        </Link>

        <Link to="/admins" className="list-link">
          <RiAdminLine className="menu-icon" />
          Manage Admins
        </Link>

        <Link to="/admin/roadmaps" className="list-link">
          <RiRoadMapLine className="menu-icon" />
          Manage Roadmaps
        </Link>

        <Link to="/admin/roadmap" className="list-link">
          <RiAddLine className="menu-icon" />
          Add New Roadmap
        </Link>

        <Link to="/admin/steps" className="list-link">
          <RiSettings3Line className="menu-icon" />
          Steps Settings
        </Link>

        <Link to="/admin/step" className="list-link">
          <RiFileAddLine className="menu-icon" />
          Add New Step
        </Link>

      </div>
    </aside>
  );
}

export default AdminMenu;
