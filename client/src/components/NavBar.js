import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ marginBottom: "20px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sikayat Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About us
              </Link>
            </li>
          </ul>
          <Link to ="/addnew" >
            <button className="btn btn-outline-success my-2 my-sm-0">Add New</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
