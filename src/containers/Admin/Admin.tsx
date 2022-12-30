import React from 'react';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {Link} from "react-router-dom";

const Admin = () => {
  return (
    <>
        <NavbarAdmin/>
      <div className="container d-flex justify-content-between align-items-center">
        <div>Dishes</div>
        <div>
          <Link to="/admin/add-new-dish" className="btn btn-outline-success">Add new dish</Link>
        </div>
      </div>
    </>
  );
};

export default Admin;