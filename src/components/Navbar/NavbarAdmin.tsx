import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavbarAdmin = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-success bg-gradient mb-5">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/admin/dishes" className="navbar-brand">Turtle Pizza Admin</Link>
        </div>
        <div >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/admin/dishes" className="nav-link">
                Dishes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;