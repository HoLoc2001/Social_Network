import React from "react";
import { Link } from "react-router-dom";
import "../assets/style/style.css";

const erorrPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="noselect">Ve Trang chu</h1>
      </Link>
      <p>Duong dan khong ton tai</p>
    </div>
  );
};

export default erorrPage;
