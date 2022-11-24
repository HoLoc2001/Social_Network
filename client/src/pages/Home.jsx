import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";

const Home = () => {
  return (
    <>
      <NavbarHome />
      <LeftBar />
      <Outlet />
    </>
  );
};

export default Home;
