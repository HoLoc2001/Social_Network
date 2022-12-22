import React, { useEffect, useRef } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Collapse, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const host = "http://localhost:5000";

const Notification = () => {
  const socketRef = useRef();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // socketRef.current?.emit("chat message", "dasd");
    // console.log(user);
    // socketRef.current?.on("notification", (data) => {
    //   console.log(data);
    // });

    // socketRef.current?.on("notification-addPost", (data) => {
    //   console.log(data);
    // });
  }, []);

  useEffect(() => {
    socketRef.current?.emit("initRoom", { id: user.id });
  }, [user]);

  return (
    <>
      <div className="mui-dropdown">
        <IconButton aria-label="settings" data-mui-toggle="dropdown">
          <NotificationsIcon />
        </IconButton>
        <ul className="mui-dropdown__menu mui-dropdown__menu--right">
          <Box sx={{ width: "400px", maxHeight: "600px", overflowY: "scroll" }}>
            <li style={{ textAlign: "left" }}>Hello</li>

            <li style={{ textAlign: "center" }}>Hello</li>

            <li style={{ textAlign: "center" }}>Hello</li>
            <Divider />
            <li style={{ textAlign: "center" }}>Hello</li>
            <Divider />
            <li style={{ textAlign: "center" }}>Hello</li>
          </Box>
        </ul>
      </div>
    </>
  );
};

export default Notification;
