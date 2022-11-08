import React from "react";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ textAlign: "center" }}>
      NavBar
      <Outlet />
    </div>
  );
};

export default NavBar;
