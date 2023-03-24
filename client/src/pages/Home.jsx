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

const host = "http://localhost:5000"; // "http://localhost:5000";https://server-social-network-jvbg.onrender.com

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function load() {
      await dispatch(getInfo());
    }
    load();
  }, []);

  const socketRef = useRef();
  const user = useAppSelector((state) => state.user.user);

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
        if ("" + user.id !== userId) {
          // await dispatch(getTotalLikePost(postId));
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
        if ("" + user.user_id !== userId) {
          await dispatch(getPost({ postId, userId }));
        }
      }
    );

    socketRef.current?.on("notification-updateUser", async (data) => {
      await dispatch(updateUserSocket(data));
    });
  }, []);

  return (
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
