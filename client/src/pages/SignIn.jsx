import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          width: "60%",
          height: "1000px",
          backgroundColor: "#E7E9EB",
          margin: "100px auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h2">Đăng nhập</Typography>
        <Link to="/signup">
          <Button>Đăng ký</Button>
        </Link>
      </Box>
    </>
  );
};

export default SignIn;
