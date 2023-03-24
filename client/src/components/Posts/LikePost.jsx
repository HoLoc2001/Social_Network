import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import { updateLikePost } from "../../redux/postsSlice";
import { getListLike } from "../../redux/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "react-router-dom";

const LikePost = ({ user_id, post_id, total_like, list_like, islike }) => {
  const dispatch = useAppDispatch();
  const listLike = useAppSelector((state) => state.posts.listLike);
  const [open, setOpen] = useState(false);

  const handleClickFavorite = async (postId) => {
    await dispatch(updateLikePost(postId));
  };

  const handleOpen = async (postId, totalLike) => {
    if (totalLike) {
      await dispatch(getListLike(postId));
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={() => handleClickFavorite(post_id)}>
        <FavoriteIcon
          sx={{
            color: islike ? "red" : "gray",
            cursor: "pointer",
          }}
        />
      </IconButton>
      <Typography
        sx={{ cursor: "pointer" }}
        variant="body2"
        onClick={() => handleOpen(post_id, total_like)}
      >
        {total_like}
      </Typography>

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
              key={element.user_id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  user_id === element.user_id
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
    </>
  );
};

export default LikePost;
