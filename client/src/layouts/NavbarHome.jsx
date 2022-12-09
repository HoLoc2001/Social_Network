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
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [openSignOut, setOpenSignOut] = useState(false);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleClickInfo = () => {
    // dispatch(getInfo());
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
    </>
  );
};

export default Navbar;
