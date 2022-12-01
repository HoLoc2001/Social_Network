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
        margin: "40px 5% 0 22%",
      }}
    >
      {posts.map((post) => (
        <Card key={post.id} sx={{ width: "100%", marginBottom: "20px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300px"
              image={logo}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <FavoriteIcon onClick={handleClickFavorite(post.id)} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
