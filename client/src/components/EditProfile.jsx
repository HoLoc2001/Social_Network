import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getBase64 } from "../utils";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { getInfo, updateUser } from "../redux/userSlice";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [avatar, setAvatar] = useState(user.avatar);
  const [fullname, setFullname] = useState(user.fullname);
  useEffect(() => {
    (async () => {
      await dispatch(getInfo());
    })();
  }, []);
  useEffect(() => {
    setAvatar(user.avatar);
    setFullname(user.fullname);
  }, [user]);

  const handleAvatar = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let imageBase64 = await getBase64(file);
        setAvatar(imageBase64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFullname = (e) => {
    setFullname(e.target.value);
  };

  const handleSave = async () => {
    if (fullname !== "") {
      await dispatch(updateUser({ avatar, fullname }));
    }
  };

  const handleCancel = () => {};
  return (
    <div
      style={{
        margin: "40px 0 0 40%",
        minHeight: "90vh",
        backgroundColor: "#F0F2F5",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
          border: "1px solid black",
          borderRadius: "50%",
          background: `no-repeat center/cover url(${avatar})`,
          marginBottom: "30px",
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
          <input type="file" accept="image/*" hidden onChange={handleAvatar} />
        </Button>
      </Box>

      <TextField
        id="fullname"
        label="Họ và tên"
        variant="outlined"
        name="fullname"
        value={fullname}
        onChange={onChangeFullname}
        sx={{ marginBottom: "30px" }}
      />

      <div style={{ display: "flex" }}>
        <Link to="../profile" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{ marginRight: "50px" }}
            onClick={() => handleSave()}
          >
            Lưu
          </Button>
        </Link>

        <Link
          to="../profile"
          // onClick={(e) => e.preventDefault()}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" onClick={() => handleCancel}>
            Hủy bỏ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditProfile;
