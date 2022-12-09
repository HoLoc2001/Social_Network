import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";
import {
  addPost,
  getCommentPost,
  getMyPosts,
  getOtherPosts,
  updateLikeMyPost,
  updateLikePost,
} from "../components/Posts/postsSlice";
import Comment from "../components/Comment";
import { json, Link, Navigate, useParams } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll";
import { addFollower, getOtherInfo } from "./User/userSlice";
moment.locale("vi");

const OtherUser = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const otherUser = useAppSelector((state) => state.user.otherUser);
  const user = useAppSelector((state) => state.user.user);
  const otherPosts = useAppSelector((state) => state.posts.otherPosts);
  const listFollower = useAppSelector((state) => state.user.listFollower);
  const [page, setPage] = useState(0);
  const [hasPost, setHasPost] = useState(false);

  let hasFollower = listFollower.find((e) => {
    return "" + e.id === params.id;
  });

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);

      await dispatch(getOtherInfo(params.id));
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      setPage(0);
      await dispatch(getOtherPosts({ page, userId: params.id }));
      setHasPost(() => {
        if (otherPosts.length % 5 === 0) {
          return true;
        }
        return false;
      });
    })();
  }, [page, params.id]);

  if ("" + user.id === params.id) {
    return <Navigate to="/profile" />;
  }

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleFollower = async (userId) => {
    await dispatch(addFollower(userId));
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  return (
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
              <h5>Người theo dõi: {otherUser.totalFollower} &emsp;</h5>
              <h5>Đang theo dõi: {otherUser.totalFollowing}</h5>
            </div>
          }
          action={
            hasFollower ? (
              <Button
                variant="contained"
                sx={{ textTransform: "none", margin: "30px 30px" }}
                onClick={() => handleFollower(otherUser.id)}
              >
                Hủy theo dõi
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ textTransform: "none", margin: "30px 30px" }}
                onClick={() => handleFollower(otherUser.id)}
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
          <Card key={post.id} sx={{ width: "60%", marginBottom: "20px" }}>
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
              subheader={moment(post.createdAt).format("llll")}
            />
            <Divider />

            {post.title ? (
              <CardContent>
                <Typography variant="body2">{post.title}</Typography>
              </CardContent>
            ) : (
              ""
            )}

            {post.image ? (
              <CardMedia
                component="img"
                height="500px"
                sx={{
                  background: `no-repeat center/cover url(${post.image})`,
                }}
              />
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
                <IconButton onClick={() => handleClickFavorite(post.id)}>
                  <FavoriteIcon
                    sx={{
                      color: post.isLike ? "red" : "gray",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
                <Typography variant="body2">{post.totalLike}</Typography>
              </div>
              <div
                style={{
                  paddingLeft: "20%",
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <IconButton onClick={() => handleClickComment(post.id)}>
                  <CommentIcon sx={{ color: "gray" }} />
                </IconButton>
                <Typography variant="body2">{post.totalComment}</Typography>
              </div>
            </CardActions>
            <Comment post={post} avatar={user.avatar} />
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default OtherUser;
