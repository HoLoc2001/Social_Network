import {
  Avatar,
  Box,
  Button,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import {
  addCommentPost,
  deleteComment,
  getCommentPost,
} from "./Posts/postsSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ post, avatar, userId }) => {
  const [openDeleteComment, setOpenDeleteComment] = useState(false);
  const [commentId, setCommentId] = useState("");

  let atProfile = window.location.href.slice(-7) === "profile";
  const postId = post?.id;
  const dispatch = useAppDispatch();
  const comments = post?.comments;
  const totalComment = post?.totalComment;
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

  const handleClickUser = async () => {};

  const handleDeleteCommentPost = async () => {
    await dispatch(deleteComment({ commentId, postId }));
    await dispatch(getCommentPost(postId));

    setOpenDeleteComment(false);
  };

  const handleDeleteComment = (commentId) => {
    setCommentId(commentId);
    setOpenDeleteComment(true);
  };

  return (
    <>
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
              src={avatar}
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
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSeeMore()}
                >
                  Xem tất cả bình luận
                </p>
              )
            ) : (
              comments?.map((comment) => {
                return (
                  <div
                    key={comment.commentId}
                    style={{
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    <Link
                      to={userId === comment.id ? "/profile" : `/${comment.id}`}
                      onClick={() => handleClickUser()}
                    >
                      <Avatar
                        src={comment.avatar}
                        aria-label="recipe"
                        sx={{ width: "28px", height: "28px" }}
                      />
                    </Link>
                    <div
                      style={{
                        backgroundColor: "#E4E6EB",
                        width: "auto",
                        padding: "0px 10px",
                        marginLeft: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      <Link
                        to={
                          userId === comment.id ? "/profile" : `/${comment.id}`
                        }
                        style={{ color: "black" }}
                        onClick={() => handleClickUser()}
                      >
                        <Typography variant="i">{comment.fullname}</Typography>
                      </Link>
                      <Typography variant="body2">{comment.content}</Typography>
                    </div>
                    {atProfile || comment.userId == userId ? (
                      <div className="mui-dropdown mui-dropdown--bottom">
                        <IconButton
                          aria-label="settings"
                          data-mui-toggle="dropdown"
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <ul
                          className="mui-dropdown__menu"
                          style={{ textAlign: "center" }}
                        >
                          {comment.userId == userId ? (
                            <li>
                              <Link
                                onClick={() =>
                                  handleDeleteComment(comment.commentId)
                                }
                              >
                                Sửa
                              </Link>
                            </li>
                          ) : (
                            ""
                          )}
                          <li>
                            <Link
                              onClick={() =>
                                handleDeleteComment(comment.commentId)
                              }
                            >
                              Xóa
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            )}
          </Box>
        </CardContent>
      </Collapse>
      <Dialog
        open={openDeleteComment}
        onClose={() => !openDeleteComment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Social</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa bài đăng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteComment(false)}>Hủy bỏ</Button>
          <Button onClick={() => handleDeleteCommentPost()}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Comment;
