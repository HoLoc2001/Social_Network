import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Tooltip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState } from "react";
import Posts from "../Posts";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getListUserSearch } from "../User/userSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const MyUser = useAppSelector((state) => state.user.user);
  const listUser = useAppSelector((state) => state.user.listUserSearch);

  const [search, setSearch] = useState("");

  const handleChange = async (e) => {
    setSearch(e.target.value);
    await dispatch(getListUserSearch(search));
  };

  return (
    <>
      <div
        style={{
          margin: "40px 30% 0 30%",
          minHeight: "100%",
          position: "relative",
        }}
      >
        <Box position="fixed" top="70px">
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              height: "40px",
              width: "640px",
              marginRight: "60px",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm trên Social"
              value={search}
              onChange={handleChange}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ position: "fixed", width: "650px" }}>
          <ul className="mui-tabs__bar">
            <li className="mui--is-active">
              <a data-mui-toggle="tab" data-mui-controls="pane-default-1">
                Mọi người
              </a>
            </li>
            <li>
              <a data-mui-toggle="tab" data-mui-controls="pane-default-2">
                Bài viết
              </a>
            </li>
          </ul>
          <Box sx={{ width: "100%", height: "550px", overflowY: "scroll" }}>
            <div className="mui-tabs__pane mui--is-active" id="pane-default-1">
              {}
              {listUser.map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    paddingBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={user.id === MyUser.id ? "/profile" : `/${user.id}`}
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
                      <Avatar src={user.avatar} alt="Avatar" />
                      <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                        {user.fullname}
                      </span>
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mui-tabs__pane" id="pane-default-2">
              <Posts />
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Filters;
