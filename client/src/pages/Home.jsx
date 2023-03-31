import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { getInfo } from "../redux/userSlice";
import LeftBar from "../layouts/LeftBar";
import NavbarHome from "../layouts/NavbarHome";
import RightBar from "../layouts/RightBar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import socketIOClient from "socket.io-client";
import {
  deleteComment,
  getCommentPost,
  getPost,
  getTotalComment,
  getTotalLikePost,
  getUpdatePost,
  updateUserSocket,
} from "../redux/postsSlice";
import HomeNotSignIn from "./HomeNotSignIn";

const host = process.env.REACT_APP_API_BASE_URL; // "http://localhost:5000";https://server-social-network-jvbg.onrender.com

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAuthenticated =
    useAppSelector((state) => state.user.isAuthenticated) || localStorage["AT"];
  useEffect(() => {
    async function load() {
      if (isAuthenticated) {
        await dispatch(getInfo());
      }
    }
    load();
  }, []);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // socketRef.current?.on("notification", (data) => {
    //   console.log(data);
    // });

    socketRef.current?.on(
      "notification-CommentPost",
      async ({ postId, userId }) => {
        if ("" + user.id !== userId) {
          await dispatch(getTotalComment(postId));
          await dispatch(getCommentPost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-DeleteCommentPost",
      async ({ postId, userId, commentId }) => {
        if ("" + user.user_id !== userId) {
          await dispatch(getTotalComment(postId));
          await dispatch(getCommentPost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-UpdateCommentPost",
      async ({ postId }) => {
        await dispatch(getCommentPost(postId));
      }
    );

    socketRef.current?.on(
      "notification-LikePost",
      async ({ postId, userId }) => {
        if (!(user.user_id === userId)) {
          await dispatch(getTotalLikePost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-UpdatePost",
      async ({ postId, userId }) => {
        if (user.user_id !== userId) {
          await dispatch(getUpdatePost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-addPost",
      async ({ postId, userId }) => {
        if (user.user_id !== userId) {
          await dispatch(getPost({ postId, userId }));
        }
      }
    );

    socketRef.current?.on("notification-updateUser", async (data) => {
      await dispatch(updateUserSocket(data));
    });
  }, []);

  return !isAuthenticated ? (
    <div style={{ height: "100%", backgroundColor: "#F0F2F5" }}>
      <HomeNotSignIn />
    </div>
  ) : (
    <>
      <div style={{ height: "100%", backgroundColor: "#F0F2F5" }}>
        <NavbarHome />
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
