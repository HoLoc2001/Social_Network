import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
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
          autoComplete="off"
        >
          <TextField id="email" label="Email" variant="outlined" />
          <TextField id="fullname" label="Họ và tên" variant="outlined" />
          <TextField
            id="date"
            label="Ngày sinh"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="replayPassword"
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
