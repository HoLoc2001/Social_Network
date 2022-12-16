import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getListLike, getListUserSearch } from "./User/userSlice";
import moment from "moment";
import Comment from "./Comment";
import {
  getCommentPost,
  getListPostSearch,
  updateLikePost,
} from "./Posts/postsSlice";
moment.locale("vi");

const Filters = () => {
  const dispatch = useAppDispatch();
  const MyUser = useAppSelector((state) => state.user.user);
  const listUser = useAppSelector((state) => state.user.listUserSearch);
  const listPost = useAppSelector((state) => state.posts.listPostSearch);
  const listLike = useAppSelector((state) => state.user.listLike);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = async (e) => {
    setSearch(e.target.value);
    await dispatch(getListUserSearch(search));
  };

  const handleClose = () => setOpen(false);

  const handleOpen = async (postId, totalLike) => {
    if (totalLike) {
      await dispatch(getListLike(postId));
      setOpen(true);
    }
  };

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      if (search) {
        await dispatch(getListPostSearch(search));
      }
    }
  };

  const handleClickSearch = async () => {
    if (search) {
      await dispatch(getListPostSearch(search));
    }
  };

  return (
    <>
      <div
        style={{
          margin: "40px 30% 0 30%",
          minHeight: "100%",
          position: "relative",
        }}
      >
        <Box position="fixed" top="70px">
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              height: "40px",
              width: "640px",
              marginRight: "60px",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm trên Social"
              value={search}
              onChange={handleChange}
              onKeyDown={keyPress}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleClickSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ position: "fixed", width: "650px" }}>
          <ul className="mui-tabs__bar">
            <li className="mui--is-active">
              <a
                data-mui-toggle="tab"
                data-mui-controls="pane-default-1"
                style={{ cursor: "pointer" }}
              >
                Mọi người
              </a>
            </li>
            <li>
              <a
                data-mui-toggle="tab"
                data-mui-controls="pane-default-2"
                style={{ cursor: "pointer" }}
              >
                Bài viết
              </a>
            </li>
          </ul>
          <Box sx={{ width: "100%", height: "550px", overflowY: "scroll" }}>
            <div className="mui-tabs__pane mui--is-active" id="pane-default-1">
              {}
              {listUser?.map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    paddingBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={user.id === MyUser.id ? "/profile" : `/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      style={{
                        textTransform: "none",
                        color: "black",
                        width: "250px",
                        ...{ justifyContent: "flex-start" },
                      }}
                    >
                      <Avatar src={user.avatar} alt="Avatar" />
                      <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                        {user.fullname}
                      </span>
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mui-tabs__pane" id="pane-default-2">
              {listPost?.map((post) => (
                <Card
                  key={post.id}
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Link
                        to={
                          post.userId === MyUser.id
                            ? "/profile"
                            : `/${post.userId}`
                        }
                      >
                        <Avatar src={post.avatar} aria-label="recipe" />
                      </Link>
                    }
                    title={
                      <Link
                        to={
                          post.userId === MyUser.id
                            ? "/profile"
                            : `/${post.userId}`
                        }
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
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant="body2"
                        onClick={() => handleOpen(post.id, post.totalLike)}
                      >
                        {post.totalLike}
                      </Typography>
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

                      <Typography variant="body2">
                        {post.totalComment}
                      </Typography>
                    </div>
                  </CardActions>
                  <Comment
                    post={post}
                    avatar={MyUser.avatar}
                    userId={MyUser.id}
                  />
                </Card>
              ))}
            </div>
          </Box>
        </Box>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
          }}
        >
          {listLike?.map((element) => (
            <div
              key={element.id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={MyUser.id === element.id ? "/profile" : `/${element.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    color: "black",
                    width: "250px",
                    ...{ justifyContent: "flex-start" },
                  }}
                >
                  <Avatar src={element.avatar} alt="Avatar" />
                  <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                    {element.fullname}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default Filters;
