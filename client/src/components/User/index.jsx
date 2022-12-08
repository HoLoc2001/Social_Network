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
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { getBase64 } from "../../utils";
import {
  addPost,
  getCommentPost,
  getMyPosts,
  updateLikePost,
} from "../Posts/postsSlice";
import { Box } from "@mui/system";
import Comment from "../Comment";
import { Link } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll";
moment.locale("vi");

const User = () => {
  const dispatch = useAppDispatch();
  let imageBase64 = "";
  const [imgPost, setImgPost] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const user = useAppSelector((state) => state.user.user);
  const myPosts = useAppSelector((state) => state.posts.myPosts);

  const [page, setPage] = useState(myPosts.length);
  const [hasPost, setHasPost] = useState(() => {
    if (myPosts.length % 5 === 0 && myPosts.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getMyPosts(page));
      setHasPost(() => {
        if (myPosts.length % 5 === 0) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleImagePost = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        imageBase64 = await getBase64(file);
        setImgPost(imageBase64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = async () => {
    try {
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
    setTitle("");
    setImgPost("");
    setOpenModal(false);
    if (!title && !imageBase64) {
      setTitle("");
      imageBase64 = "";
      setOpenModal(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
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
              src={user.avatar}
              aria-label="recipe"
              sx={{ height: "100px", width: "100px", position: "relative" }}
            />
          }
          title={
            <Typography sx={{ marginTop: "15px" }} variant="h5" component="div">
              {user.fullname}
            </Typography>
          }
          subheader={
            <div style={{ display: "flex" }}>
              <h5>Người theo dõi: {user.totalFollower} &emsp;</h5>
              <h5>Đang theo dõi: {user.totalFollowing}</h5>
            </div>
          }
          action={
            <div className="mui-dropdown mui-dropdown--left">
              <IconButton aria-label="settings" data-mui-toggle="dropdown">
                <MoreVertIcon />
              </IconButton>
              <ul className="mui-dropdown__menu">
                <li>
                  <Link to="/EditProfile">Thông tin tài khoản</Link>
                </li>
              </ul>
            </div>
          }
        />
      </Card>
      <InfiniteScroll
        getMore={() => {
          setPage((prev) => prev + 5);
        }}
        hasMore={myPosts.length && hasPost}
      >
        {myPosts.map((post) => (
          <Card key={post.id} sx={{ width: "60%", marginBottom: "20px" }}>
            <CardHeader
              avatar={
                <Avatar
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                  style={{ cursor: "pointer" }}
                  src={user.avatar}
                  aria-label="recipe"
                />
              }
              action={
                <div className="mui-dropdown mui-dropdown--left">
                  <IconButton aria-label="settings" data-mui-toggle="dropdown">
                    <MoreVertIcon />
                  </IconButton>
                  <ul className="mui-dropdown__menu">
                    <li>Xoa</li>
                    <li>Sua</li>
                  </ul>
                </div>
              }
              title={
                <Link
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                  style={{ color: "black" }}
                >
                  {user.fullname}
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

      <Button
        variant="contained"
        component="label"
        sx={{
          width: "70px",
          height: "70px",
          position: "fixed",
          bottom: "0",
          left: "1430px",
          borderRadius: "50%",
        }}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Button>
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
