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
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getInfo, updateAvatar } from "./userSlice";
import logo from "../../assets/img/avatar.jpg";
import { useState } from "react";
import { getBase64 } from "../../utils";
import { addPost, getMyPosts } from "../Posts/postsSlice";
import { Box } from "@mui/system";
import { convertLength } from "@mui/material/styles/cssUtils";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const myPosts = useAppSelector((state) => state.posts.myPosts);
  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  let imageBase64 = "";
  const [avatar, setAvatar] = useState("");
  const [imgPost, setImgPost] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleImageAvatar = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let objectUrl = URL.createObjectURL(file);
        setAvatar(objectUrl);
        let base64 = await getBase64(file);

        await dispatch(updateAvatar(base64));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImagePost = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let objectUrl = URL.createObjectURL(file);
        imageBase64 = await getBase64(file);
        setImgPost(imageBase64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = async () => {
    try {
      console.log(imgPost);
      const dataAddPost = { title, imgPost };
      await dispatch(addPost(dataAddPost));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseImg = () => {
    setImgPost("");
  };

  const handleCloseModal = () => {
    if (!title && !imageBase64) {
      setOpenModal(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div
      style={{
        margin: "40px 5% 0 22%",
      }}
    >
      {/* {info user} */}
      <Card
        sx={{
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar}
              aria-label="recipe"
              sx={{ height: "100px", width: "100px", position: "relative" }}
            />
          }
          title={
            <Typography gutterBottom variant="h5" component="div">
              {user.fullname}
            </Typography>
          }
          subheader="September 14, 2016"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.fullname}
          </Typography>
        </CardContent> */}
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
            subheader={post.createdAt}
          />
          <CardMedia
            component="img"
            height="300px"
            sx={{
              background: `no-repeat center/cover url(${post.image})`,
            }}
          />
          {console.log(post.image)}
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
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageAvatar}
        />
      </Button>
      <Button
        variant="contained"
        component="label"
        sx={{
          width: "70px",
          height: "70px",
          position: "fixed",
          bottom: "10px",
          right: "0",
          borderRadius: "50%",
        }}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Button>
      <img src={avatar} />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "70%",
            bgcolor: "#AFEEEE",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bài viết mới
          </Typography>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Tiêu đề"
            value={title}
            onChange={onChangeTitle}
            style={{
              width: "400px",
              height: "300px",
              minWidth: "400px",
              maxWidth: "400px",
              maxHeight: "300px",
              marginBottom: "30px",
            }}
          />
          <Box
            sx={{
              width: "300px",
              height: "300px",
              border: "1px solid black",
              borderRadius: "10px",
              position: "absolute",
              top: "65px",
              right: "50px",
              background: `no-repeat center/cover url(${imgPost})`,
            }}
          >
            <Button
              // disabled
              variant="text"
              component="label"
              sx={{
                width: "100%",
                height: "100%",
                display: imgPost ? "none" : "inline-flex",
              }}
            >
              <AddAPhotoIcon
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImagePost}
              />
            </Button>
            <button
              style={{
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                position: "absolute",
                right: 0,
              }}
              onClick={handleCloseImg}
              hidden={imgPost ? false : true}
            >
              x
            </button>
          </Box>
          <Button
            variant="contained"
            onClick={handleAddPost}
            sx={{ marginTop: "20px" }}
          >
            Đăng bài viết
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default User;
