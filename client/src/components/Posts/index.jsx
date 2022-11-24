import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import logo from "../../assets/img/photo2.jpg";
import { getPosts, postsSelector } from "./postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
