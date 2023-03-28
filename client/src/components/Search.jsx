import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getListUserSearch } from "../redux/userSlice";
import moment from "moment";
import Comment from "./Posts/Comment";
import { getCommentPost, getListPostSearch } from "../redux/postsSlice";
import GridImg from "./Posts/GridImg";
import LikePost from "./Posts/LikePost";
moment.locale("vi");

const Filters = () => {
  const dispatch = useAppDispatch();
  const MyUser = useAppSelector((state) => state.user.user);
  const listUser = useAppSelector((state) => state.user.listUserSearch);
  const listPost = useAppSelector((state) => state.posts.listPostSearch);

  const [search, setSearch] = useState("");

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      await dispatch(getListUserSearch(e.target.value));
      await dispatch(getListPostSearch(e.target.value));
    }
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
          margin: "5% 30% 0 30%",
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
          <ul
            className="mui-tabs__bar"
            style={{ position: "absolute", left: "-15%" }}
          >
            <li className="mui--is-active">
              <p
                data-mui-toggle="tab"
                data-mui-controls="pane-default-1"
                style={{ cursor: "pointer" }}
              >
                Mọi người
              </p>
            </li>
            <li style={{ display: "block" }}>
              <p
                data-mui-toggle="tab"
                data-mui-controls="pane-default-2"
                style={{ cursor: "pointer" }}
              >
                Bài viết
              </p>
            </li>
          </ul>
          <Box sx={{ width: "100%", height: "550px", overflowY: "scroll" }}>
            <div className="mui-tabs__pane mui--is-active" id="pane-default-1">
              {listUser?.map((user) => (
                <div
                  key={user.user_id}
                  style={{
                    display: "flex",
                    paddingBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={
                      user.user_id === MyUser.user_id
                        ? "/profile"
                        : `/${user.user_id}`
                    }
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
                  key={post.post_id}
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
                          post.user_id === MyUser.user_id
                            ? "/profile"
                            : `/${post.user_id}`
                        }
                      >
                        <Avatar src={post.avatar} aria-label="recipe" />
                      </Link>
                    }
                    title={
                      <Link
                        to={
                          post.user_id === MyUser.user_id
                            ? "/profile"
                            : `/${post.user_id}`
                        }
                        style={{ color: "black" }}
                      >
                        {post.fullname}
                      </Link>
                    }
                    subheader={moment(post.created_at).format("llll")}
                  />

                  <Divider />

                  {post.post_content ? (
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {post.post_content}
                      </Typography>
                    </CardContent>
                  ) : (
                    ""
                  )}
                  {post.images ? (
                    <GridImg
                      count={post.images.length}
                      images={post.images}
                    ></GridImg>
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
                      <LikePost
                        user_id={MyUser.user_id}
                        post_id={post.post_id}
                        total_like={post?.total_like || 0}
                        islike={post.islike}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: "20%",
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <IconButton
                        onClick={() => handleClickComment(post.post_id)}
                      >
                        <CommentIcon sx={{ color: "gray" }} />
                      </IconButton>

                      <Typography variant="body2">
                        {post.total_comment || 0}
                      </Typography>
                    </div>
                  </CardActions>
                  <Comment
                    post={post}
                    avatar={MyUser.avatar}
                    userId={MyUser.user_id}
                  />
                </Card>
              ))}
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Filters;
