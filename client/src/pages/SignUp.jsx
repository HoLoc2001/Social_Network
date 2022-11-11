import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const SignUp = () => {
  return (
    <>
      <Box
        component="form"
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
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />

          <TextField
            id="date"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-password-input"
            label="Nhập lại mật khẩu"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained">Đăng ký</Button>
        </Stack>

        <Typography>
          Bạn đã có tài khoản?
          <Link to="/signin">
            <Button>Đăng nhập</Button>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignUp;
