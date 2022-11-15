import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <Box
        noValidate
        // autoComplete="off"
        sx={{
          width: "50%",
          height: "500px",
          backgroundColor: "#E7E9EB",
          margin: "60px auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" fontSize={"50px"}>
          Đăng nhập
        </Typography>
        <Stack
          component="form"
          sx={{
            width: "400px",
            margin: "40px auto",
          }}
          spacing={3}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Tên tài khoản"
            variant="outlined"
          />
          <TextField
            id="outlined-password-input"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained">Đăng nhập</Button>
          <Button variant="contained">Quên mật khẩu</Button>
        </Stack>

        <Typography>
          Bạn chưa có tài khoản?
          <Link to="/signup">
            <Button>Đăng ký</Button>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignIn;
