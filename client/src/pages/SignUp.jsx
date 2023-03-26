import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkEmail, signUp } from "../redux/userSlice";
import { useAppSelector } from "../redux/store";
import { signUpValidate } from "../utils/validation";
import Alert from "../components/AlertErr";

const SignUp = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const validateEmail = useAppSelector((state) => state.user.validateEmail);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "M",
    repeat_password: "",
    birthday: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errMissInput, setErrMissInput] = useState(false);

  const {
    email,
    firstName,
    lastName,
    birthday,
    gender,
    password,
    repeat_password,
  } = signUpForm;

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

  const handleSignUp = async () => {
    const { error } = signUpValidate({
      email,
      firstName,
      lastName,
      birthday,
      gender,
      password,
      repeat_password: password,
    });

    if (error) {
      console.log(error);
      setErrMissInput(true);
    } else {
      await dispatch(signUp(signUpForm));
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
          height: "100%",
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
            label="Họ"
            variant="outlined"
            name="firstName"
            value={firstName}
            onChange={onChangeSignUpForm}
          />
          <TextField
            label="Tên"
            variant="outlined"
            name="lastName"
            value={lastName}
            onChange={onChangeSignUpForm}
          />
          <FormControl>
            <FormLabel sx={{ textAlign: "left" }}>Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
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
            name="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeSignUpForm}
          />
          <TextField
            name="repeat_password"
            label="Nhập lại mật khẩu"
            type="password"
            autoComplete="current-password"
            value={repeat_password}
            onChange={onChangeSignUpForm}
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
      <Alert
        err={errMissInput}
        setErr={setErrMissInput}
        severity="error"
        content=""
      />
    </>
  );
};

export default SignUp;
