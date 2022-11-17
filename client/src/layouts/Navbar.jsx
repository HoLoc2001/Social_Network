import React from "react";
import Filters from "../components/Filters";
import "../assets/style/style.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ display: "flex" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="noselect">Social</h1>
      </Link>
      <Filters />
    </div>
  );
};

export default NavBar;
