import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/img/logo.png";

const NavBar = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <img src={logo} alt="social" height={"60px"} width={"80px"} />
      NavBar
      <Outlet />
    </div>
  );
};

export default NavBar;
