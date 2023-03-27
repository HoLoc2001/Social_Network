import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";
import { getCommentPost, getOtherPosts } from "../redux/postsSlice";
import Comment from "../components/Posts/Comment";
import { json, Link, Navigate, useParams } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll";
import {
  addFollower,
  getListLike,
  getOtherInfo,
  removeFollower,
} from "../redux/userSlice";
import GridImg from "./Posts/GridImg";
import LikePost from "./Posts/LikePost";
moment.locale("vi");

const OtherUser = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getOtherInfo(params.id));
      window.scrollTo(0, 0);
      setPage(0);
    })();
  }, [params.id]);

  const otherUser = useAppSelector((state) => state.user.otherUser);
  const user = useAppSelector((state) => state.user.user);
  const listLike = useAppSelector((state) => state.user.listLike);
  const otherPosts = useAppSelector((state) => state.posts.otherPosts);
  const listFollower = useAppSelector((state) => state.user.listFollower);
  const [page, setPage] = useState(0);
  const [hasPost, setHasPost] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      // setPage(0);
      await dispatch(getOtherPosts({ page, userId: params.id }));
      setHasPost(() => {
        if (otherPosts.length % 5 === 0 && otherPosts.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page, params.id]);

  const handleClose = () => setOpen(false);

  if (user.user_id === params.id) {
    return <Navigate to="/profile" />;
  }

  const handleAddFollower = async (userId) => {
    await dispatch(addFollower(userId));
  };

  const handleRemoveFollower = async (userId) => {
    await dispatch(removeFollower(userId));
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  return otherUser === false ? (
    <Navigate to="./error" replace />
  ) : (
    <div
      style={{
        margin: "40px 0 0 30%",
        minHeight: "100vh",
      }}
    >
      {/* {info user} */}
      <Card
        sx={{
          width: "60%",
          marginBottom: "20px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={otherUser.avatar}
              aria-label="recipe"
              sx={{ height: "100px", width: "100px", position: "relative" }}
            />
          }
          title={
            <Typography sx={{ marginTop: "15px" }} variant="h5" component="div">
              {otherUser.fullname}
            </Typography>
          }
          subheader={
            <div style={{ display: "flex" }}>
              <h5>Người theo dõi: {otherUser.totalFollowers} &emsp;</h5>
              <h5>Đang theo dõi: {otherUser.totalFollowings}</h5>
            </div>
          }
          action={
            otherUser.hasfollower ? (
              <Button
                variant="contained"
                sx={{ textTransform: "none", margin: "30px 30px" }}
                onClick={() => handleRemoveFollower(otherUser.user_id)}
              >
                Hủy theo dõi
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ textTransform: "none", margin: "30px 30px" }}
                onClick={() => handleAddFollower(otherUser.user_id)}
              >
                Theo dõi
              </Button>
            )
          }
        />
      </Card>

      <InfiniteScroll
        getMore={() => {
          setPage((prev) => prev + 5);
        }}
        hasMore={otherPosts.length && hasPost}
      >
        {otherPosts.map((post) => (
          <Card key={post.post_id} sx={{ width: "60%", marginBottom: "20px" }}>
            <CardHeader
              avatar={
                <Avatar
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                  style={{ cursor: "pointer" }}
                  src={otherUser.avatar}
                  aria-label="recipe"
                />
              }
              title={
                <Link
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                  style={{ color: "black" }}
                >
                  {otherUser.fullname}
                </Link>
              }
              subheader={moment(post.created_at).format("llll")}
            />
            <Divider />

            {post.post_content ? (
              <CardContent>
                <Typography variant="body2">{post.post_content}</Typography>
              </CardContent>
            ) : (
              ""
            )}

            {post.images ? (
              <GridImg
                count={post.images.length}
                images={post.images}
              ></GridImg>
            ) : (
              ""
            )}

            <CardActions>
              <div
                style={{
                  paddingLeft: "20%",
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <LikePost
                  user_id={user.user_id}
                  post_id={post.post_id}
                  total_like={post.total_like || 0}
                  list_like={post?.list_like}
                  islike={post.islike}
                />
              </div>
              <div
                style={{
                  paddingLeft: "20%",
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <IconButton onClick={() => handleClickComment(post.post_id)}>
                  <CommentIcon sx={{ color: "gray" }} />
                </IconButton>
                <Typography variant="body2">{post.total_comment}</Typography>
              </div>
            </CardActions>
            <Comment post={post} avatar={user.avatar} userId={user?.user_id} />
          </Card>
        ))}
      </InfiniteScroll>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
          }}
        >
          {listLike?.map((element) => (
            <div
              key={element.user_id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  user.user_id === element.user_id
                    ? "/profile"
                    : `/${element.user_id}`
                }
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    color: "black",
                    width: "250px",
                    ...{ justifyContent: "flex-start" },
                  }}
                >
                  <Avatar src={element.avatar} alt="Avatar" />
                  <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                    {element.fullname}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default OtherUser;
