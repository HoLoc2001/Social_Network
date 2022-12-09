import React, { useEffect, useRef } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Collapse, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

const host = "http://localhost:5000";

const Notification = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // socketRef.current?.emit("chat message", "dasd");
    socketRef.current?.emit("initRoom", { id: "12" });
    socketRef.current?.on("notification", (data) => {
      console.log(data);
    });
  }, []);

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
