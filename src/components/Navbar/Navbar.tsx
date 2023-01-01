import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-success bg-gradient mb-5">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/" className="navbar-brand">Turtle Pizza</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;