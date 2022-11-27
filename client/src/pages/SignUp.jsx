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
  tokenSelector,
  validateEmailSelector,
} from "../components/User/userSlice";

const SignUp = () => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const validateEmail = useSelector(validateEmailSelector);

  const [signupForm, setSignupForm] = useState({
    email: "",
    fullname: "",
    password: "",
    birthday: "",
  });
  const [errRelayPass, setErrRelayPass] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errMissInput, setErrMissInput] = useState(false);

  const { email, fullname, password, birthday } = signupForm;

  function validateEmailRegex(str) {
    const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(str);
    console.log(isEmail, str);
    return isEmail;
  }

  const onChangeSignupForm = (e) => {
    return setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidateEmail = async (e) => {
    if (e.target.value) {
      await dispatch(checkEmail(e.target.value));
    }
  };

  const onValidatePassword = (e) => {
    if (e.target.value === password) {
      setErrRelayPass(false);
    } else {
      setErrRelayPass(true);
    }
  };

  const handleSignup = async () => {
    if (!email || !fullname || !birthday || !password) {
      setErrMissInput(true);
    } else {
      await dispatch(signup(signupForm));
      setIsAuthenticated(true);
    }
  };

  if (token?.accessToken && token?.refreshToken) {
    localStorage.setItem("AT", token.accessToken);
    localStorage.setItem("RT", token.refreshToken);
  }

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
            error={validateEmail || validateEmailRegex(email)}
            helperText={
              validateEmail
                ? "Email đã được sử dụng"
                : validateEmailRegex(email) === false
                ? ""
                : "Email không đúng định dạng"
            }
          />
          <TextField
            id="fullname"
            label="Họ và tên"
            variant="outlined"
            name="fullname"
            value={fullname}
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
        {/* <Snackbar
          open={errMissInput}
          autoHideDuration={4000}
          onClose={() => setErrMissInput(false)}
        >
          <Alert severity="warning">Vui lòng nhập đầy đủ!!!</Alert>
        </Snackbar> */}
      </Stack>
    </>
  );
};

export default SignUp;
