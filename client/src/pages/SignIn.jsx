import React from "react";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { signin, tokenSelector } from "../components/User/userSlice";
import { useAppDispatch } from "../redux/store";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const [errMissInput, setErrMissInput] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleClickSignin = async () => {
    if (!email || !password) {
      return setErrMissInput(true);
    }
    await dispatch(signin(signinForm));
    setIsAuthenticated(true);
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      if (!email || !password) {
        return setErrMissInput(true);
      }
      await dispatch(signin(signinForm));
      setIsAuthenticated(true);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
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
            onKeyDown={keyPress}
            autoFocus
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeSigninForm}
            onKeyDown={keyPress}
          />
          <Button variant="contained" onClick={handleClickSignin}>
            Đăng nhập
          </Button>
          <Button variant="contained">Quên mật khẩu</Button>
        </Stack>

        <Typography>
          Bạn chưa có tài khoản?
          <Link to="/signup">
            <Button>Đăng ký</Button>
          </Link>
        </Typography>
      </Box>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Snackbar
          open={errMissInput}
          autoHideDuration={4000}
          onClose={() => setErrMissInput(false)}
        >
          <Alert severity="warning">Vui long nhap email va mat khau</Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SignIn;
