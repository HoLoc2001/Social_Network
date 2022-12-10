import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getCommentPost,
  getPosts,
  postsSelector,
  updateLikePost,
} from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Comment from "../Comment";
import { useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import { Link } from "react-router-dom";
moment.locale("vi");

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const user = useAppSelector((state) => state.user.user);
  const [page, setPage] = useState(posts.length);
  const [hasPost, setHasPost] = useState(() => {
    if (posts.length % 5 === 0 && posts.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getPosts(page));
      setHasPost(() => {
        if (posts.length % 5 === 0) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  return (
    <div
      style={{
        margin: "40px -0 0 30%",
      }}
    >
      <InfiniteScroll
        getMore={() => {
          setPage((prev) => prev + 5);
        }}
        hasMore={posts.length && hasPost}
      >
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{ width: "60%", marginBottom: "20px", borderRadius: "10px" }}
          >
            <CardHeader
              avatar={
                <Link
                  to={post.userId === user.id ? "/profile" : `/${post.userId}`}
                >
                  <Avatar src={post.avatar} aria-label="recipe" />
                </Link>
              }
              title={
                <Link
                  to={post.userId === user.id ? "/profile" : `/${post.userId}`}
                  style={{ color: "black" }}
                >
                  {post.fullname}
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
            <Comment post={post} avatar={user.avatar} userId={user.id} />
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
