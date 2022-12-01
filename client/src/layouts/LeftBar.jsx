import { Avatar, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInfo } from "../components/User/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getPosts } from "../components/Posts/postsSlice";

const LeftBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    async function load() {
      await dispatch(getInfo());
      await dispatch(getPosts());
    }
    load();
  }, []);
  const [atHome, setAtHome] = useState(true);

  const handleClickUser = () => {
    setAtHome(false);
  };
  const handleClickHome = () => {
    setAtHome(true);
  };

  return (
    <>
      <Box position="fixed" width="20%" height="100%" sx={{ p: "20px" }}>
        <div
          style={{
            // display: "flex",
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
              }}
            >
              <HomeIcon fontSize="large" />
              <span style={{ fontSize: "20px", paddingLeft: "10px" }}>
                Trang chủ
              </span>
            </Button>
          </Link>
          <Link to={`/${user.id}`} style={{ textDecoration: "none" }}>
            <Button onClick={handleClickUser} style={{ textTransform: "none" }}>
              <Avatar src={user.avatar} alt="Avatar"></Avatar>
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
