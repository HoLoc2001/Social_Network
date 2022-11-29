import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getInfo, updateAvatar } from "./userSlice";
import logo from "../../assets/img/avatar.jpg";
import { useState } from "react";
import { getBase64 } from "../../utils";
import { getMyPosts } from "../Posts/postsSlice";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const myPosts = useAppSelector((state) => state.posts.myPosts);
  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  const [avatar, setAvatar] = useState("");

  const handlePicture = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      setAvatar(objectUrl);
      let base64 = await getBase64(file);
      console.log(base64);
      dispatch(updateAvatar(base64));
    }
  };

  return (
    <div
      style={{
        margin: "40px 5% 0 22%",
      }}
    >
      {/* {info user} */}
      <Card sx={{ width: "100%", marginBottom: "20px" }}>
        <CardHeader
          avatar={<Avatar src={user.avatar} aria-label="recipe" />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user.fullname}
          subheader="September 14, 2016"
        />
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
            hello u are fine
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Like
          </Button>
        </CardActions>
      </Card>

      {myPosts.map((post) => (
        <Card key={post.id} sx={{ width: "100%", marginBottom: "20px" }}>
          <CardHeader
            avatar={<Avatar src={user.avatar} aria-label="recipe" />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.fullname}
            subheader="September 14, 2016"
          />
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
              hello u are fine
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Like
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handlePicture} />
      </Button>
      <img src={avatar} alt="avatar" />
    </div>
  );
};

export default User;
