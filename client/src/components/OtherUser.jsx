import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
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
  getMyPosts,
  getOtherPosts,
  updateLikeMyPost,
  updateLikePost,
} from "../components/Posts/postsSlice";
import Comment from "../components/Comment";
import { Link, Navigate, useParams } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll";
import { getOtherInfo } from "./User/userSlice";
moment.locale("vi");

const OtherUser = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const otherUser = useAppSelector((state) => state.user.otherUser);
  const user = useAppSelector((state) => state.user.user);
  const otherPosts = useAppSelector((state) => state.posts.otherPosts);
  const [page, setPage] = useState(otherPosts.length);
  const [hasPost, setHasPost] = useState(() => {
    if (otherPosts.length % 5 === 0 && otherPosts.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getOtherInfo(params.id));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherPosts({ page, userId: params.id }));
      setHasPost(() => {
        if (otherPosts.length % 5 === 0) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  return (
    <div
      style={{
        margin: "40px 0 0 30%",
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
              avatar={<Avatar src={otherUser.avatar} aria-label="recipe" />}
              title={otherUser.fullname}
              subheader={moment(post.createdAt).format("llll")}
            />
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
                <IconButton>
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
