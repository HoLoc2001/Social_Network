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
import { useDispatch } from "react-redux";
import { checkEmail, signup } from "../components/User/userSlice";
import { useAppSelector } from "../redux/store";

const SignUp = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const validateEmail = useAppSelector((state) => state.user.validateEmail);

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
    if (!email || !fullname || !birthday || !password || errRelayPass) {
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
          ????ng k??
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
            error={
              (validateEmail || !validateEmailRegex(email)) &&
              !!signupForm.email
            }
            helperText={
              validateEmail
                ? "Email ???? ???????c s??? d???ng"
                : validateEmailRegex(email) || !signupForm.email
                ? ""
                : "Email kh??ng ????ng ?????nh d???ng"
            }
          />
          <TextField
            id="fullname"
            label="H??? v?? t??n"
            variant="outlined"
            name="fullname"
            value={fullname}
            onChange={onChangeSignupForm}
          />
          <TextField
            id="date"
            label="Ng??y sinh"
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
            label="M???t kh???u"
            type="password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={onChangeSignupForm}
          />
          <TextField
            id="replayPassword"
            label="Nh???p l???i m???t kh???u"
            type="password"
            name="replayPassword"
            autoComplete="current-password"
            onBlur={onValidatePassword}
            error={errRelayPass}
            helperText={errRelayPass ? "M???t kh???u kh??ng ????ng" : ""}
          />
          <Button variant="contained" onClick={handleSignup}>
            ????ng k??
          </Button>
        </Stack>

        <Typography>
          B???n ???? c?? t??i kho???n?
          <Link to="/signin">
            <Button>????ng nh???p</Button>
          </Link>
        </Typography>
      </Box>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Snackbar
          open={errMissInput}
          autoHideDuration={4000}
          onClose={() => setErrMissInput(false)}
        >
          <Alert severity="warning">Vui l??ng nh???p ?????y ?????!!!</Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SignUp;
