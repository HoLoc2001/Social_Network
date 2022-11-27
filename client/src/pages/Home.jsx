import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";

const Home = () => {
  return (
    <>
      <div style={{ backgroundColor: "#F0F2F5" }}>
        <NavbarHome />
        <LeftBar />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
