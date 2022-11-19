import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";
import RightBar from "../layouts/RightBar";

const Home = () => {
  return (
    <>
      <NavbarHome />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default Home;

// const [time, setTime] = useState(false);

// setTimeout(() => {
//   setTime(!time);
// }, 4000);

// return time ? (
//   <Navigate to="/signup" />
// ) : (
//   <>
//     <Navbar />
//     <div style={{ display: "flex" }}>
//       <LeftBar />
//       <div style={{ flex: 6 }}>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
//           reiciendis ipsa ut minus tempore aliquam, modi asperiores quae
//           molestias architecto ea provident sit ad et laudantium corrupti
//           temporibus consequuntur hic.
//         </p>
//       </div>
//       <RightBar />
//     </div>
//   </>
// );
