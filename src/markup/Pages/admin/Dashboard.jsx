import React from "react";
// Import the AdminMenu component
import AdminMenu from "../../components/admin/AdminMenu/AdminMenu";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import Header from "../../components/Header"

function AddAdmin() {
  return (
    <>
    <Header />
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
