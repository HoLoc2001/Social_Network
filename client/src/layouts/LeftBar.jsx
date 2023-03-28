import { Avatar, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";

const LeftBar = () => {
  const user = useAppSelector((state) => state.user.user);

  const [atHome, setAtHome] = useState(true);

  let { id } = useParams();

  const handleClickUser = () => {
    setAtHome(false);
  };
  const handleClickHome = () => {
    // window.location.reload();
    setAtHome(true);
  };

  return (
    <>
      <Box position="fixed" width="15%" height="100%" sx={{ p: "20px" }}>
        <div
          style={{
            display: "block",
            alignItems: "center",
          }}
        >
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button
              onClick={handleClickHome}
              style={{
                fontSize: "20px",
                paddingLeft: "10px",
                paddingBottom: "10px",
                textTransform: "none",
                ...(atHome && !id ? { borderLeft: "5px solid #20B2AA" } : {}),
              }}
            >
              <HomeIcon fontSize="large" />
              <p
                style={{
                  fontSize: "20px",
                  paddingLeft: "10px",
                }}
              >
                Trang chủ
              </p>
            </Button>
          </Link>
          <Link to={`/profile`} style={{ textDecoration: "none" }}>
            <Button
              onClick={handleClickUser}
              style={{
                textTransform: "none",
                ...(!atHome && !id ? { borderLeft: "5px solid #20B2AA" } : {}),
              }}
            >
              <Avatar src={user?.avatar} alt="Avatar"></Avatar>
              <span style={{ fontSize: "20px", paddingLeft: "10px" }}>
                {user.fullname}
              </span>
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};

export default LeftBar;
