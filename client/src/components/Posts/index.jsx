import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import {
  CardActions,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Comment";
import { getCommentPost, getPosts } from "../../redux/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import GridImg from "./GridImg";
import Comment from "./Comment";
import { useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import { Link } from "react-router-dom";
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
        margin: "2% 0 0 30%",
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
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
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
                  user_id={user.user_id}
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
    </div>
  );
};

export default Posts;
