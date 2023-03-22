import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { addImgCloudinary, addPost, updatePost } from "../../redux/postsSlice";
import { useAppDispatch } from "../../redux/store";
import { getBase64 } from "../../utils";

const UpdatePost = ({ openUpdatePost, setOpenUpdatePost, updatePostForm }) => {
  const dispatch = useAppDispatch();
  let urlImages = [];

  const [postForm, setPostForm] = useState({
    content: "",
    images: new FormData(),
    urlImages: [],
  });

  useEffect(() => {
    setOpenUpdatePost(openUpdatePost);
    setPostForm({
      ...postForm,
      postId: updatePostForm.postId,
      content: updatePostForm.content,
      urlImages: updatePostForm.images,
    });
  }, [openUpdatePost]);

  const handleUpdatePost = async () => {
    try {
      // const urlImages = [];
      const { payload } = await dispatch(addImgCloudinary(postForm));
      payload.urlImages.forEach((image) => {
        urlImages.push(image.path);
      });

      await dispatch(
        updatePost({
          postId: postForm.postId,
          content: postForm.content,
          urlImages,
        })
      );
      await handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      let uploadData = new FormData();
      urlImages = [...postForm.urlImages];
      if (e.target.files.length < 100) {
        for (let i = 0; i < e.target.files.length; i++) {
          uploadData.append("file", e.target.files[i], "file");
          urlImages.push(await getBase64(e.target.files[i]));
        }
        setPostForm({ ...postForm, images: uploadData, urlImages });
      }
    } catch (error) {}
  };

  const onChangeTitle = (e) => {
    setPostForm({ ...postForm, content: e.target.value });
  };

  const handleDropImg = () => {
    setPostForm({ ...postForm, images: new FormData(), urlImages: [] });
  };

  const handleCloseModal = () => {
    urlImages = [];
    setOpenUpdatePost(false);
    setPostForm({ content: "", images: new FormData(), urlImages: [] });
  };

  return (
    <Modal
      open={openUpdatePost}
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          marginBottom="10px"
        >
          Bài viết
        </Typography>
        <Grid container rowSpacing={1} height="80%" width="100%">
          <Grid item xs={6} height="100%" width="100%">
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Nội dung"
              value={postForm.content}
              onChange={onChangeTitle}
              style={{
                height: "80%",
                width: "400px",
                resize: "none",
                marginBottom: "30px",
                overflow: "auto",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={6} height="100%" width="100%" position="relative">
            <ImageList
              sx={{
                width: "90%",
                height: "80%",
                borderRadius: "8px",
              }}
              cols={1}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  position: "absolute",
                  left: "2%",
                  top: "4%",
                  zIndex: "2",
                }}
              >
                Thêm ảnh
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileUpload}
                  multiple
                />
              </Button>
              <button
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  position: "absolute",
                  right: "15%",
                  top: "4%",
                  zIndex: "2",
                }}
                onClick={handleDropImg}
                hidden={postForm.urlImages.length ? false : true}
              >
                x
              </button>
              {postForm?.urlImages?.map((image, index) => (
                <ImageListItem key={index}>
                  <img src={`${image}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleUpdatePost}
            width="100%"
            sx={{ marginTop: "20px" }}
          >
            Sửa bài viết
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdatePost;
