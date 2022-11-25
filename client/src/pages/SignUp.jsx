import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  signup,
  validateEmailSelector,
} from "../components/User/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const validateEmail = useSelector(validateEmailSelector);

  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
    birthday: "",
  });
  const [errRelayPass, setErrRelayPass] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errMissInput, setErrMissInput] = useState(false);

  const { email, username, password, birthday } = signupForm;

  const onChangeSignupForm = (e) => {
    return setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidateEmail = (e) => {
    if (e.target.value) {
      dispatch(checkEmail(e.target.value));
    }
  };

  const onValidatePassword = (e) => {
    if (e.target.value === password) {
      setErrRelayPass(false);
    } else {
      setErrRelayPass(true);
    }
  };

  const handleSignup = () => {
    if (!email || !username || !birthday || !password) {
      setErrMissInput(true);
    } else {
      dispatch(signup(signupForm));
      setIsAuthenticated(true);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <Box
        sx={{
          width: "50%",
          height: "650px",
          backgroundColor: "#E7E9EB",
          margin: "60px auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" fontSize={"50px"}>
          Đăng ký
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
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={onChangeSignupForm}
            onBlur={handleValidateEmail}
            error={validateEmail}
            helperText={validateEmail ? "Email da co nguoi su dung" : ""}
          />
          <TextField
            id="username"
            label="Họ và tên"
            variant="outlined"
            name="username"
            value={username}
            onChange={onChangeSignupForm}
          />
          <TextField
            id="date"
            label="Ngày sinh"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="birthday"
            value={birthday}
            onChange={onChangeSignupForm}
          />
          <TextField
            id="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={onChangeSignupForm}
          />
          <TextField
            id="replayPassword"
            label="Nhập lại mật khẩu"
            type="password"
            name="replayPassword"
            autoComplete="current-password"
            onBlur={onValidatePassword}
            error={errRelayPass}
            helperText={errRelayPass ? "Mat khau khong dung" : ""}
          />
          <Button variant="contained" onClick={handleSignup}>
            Đăng ký
          </Button>
        </Stack>

        <Typography>
          Bạn đã có tài khoản?
          <Link to="/signin">
            <Button>Đăng nhập</Button>
          </Link>
        </Typography>
      </Box>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Snackbar
          open={errMissInput}
          autoHideDuration={4000}
          onClose={() => setErrMissInput(false)}
        >
          <Alert severity="warning">Vui lòng nhập đầy đủ!!!</Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SignUp;
