import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import "./style.css";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" className="abc">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AllInclusiveIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "yellow",
              }}
            />
            <Typography
              className="abc"
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                // color: "inherit",
                textDecoration: "none",
              }}
            >
              SOCIAL
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AllInclusiveIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SOCIAL
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
        consequatur est quidem eos, cumque temporibus porro mollitia numquam non
        velit amet asperiores quis fugit pariatur harum fugiat ab voluptatum
        corrupti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
        sed. Perferendis, molestias pariatur quod nam magni soluta minima vitae
        architecto aspernatur nisi atque nihil provident ducimus distinctio?
        Iusto, obcaecati fugit?
      </p>
    </>
  );
};

export default Navbar;
