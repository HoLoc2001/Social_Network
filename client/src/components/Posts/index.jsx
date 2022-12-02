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
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getPosts, postsSelector, updateLikePost } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
moment.locale("vi");

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  console.log(posts);
  useEffect(() => {
    async function load() {
      // await dispatch(getPosts());
    }
    load();
  }, []);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  return (
    <div
      style={{
        margin: "40px 0 0 30%",
      }}
    >
      {posts.map((post) => (
        <Card key={post.id} sx={{ width: "60%", marginBottom: "20px" }}>
          <CardHeader
            avatar={<Avatar src={post.avatar} aria-label="recipe" />}
            title={post.fullname}
            subheader={moment(post.createdAt).format("llll")}
          />
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

          {post.title ? (
            <CardContent>
              <Typography variant="body2">{post.title}</Typography>
            </CardContent>
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
              <FavoriteIcon
                sx={{ color: post.isLike ? "red" : "gray", cursor: "pointer" }}
                onClick={() => handleClickFavorite(post.id)}
              />
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
              <CommentIcon sx={{ color: "gray" }} />
              <Typography variant="body2">{post.totalComment}</Typography>
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
