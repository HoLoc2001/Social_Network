import { Avatar, Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getListFollower } from "../components/User/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const RightBar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function load() {
      await dispatch(getListFollower());
    }
    load();
  }, []);
  const listFollower = useAppSelector((state) => state.user.listFollower);

  const handleClickFollower = async (userId) => {
    console.log(userId);
  };

  return (
    <Box
      position="fixed"
      top="50px"
      left="80%"
      width="100%"
      height="80%"
      sx={{ p: "20px" }}
    >
      <h3>Đang theo dõi</h3>
      {listFollower.map((follower) => (
        <div
          key={follower.id}
          style={{
            display: "flex",
            paddingBottom: "10px",
            alignItems: "center",
          }}
        >
          <Link to={`/${follower.id}`} style={{ textDecoration: "none" }}>
            <Button
              onClick={() => handleClickFollower(follower.id)}
              style={{ textTransform: "none", color: "black" }}
            >
              <Avatar src={follower.avatar} alt="Avatar" />
              <span style={{ fontSize: "20px", paddingLeft: "10px" }}>
                {follower.fullname}
              </span>
            </Button>
          </Link>
        </div>
      ))}
    </Box>
  );
};

export default RightBar;
