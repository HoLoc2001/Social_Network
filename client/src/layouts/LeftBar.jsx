import { Avatar, Box, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import React from "react";
import logo from "../assets/img/avatar.jpg";

const LeftBar = () => {
  return (
    <Box position="fixed" width="20%" height="100%" sx={{ p: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar alt="Avatar" src={logo}></Avatar>
        <Typography variant="h5">Hồ Tấn Lộc</Typography>
      </div>
    </Box>
  );
};

export default LeftBar;
