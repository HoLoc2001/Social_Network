import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import axios from "axios";
const a = () => {
  const json = async () => {
    const res = await axios.get("http://localhost:5000/api");
  };
  json();
  return <></>;
};

export default a;
