import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
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
  deletePost,
  getCommentPost,
  getMyPosts,
  updateLikePost,
  updatePost,
} from "../../redux/postsSlice";
import { Box } from "@mui/system";
import Comment from "../Posts/Comment";
import { Link } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll";
import { getListLike, getListFollowing } from "../../redux/userSlice";
import AddPost from "../Posts/AddPost";
import GridImg from "../Posts/GridImg";
import UpdatePost from "../Posts/UpdatePost";
import LikePost from "../Posts/LikePost";
moment.locale("vi");

const User = () => {
  const dispatch = useAppDispatch();
  let imageBase64 = "";
  const [postId, setPostId] = useState(null);
  const [imgPost, setImgPost] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalFollower, setOpenModalFollower] = useState(false);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);
  const [title, setTitle] = useState("");
  const [updatePost, setUpdatePost] = useState({
    postId: "",
    content: "",
    images: [],
  });
  const user = useAppSelector((state) => state.user.user);
  const listLike = useAppSelector((state) => state.user.listLike);
  const listFollower = useAppSelector((state) => state.user.listFollower);
  const listFollowing = useAppSelector((state) => state.user.listFollowing);
  const myPosts = useAppSelector((state) => state.posts.myPosts);

  const [open, setOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const handleOpen = async (postId, totalLike) => {
    if (totalLike) {
      await dispatch(getListLike(postId));
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(myPosts?.length);
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
        if (myPosts.length % 5 === 0 && myPosts.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  // const handleImagePost = async (e) => {
  //   try {
  //     let data = e.target.files;
  //     let file = data[0];
  //     if (file) {
  //       imageBase64 = await getBase64(file);
  //       setImgPost(imageBase64);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdateImagePost = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        imageBase64 = await getBase64(file);
        setUpdatePost({
          ...updatePost,
          postImg: imageBase64,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddPost = async () => {
  //   try {
  //     const dataAddPost = { title, imgPost };
  //     await dispatch(addPost(dataAddPost));
  //     await handleCloseModal();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleCloseImg = () => {
  //   setImgPost("");
  // };

  const handleCloseUpdateImg = () => {
    setUpdatePost({
      ...updatePost,
      postImg: null,
    });
  };

  const handleCloseModal = () => {
    setTitle("");
    setImgPost("");
    setOpenModal(false);
    setOpenModalUpdate(false);
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

  const onChangeUpdateTitle = (e) => {
    setUpdatePost({
      ...updatePost,
      postTitle: e.target.value,
    });
  };

  const handleClickComment = async (postId) => {
    await dispatch(getCommentPost(postId));
  };

  const handleOpenDelete = async (postId) => {
    setPostId(postId);
    setOpenDialogDelete(true);
  };

  const handleUpdatePost = async () => {
    await dispatch(
      updatePost({
        postId,
        title: updatePost?.postTitle,
        img: updatePost?.postImg,
      })
    );
    setUpdatePost(null);
    setOpenModalUpdate(false);
  };

  const handleDeletePost = async () => {
    setOpenDialogDelete(false);
    await dispatch(deletePost(postId));
  };

  const handleOpenUpdate = (postId, content, images) => {
    // setPostId(postId);
    setUpdatePost({
      postId,
      content,
      images,
    });
    setOpenModalUpdate(true);
  };

  const handleOpenFollowing = async (userId) => {
    await dispatch(getListFollowing(userId));
    setOpenModalFollowing(true);
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
              src={user?.avatar}
              aria-label="recipe"
              sx={{ height: "100px", width: "100px", position: "relative" }}
            />
          }
          title={
            <Typography sx={{ marginTop: "15px" }} variant="h5" component="div">
              {user?.fullname}
            </Typography>
          }
          subheader={
            <div style={{ display: "flex" }}>
              <h5>
                Người theo dõi:{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenFollowing(user.id)}
                >
                  {user?.totalFollower}
                </span>{" "}
                &emsp;
              </h5>
              <h5>
                Đang theo dõi:{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenModalFollower(true)}
                >
                  {user?.totalFollowing}
                </span>
              </h5>
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
          <Card key={post.post_id} sx={{ width: "60%", marginBottom: "20px" }}>
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
                    <li>
                      <Button
                        sx={{ width: "150px" }}
                        onClick={() =>
                          handleOpenUpdate(
                            post.post_id,
                            post.post_content,
                            post.images
                          )
                        }
                      >
                        Sửa
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{ width: "150px" }}
                        onClick={() => handleOpenDelete(post.id)}
                      >
                        Xóa
                      </Button>
                    </li>
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
              subheader={moment(post.created_at).format("llll")}
            />
            <Divider />

            {post?.post_content ? (
              <CardContent>
                <Typography variant="body2">{post?.post_content}</Typography>
              </CardContent>
            ) : (
              ""
            )}

            {post?.images ? (
              <GridImg
                count={post?.images.length}
                images={post?.images}
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
                {/* <IconButton onClick={() => handleClickFavorite(post.id)}>
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
                </Typography> */}
                <LikePost
                  post_id={post.post_id}
                  total_like={post?.total_like}
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
      <UpdatePost
        openUpdatePost={openModalUpdate}
        setOpenUpdatePost={setOpenModalUpdate}
        updatePostForm={updatePost}
      />
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
      </Modal>

      <Dialog
        open={openDialogDelete}
        onClose={() => !openDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Social</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa bài đăng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogDelete(false)}>Hủy bỏ</Button>
          <Button onClick={() => handleDeletePost()}>Xóa</Button>
        </DialogActions>
      </Dialog>

      {/* <Modal
        // open={openModalUpdate}
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
            Bài viết
          </Typography>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Tiêu đề"
            value={updatePost?.postTitle}
            onChange={onChangeUpdateTitle}
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
              background: `no-repeat center/cover url(${updatePost?.postImg})`,
            }}
          >
            <Button
              variant="text"
              component="label"
              sx={{
                width: "100%",
                height: "100%",
                display: updatePost?.postImg ? "none" : "inline-flex",
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
                onChange={handleUpdateImagePost}
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
              onClick={handleCloseUpdateImg}
              hidden={updatePost?.postImg ? false : true}
            >
              x
            </button>
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdatePost}
            sx={{ marginTop: "20px" }}
          >
            Sửa bài viết
          </Button>
        </Box>
      </Modal> */}

      <Modal
        open={openModalFollower}
        onClose={() => setOpenModalFollower(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
            overflowY: "scroll",
          }}
        >
          {listFollower?.map((element) => (
            <div
              key={element.user_id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  user.user_id === element.user_id
                    ? "/profile"
                    : `/${element.user_id}`
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

      <Modal
        open={openModalFollowing}
        onClose={() => setOpenModalFollowing(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
            overflowY: "scroll",
          }}
        >
          {listFollowing?.map((element) => (
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
      </Modal>
    </div>
  );
};

export default User;
