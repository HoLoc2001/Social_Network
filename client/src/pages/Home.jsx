import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getInfo } from "../components/User/userSlice";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";
import RightBar from "../layouts/RightBar";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function load() {
      await dispatch(getInfo());
    }
    load();
  }, []);
  return (
    <>
      <div style={{ height: "100%", backgroundColor: "#F0F2F5" }}>
        <NavbarHome />
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
