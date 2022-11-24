import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Protected from "./routing/Protected";
import Posts from "./components/Posts";
import User from "./components/User";
import Socket from "./layouts/Socket";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Posts />} />
            {/* <Route path="/:id" element={<User />} /> */}
          </Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/socket" element={<Socket />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
