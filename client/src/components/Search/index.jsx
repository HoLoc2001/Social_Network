import {
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

const Filters = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpenModal(false);
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
              onFocus={() => {
                // setOpenModal(true);
              }}
              onBlur={() => setOpenSearch(false)}
            />
            <IconButton
              onClick={() => setOpenModal(true)}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              amet magnam odit nesciunt eligendi error sed consequatur?
              Molestias, eligendi. Ducimus labore odio impedit porro tenetur
              repellendus voluptate nihil pariatur reiciendis!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Natus amet magnam odit
              nesciunt eligendi error sed consequatur? Molestias, eligendi.
              Ducimus labore odio impedit porro tenetur repellendus voluptate
              nihil pariatur reiciendis!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus amet magnam odit nesciunt eligendi error
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
