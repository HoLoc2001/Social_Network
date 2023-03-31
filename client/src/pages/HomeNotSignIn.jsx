import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll";
import GridImg from "../components/Posts/GridImg";
import CommentIcon from "@mui/icons-material/Comment";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getSamplePosts } from "../redux/postsSlice";
import moment from "moment";
moment.locale("vi");

const HomeNotSignIn = () => {
  const dispatch = useAppDispatch();
  const samplePosts = useAppSelector((state) => state.posts.samplePosts);
  const [page, setPage] = useState(samplePosts.length);

  const [hasPost, setHasPost] = useState(() => {
    if (samplePosts.length % 5 === 0 && samplePosts.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getSamplePosts(page));
      setHasPost(() => {
        if (samplePosts.length % 5 === 0 && samplePosts.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);
  return (
    <>
      <div>
        <AppBar
          position="fixed"
          sx={{ color: "black", backgroundColor: "#20B2AA", height: "56px" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <Box>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        textDecoration: "none",
                        fontSize: "30px",
                        color: "whitesmoke",
                      }}
                      onClick={() => (window.location.href = "/")}
                    >
                      SOCIAL
                    </Typography>
                  </Link>
                </Box>
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Đăng nhập</Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
        <div
          style={{
            margin: "2% 0 0 30%",
          }}
        >
          <InfiniteScroll
            getMore={() => {
              setPage((prev) => prev + 5);
            }}
            hasMore={samplePosts.length && hasPost}
          >
            {samplePosts.map((post) => (
              <>
                <Card
                  key={post.post_id}
                  sx={{
                    width: "60%",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Link
                        to={"/signin"}
                        onClick={() =>
                          window.scroll({ top: 0, left: 0, behavior: "smooth" })
                        }
                      >
                        <Avatar src={post?.avatar} aria-label="recipe" />
                      </Link>
                    }
                    title={
                      <Link
                        to={"/signin"}
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
                      <IconButton>
                        <FavoriteIcon
                          sx={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        {post.total_like || 0}
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
                      <IconButton>
                        <CommentIcon sx={{ color: "gray" }} />
                      </IconButton>

                      <Typography variant="body2">
                        {post.total_comment || 0}
                      </Typography>
                    </div>
                  </CardActions>
                </Card>
              </>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default HomeNotSignIn;
