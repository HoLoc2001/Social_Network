import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getBase64 } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getInfo, updateInfoUser } from "../../redux/userSlice";
import { Link, Navigate } from "react-router-dom";
import { updateInfoValidate } from "../../utils/validation";
import AlertErr from "../AlertErr";
import "../../assets/style/style.css";
import { addImgCloudinary } from "../../redux/postsSlice";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [infoUser, setInfoUser] = useState(user);
  const [errMissInput, setErrMissInput] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [Updated, setUpdated] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState({
    content: "Lưu",
    loading: false,
  });
  useEffect(() => {
    (async () => {
      await dispatch(getInfo());
    })();
  }, []);

  useEffect(() => {
    setInfoUser(user);
  }, [user]);

  const handleAvatar = async (e) => {
    setAllowUpdate(true);

    try {
      const uploadAvatar = new FormData();
      uploadAvatar.append("file", e.target.files[0], "file");
      setInfoUser({
        ...infoUser,
        avatar: await getBase64(e.target.files[0]),
        avatarFormData: uploadAvatar,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInfoUser = (e) => {
    setAllowUpdate(true);

    return setInfoUser({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const { error } = updateInfoValidate({
      first_name: infoUser.first_name,
      last_name: infoUser.last_name,
      birthday: infoUser.birthday,
      gender: infoUser.gender,
    });
    if (error) {
      setErrMissInput(true);
    } else {
      setLoadingUpdate({
        content: "Đang lưu ...",
        loading: true,
      });
      if (infoUser.avatarFormData) {
        const { payload } = await dispatch(
          addImgCloudinary({ images: infoUser.avatarFormData })
        );

        await dispatch(
          updateInfoUser({
            avatar: payload?.urlImages[0]?.path,
            firstName: infoUser.first_name,
            lastName: infoUser.last_name,
            birthday: infoUser.birthday,
            gender: infoUser.gender,
          })
        );
      } else {
        await dispatch(
          updateInfoUser({
            avatar: infoUser.avatar,
            firstName: infoUser.first_name,
            lastName: infoUser.last_name,
            birthday: infoUser.birthday,
            gender: infoUser.gender,
          })
        );
      }
      setUpdated(true);
    }
  };

  const handleCancel = () => {};

  return (
    <div
      style={{
        margin: "5% 0 0 0",
        minHeight: "90vh",
        backgroundColor: "#F0F2F5",
      }}
    >
      <Stack
        component="form"
        sx={{
          width: "400px",
          margin: "40px auto",
        }}
        spacing={3}
        noValidate
        autoComplete="on"
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            border: "1px solid black",
            borderRadius: "50%",
            background: `no-repeat center/cover url(${infoUser.avatar})`,
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
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatar}
            />
          </Button>
        </Box>
        <TextField
          label="Họ"
          variant="outlined"
          name="first_name"
          value={infoUser.first_name}
          onChange={onChangeInfoUser}
        />
        <TextField
          label="Tên"
          variant="outlined"
          name="last_name"
          value={infoUser.last_name}
          onChange={onChangeInfoUser}
        />
        <FormControl>
          <FormLabel sx={{ textAlign: "left" }}>Gender</FormLabel>
          <RadioGroup row defaultValue={infoUser.gender}>
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Ngày sinh"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name="birthday"
          defaultValue={user.birthday}
          onChange={onChangeInfoUser}
        />

        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{ marginRight: "50px" }}
            onClick={() => handleSave()}
            disabled={!allowUpdate || loadingUpdate.loading}
          >
            {loadingUpdate.content}
            {Updated && <Navigate to="../profile" replace />}
          </Button>

          <Link
            to="../profile"
            // onClick={(e) => e.preventDefault()}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              onClick={() => handleCancel}
              disabled={loadingUpdate.loading}
            >
              Hủy bỏ
            </Button>
          </Link>
        </div>
      </Stack>
      <AlertErr
        err={errMissInput}
        setErr={setErrMissInput}
        severity="error"
        content=""
      />
    </div>
  );
};

export default EditProfile;
