import {
  Avatar,
  Box,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addCommentPost, getCommentPost } from "./Posts/postsSlice";
import { useState } from "react";

const Comment = (props) => {
  const postId = props.post.id;
  const dispatch = useAppDispatch();
  const comments = props.post?.comments;
  const totalComment = props.post?.totalComment;
  useEffect(() => {
    async function load() {
      // await dispatch(getCommentPost(postId));
    }
    load();
  });
  const [comment, setComment] = useState("");

  const handleSeeMore = async () => {
    await dispatch(getCommentPost(postId));
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = async () => {
    if (comment) {
      await dispatch(addCommentPost({ postId, content: comment }));
      await dispatch(getCommentPost(postId));
      setComment("");
    }
  };

  const keyPress = async (e) => {
    if (e.key === "Enter" && comment) {
      await dispatch(addCommentPost({ postId, content: comment }));
      await dispatch(getCommentPost(postId));
      setComment("");
    }
  };

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "15px",
          }}
        >
          <Avatar
            src={props.avatar}
            aria-label="recipe"
            sx={{ width: "28px", height: "28px", marginRight: "5px" }}
          />
          <TextField
            sx={{ width: "100%" }}
            id="input-with-sx"
            variant="standard"
            value={comment}
            onChange={onChangeComment}
            onKeyDown={keyPress}
            placeholder="Viết bình luận"
          />
          <IconButton onClick={async () => await handleSendComment()}>
            <SendIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </Box>
        <Box sx={{ maxHeight: "300px", overflowY: "scroll" }}>
          {!comments ? (
            totalComment === 0 ? (
              ""
            ) : (
              <p onClick={() => handleSeeMore()}>Xem tất cả bình luận</p>
            )
          ) : (
            comments?.map((comment) => {
              return (
                <div
                  key={nanoid()}
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={comment.avatar}
                    aria-label="recipe"
                    sx={{ width: "28px", height: "28px" }}
                  />
                  <div
                    style={{
                      backgroundColor: "#E4E6EB",
                      width: "auto",
                      padding: "0px 10px",
                      marginLeft: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="i">{comment.fullname}</Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                  </div>
                </div>
              );
            })
          )}
        </Box>
      </CardContent>
    </Collapse>
  );
};

export default Comment;
