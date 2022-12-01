import React, { useEffect } from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import logo from "../../assets/img/photo2.jpg";
import { getPosts, postsSelector } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

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

  const handleClickFavorite = (postId) => {};

  return (
    <div
      style={{
        margin: "40px 5% 0 35%",
      }}
    >
      {posts.map((post) => (
        <Card key={post.id} sx={{ width: "60%", marginBottom: "20px" }}>
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

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.title}
            </Typography>
          </CardContent>

          <CardActions>
            <FavoriteIcon onClick={handleClickFavorite(post.id)} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
