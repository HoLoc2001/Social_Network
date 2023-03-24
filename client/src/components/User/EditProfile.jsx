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
import { Link } from "react-router-dom";
import moment from "moment";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [infoUser, setInfoUser] = useState(user);
  // const [fullname, setFullname] = useState(user.fullname);
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getInfo());
  //   })();
  // }, []);
  useEffect(() => {
    setInfoUser(user);
  }, [user]);

  const handleAvatar = async (e) => {
    try {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let imageBase64 = await getBase64(file);
        // setAvatar(imageBase64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInfoUser = (e) => {
    return setInfoUser({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };
  // const onChangeFullname = (e) => {
  //   setFullname(e.target.value);
  // };

  // const handleSave = async () => {
  //   if (fullname !== "") {
  //     await dispatch(updateUser({ avatar, fullname }));
  //   }
  // };

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
          name="firstName"
          value={infoUser.first_name}
          onChange={onChangeInfoUser}
        />
        <TextField
          label="Tên"
          variant="outlined"
          name="lastName"
          value={infoUser.last_name}
          onChange={onChangeInfoUser}
        />
        <FormControl>
          <FormLabel sx={{ textAlign: "left" }}>Gender</FormLabel>
          <RadioGroup row>
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
          defaultValue={moment(user.birthday).utc().format("dd/mm/yyyy")}
          onChange={onChangeInfoUser}
        />

        <div style={{ display: "flex" }}>
          <Link to="../profile" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{ marginRight: "50px" }}
              // onClick={() => handleSave()}
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
      </Stack>
    </div>
  );
};

export default EditProfile;
