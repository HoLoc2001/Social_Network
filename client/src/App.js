import { Route, Routes } from "react-router-dom";
import A from "./components/A";
import B from "./components/B";
import Header from "./layouts/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/lorem" element={<A />} />
      <Route path="/" element={<Header />}>
        <Route path="/eee" element={<B abc={"123"} />} />
      </Route>
    </Routes>
  );
}

export default App;
