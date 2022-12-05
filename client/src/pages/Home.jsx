import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";
import RightBar from "../layouts/RightBar";

const Home = () => {
  return (
    <>
      <div style={{ backgroundColor: "#F0F2F5" }}>
        <NavbarHome />
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
