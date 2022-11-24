import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:5000";

function Socket() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
  }, []);

  return <>socket</>;
}

export default Socket;
