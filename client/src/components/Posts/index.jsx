import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import {
  Button,
  CardActionArea,
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
import { getPosts, postsSelector, updateLikePost } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Comment from "../Comment";
moment.locale("vi");

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    async function load() {
      // await dispatch(getPosts());
    }
    load();
  }, []);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleClickComment = () => {};

  return (
    <div
      style={{
        margin: "40px 0 0 30%",
      }}
    >
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{ width: "60%", marginBottom: "20px", borderRadius: "10px" }}
        >
          <CardHeader
            avatar={<Avatar src={post.avatar} aria-label="recipe" />}
            title={post.fullname}
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
              <CommentIcon
                sx={{ color: "gray" }}
                onClick={() => handleClickComment()}
              />
              <Typography variant="body2">{post.totalComment}</Typography>
            </div>
          </CardActions>
          <Comment post={post} avatar={user.avatar} />
        </Card>
      ))}
    </div>
  );
};

export default Posts;
