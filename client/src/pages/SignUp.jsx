import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkEmail, signup } from "../redux/userSlice";
import { useAppSelector } from "../redux/store";
import { signUpValidate } from "../utils/validation";
import Alert from "../components/AlertErr";

const SignUp = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const validateEmail = useAppSelector((state) => state.user.validateEmail);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    fullname: "",
    password: "",
    birthday: "",
  });
  const [errRelayPass, setErrRelayPass] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errMissInput, setErrMissInput] = useState(false);

  const { email, fullname, password, birthday } = signUpForm;

  const onChangeSignUpForm = (e) => {
    return setSignUpForm({
      ...signUpForm,
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

  const handleSignUp = async () => {
    let error = false;
    // const { error } = signUpValidate({
    //   email,
    //   password,
    //   repeat_password: password,
    // });
    console.log(error);

    if (error) {
      setErrMissInput(true);
    } else {
      await dispatch(signup(signUpForm));
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
            onChange={onChangeSignUpForm}
            onBlur={handleValidateEmail}
            error={validateEmail}
            helperText={validateEmail ? "Email đã được sử dụng" : ""}
          />
          <TextField
            id="fullname"
            label="Họ và tên"
            variant="outlined"
            name="fullname"
            value={fullname}
            onChange={onChangeSignUpForm}
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
            onChange={onChangeSignUpForm}
          />
          <TextField
            id="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={onChangeSignUpForm}
          />
          <TextField
            id="replayPassword"
            label="Nhập lại mật khẩu"
            type="password"
            name="replayPassword"
            autoComplete="current-password"
            onBlur={onValidatePassword}
            error={errRelayPass}
            helperText={errRelayPass ? "Mật khẩu không đúng" : ""}
          />
          <Button variant="contained" onClick={handleSignUp}>
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
      <Alert err={errMissInput} setErr={setErrMissInput} severity="error" />
    </>
  );
};

export default SignUp;
