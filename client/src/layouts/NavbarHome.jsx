import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import { Stack } from "@mui/system";
import { checkPass, updatePass } from "../components/User/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isPassValue = useAppSelector((state) => state.user.isPassValue);

  const [openSignOut, setOpenSignOut] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const [error, setError] = useState(false);
  const [changePass, setChangePass] = useState({
    oldPass: "",
    newPass: "",
    replayNewPass: "",
  });
  const [contentError, setContentError] = useState("");

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleClickInfo = () => {
    // dispatch(getInfo());
  };

  const onChangePass = (e) => {
    setChangePass({
      ...changePass,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePass = async () => {
    if (
      !changePass.oldPass ||
      !changePass.newPass ||
      !changePass.replayNewPass
    ) {
      setContentError("Vui lòng nhập đầy đủ thông tin");
      setError(true);
      return;
    }
    if (!(changePass.newPass === changePass.replayNewPass)) {
      setContentError("Vui lòng nhập lại chính xác mật khẩu mới");
      setError(true);
      return;
    }

    await dispatch(checkPass(changePass.oldPass));

    if (!isPassValue && isPassValue !== null) {
      setContentError("Vui lòng nhập lại mật khẩu cũ");
      setError(true);
      return;
    }

    await dispatch(updatePass(changePass.newPass));
    setContentError("Thay đổi mật khẩu thành công");
    setError(true);
    setOpenChangePass(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ color: "black", backgroundColor: "#20B2AA" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mr: 2,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      textDecoration: "none",
                      fontSize: "30px",
                      color: "whitesmoke",
                    }}
                    onClick={() => (window.location.href = "/")}
                  >
                    SOCIAL
                  </Typography>
                </Link>
              </Box>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/search">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </Link>
                <Notification />

                <div className="mui-dropdown">
                  <IconButton aria-label="settings" data-mui-toggle="dropdown">
                    <SettingsIcon />
                  </IconButton>
                  <ul className="mui-dropdown__menu mui-dropdown__menu--right">
                    <li style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => setOpenChangePass(true)}
                        sx={{ color: "black" }}
                      >
                        <Typography>Đổi mật khẩu</Typography>
                      </Button>
                    </li>
                    <li style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => setOpenSignOut(true)}
                        sx={{ color: "black" }}
                      >
                        <Typography>Đăng xuất</Typography>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Dialog
        open={openChangePass}
        onClose={() => !openChangePass}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Social</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Đổi mật khẩu
          </DialogContentText>
        </DialogContent>
        <TextField
          id="oldPass"
          name="oldPass"
          label="Mật khẩu cũ"
          variant="outlined"
          type="password"
          value={changePass.oldPass}
          onChange={onChangePass}
          sx={{ margin: "30px", width: "400px" }}
        />
        <TextField
          id="newPass"
          name="newPass"
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          value={changePass.newPass}
          onChange={onChangePass}
          sx={{ margin: "30px", width: "400px" }}
        />
        <TextField
          id="replayNewPass"
          name="replayNewPass"
          label="Nhập lại mật khẩu mới"
          variant="outlined"
          type="password"
          value={changePass.replayNewPass}
          onChange={onChangePass}
          sx={{ margin: "30px", width: "400px" }}
        />
        <DialogActions>
          <Button onClick={() => setOpenChangePass(false)}>Hủy bỏ</Button>
          <Button onClick={handleChangePass}>Đổi mật khẩu</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSignOut}
        onClose={() => !openSignOut}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Social</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đang muốn đăng xuất?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSignOut(false)}>Hủy bỏ</Button>
          <Button onClick={handleSignOut}>Đăng xuất</Button>
        </DialogActions>
      </Dialog>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Snackbar
          open={error}
          autoHideDuration={4000}
          onClose={() => setError(false)}
        >
          <Alert severity="warning">{contentError}</Alert>
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

export default Navbar;
