import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Box,
  Modal,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CommentIcon from "@mui/icons-material/Comment";
import {
  getCommentPost,
  getPosts,
  updateLikePost,
} from "../../redux/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import GridImg from "./GridImg";
import Comment from "./Comment";
import { useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import { Link } from "react-router-dom";
import { getListLike } from "../../redux/userSlice";
import LikePost from "./LikePost";
import AddPost from "./AddPost";
moment.locale("vi");

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const user = useAppSelector((state) => state.user.user);
  const [page, setPage] = useState(posts.length);
  const [openModal, setOpenModal] = useState(false);

  const [hasPost, setHasPost] = useState(() => {
    if (posts.length % 5 === 0 && posts.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getPosts(page));
      setHasPost(() => {
        if (posts.length % 5 === 0 && posts.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div
      style={{
        margin: "40px 0 0 30%",
      }}
    >
      <InfiniteScroll
        getMore={() => {
          setPage((prev) => prev + 5);
        }}
        hasMore={posts.length && hasPost}
      >
        {posts.map((post) => (
          <Card
            key={post.post_id}
            sx={{ width: "60%", marginBottom: "20px", borderRadius: "10px" }}
          >
            <CardHeader
              avatar={
                <Link
                  to={
                    post.user_id === user?.user_id
                      ? "/profile"
                      : `/${post.user_id}`
                  }
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                >
                  <Avatar src={post?.avatar} aria-label="recipe" />
                </Link>
              }
              title={
                <Link
                  to={
                    post.user_id === user?.user_id
                      ? "/profile"
                      : `/${post.user_id}`
                  }
                  style={{ color: "black" }}
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                >
                  {post.fullname}
                </Link>
              }
              subheader={moment(post.created_at).format("llll")}
            />

            <Divider />

            {post.post_content ? (
              <CardContent>
                <Typography variant="body2">{post.post_content}</Typography>
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
                  user_id={user.user_id}
                  post_id={post.post_id}
                  total_like={post?.total_like || 0}
                  list_like={post?.list_like}
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
                <IconButton onClick={() => handleClickComment(post.post_id)}>
                  <CommentIcon sx={{ color: "gray" }} />
                </IconButton>

                <Typography variant="body2">
                  {post.total_comment || 0}
                </Typography>
              </div>
            </CardActions>
            <Comment post={post} avatar={user?.avatar} userId={user?.user_id} />
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
          right: "20px",
          bottom: "5px",
          borderRadius: "50%",
          zIndex: "3",
        }}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Button>
      <AddPost openAddPost={openModal} setOpenAddPost={setOpenModal} />

      {/* <Modal
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
                to={user.id === element.id ? "/profile" : `/${element.id}`}
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
      </Modal> */}
    </div>
  );
};

export default Posts;
