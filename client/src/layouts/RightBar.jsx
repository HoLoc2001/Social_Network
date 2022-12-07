import { Avatar, Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
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
      maxWidth="100%"
      height="80%"
      sx={{ p: "20px" }}
    >
      <div style={{ height: "30%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>Gợi ý</h4>
          <Button
            variant="outlinedz"
            sx={{ textTransform: "none", color: "black", marginLeft: "100px" }}
          >
            <RefreshIcon />
            Làm mới
          </Button>
        </div>
      </div>
      <h4>Đang theo dõi</h4>
      <div style={{ height: "70%", overflowY: "scroll" }}>
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
                size="small"
                style={{
                  textTransform: "none",
                  color: "black",
                  width: "250px",
                  ...{ justifyContent: "flex-start" },
                }}
              >
                <Avatar src={follower.avatar} alt="Avatar" />
                <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                  {follower.fullname}
                </span>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default RightBar;
