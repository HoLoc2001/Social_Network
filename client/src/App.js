import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import A from "./components/A";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/lorem" element={<A />} />
    </Routes>
  );
}

export default App;
