import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Protected from "./routing/Protected";
import Posts from "./components/Posts";
// import Socket from "./layouts/Socket";
import User from "./components/User";
import OtherUser from "./components/OtherUser";
import EditProfile from "./components/User/EditProfile";
import Search from "./components/Search";
import Image from "./components/image";
import ShowImg from "./components/ShowImg";
import HomeNotSignIn from "./pages/HomeNotSignIn";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/image" element={<Image />} />
        <Route path="/src" element={<ShowImg />} />
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Posts />} />
            <Route path="/profile" element={<User />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:id" element={<OtherUser />} />
          </Route>
        </Route>
        <Route path="/" element={<HomeNotSignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/socket" element={<Socket />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
