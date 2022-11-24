import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signinForm;

  const onChangeSigninForm = (e) => {
    return setSigninForm({
      ...signinForm,
      [e.target.name]: e.target.value,
    });
  };

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
          autoComplete="on"
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeSigninForm}
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeSigninForm}
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
