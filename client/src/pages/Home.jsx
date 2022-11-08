import React from "react";
import LeftBar from "../layouts/LeftBar";
import Navbar from "../layouts/Navbar";
import RightBar from "../layouts/RightBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            reiciendis ipsa ut minus tempore aliquam, modi asperiores quae
            molestias architecto ea provident sit ad et laudantium corrupti
            temporibus consequuntur hic.
          </p>
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default Home;
