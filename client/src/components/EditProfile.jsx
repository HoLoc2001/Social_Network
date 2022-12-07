import { Button, TextField } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { Box } from "@mui/system";
import React, { useState } from "react";
import { getBase64 } from "../utils";
import { useAppSelector } from "../redux/store";

const EditProfile = () => {
  const user = useAppSelector((state) => state.user.user);
  const [imgPost, setImgPost] = useState(user.avatar);

  const handleImagePost = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let imageBase64 = await getBase64(file);
        setImgPost(imageBase64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {};

  const handleCancel = () => {};
  return (
    <div
      style={{
        margin: "40px 0 0 40%",
        paddingBottom: "20px",
        minHeight: "100vh",
        backgroundColor: "#F0F2F5",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
          border: "1px solid black",
          borderRadius: "50%",
          // position: "absolute",
          // top: "65px",
          // right: "50px",
          background: `no-repeat center/cover url(${imgPost})`,
        }}
      >
        <Button
          variant="text"
          component="label"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImagePost}
          />
        </Button>
      </Box>

      <TextField
        id="fullname"
        label="Họ và tên"
        variant="outlined"
        name="fullname"
        // value={fullname}
        // onChange={onChangeSignupForm}
      />

      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleSave()}
        >
          Lưu
        </Button>
        <Button variant="contained" onClick={() => handleCancel}>
          Hủy bỏ
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
